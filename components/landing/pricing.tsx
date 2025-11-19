'use client';

import { useLanguage } from '@/lib/i18n';
import Link from 'next/link';

export function Pricing() {
  const { text, lang } = useLanguage();

  return (
    <section id="pricing" className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {text.pricing.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {text.pricing.tiers.map((tier, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-8 border-2 transition-all hover:shadow-2xl relative ${
                tier.popular
                  ? 'border-primary shadow-xl scale-105'
                  : 'border-gray-200 shadow-lg hover:border-primary'
              }`}
            >
              {/* Popular badge */}
              {tier.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="px-4 py-1 bg-primary text-white text-sm font-semibold rounded-full shadow-md">
                    {tier.badge}
                  </span>
                </div>
              )}

              {/* Tier name */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  {tier.name}
                </h3>
                <p className="text-gray-600">
                  {tier.heading}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl font-bold text-gray-900">
                    {tier.price}
                  </span>
                  {tier.name === 'Pro' && (
                    <span className="text-gray-500">/mois</span>
                  )}
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  {tier.period}
                </p>
              </div>

              {/* Features */}
              <div className="mb-8 space-y-3">
                {tier.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA */}
              <Link
                href="/signup"
                className={`block w-full py-3 px-6 rounded-lg font-semibold text-center transition-all ${
                  tier.popular
                    ? 'bg-primary text-white hover:bg-primary/90 shadow-md hover:shadow-lg'
                    : 'bg-gray-100 text-gray-900 hover:bg-gray-200 border-2 border-gray-300'
                }`}
              >
                {tier.cta}
              </Link>

              {/* Note */}
              {'note' in tier && tier.note && (
                <p className="text-xs text-gray-500 text-center mt-4">
                  {tier.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            {lang === 'fr'
              ? 'Tous les plans incluent un support email. Annulation à tout moment.'
              : 'All plans include email support. Cancel anytime.'}
          </p>
        </div>
      </div>
    </section>
  );
}
