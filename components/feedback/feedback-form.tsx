"use client";

import { useState, useEffect } from "react";
import { NpsButtons } from "./nps-buttons";
import { StarRating } from "./star-rating";

interface FeedbackFormProps {
  token: string;
  projectName: string;
  onSuccess: () => void;
}

interface FormState {
  nps: number | null;
  whatWentWell: string;
  toImprove: string;
  willReturn: "yes" | "maybe" | "no" | null;
  testimonial: string;
  allowPublish: boolean;
  publishOption: "name" | "anon" | "no";
  email: string;
  newsletter: boolean;
  starRatings: {
    communication: number | null;
    deadlines: number | null;
    quality: number | null;
    professionalism: number | null;
    recommendation: number | null;
  };
}

export function FeedbackForm({
  token,
  projectName,
  onSuccess,
}: FeedbackFormProps) {
  const [formState, setFormState] = useState<FormState>({
    nps: null,
    whatWentWell: "",
    toImprove: "",
    willReturn: null,
    testimonial: "",
    allowPublish: false,
    publishOption: "no",
    email: "",
    newsletter: false,
    starRatings: {
      communication: null,
      deadlines: null,
      quality: null,
      professionalism: null,
      recommendation: null,
    },
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-save to localStorage
  useEffect(() => {
    const savedData = localStorage.getItem(`feedback-${token}`);
    if (savedData) {
      try {
        setFormState(JSON.parse(savedData));
      } catch (e) {
        console.error("Failed to parse saved form data", e);
      }
    }
  }, [token]);

  useEffect(() => {
    localStorage.setItem(`feedback-${token}`, JSON.stringify(formState));
  }, [formState, token]);

  // Check if required fields are filled
  const requiredFieldsFilled =
    formState.nps !== null &&
    formState.whatWentWell.trim().length > 0 &&
    formState.toImprove.trim().length > 0 &&
    formState.willReturn !== null;

  // Show testimonial section only if required fields are filled
  const showTestimonialSection = requiredFieldsFilled;

  // Show consent section only if testimonial has content
  const showConsentSection =
    showTestimonialSection && formState.testimonial.trim().length > 10;

  // Validate email
  const isEmailValid = (email: string) => {
    if (!email) return true; // Email is optional
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // Validate required fields
    if (!requiredFieldsFilled) {
      setError("Veuillez remplir tous les champs obligatoires");
      return;
    }

    // Validate email if provided
    if (formState.email && !isEmailValid(formState.email)) {
      setError("Veuillez entrer un email valide");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/feedback/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          token,
          ...formState,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setError(data.error || "Une erreur est survenue. Veuillez réessayer.");
        return;
      }

      // Clear localStorage on success
      localStorage.removeItem(`feedback-${token}`);

      onSuccess();
    } catch (err) {
      console.error("Submit error:", err);
      setError("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="mb-4">
          <span className="text-2xl font-bold text-emerald-600 font-sora">
            ratee.me
          </span>
        </div>
        <h1 className="text-2xl! font-bold text-gray-900 font-sora mb-2">
          Votre avis compte vraiment !
        </h1>
        <p className="text-lg text-gray-600 font-inter mb-1">
          30 secondes pour nous aider à devenir meilleurs
        </p>
        <p className="text-sm text-gray-500 font-inter">
          Pas besoin d&apos;être long. Juste honnête.
        </p>

        {/* Project Info */}
        <div className="mt-6 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500 font-inter">Projet</p>
          <p className="text-lg font-semibold text-gray-900 font-sora">
            {projectName}
          </p>
        </div>
      </div>

      {/* Step 1: NPS */}
      <div className="space-y-3">
        <label className="block text-base font-semibold text-gray-900 font-sora">
          Sur une échelle de 0 à 10, recommanderiez-vous nos services ?
        </label>
        <NpsButtons
          value={formState.nps}
          onChange={(value) => setFormState({ ...formState, nps: value })}
        />
      </div>

      {/* Step 2: What went well */}
      <div className="space-y-2">
        <label
          htmlFor="whatWentWell"
          className="block text-base font-semibold text-gray-900 font-sora"
        >
          Qu&apos;est-ce qui a particulièrement bien marché ? *
        </label>
        <textarea
          id="whatWentWell"
          value={formState.whatWentWell}
          onChange={(e) =>
            setFormState({ ...formState, whatWentWell: e.target.value })
          }
          maxLength={200}
          rows={3}
          placeholder="Ex: Réactivité, qualité du code, communication..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg font-inter text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
        />
        <p className="text-xs text-gray-500 text-right font-inter">
          {formState.whatWentWell.length}/200 caractères
        </p>
      </div>

      {/* Step 3: To improve */}
      <div className="space-y-2">
        <label
          htmlFor="toImprove"
          className="block text-base font-semibold text-gray-900 font-sora"
        >
          Qu&apos;est-ce qu&apos;on pourrait améliorer ? *
        </label>
        <textarea
          id="toImprove"
          value={formState.toImprove}
          onChange={(e) =>
            setFormState({ ...formState, toImprove: e.target.value })
          }
          maxLength={200}
          rows={3}
          placeholder="Ex: Délai de réponse, clarté des livrables..."
          className="w-full px-4 py-3 border border-gray-200 rounded-lg font-inter text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
        />
        <p className="text-xs text-gray-500 text-right font-inter">
          {formState.toImprove.length}/200 caractères
        </p>
      </div>

      {/* Step 4: Will return */}
      <div className="space-y-3">
        <label className="block text-base font-semibold text-gray-900 font-sora">
          Reviendriez-vous pour une autre mission ? *
        </label>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { value: "yes", label: "Oui", color: "emerald" },
            { value: "maybe", label: "Peut-être", color: "orange" },
            { value: "no", label: "Non", color: "red" },
          ].map(({ value, label, color }) => (
            <button
              key={value}
              type="button"
              onClick={() =>
                setFormState({
                  ...formState,
                  willReturn: value as "yes" | "maybe" | "no",
                })
              }
              className={`
                px-4 py-3 rounded-lg font-sora font-semibold text-base
                transition-all duration-200
                focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2
                ${
                  formState.willReturn === value
                    ? `bg-${color}-500 text-white shadow-sm ring-2 ring-emerald-500`
                    : `bg-${color}-100 text-${color}-700 hover:bg-${color}-200`
                }
              `}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Step 5: Star Ratings (Optional) */}
      <hr className="border-gray-200" />
      <div className="space-y-6">
        <div className="text-center">
          <h3 className="text-lg! font-semibold text-gray-900 font-sora mb-2">
            Quelques détails pour nous aider à progresser
          </h3>
          <p className="text-sm text-gray-500 font-inter">
            (Optionnel - mais ça nous aide vraiment 🙏)
          </p>
        </div>

        <StarRating
          value={formState.starRatings.communication}
          onChange={(value) =>
            setFormState({
              ...formState,
              starRatings: { ...formState.starRatings, communication: value },
            })
          }
          label="Comment avez-vous trouvé la communication ? ⭐"
          sublabel="Réactivité, clarté des échanges, disponibilité..."
        />

        <StarRating
          value={formState.starRatings.deadlines}
          onChange={(value) =>
            setFormState({
              ...formState,
              starRatings: { ...formState.starRatings, deadlines: value },
            })
          }
          label="Le respect des délais ? ⭐"
          sublabel="Ponctualité, livrables à temps, absence de retard..."
        />

        <StarRating
          value={formState.starRatings.quality}
          onChange={(value) =>
            setFormState({
              ...formState,
              starRatings: { ...formState.starRatings, quality: value },
            })
          }
          label="La qualité du travail fourni ? ⭐"
          sublabel="Attention aux détails, excellence, conformité aux attentes..."
        />

        <StarRating
          value={formState.starRatings.professionalism}
          onChange={(value) =>
            setFormState({
              ...formState,
              starRatings: { ...formState.starRatings, professionalism: value },
            })
          }
          label="Le professionnalisme ? ⭐"
          sublabel="Attitude, respect des engagements, courtoisie..."
        />

        <StarRating
          value={formState.starRatings.recommendation}
          onChange={(value) =>
            setFormState({
              ...formState,
              starRatings: { ...formState.starRatings, recommendation: value },
            })
          }
          label="Recommanderiez-vous cette personne à un ami ? ⭐"
          sublabel="Basé sur votre expérience globale..."
        />
      </div>

      {/* Step 6: Testimonial (Conditional) */}
      {showTestimonialSection && (
        <>
          <hr className="border-gray-200" />
          <div className="space-y-2">
            <label
              htmlFor="testimonial"
              className="block text-base font-semibold text-gray-900 font-sora"
            >
              Laisser un témoignage{" "}
              <span className="text-gray-500 font-normal">(optionnel)</span>
            </label>
            <p className="text-sm text-gray-500 font-inter">
              (Pour notre site)
            </p>
            <textarea
              id="testimonial"
              value={formState.testimonial}
              onChange={(e) =>
                setFormState({ ...formState, testimonial: e.target.value })
              }
              maxLength={300}
              rows={3}
              placeholder="Ex: 'Marc a vraiment transformé ma vision en réalité...'"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg font-inter text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
            />
            <p className="text-xs text-gray-500 text-right font-inter">
              {formState.testimonial.length}/300 caractères
            </p>
            <p className="text-xs text-gray-500 font-inter">
              Nous pouvons l&apos;afficher sur notre site avec votre accord
            </p>
          </div>
        </>
      )}

      {/* Step 7: Consent (Conditional) */}
      {showConsentSection && (
        <div className="p-4 bg-emerald-50 border border-emerald-500 rounded-lg space-y-3">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="allowPublish"
              checked={formState.allowPublish}
              onChange={(e) =>
                setFormState({
                  ...formState,
                  allowPublish: e.target.checked,
                  publishOption: e.target.checked ? "name" : "no",
                })
              }
              className="mt-1 w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
            />
            <label
              htmlFor="allowPublish"
              className="text-sm font-semibold text-gray-900 font-sora cursor-pointer"
            >
              Pouvons-nous afficher votre nom/entreprise avec ce témoignage ?
            </label>
          </div>

          {formState.allowPublish && (
            <div className="ml-7 space-y-2">
              {[
                { value: "name", label: "Oui, avec mon nom et mon entreprise" },
                { value: "anon", label: "Anonyme" },
                { value: "no", label: "Non, pas de pub" },
              ].map(({ value, label }) => (
                <div key={value} className="flex items-center gap-2">
                  <input
                    type="radio"
                    id={`publish-${value}`}
                    name="publishOption"
                    value={value}
                    checked={formState.publishOption === value}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        publishOption: e.target.value as "name" | "anon" | "no",
                      })
                    }
                    className="w-4 h-4 text-emerald-600 border-gray-300 focus:ring-emerald-500"
                  />
                  <label
                    htmlFor={`publish-${value}`}
                    className="text-sm text-gray-700 font-inter cursor-pointer"
                  >
                    {label}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Step 8: Email & Newsletter (Optional) */}
      <hr className="border-gray-200" />
      <div className="space-y-3">
        <label
          htmlFor="email"
          className="block text-base font-semibold text-gray-900 font-sora"
        >
          Email{" "}
          <span className="text-gray-500 font-normal">
            (pour rester en contact - optionnel)
          </span>
        </label>
        <input
          type="email"
          id="email"
          value={formState.email}
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
          placeholder="your@email.com"
          className="w-full px-4 py-3 border border-gray-200 rounded-lg font-inter text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 transition-all"
        />
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="newsletter"
            checked={formState.newsletter}
            onChange={(e) =>
              setFormState({ ...formState, newsletter: e.target.checked })
            }
            className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
          />
          <label
            htmlFor="newsletter"
            className="text-sm text-gray-700 font-inter cursor-pointer"
          >
            Je veux recevoir les actualités ratee.me
          </label>
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-sm text-red-600 font-inter">{error}</p>
        </div>
      )}

      {/* Step 9: Submit Button */}
      <button
        type="submit"
        disabled={!requiredFieldsFilled || loading}
        className="w-full px-6 py-4 bg-emerald-500 text-white rounded-lg font-sora font-semibold text-base
          hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed
          transition-all duration-200 shadow-sm hover:shadow-md
          focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
      >
        {loading ? "Envoi en cours..." : "Envoyer mon avis"}
      </button>

      <p className="text-xs text-gray-500 text-center font-inter">
        * Champs obligatoires
      </p>
    </form>
  );
}
