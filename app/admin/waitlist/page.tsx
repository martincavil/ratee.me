"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface WaitlistEntry {
  id: string;
  email: string;
  status: string;
  created_at: string;
  source: string | null;
}

export default function AdminWaitlistPage() {
  const [waitlist, setWaitlist] = useState<WaitlistEntry[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchWaitlist();
  }, []);

  async function fetchWaitlist() {
    const supabase = createClient();
    const { data } = await supabase
      .from("waitlist")
      .select("*")
      .order("created_at", { ascending: false });
    if (data) setWaitlist(data);
  }

  async function handleBulkInvite() {
    if (selected.size === 0) return;
    setLoading(true);

    try {
      const selectedEmails = waitlist
        .filter((w) => selected.has(w.id))
        .map((w) => w.email);

      // Appeler l'API route pour générer les invites
      const response = await fetch("/api/admin/beta-invites", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ emails: selectedEmails }),
      });

      const data = await response.json();

      if (data.success && data.data.links.length > 0) {
        await navigator.clipboard.writeText(data.data.links.join("\n"));
        setMessage(
          `${data.data.count} invites copiees dans le presse-papier!`
        );
      } else {
        setMessage("Erreur: " + (data.error || "Impossible de créer les invites"));
      }

      setSelected(new Set());
      await fetchWaitlist();
    } catch (error) {
      console.error("Bulk invite error:", error);
      setMessage("Erreur lors de la génération des invites");
    } finally {
      setLoading(false);
      setTimeout(() => setMessage(""), 5000);
    }
  }

  function handleExportCSV() {
    const csv = [
      ["Email", "Status", "Date", "Source"].join(","),
      ...waitlist.map((w) =>
        [
          w.email,
          w.status,
          new Date(w.created_at).toISOString(),
          w.source || "",
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `waitlist-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  async function handleDelete(id: string) {
    const supabase = createClient();
    await supabase.from("waitlist").delete().eq("id", id);
    await fetchWaitlist();
  }

  const stats = {
    total: waitlist.length,
    waiting: waitlist.filter((w) => w.status === "waiting").length,
    invited: waitlist.filter((w) => w.status === "beta_invited").length,
    converted: waitlist.filter((w) => w.status === "converted").length,
  };

  const toggleAll = (checked: boolean) => {
    if (checked) {
      setSelected(
        new Set(waitlist.filter((w) => w.status === "waiting").map((w) => w.id))
      );
    } else {
      setSelected(new Set());
    }
  };

  const toggleOne = (id: string, checked: boolean) => {
    const newSelected = new Set(selected);
    if (checked) {
      newSelected.add(id);
    } else {
      newSelected.delete(id);
    }
    setSelected(newSelected);
  };

  return (
    <div className="space-y-8">
      <h1 className="text-xl! font-bold text-gray-900">Waitlist Management</h1>

      {/* Message */}
      {message && (
        <div className="p-4 rounded-lg bg-green-100 text-green-700">
          {message}
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-4 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-yellow-50 rounded-lg p-4">
          <p className="text-sm text-yellow-600">En attente</p>
          <p className="text-2xl font-bold text-yellow-700">{stats.waiting}</p>
        </div>
        <div className="bg-blue-50 rounded-lg p-4">
          <p className="text-sm text-blue-600">Invites</p>
          <p className="text-2xl font-bold text-blue-700">{stats.invited}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-600">Convertis</p>
          <p className="text-2xl font-bold text-green-700">{stats.converted}</p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <button
          onClick={handleBulkInvite}
          disabled={selected.size === 0 || loading}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 disabled:opacity-50"
        >
          {loading ? "..." : `Inviter ${selected.size} selectionnes`}
        </button>
        <button
          onClick={handleExportCSV}
          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200"
        >
          Exporter CSV
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left">
                <input
                  type="checkbox"
                  onChange={(e) => toggleAll(e.target.checked)}
                  checked={
                    selected.size ===
                      waitlist.filter((w) => w.status === "waiting").length &&
                    selected.size > 0
                  }
                  className="rounded border-gray-300"
                />
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {waitlist.map((item) => (
              <tr
                key={item.id}
                className={selected.has(item.id) ? "bg-blue-50" : ""}
              >
                <td className="px-6 py-4">
                  {item.status === "waiting" && (
                    <input
                      type="checkbox"
                      checked={selected.has(item.id)}
                      onChange={(e) => toggleOne(item.id, e.target.checked)}
                      className="rounded border-gray-300"
                    />
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {item.email}
                </td>
                <td className="px-6 py-4">
                  <span
                    className={`px-2 py-1 text-xs rounded-full ${
                      item.status === "waiting"
                        ? "bg-yellow-100 text-yellow-800"
                        : item.status === "beta_invited"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-green-100 text-green-800"
                    }`}
                  >
                    {item.status === "waiting"
                      ? "En attente"
                      : item.status === "beta_invited"
                      ? "Invite"
                      : "Converti"}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {new Date(item.created_at).toLocaleDateString("fr-FR")}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="text-red-600 hover:text-red-800 text-sm"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {waitlist.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun email dans la waitlist
          </div>
        )}
      </div>
    </div>
  );
}
