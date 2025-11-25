"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/lib/supabase/client";

interface EmailLog {
  id: string;
  project_id: string;
  user_id: string;
  email_type: string;
  client_email: string;
  client_name: string;
  status: string;
  error_message: string | null;
  sent_at: string;
  created_at: string;
}

export default function AdminEmailLogsPage() {
  const [logs, setLogs] = useState<EmailLog[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [triggering, setTriggering] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchLogs();
  }, []);

  async function fetchLogs() {
    const supabase = createClient();
    let query = supabase
      .from("email_automations")
      .select("*")
      .order("sent_at", { ascending: false })
      .limit(100);

    if (filter !== "all") {
      query = query.eq("email_type", filter);
    }

    const { data } = await query;
    if (data) setLogs(data);
  }

  async function handleTriggerAutomation() {
    setTriggering(true);
    setMessage("");

    try {
      const res = await fetch("/api/automations/send-emails", {
        method: "POST",
      });
      const data = await res.json();

      if (res.ok) {
        setMessage(
          `Automation executee: ${data.result.onboarding} onboarding, ${data.result.followup30} 30j, ${data.result.reminder90} 90j`
        );
        await fetchLogs();
      } else {
        setMessage("Erreur: " + data.error);
      }
    } catch {
      setMessage("Erreur de connexion");
    }

    setTriggering(false);
    setTimeout(() => setMessage(""), 5000);
  }

  const stats = {
    total: logs.length,
    sent: logs.filter((l) => l.status === "sent").length,
    failed: logs.filter((l) => l.status === "failed").length,
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-xl! font-bold text-gray-900">Email Logs</h1>
        <button
          onClick={handleTriggerAutomation}
          disabled={triggering}
          className="px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 disabled:opacity-50"
        >
          {triggering ? "En cours..." : "Trigger Automation"}
        </button>
      </div>

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

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-lg shadow p-4">
          <p className="text-sm text-gray-600">Total</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <p className="text-sm text-green-600">Sent</p>
          <p className="text-2xl font-bold text-green-700">{stats.sent}</p>
        </div>
        <div className="bg-red-50 rounded-lg p-4">
          <p className="text-sm text-red-600">Failed</p>
          <p className="text-2xl font-bold text-red-700">{stats.failed}</p>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2">
        {["all", "onboarding", "30_days_followup", "90_days_reminder"].map(
          (type) => (
            <button
              key={type}
              onClick={() => {
                setFilter(type);
                fetchLogs();
              }}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                filter === type
                  ? "bg-emerald-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {type === "all" ? "Tous" : type.replace("_", " ")}
            </button>
          )
        )}
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Client
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                Error
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {logs.map((log) => (
              <tr key={log.id}>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900">{log.client_name}</div>
                  <div className="text-xs text-gray-500">
                    {log.client_email}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 text-xs rounded-full bg-blue-100 text-blue-800">
                    {log.email_type.replace("_", " ")}
                  </span>
                </td>
                <td className="px-6 py-4">
                  {log.status === "sent" ? (
                    <span className="text-green-600">✅ Sent</span>
                  ) : (
                    <span className="text-red-600">❌ Failed</span>
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {log.sent_at
                    ? new Date(log.sent_at).toLocaleString("fr-FR")
                    : "-"}
                </td>
                <td className="px-6 py-4 text-sm text-red-500 max-w-xs truncate">
                  {log.error_message || "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {logs.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            Aucun email envoye
          </div>
        )}
      </div>
    </div>
  );
}
