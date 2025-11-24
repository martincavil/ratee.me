"use client";

import { useLanguage } from "@/lib/i18n";

export function Results() {
  const { text } = useLanguage();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-emerald-50">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {text.results.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {text.results.stats.map((stat, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-lg border border-emerald-100 text-center hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden"
            >
              {/* Subtle accent decoration */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />

              <div className="mb-4">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-emerald-600">
                    {stat.number}
                  </span>
                  {stat.unit && (
                    <span className="text-lg font-medium text-emerald-500">
                      {stat.unit}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {stat.heading}
              </h3>

              <p className="text-sm text-gray-600 leading-relaxed">
                {stat.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
