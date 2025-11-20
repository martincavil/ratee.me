import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pricing - ratee.me',
  description: 'Simple pricing for freelancers and agencies',
};

const plans = [
  {
    name: 'Free',
    heading: 'Pour debuter',
    price: '0',
    period: 'Toujours gratuit',
    description: 'Parfait pour tester',
    features: [
      { text: '1 projet par mois', included: true },
      { text: 'Feedbacks illimites', included: true },
      { text: 'NPS + temoignages', included: true },
      { text: 'Dashboard simple', included: true },
      { text: 'Badge basique', included: true },
      { text: 'Email automation', included: false },
      { text: 'NPS analytics', included: false },
      { text: 'Integrations', included: false },
      { text: 'Support email', included: false },
      { text: 'Export donnees', included: false },
    ],
    cta: 'Commencer gratuitement',
    ctaLink: '/auth/signup',
    popular: false,
  },
  {
    name: 'Pro',
    heading: 'Pour grandir',
    price: '19',
    period: '/mois',
    description: "Tout ce qu'il faut",
    badge: 'POPULAIRE',
    features: [
      { text: 'Projets illimites', included: true },
      { text: 'Feedbacks illimites', included: true },
      { text: 'NPS + temoignages', included: true },
      { text: 'Dashboard analytics', included: true },
      { text: 'Badge custom', included: true },
      { text: 'Email automation', included: true, highlight: true },
      { text: 'Integrations (Slack, Zapier)', included: true },
      { text: 'Support email prioritaire', included: true },
      { text: 'Export donnees', included: true },
    ],
    cta: 'Essayer 30j gratuit',
    ctaLink: '/auth/signup?plan=pro',
    popular: true,
    note: 'ou payer a l\'annee (€190, -20%)',
  },
];

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-bg-primary py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Link href="/" className="font-sora text-2xl font-bold text-accent mb-8 inline-block">
            ratee.me
          </Link>
          <h1 className="font-sora text-4xl font-bold text-text-primary mb-4">
            Des prix transparents
          </h1>
          <p className="font-inter text-xl text-text-secondary">
            Choisissez le plan qui correspond a vos besoins
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-2xl shadow-lg border-2 p-8 relative ${
                plan.popular ? 'border-accent' : 'border-border'
              }`}
            >
              {/* Popular Badge */}
              {plan.badge && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-white font-inter text-xs font-bold px-4 py-1 rounded-full">
                    {plan.badge}
                  </span>
                </div>
              )}

              {/* Plan Info */}
              <div className="text-center mb-6">
                <h2 className="font-inter text-lg font-semibold text-text-tertiary mb-1">
                  {plan.heading}
                </h2>
                <h3 className="font-sora text-2xl font-bold text-text-primary mb-2">
                  {plan.name}
                </h3>
                <p className="font-inter text-text-secondary text-sm">{plan.description}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <span className="font-sora text-5xl font-bold text-text-primary">€{plan.price}</span>
                <span className="font-inter text-text-tertiary ml-1">{plan.period}</span>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    {feature.included ? (
                      <svg
                        className={`w-5 h-5 flex-shrink-0 mt-0.5 ${
                          'highlight' in feature && feature.highlight ? 'text-accent' : 'text-accent'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        className="w-5 h-5 flex-shrink-0 mt-0.5 text-gray-300"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                          clipRule="evenodd"
                        />
                      </svg>
                    )}
                    <span
                      className={`font-inter text-sm ${
                        feature.included
                          ? 'highlight' in feature && feature.highlight
                            ? 'text-accent font-medium'
                            : 'text-text-secondary'
                          : 'text-text-tertiary'
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
                className={`block w-full py-3 px-6 rounded-lg font-inter font-semibold text-center transition-all ${
                  plan.popular
                    ? 'bg-accent text-white hover:bg-accent-dark'
                    : 'bg-bg-secondary text-text-primary hover:bg-accent-light'
                }`}
              >
                {plan.cta}
              </Link>

              {/* Note */}
              {plan.note && (
                <p className="text-center font-inter text-xs text-text-tertiary mt-3">
                  {plan.note}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* FAQ Link */}
        <div className="text-center mt-12">
          <p className="font-inter text-text-secondary">
            Des questions?{' '}
            <Link href="/#faq" className="text-accent hover:underline font-medium">
              Consultez la FAQ
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
