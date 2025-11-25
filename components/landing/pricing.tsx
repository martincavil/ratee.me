"use client";

import { useLanguage } from "@/lib/i18n";
import Link from "next/link";

export function Pricing() {
  const { text, lang } = useLanguage();

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {text.pricing.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {text.pricing.tiers.map((tier, index) => (
            <div
              key={index}
              className={`relative bg-white rounded-2xl p-6 border-2 transition-all hover:shadow-xl ${
                tier.popular
                  ? "border-emerald-500 shadow-lg scale-105"
                  : "border-gray-200 shadow-md hover:border-emerald-300"
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="px-3 py-1 bg-emerald-500 text-white text-xs font-semibold rounded-full shadow-md">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Tier name */}
              <div className="mb-4">
                <h3 className="text-xl! font-bold text-gray-900 mb-1">
                  {tier.name}
                </h3>
                <p className="text-sm text-gray-500">{tier.heading}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold text-gray-900">
                    {tier.price}
                  </span>
                  {tier.period &&
                    tier.name !== "Free" &&
                    tier.name !== "Business" && (
                      <span className="text-gray-500 text-sm">
                        {tier.period}
                      </span>
                    )}
                </div>
                {(tier.name === "Free" || tier.name === "Business") && (
                  <p className="text-xs text-gray-500 mt-1">{tier.period}</p>
                )}
              </div>

              {/* Features */}
              <div className="mb-6 space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-2">
                    <svg
                      className="w-4 h-4 text-emerald-500 flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href={tier.name === "Business" ? "/contact" : "/auth/signup"}
                className={`block w-full py-3 px-4 rounded-lg font-semibold text-sm text-center transition-all cursor-pointer ${
                  tier.popular
                    ? "bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                {tier.cta}
              </Link>

              {/* Note */}
              {"note" in tier && tier.note && (
                <p className="text-xs text-gray-500 text-center mt-3">
                  {tier.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-10">
          <p className="text-sm text-gray-500">
            {lang === "fr"
              ? "Tous les plans incluent un support email. Annulation à tout moment."
              : "All plans include email support. Cancel anytime."}
          </p>
        </div>
      </div>
    </section>
  );
}
