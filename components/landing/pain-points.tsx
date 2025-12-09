"use client";

import { useLanguage } from "@/lib/i18n";
import Link from "next/link";

export function PainPoints() {
  const { lang } = useLanguage();

  const painPoints = {
    fr: {
      title: "Tu connais ces galères ?",
      subtitle:
        "Chaque jour, freelances et agences perdent du temps et des opportunités.",
      problems: [
        {
          icon: "😓",
          title: "Tu relances manuellement pour les feedbacks",
          description:
            "Emails de suivi, messages LinkedIn, appels... Tu passes des heures à demander l'avis de tes clients. Et souvent, tu n'obtiens rien.",
          stat: "5-6h/mois perdues",
        },
        {
          icon: "🤷",
          title: "Tu ne peux pas prouver ta qualité",
          description:
            "Tu dis 'mes clients sont satisfaits', mais tu n'as rien de concret à montrer. Pas de chiffres, pas de preuves objectives. Juste ta parole.",
          stat: "0 preuve sociale quantifiable",
        },
        {
          icon: "📊",
          title: "Tes feedbacks sont éparpillés partout",
          description:
            "Google Sheets, emails, notes manuscrites, messages Slack... Impossible d'avoir une vue d'ensemble. Tu ne connais même pas ton réel NPS.",
          stat: "Aucune analyse possible",
        },
        {
          icon: "💸",
          title: "Tu rates des opportunités de revenus récurrents",
          description:
            "Tes meilleurs clients? Tu ne les recontactes jamais. Tu ne sais pas qui recommanderait tes services. Tu laisses de l'argent sur la table.",
          stat: "30-40% de revenu perdu",
        },
      ],
    },
    en: {
      title: "Sound familiar?",
      subtitle:
        "Every day, freelancers and agencies lose time and opportunities.",
      problems: [
        {
          icon: "😓",
          title: "You manually chase feedback",
          description:
            "Follow-up emails, LinkedIn messages, calls... You spend hours asking for client feedback. And often, you get nothing.",
          stat: "5-6h/month wasted",
        },
        {
          icon: "🤷",
          title: "You can't prove your quality",
          description:
            "You say 'my clients are satisfied', but you have nothing concrete to show. No numbers, no objective proof. Just your word.",
          stat: "0 quantifiable social proof",
        },
        {
          icon: "📊",
          title: "Your feedback is scattered everywhere",
          description:
            "Google Sheets, emails, handwritten notes, Slack messages... Impossible to get an overview. You don't even know your average score.",
          stat: "No analysis possible",
        },
        {
          icon: "💸",
          title: "You miss recurring revenue opportunities",
          description:
            "Your best clients? You never re-contact them. You don't know who would recommend your services. You're leaving money on the table.",
          stat: "30-40% revenue lost",
        },
      ],
    },
  };

  const content = painPoints[lang as keyof typeof painPoints];

  const handleScrollToFeatures = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block px-4 py-2 bg-red-500/10 border border-red-500/20 rounded-full mb-6">
            <span className="text-red-500 font-semibold text-sm">
              {lang === "fr" ? "⚠️ STOP" : "⚠️ STOP"}
            </span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 font-sora">
            {content.title}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {content.subtitle}
          </p>
        </div>

        {/* Problems Grid */}
        <div className="grid sm:grid-cols-2 gap-6 lg:gap-8 mb-12">
          {content.problems.map((problem, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-6 lg:p-8 border-2 border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-lg hover:shadow-emerald-500/5 transition-all duration-300"
            >
              {/* Problem Number Badge - Keep RED */}
              <div className="absolute -top-3 -left-3 w-10 h-10 bg-linear-to-br from-emerald-300 to-emerald-600 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-md">
                {index + 1}
              </div>

              {/* Icon */}
              <div className="text-5xl mb-4">{problem.icon}</div>

              {/* Title */}
              <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-emerald-600 transition-colors">
                {problem.title}
              </h3>

              {/* Description */}
              <p className="text-gray-600 leading-relaxed mb-4">
                {problem.description}
              </p>

              {/* Stat - Changed to emerald */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-red-50 border border-red-200 rounded-full">
                <svg
                  className="w-4 h-4 text-red-600"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-sm font-semibold text-red-700">
                  {problem.stat}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA hint */}
        <div className="text-center bg-gradient-to-r from-emerald-50 to-emerald-100 border border-emerald-200 rounded-2xl p-8">
          <p className="text-lg text-gray-900 font-bold mb-4 font-sora">
            {lang === "fr"
              ? "ratee.me résout tous ces problèmes. Automatiquement."
              : "ratee.me solves all these problems. Automatically."}
          </p>
          <Link
            href="#features"
            onClick={handleScrollToFeatures}
            className="inline-block"
          >
            <div className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg">
              <span>{lang === "fr" ? "Découvre comment" : "Discover how"}</span>
              <svg
                className="w-5 h-5 animate-bounce"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
