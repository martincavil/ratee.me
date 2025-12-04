"use client";

import { useState, useEffect } from "react";
import { formatDate, getNPSCategory } from "@/lib/utils";
import { useLanguage } from "@/lib/i18n";
import { Spinner } from "@/components/ui/spinner";
import { FeedbackStats } from "@/components/dashboard/feedback-stats";
import type { Feedback } from "@/types/database";

interface Stats {
  avg_nps: number;
  total_feedbacks: number;
  nps_distribution: {
    detractors: number;
    passives: number;
    promoters: number;
  };
}

export default function FeedbacksPage() {
  const { text } = useLanguage();
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [stats, setStats] = useState<Stats>({
    avg_nps: 0,
    total_feedbacks: 0,
    nps_distribution: { detractors: 0, passives: 0, promoters: 0 },
  });
  const [loading, setLoading] = useState(true);
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/feedbacks?limit=100");
      const data = await response.json();

      if (data.success) {
        setFeedbacks(data.data.feedbacks || []);
        setStats(data.data.stats);
      }
    } catch (error) {
      console.error("Failed to fetch feedbacks:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedbackClick = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFeedback(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="w-8 h-8 text-emerald" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl! font-bold text-content-primary font-sora mb-6">
        {text.feedbacks.title}
      </h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-border p-5">
          <p className="text-xs font-medium text-content-secondary">
            {text.feedbacks.stats.avgNPS}
          </p>
          <p className="text-2xl font-bold text-emerald mt-2">
            {stats.avg_nps.toFixed(1)}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-border p-5">
          <p className="text-xs font-medium text-content-secondary">
            {text.feedbacks.stats.promoters}
          </p>
          <p className="text-2xl font-bold text-emerald mt-2">
            {stats.nps_distribution.promoters}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-border p-5">
          <p className="text-xs font-medium text-content-secondary">
            {text.feedbacks.stats.passives}
          </p>
          <p className="text-2xl font-bold text-warning mt-2">
            {stats.nps_distribution.passives}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-border p-5">
          <p className="text-xs font-medium text-content-secondary">
            {text.feedbacks.stats.detractors}
          </p>
          <p className="text-2xl font-bold text-error mt-2">
            {stats.nps_distribution.detractors}
          </p>
        </div>
      </div>

      {/* Feedbacks List */}
      <div className="bg-white rounded-lg border border-border">
        <div className="px-5 py-4 border-b border-border">
          <h2 className="text-xl! font-semibold text-content-primary font-sora">
            {text.feedbacks.list.title}
          </h2>
        </div>

        {feedbacks.length === 0 ? (
          <div className="p-8 text-center">
            <p className="text-content-secondary text-sm">
              {text.feedbacks.list.empty}
            </p>
            <p className="text-xs text-content-tertiary mt-2">
              {text.feedbacks.list.emptyDescription}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {feedbacks.map((feedback) => {
              const category = getNPSCategory(feedback.nps_score);
              return (
                <div
                  key={feedback.id}
                  onClick={() => handleFeedbackClick(feedback)}
                  className="p-5 hover:bg-bg-secondary transition-colors cursor-pointer"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="font-semibold text-content-primary text-sm!">
                          {feedback.client_name}
                        </h3>
                        <span
                          className={`px-2 py-1 text-xs font-bold rounded-full ${
                            category === "promoter"
                              ? "bg-emerald-light text-emerald-dark"
                              : category === "passive"
                              ? "bg-warning-light text-warning"
                              : "bg-error-light text-error"
                          }`}
                        >
                          {feedback.nps_score}/10
                        </span>
                      </div>

                      {feedback.comment && (
                        <p className="text-content-secondary text-sm mb-2 italic">
                          &quot;{feedback.comment}&quot;
                        </p>
                      )}

                      <p className="text-xs text-content-tertiary">
                        {formatDate(feedback.created_at)}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-emerald-600 font-medium text-sm">
                      <span>Voir le feedback</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Feedback Details Modal */}
      <FeedbackStats
        feedback={selectedFeedback}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
