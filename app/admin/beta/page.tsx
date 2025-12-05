"use client";

import { useState, useEffect } from "react";

interface BetaInvite {
  id: string;
  email: string;
  token: string;
  status: string;
  created_at: string;
  expires_at: string;
  used_at: string | null;
}

export default function AdminBetaPage() {
  const [invites, setInvites] = useState<BetaInvite[]>([]);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchInvites();
  }, []);

  async function fetchInvites() {
    try {
      const response = await fetch("/api/admin/beta");
      const result = await response.json();
      if (result.data) setInvites(result.data);
    } catch (error) {
      console.error("Error fetching invites:", error);
    }
  }

  async function handleGenerateInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("/api/admin/beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "create", email: email.toLowerCase().trim() }),
      });

      const result = await response.json();

      if (!response.ok || result.error) {
        setMessage("Erreur: " + (result.error || "Unknown error"));
      } else {
        const link = `${window.location.origin}/beta/${result.token}`;
        await navigator.clipboard.writeText(link);
        setMessage("Invite copiee!");
        setEmail("");
        await fetchInvites();
      }
    } catch (error: any) {
      setMessage("Erreur: " + error.message);
    }

    setLoading(false);
    setTimeout(() => setMessage(""), 3000);
  }

  async function handleCopyLink(token: string) {
    const link = `${window.location.origin}/beta/${token}`;
    await navigator.clipboard.writeText(link);
    setMessage("Lien copie!");
    setTimeout(() => setMessage(""), 2000);
  }

  async function handleDelete(id: string) {
    try {
      await fetch("/api/admin/beta", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: "delete", id }),
      });
      await fetchInvites();
    } catch (error) {
      console.error("Error deleting invite:", error);
    }
  }

  const stats = {
    total: invites.length,
    pending: invites.filter((i) => i.status === "pending").length,
    used: invites.filter((i) => i.status === "used").length,
    expired: invites.filter(
      (i) => new Date(i.expires_at) < new Date() && i.status === "pending"
    ).length,
  };

  return (
    <div className="space-y-8">
      <h1 className="text-xl! font-bold text-gray-900">Gerer invites beta</h1>

      {/* Message */}
      {message && (
        <div
          className={`p-4 rounded-lg ${
            message.includes("Erreur")
              ? "bg-red-100 text-red-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {message}
        </div>
      )}

      {/* Generate Form */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-lg! font-semibold mb-4">Generer une invite</h2>
        <form onSubmit={handleGenerateInvite} className="flex gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="sophie@studio.fr"
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/20 focus:border-primary"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 disabled:opacity-50"
          >
            {loading ? "..." : "+ Generer invite"}
          </button>
        </form>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-600">Pending</p>
          <p className="text-2xl font-bold text-blue-700">{stats.pending}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-600">Used</p>
          <p className="text-2xl font-bold text-green-700">{stats.used}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-sm text-red-600">Expired</p>
          <p className="text-2xl font-bold text-red-700">{stats.expired}</p>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Lien
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Genere
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Expires
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {invites.map((invite) => (
              <tr key={invite.id}>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {invite.email}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleCopyLink(invite.token)}
                    className="text-blue-600 hover:text-blue-800 text-sm"
                  >
                    Copier le lien
                  </button>
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      invite.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {invite.status === "pending" ? "En attente" : "Utilise"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(invite.created_at).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(invite.expires_at).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(invite.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {invites.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucune invite generee
          </div>
        )}
      </div>
    </div>
  );
}
