'use client';

import { useLanguage } from '@/lib/i18n';
import Link from 'next/link';

export function CTAFinal() {
  const { text } = useLanguage();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl sm:text-5xl font-bold text-white mb-6">
          {text.ctaFinal.headline}
        </h2>

        <p className="text-xl text-blue-100 mb-10">
          {text.ctaFinal.subheadline}
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <Link
            href="/signup"
            className="px-10 py-4 bg-white text-primary rounded-lg font-bold text-lg hover:bg-gray-100 transition-all hover:scale-105 shadow-2xl"
          >
            {text.ctaFinal.ctaPrimary}
          </Link>
          <button
            className="px-10 py-4 bg-transparent text-white rounded-lg font-bold text-lg border-2 border-white hover:bg-white hover:text-primary transition-all"
          >
            {text.ctaFinal.ctaSecondary}
          </button>
        </div>

        <div className="flex flex-wrap justify-center gap-6 text-blue-100">
          {text.ctaFinal.microcopy.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
