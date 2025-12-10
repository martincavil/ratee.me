"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { createClient } from "@/lib/supabase/client";

export function WaitlistForm() {
  const { lang } = useLanguage();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "exists" | "error"
  >("idle");
  const [count, setCount] = useState(30);

  // Fetch waitlist count on mount
  useEffect(() => {
    async function fetchCount() {
      try {
        const supabase = createClient();
        const { count: totalCount } = await supabase
          .from("waitlist")
          .select("*", { count: "exact", head: true });
        if (totalCount !== null) {
          setCount(Math.max(30, totalCount));
        }
      } catch {
        // Keep default count
      }
    }
    fetchCount();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      return;
    }

    setStatus("loading");

    try {
      const res = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setEmail("");
        setCount((prev) => prev + 1);
      } else if (data.code === "ALREADY_EXISTS") {
        setStatus("exists");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }

    // Reset status after 5 seconds
    setTimeout(() => setStatus("idle"), 5000);
  };

  const texts = {
    fr: {
      placeholder: "ton@email.com",
      button: "Rejoindre la waitlist",
      loading: "Un instant...",
      success: "C'est fait! Tu recevras un email quand c'est pret",
      exists: "Tu es deja en attente",
      error: "Email invalide",
      count: "freelances et agences sont deja intéressés",
    },
    en: {
      placeholder: "your@email.com",
      button: "Join the waitlist",
      loading: "One moment...",
      success: "You're in! We'll email you when it's ready",
      exists: "You're already on the list",
      error: "Invalid email",
      count: "already interested",
    },
  };

  const t = texts[lang];

  return (
    <div className="w-full max-w-md">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t.placeholder}
            className="flex-1 px-4 py-3 rounded-lg border border-border focus:border-emerald-500 focus:ring-2 focus:ring-accent-light outline-none transition-all text-content-primary bg-white font-inter"
            disabled={status === "loading"}
            required
          />
          <button
            type="submit"
            disabled={status === "loading"}
            className="px-6 py-3 bg-[#10B981] text-white rounded-lg font-inter font-semibold hover:bg-[#047857] transition-all hover:scale-105 hover:shadow-md disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap cursor-pointer"
          >
            {status === "loading" ? t.loading : t.button}
          </button>
        </div>

        {/* Status messages */}
        {status === "success" && (
          <p className="text-sm text-emerald-600 flex items-center gap-2">
            <svg
              className="text-emerald-600! w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                clipRule="evenodd"
              />
            </svg>
            {t.success}
          </p>
        )}
        {status === "exists" && (
          <p className="text-sm text-yellow-600 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
            {t.exists}
          </p>
        )}
        {status === "error" && (
          <p className="text-sm text-red-600 flex items-center gap-2">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {t.error}
          </p>
        )}
      </form>

      {/* Counter */}
      <div className="mt-4 flex items-center gap-2 text-sm text-gray-500">
        <svg
          className="w-4 h-4 text-green-500"
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
            clipRule="evenodd"
          />
        </svg>
        <span>
          {count}+ {t.count}
        </span>
      </div>
    </div>
  );
}
