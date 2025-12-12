"use client";

import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

interface UpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  feature: string;
}

export function UpgradeModal({ isOpen, onClose, feature }: UpgradeModalProps) {
  const { lang } = useLanguage();

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-xl max-w-md w-full p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Icon */}
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
            />
          </svg>
        </div>

        {/* Title */}
        <h2 className="font-sora text-2xl font-bold text-content-primary mb-2 text-center">
          {lang === "fr" ? "🚀 Passez à Pro" : "🚀 Upgrade to Pro"}
        </h2>

        {/* Description */}
        <p className="font-inter text-content-secondary mb-6 text-center">
          {lang === "fr"
            ? `Cette fonctionnalité nécessite le plan Pro. ${feature}`
            : `This feature requires the Pro plan. ${feature}`}
        </p>

        {/* Benefits */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 mb-6">
          <p className="font-semibold text-emerald-900 mb-3 text-sm">
            {lang === "fr"
              ? "✨ Avec le plan Pro, débloquez :"
              : "✨ With Pro plan, unlock:"}
          </p>
          <ul className="space-y-2 text-sm text-emerald-800">
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-0.5">✓</span>
              <span>
                {lang === "fr"
                  ? "Clients illimités"
                  : "Unlimited clients"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-0.5">✓</span>
              <span>
                {lang === "fr"
                  ? "Projets illimités"
                  : "Unlimited projects"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-0.5">✓</span>
              <span>
                {lang === "fr"
                  ? "Emails automatiques de suivi"
                  : "Automated follow-up emails"}
              </span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-emerald-500 mt-0.5">✓</span>
              <span>
                {lang === "fr"
                  ? "Analytics avancées"
                  : "Advanced analytics"}
              </span>
            </li>
          </ul>
        </div>

        {/* Price */}
        <div className="text-center mb-6">
          <p className="text-3xl font-bold text-content-primary">
            19€<span className="text-lg text-content-secondary">/mois</span>
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 px-4 py-3 border-2 border-border rounded-lg font-inter font-medium text-content-primary hover:bg-bg-secondary transition-colors"
          >
            {lang === "fr" ? "Plus tard" : "Later"}
          </button>
          <Link
            href="/pricing"
            className="flex-1 px-4 py-3 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white rounded-lg font-inter font-semibold hover:from-emerald-600 hover:to-emerald-700 transition-all text-center shadow-lg hover:shadow-xl"
          >
            {lang === "fr" ? "Voir les tarifs" : "View pricing"}
          </Link>
        </div>
      </div>
    </div>
  );
}
