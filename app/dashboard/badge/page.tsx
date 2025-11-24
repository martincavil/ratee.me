"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";

export default function BadgePage() {
  const { text } = useLanguage();
  const [stats, setStats] = useState({
    avg_nps: 0,
    total_feedbacks: 0,
    total_promoters: 0,
    total_passives: 0,
    total_detractors: 0,
  });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/badge/stats");
      const data = await response.json();
      if (data.success) {
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const embedCode = `<div style="font-family: Arial, sans-serif; border: 2px solid #10B981; border-radius: 8px; padding: 16px; max-width: 300px; text-align: center;">
  <div style="font-size: 14px; color: #666; margin-bottom: 8px;">${text.badge.preview.satisfaction}</div>
  <div style="font-size: 48px; font-weight: bold; color: #10B981;">${stats.avg_nps.toFixed(
    1
  )}</div>
  <div style="font-size: 12px; color: #999; margin-bottom: 16px;">${text.badge.preview.avgNPS}</div>
  <div style="font-size: 12px; color: #666;">${stats.total_feedbacks} ${text.badge.preview.totalFeedbacks}</div>
  <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #eee; font-size: 10px; color: #999;">
    ${text.badge.preview.certified}
  </div>
</div>`;

  const copyCode = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h1 className="text-2xl! font-bold text-content-primary font-sora mb-6">
        {text.badge.title}
      </h1>

      <div className="mb-6">
        {/* Stats Breakdown */}
        <div className="mt-6 bg-white rounded-lg border border-border p-6">
          <h2 className="text-xl! font-semibold text-content-primary font-sora mb-4">
            {text.badge.stats.title}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-bg-secondary rounded-md">
              <p className="text-2xl font-bold text-emerald">
                {stats.avg_nps.toFixed(1)}
              </p>
              <p className="text-xs text-content-secondary">{text.badge.stats.avgNPS}</p>
            </div>
            <div className="text-center p-4 bg-emerald-light rounded-md">
              <p className="text-2xl font-bold text-emerald-dark">
                {stats.total_promoters}
              </p>
              <p className="text-xs text-content-secondary">{text.badge.stats.promoters}</p>
            </div>
            <div className="text-center p-4 bg-warning-light rounded-md">
              <p className="text-2xl font-bold text-warning">
                {stats.total_passives}
              </p>
              <p className="text-xs text-content-secondary">{text.badge.stats.passives}</p>
            </div>
            <div className="text-center p-4 bg-error-light rounded-md">
              <p className="text-2xl font-bold text-error">
                {stats.total_detractors}
              </p>
              <p className="text-xs text-content-secondary">{text.badge.stats.detractors}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Preview */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="text-xl! font-semibold text-content-primary font-sora mb-4">
            {text.badge.preview.title}
          </h2>
          <p className="text-content-secondary text-sm mb-6">
            {text.badge.preview.description}
          </p>

          <div className="flex justify-center">
            <div
              style={{
                fontFamily: "Arial, sans-serif",
                border: "2px solid #10B981",
                borderRadius: "8px",
                padding: "16px",
                maxWidth: "300px",
                textAlign: "center",
              }}
            >
              <div
                style={{ fontSize: "14px", color: "#666", marginBottom: "8px" }}
              >
                {text.badge.preview.satisfaction}
              </div>
              <div
                style={{
                  fontSize: "48px",
                  fontWeight: "bold",
                  color: "#10B981",
                }}
              >
                {stats.avg_nps.toFixed(1)}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#999",
                  marginBottom: "16px",
                }}
              >
                {text.badge.preview.avgNPS}
              </div>
              <div style={{ fontSize: "12px", color: "#666" }}>
                {stats.total_feedbacks} {text.badge.preview.totalFeedbacks}
              </div>
              <div
                style={{
                  marginTop: "12px",
                  paddingTop: "12px",
                  borderTop: "1px solid #eee",
                  fontSize: "10px",
                  color: "#999",
                }}
              >
                {text.badge.preview.certified}
              </div>
            </div>
          </div>

          <div className="mt-6 p-4 bg-info-light border border-info/20 rounded-md">
            <p className="text-xs text-info">
              <strong>{text.badge.preview.note}:</strong> {text.badge.preview.noteText}
            </p>
          </div>
        </div>

        {/* Embed Code */}
        <div className="bg-white rounded-lg border border-border p-6">
          <h2 className="text-xl! font-semibold text-content-primary font-sora mb-4">
            {text.badge.embed.title}
          </h2>
          <p className="text-content-secondary text-sm mb-6">
            {text.badge.embed.description}
          </p>

          <div className="relative">
            <pre className="bg-content-primary text-white p-4 rounded-md overflow-x-auto text-xs">
              {embedCode}
            </pre>
            <button
              onClick={copyCode}
              className="absolute top-2 right-2 px-3 py-1 bg-white text-content-primary rounded text-xs font-medium hover:bg-bg-secondary transition-colors"
            >
              {copied ? `✓ ${text.badge.embed.copied}` : text.badge.embed.copy}
            </button>
          </div>

          <div className="mt-6 space-y-4">
            <div>
              <h3 className="font-medium text-content-primary text-sm! mb-2">
                {text.badge.embed.howToUse}
              </h3>
              <ol className="list-decimal list-inside space-y-2 text-xs text-content-secondary">
                <li>{text.badge.embed.steps.step1}</li>
                <li>{text.badge.embed.steps.step2}</li>
                <li>{text.badge.embed.steps.step3}</li>
                <li>{text.badge.embed.steps.step4}</li>
              </ol>
            </div>

            <div className="p-4 bg-emerald-light border border-emerald/20 rounded-md">
              <p className="text-xs text-emerald-dark">
                <strong>{text.badge.embed.tip}:</strong> {text.badge.embed.tipText}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
