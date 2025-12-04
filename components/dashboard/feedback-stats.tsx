"use client";

import { Modal } from "@/components/ui/modal";
import { formatDate, getNPSCategory } from "@/lib/utils";
import type { Feedback } from "@/types/database";

interface FeedbackStatsProps {
  feedback: Feedback | null;
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackStats({
  feedback,
  isOpen,
  onClose,
}: FeedbackStatsProps) {
  if (!feedback) return null;

  const category = getNPSCategory(feedback.nps_score);

  // Helper to render star rating display
  const renderStars = (rating: number | null) => {
    if (!rating) {
      return (
        <span className="text-sm text-gray-400 italic">Non renseigné</span>
      );
    }

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-xl ${
              star <= rating ? "text-amber-400" : "text-gray-300"
            }`}
          >
            ★
          </span>
        ))}
        <span className="ml-2 text-sm font-semibold text-gray-700">
          {rating}/5
        </span>
      </div>
    );
  };

  // Calculate average star rating
  const starRatings = [
    feedback.star_rating_communication,
    feedback.star_rating_deadlines,
    feedback.star_rating_quality,
    feedback.star_rating_professionalism,
    feedback.star_rating_recommendation,
  ].filter((r) => r !== null) as number[];

  const avgStarRating =
    starRatings.length > 0
      ? (
          starRatings.reduce((sum, r) => sum + r, 0) / starRatings.length
        ).toFixed(1)
      : null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Détails du feedback">
      <div className="space-y-6">
        {/* Header Info */}
        <div className="pb-4 border-b border-gray-200">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="text-lg! font-semibold text-gray-900 font-sora">
                {feedback.client_name}
              </h3>
              <p className="text-sm text-gray-500 mt-1">
                {formatDate(feedback.created_at)}
              </p>
            </div>
            <span
              className={`px-3 py-1.5 text-sm font-bold rounded-full ${
                category === "promoter"
                  ? "bg-emerald-100 text-emerald-700"
                  : category === "passive"
                  ? "bg-orange-100 text-orange-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              NPS: {feedback.nps_score}/10
            </span>
          </div>

          {/* Average Star Rating if available */}
          {avgStarRating && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs font-medium text-amber-900 mb-1">
                Moyenne des évaluations
              </p>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold text-amber-600">
                  {avgStarRating}
                </span>
                <span className="text-sm text-amber-700">/5 étoiles</span>
              </div>
            </div>
          )}
        </div>

        {/* Main Feedback */}
        <div className="space-y-4">
          <div>
            <p className="text-sm! font-semibold text-gray-900 font-sora mb-2">
              ✅ Ce qui a bien marché
            </p>
            <p className="text-sm text-gray-700 bg-emerald-50 border border-emerald-200 rounded-lg p-3">
              {feedback.what_went_well || (
                <i className="text-gray-400">Non renseigné</i>
              )}
            </p>
          </div>

          <div>
            <h4 className="text-sm! font-semibold text-gray-900 font-sora mb-2">
              💡 Points d&apos;amélioration
            </h4>
            <p className="text-sm text-gray-700 bg-orange-50 border border-orange-200 rounded-lg p-3">
              {feedback.to_improve || (
                <i className="text-gray-400">Non renseigné</i>
              )}
            </p>
          </div>

          <div>
            <h4 className="text-sm! font-semibold text-gray-900 font-sora mb-2">
              🔄 Reviendrait pour une autre mission
            </h4>
            <p className="text-sm">
              {feedback.will_return === "yes" && (
                <span className="inline-flex items-center px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-full font-medium">
                  ✓ Oui
                </span>
              )}
              {feedback.will_return === "maybe" && (
                <span className="inline-flex items-center px-3 py-1.5 bg-orange-100 text-orange-700 rounded-full font-medium">
                  ~ Peut-être
                </span>
              )}
              {feedback.will_return === "no" && (
                <span className="inline-flex items-center px-3 py-1.5 bg-red-100 text-red-700 rounded-full font-medium">
                  ✗ Non
                </span>
              )}
              {!feedback.will_return && (
                <span className="text-gray-400 italic">Non renseigné</span>
              )}
            </p>
          </div>
        </div>

        {/* Star Ratings Section */}
        {starRatings.length > 0 && (
          <>
            <hr className="border-gray-200" />
            <div className="space-y-4">
              <h4 className="text-base font-semibold text-gray-900 font-sora">
                ⭐ Évaluations détaillées
              </h4>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Communication</span>
                  {renderStars(feedback.star_rating_communication)}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Respect des délais
                  </span>
                  {renderStars(feedback.star_rating_deadlines)}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Qualité</span>
                  {renderStars(feedback.star_rating_quality)}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Professionnalisme
                  </span>
                  {renderStars(feedback.star_rating_professionalism)}
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">Recommandation</span>
                  {renderStars(feedback.star_rating_recommendation)}
                </div>
              </div>
            </div>
          </>
        )}

        {/* Testimonial */}
        {feedback.testimonial && (
          <>
            <hr className="border-gray-200" />
            <div>
              <h4 className="text-sm! font-semibold text-gray-900 font-sora mb-2">
                💬 Témoignage
              </h4>
              <blockquote className="text-sm text-gray-700 italic bg-gray-50 border-l-4 border-emerald-500 rounded-r-lg p-4">
                &quot;{feedback.testimonial}&quot;
              </blockquote>
              {feedback.publish_option && (
                <p className="text-xs text-gray-500 mt-2">
                  {feedback.publish_option === "name" &&
                    "✓ Publication autorisée avec nom"}
                  {feedback.publish_option === "anon" &&
                    "✓ Publication autorisée en anonyme"}
                  {feedback.publish_option === "no" && "✗ Publication refusée"}
                </p>
              )}
            </div>
          </>
        )}

        {/* Contact Info */}
        {feedback.respondent_email && (
          <>
            <hr className="border-gray-200" />
            <div>
              <h4 className="text-sm! font-semibold text-gray-900 font-sora mb-2">
                📧 Contact
              </h4>
              <p className="text-sm text-gray-700">
                {feedback.respondent_email}
              </p>
              {feedback.want_newsletter && (
                <p className="text-xs text-emerald-600 mt-1">
                  ✓ S&apos;est inscrit à la newsletter
                </p>
              )}
            </div>
          </>
        )}
      </div>
    </Modal>
  );
}
