'use client';

import { useLanguage } from '@/lib/i18n';

export function HowItWorks() {
  const { text } = useLanguage();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {text.howItWorks.title}
          </h2>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 sm:p-12 border-2 border-blue-200 shadow-lg">
          <div className="space-y-6">
            {text.howItWorks.steps.map((step, index) => (
              <div key={index} className="flex gap-4 items-start">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg shadow-md">
                  {index + 1}
                </div>
                <p className="text-lg text-gray-700 leading-relaxed pt-1.5">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
