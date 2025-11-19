'use client';

import { useLanguage } from '@/lib/i18n';

export function Solution() {
  const { text, lang } = useLanguage();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {text.solution.title}
          </h2>
        </div>

        {/* Timeline - Horizontal on desktop, vertical on mobile */}
        <div className="relative">
          {/* Connection Line - Hidden on mobile */}
          <div className="hidden lg:block absolute top-24 left-0 right-0 h-1 bg-gradient-to-r from-blue-200 via-blue-400 to-blue-600"></div>

          {/* Steps */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 lg:gap-4 relative">
            {text.solution.steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Mobile connector */}
                {index < text.solution.steps.length - 1 && (
                  <div className="lg:hidden absolute left-12 top-24 bottom-0 w-1 bg-blue-300 -mb-8"></div>
                )}

                <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-all hover:-translate-y-1 relative z-10">
                  {/* Icon with number */}
                  <div className="flex items-center justify-center w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-4xl shadow-lg">
                    {step.icon}
                  </div>

                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold text-sm shadow-md">
                    {index + 1}
                  </div>

                  <h3 className="text-xl font-semibold text-gray-900 mb-3 text-center">
                    {step.heading}
                  </h3>

                  <p className="text-gray-600 leading-relaxed text-center">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500">
            {lang === 'fr'
              ? '4 étapes simples. Zéro complexité. Maximum de résultats.'
              : '4 simple steps. Zero complexity. Maximum results.'}
          </p>
        </div>
      </div>
    </section>
  );
}
