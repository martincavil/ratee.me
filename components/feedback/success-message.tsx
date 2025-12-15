"use client";

import { useEffect } from "react";
import Link from "next/link";
import type { FeedbackLanguage } from "@/lib/feedback-i18n";

interface SuccessMessageProps {
  onAutoRedirect?: () => void;
  language?: FeedbackLanguage;
}

export function SuccessMessage({ onAutoRedirect, language = 'fr' }: SuccessMessageProps) {
  useEffect(() => {
    // Auto redirect after 5 seconds
    if (!onAutoRedirect) return;

    const timer = setTimeout(() => {
      onAutoRedirect();
    }, 5000);

    return () => clearTimeout(timer);
  }, [onAutoRedirect]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-md p-8 sm:p-12 text-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <svg
            className="w-10 h-10 text-emerald-600"
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

        {/* Title */}
        <h1 className="text-3xl font-bold text-gray-900 font-sora mb-3">
          {language === 'fr' ? 'Merci !' : 'Thank you!'}
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 font-inter mb-2">
          {language === 'fr' ? 'Votre avis est important pour nous' : 'Your feedback is important to us'}
        </p>
        <p className="text-sm text-gray-500 font-inter mb-8">
          {language === 'fr' ? 'Vous recevrez un email de confirmation' : 'You will receive a confirmation email'}
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-emerald-500 text-white rounded-lg font-sora font-semibold hover:bg-emerald-600 transition-colors shadow-sm hover:shadow-md"
        >
          {language === 'fr' ? "Retour à l'accueil" : 'Back to home'}
        </Link>

        {/* Auto redirect notice */}
        <p className="mt-6 text-xs text-gray-400 font-inter">
          {language === 'fr' ? 'Redirection automatique dans 5 secondes...' : 'Automatic redirect in 5 seconds...'}
        </p>
      </div>
    </div>
  );
}
