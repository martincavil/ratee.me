"use client";

import Link from 'next/link';
import { useLanguage } from '@/lib/i18n';
import { LandingNavbar } from '@/components/landing/navbar';
import { Footer } from '@/components/landing/footer';
import { CheckoutButton } from '@/components/pricing/checkout-button';

export default function PricingPage() {
  const { text, lang } = useLanguage();
  return (
    <div className="min-h-screen bg-white">
      <LandingNavbar />

      <div className="pt-24 pb-16 px-4 bg-bg-primary">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="font-sora text-4xl sm:text-5xl font-bold text-content-primary mb-4">
              {text.pricing.title}
            </h1>
            <p className="font-inter text-lg text-content-secondary">
              {lang === 'fr'
                ? 'Choisissez le plan qui correspond à vos besoins'
                : 'Choose the plan that fits your needs'}
            </p>
          </div>

          {/* Pricing Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {text.pricing.tiers.map((tier, index) => (
              <div
                key={index}
                className={`bg-white rounded-2xl shadow-lg border-2 p-6 relative transition-all hover:shadow-xl ${
                  tier.popular ? 'border-emerald-500 scale-105' : 'border-border'
                }`}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-emerald-500 text-white font-inter text-xs font-bold px-3 py-1 rounded-full">
                      {tier.badge}
                    </span>
                  </div>
                )}

                {/* Plan Info */}
                <div className="mb-4">
                  <h3 className="font-sora text-xl font-bold text-content-primary mb-1">
                    {tier.name}
                  </h3>
                  <p className="font-inter text-sm text-content-tertiary">{tier.heading}</p>
                </div>

                {/* Price */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="font-sora text-4xl font-bold text-content-primary">
                      {tier.price}
                    </span>
                    {tier.period && tier.name !== 'Free' && tier.name !== 'Business' && (
                      <span className="font-inter text-content-tertiary text-sm">{tier.period}</span>
                    )}
                  </div>
                  {(tier.name === 'Free' || tier.name === 'Business') && (
                    <p className="font-inter text-xs text-content-tertiary mt-1">{tier.period}</p>
                  )}
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-6">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <svg
                        className="w-4 h-4 flex-shrink-0 text-emerald-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-inter text-sm text-content-secondary">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <CheckoutButton
                  tierName={tier.name}
                  isPopular={tier.popular}
                  cta={tier.cta}
                />

                {/* Note */}
                {'note' in tier && tier.note && (
                  <p className="text-center font-inter text-xs text-content-tertiary mt-3">
                    {tier.note}
                  </p>
                )}
              </div>
            ))}
          </div>

          {/* Bottom note */}
          <div className="text-center mt-12">
            <p className="font-inter text-sm text-content-secondary mb-4">
              {lang === 'fr'
                ? 'Tous les plans incluent un support email. Annulation à tout moment.'
                : 'All plans include email support. Cancel anytime.'}
            </p>
            <Link
              href="/#faq"
              className="text-emerald-500 hover:text-emerald-600 font-inter font-medium text-sm transition-colors cursor-pointer"
            >
              {lang === 'fr' ? 'Consultez la FAQ →' : 'Check out the FAQ →'}
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
