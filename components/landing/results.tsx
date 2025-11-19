'use client';

import { useLanguage } from '@/lib/i18n';

export function Results() {
  const { text } = useLanguage();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-blue-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {text.results.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {text.results.stats.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-8 shadow-xl border-2 border-gray-100 text-center hover:border-primary transition-all hover:scale-105"
            >
              <div className="mb-4">
                <div className="flex items-baseline justify-center gap-2">
                  <span className="text-5xl sm:text-6xl font-bold text-primary">
                    {stat.number}
                  </span>
                  {stat.unit && (
                    <span className="text-2xl font-semibold text-gray-500">
                      {stat.unit}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {stat.heading}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
