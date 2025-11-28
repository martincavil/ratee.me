"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Project } from "@/types/database";
import { getFeedbackText, type FeedbackLanguage } from "@/lib/feedback-i18n";
import { StarRating } from "./star-rating";

interface NPSFormProps {
  project: Project;
  token: string;
  language?: FeedbackLanguage;
}

export function NPSForm({ project, token, language = "en" }: NPSFormProps) {
  const router = useRouter();
  const t = getFeedbackText(language);

  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [ratings, setRatings] = useState({
    communication: null as number | null,
    quality: null as number | null,
    deadlines: null as number | null,
    value: null as number | null,
    overall: null as number | null,
  });
  const [formData, setFormData] = useState({
    client_name: "",
    client_email: project.client_email || "",
    comment: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleScoreClick = (score: number) => {
    setSelectedScore(score);
    setErrors((prev) => ({ ...prev, score: "" }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);

    // Validation
    const newErrors: Record<string, string> = {};

    if (selectedScore === null) {
      newErrors.score = t.errors.selectScore;
    }

    if (!formData.client_name.trim()) {
      newErrors.client_name = t.errors.nameRequired;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/feedback/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          project_token: token,
          nps_score: selectedScore,
          rating_communication: ratings.communication,
          rating_quality: ratings.quality,
          rating_deadlines: ratings.deadlines,
          rating_value: ratings.value,
          rating_overall: ratings.overall,
          client_name: formData.client_name,
          client_email: formData.client_email || undefined,
          comment: formData.comment || undefined,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setApiError(data.error || t.errors.submitError);
        return;
      }

      // Redirect to thank you page
      router.push(`/feedback/${token}/thank-you`);
    } catch (error) {
      setApiError(t.errors.submitError);
    } finally {
      setLoading(false);
    }
  };

  const getScoreLabel = (score: number) => {
    if (score <= 4) return t.nps.labels.detractor;
    if (score <= 6) return t.nps.labels.passive;
    if (score <= 7) return t.nps.labels.passive;
    if (score <= 8) return t.nps.labels.promoter;
    return t.nps.labels.superPromoter;
  };

  const getScoreColor = (score: number, isSelected: boolean = false) => {
    // Détracteurs (0-4) : Rouge
    if (score <= 1)
      return isSelected ? "bg-red-800" : "bg-red-800 hover:bg-red-900";
    if (score <= 3)
      return isSelected ? "bg-red-700" : "bg-red-700 hover:bg-red-800";
    if (score === 4)
      return isSelected ? "bg-red-600" : "bg-red-600 hover:bg-red-700";

    // Passifs bas (5-6) : Orange
    if (score === 5)
      return isSelected ? "bg-orange-600" : "bg-orange-600 hover:bg-orange-700";
    if (score === 6)
      return isSelected ? "bg-orange-500" : "bg-orange-500 hover:bg-orange-600";

    // Passifs hauts (7) : Jaune
    if (score === 7)
      return isSelected ? "bg-yellow-500" : "bg-yellow-500 hover:bg-yellow-600";

    // Promoteurs (8-10) : Vert de plus en plus foncé
    if (score === 8)
      return isSelected ? "bg-green-500" : "bg-green-500 hover:bg-green-600";
    if (score === 9)
      return isSelected ? "bg-green-600" : "bg-green-600 hover:bg-green-700";
    if (score === 10)
      return isSelected ? "bg-green-700" : "bg-green-700 hover:bg-green-800";

    return "bg-gray-300";
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* NPS Score Selection */}
        <div>
          <label className="block text-xl! font-bold font-sora text-content-primary mb-6">
            {t.nps.title}
          </label>

          <div className="grid grid-cols-11 gap-2 sm:gap-3 mb-3">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => handleScoreClick(score)}
                className={`aspect-square rounded-xl font-bold text-white transition-all text-lg! ${
                  selectedScore === score
                    ? `${getScoreColor(
                        score,
                        true
                      )} ring-4 ring-offset-2 ring-emerald scale-110 shadow-lg`
                    : `${getScoreColor(score)} shadow-sm`
                }`}
              >
                {score}
              </button>
            ))}
          </div>

          <div className="flex justify-between text-sm! text-content-tertiary mt-3 font-inter">
            <span>{t.nps.notLikely}</span>
            <span>{t.nps.veryLikely}</span>
          </div>

          {selectedScore !== null && (
            <div className="mt-6 text-center">
              <span className="inline-block px-6 py-3 bg-emerald-light border-2 border-emerald rounded-xl text-emerald-dark font-bold text-lg!">
                {getScoreLabel(selectedScore)} - {t.nps.scoreLabel}{" "}
                {selectedScore}/10
              </span>
            </div>
          )}

          {errors.score && (
            <p className="mt-3 text-sm! text-error font-inter">
              {errors.score}
            </p>
          )}
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Additional Ratings */}
        <div className="space-y-6">
          <h2 className="text-xl! font-bold font-sora text-content-primary mb-6">
            {t.ratings.title}
          </h2>

          <StarRating
            value={ratings.communication}
            onChange={(value) =>
              setRatings((prev) => ({ ...prev, communication: value }))
            }
            label={t.ratings.communication.title}
            sublabel={t.ratings.communication.description}
          />

          <StarRating
            value={ratings.quality}
            onChange={(value) =>
              setRatings((prev) => ({ ...prev, quality: value }))
            }
            label={t.ratings.quality.title}
            sublabel={t.ratings.quality.description}
          />

          <StarRating
            value={ratings.deadlines}
            onChange={(value) =>
              setRatings((prev) => ({ ...prev, deadlines: value }))
            }
            label={t.ratings.deadlines.title}
            sublabel={t.ratings.deadlines.description}
          />

          <StarRating
            value={ratings.value}
            onChange={(value) =>
              setRatings((prev) => ({ ...prev, value: value }))
            }
            label={t.ratings.value.title}
            sublabel={t.ratings.value.description}
          />

          <StarRating
            value={ratings.overall}
            onChange={(value) =>
              setRatings((prev) => ({ ...prev, overall: value }))
            }
            label={t.ratings.overall.title}
            sublabel={t.ratings.overall.description}
          />
        </div>

        {/* Divider */}
        <div className="border-t border-border my-8"></div>

        {/* Client Name */}
        <div>
          <label
            htmlFor="client_name"
            className="block text-sm! font-semibold text-content-primary mb-3 font-inter"
          >
            {t.form.name} *
          </label>
          <input
            type="text"
            id="client_name"
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald font-inter transition-all ${
              errors.client_name ? "border-error" : "border-border"
            }`}
            placeholder="John Doe"
          />
          {errors.client_name && (
            <p className="mt-2 text-sm! text-error font-inter">
              {errors.client_name}
            </p>
          )}
        </div>

        {/* Client Email (optional) */}
        <div>
          <label
            htmlFor="client_email"
            className="block text-sm! font-semibold text-content-primary mb-3 font-inter"
          >
            {t.form.email}
          </label>
          <input
            type="email"
            id="client_email"
            name="client_email"
            value={formData.client_email}
            onChange={handleChange}
            className={`w-full px-4 py-3.5 border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald font-inter transition-all ${
              errors.client_email ? "border-error" : "border-border"
            }`}
            placeholder="john@example.com"
          />
          {errors.client_email && (
            <p className="mt-2 text-sm! text-error font-inter">
              {errors.client_email}
            </p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label
            htmlFor="comment"
            className="block text-sm! font-semibold text-content-primary mb-3 font-inter"
          >
            {t.form.comment}
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3.5 border border-border rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald resize-none font-inter transition-all"
            placeholder={t.form.commentPlaceholder}
          />
        </div>

        {/* API Error */}
        {apiError && (
          <div className="p-4 bg-error-light border-2 border-error rounded-xl">
            <p className="text-sm! text-error font-semibold font-inter">
              {apiError}
            </p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-emerald text-white rounded-xl font-bold text-lg! hover:bg-emerald-dark disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-xl font-inter"
        >
          {loading ? t.form.submitting : t.form.submit}
        </button>
      </form>
    </div>
  );
}
