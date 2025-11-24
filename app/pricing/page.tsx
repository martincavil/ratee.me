import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - ratee.me',
  description: 'Simple pricing for freelancers and agencies',
};

const plans = [
  {
    name: 'Free',
    heading: 'Pour tester',
    price: '0',
    period: 'Pour toujours',
    description: 'Parfait pour decouvrir',
    features: [
      { text: '1 projet actif', included: true },
      { text: '3 feedbacks/mois', included: true },
      { text: 'Score NPS basique', included: true },
      { text: 'Badge partageable', included: true },
      { text: 'Analytics avancee', included: false },
      { text: 'Badge personnalisable', included: false },
      { text: 'Export des donnees', included: false },
      { text: 'Support prioritaire', included: false },
    ],
    cta: 'Commencer gratuitement',
    ctaLink: '/auth/signup',
    popular: false,
  },
  {
    name: 'Pro',
    heading: 'Pour les freelances',
    price: '19',
    period: '/mois',
    description: "Tout ce qu'il faut pour reussir",
    badge: 'RECOMMANDE',
    features: [
      { text: 'Projets illimites', included: true },
      { text: 'Feedbacks illimites', included: true },
      { text: 'Analytics avancee', included: true, highlight: true },
      { text: 'Badge personnalisable', included: true },
      { text: 'Export des donnees', included: true },
      { text: 'Support prioritaire', included: true },
    ],
    cta: 'Essayer 14 jours gratuit',
    ctaLink: '/auth/signup?plan=pro',
    popular: true,
    note: '€190/an (-17%)',
  },
  {
    name: 'Business',
    heading: 'Pour les agences',
    price: 'Sur devis',
    period: '',
    description: 'Pour les equipes',
    features: [
      { text: 'Tout de Pro, plus', included: true },
      { text: 'Multi-utilisateurs', included: true },
      { text: 'SSO / SAML', included: true },
      { text: 'API & Webhooks', included: true },
      { text: 'Account manager dedie', included: true, highlight: true },
    ],
    cta: 'Demander un devis',
    ctaLink: '/contact',
    popular: false,
    note: 'Pour les equipes 5+ personnes',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bg-primary py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="font-sora text-2xl font-bold text-emerald-500 mb-8 inline-block">
            ratee.me
          </Link>
          <h1 className="font-sora text-4xl font-bold text-content-primary mb-4">
            Des prix transparents
          </h1>
          <p className="font-inter text-lg text-content-secondary">
            Choisissez le plan qui correspond a vos besoins
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl shadow-lg border-2 p-6 relative ${
                plan.popular ? 'border-emerald-500 scale-105' : 'border-border'
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <span className="bg-emerald-500 text-white font-inter text-xs font-bold px-3 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Info */}
              <div className="text-center mb-4">
                <h3 className="font-sora text-xl font-bold text-content-primary mb-1">
                  {plan.name}
                </h3>
                <p className="font-inter text-sm text-content-tertiary">{plan.heading}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                {plan.price === 'Sur devis' ? (
                  <span className="font-sora text-3xl font-bold text-content-primary">{plan.price}</span>
                ) : (
                  <>
                    <span className="font-sora text-4xl font-bold text-content-primary">€{plan.price}</span>
                    <span className="font-inter text-content-tertiary ml-1">{plan.period}</span>
                  </>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    {feature.included ? (
                      <svg
                        className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-4 h-4 flex-shrink-0 mt-0.5 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <span
                      className={`font-inter text-sm ${
                        feature.included
                          ? 'highlight' in feature && feature.highlight
                            ? 'text-emerald-600 font-medium'
                            : 'text-content-secondary'
                          : 'text-content-tertiary'
                      }`}
                    >
                      {feature.text}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link
                href={plan.ctaLink}
                className={`block w-full py-3 px-4 rounded-lg font-inter font-semibold text-sm text-center transition-all ${
                  plan.popular
                    ? 'bg-emerald-500 text-white hover:bg-emerald-600'
                    : 'bg-gray-100 text-content-primary hover:bg-gray-200'
                }`}
              >
                {plan.cta}
              </Link>

              {/* Note */}
              {plan.note && (
                <p className="text-center font-inter text-xs text-content-tertiary mt-3">
                  {plan.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div className="text-center mt-10">
          <p className="font-inter text-sm text-content-secondary mb-4">
            Tous les plans incluent un support email. Annulation a tout moment.
          </p>
          <Link href="/#faq" className="text-emerald-600 hover:underline font-medium text-sm">
            Consultez la FAQ
          </Link>
        </div>
      </div>
    </div>
  );
}
