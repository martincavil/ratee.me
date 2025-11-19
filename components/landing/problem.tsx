'use client';

import { useLanguage } from '@/lib/i18n';

export function Problem() {
  const { text, lang } = useLanguage();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left: Problem Icons */}
          <div className="space-y-8">
            {text.problem.issues.map((issue, index) => (
              <div
                key={index}
                className="flex gap-4 items-start p-6 bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="text-4xl flex-shrink-0">{issue.icon}</div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {issue.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {issue.description}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Problem Description */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              {text.problem.title}
            </h2>

            <div className="space-y-4">
              {text.problem.description.map((paragraph, index) => (
                <p key={index} className="text-lg text-gray-600 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="pt-6 border-t border-gray-200">
              <p className="text-gray-500 italic">
                {lang === 'fr'
                  ? "Son familier? C'est exactement pour ça qu'on a créé ratee.me."
                  : "Sound familiar? That's exactly why we built ratee.me."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
