"use client";

import { useEffect } from "react";
import Link from "next/link";

interface SuccessMessageProps {
  onAutoRedirect?: () => void;
}

export function SuccessMessage({ onAutoRedirect }: SuccessMessageProps) {
  useEffect(() => {
    // Auto redirect after 5 seconds
    if (onAutoRedirect) {
      const timer = setTimeout(() => {
        onAutoRedirect();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [onAutoRedirect]);

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
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
          Merci !
        </h1>

        {/* Message */}
        <p className="text-lg text-gray-600 font-inter mb-2">
          Votre avis est important pour nous
        </p>
        <p className="text-sm text-gray-500 font-inter mb-8">
          Vous recevrez un email de confirmation
        </p>

        {/* CTA Button */}
        <Link
          href="/"
          className="inline-block px-8 py-3 bg-emerald-500 text-white rounded-lg font-sora font-semibold hover:bg-emerald-600 transition-colors shadow-md hover:shadow-lg"
        >
          Retour à l&apos;accueil
        </Link>

        {/* Auto redirect notice */}
        <p className="mt-6 text-xs text-gray-400 font-inter">
          Redirection automatique dans 5 secondes...
        </p>
      </div>
    </div>
  );
}
