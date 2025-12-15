"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { detectFeedbackLanguage, type FeedbackLanguage } from "@/lib/feedback-i18n";

export default function ThankYouPage() {
  const [language, setLanguage] = useState<FeedbackLanguage>('fr');

  useEffect(() => {
    const detectedLang = detectFeedbackLanguage();
    setLanguage(detectedLang);
  }, []);

  const text = {
    fr: {
      title: "Merci !",
      subtitle: "Votre avis a été soumis avec succès.",
      message1: "Nous apprécions vraiment que vous ayez pris le temps de partager vos commentaires avec nous. Votre avis nous aide à nous améliorer et à offrir de meilleurs résultats.",
      message2: "Si vous avez des questions ou des préoccupations supplémentaires, n'hésitez pas à nous contacter directement.",
      cta: "En savoir plus sur ratee.me",
      poweredBy: "Propulsé par",
    },
    en: {
      title: "Thank You!",
      subtitle: "Your feedback has been successfully submitted.",
      message1: "We really appreciate you taking the time to share your thoughts with us. Your feedback helps us improve and deliver better results.",
      message2: "If you have any additional questions or concerns, feel free to reach out to us directly.",
      cta: "Learn More About ratee.me",
      poweredBy: "Powered by",
    },
  };

  const t = text[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          {t.title}
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          {t.subtitle}
        </p>

        {/* Message */}
        <div className="bg-white rounded-2xl shadow-md border border-gray-200 p-8 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            {t.message1}
          </p>

          <p className="text-gray-600">
            {t.message2}
          </p>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all hover:shadow-md"
          >
            {t.cta}
          </Link>

          <p className="text-sm text-gray-500">
            {t.poweredBy}{" "}
            <a
              href="https://ratee.me"
              className="text-emerald-600 font-semibold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              ratee.me
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
