'use client';

import { useLanguage } from '@/lib/i18n';
import Link from 'next/link';

export function Hero() {
  const { text, lang } = useLanguage();

  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                {text.hero.headline}
              </h1>
              <p className="text-xl sm:text-2xl text-gray-600 leading-relaxed">
                {text.hero.subheadline}
              </p>
            </div>

            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl">
              {text.hero.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/signup"
                className="px-8 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary/90 transition-all hover:scale-105 hover:shadow-lg text-center"
              >
                {text.hero.cta}
              </Link>
              <button
                className="px-8 py-4 bg-white text-gray-900 rounded-lg font-semibold text-lg border-2 border-gray-300 hover:border-gray-400 transition-all hover:shadow-md text-center"
              >
                {text.hero.ctaSecondary}
              </button>
            </div>

            <div className="flex flex-wrap gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Setup 15 min</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{lang === 'fr' ? 'Gratuit pour commencer' : 'Free to start'}</span>
              </div>
              <div className="flex items-center gap-2">
                <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>{lang === 'fr' ? 'Pas de CB requise' : 'No credit card'}</span>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 shadow-2xl border border-gray-200">
              {/* Dashboard Preview Mockup */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Navbar mockup */}
                <div className="bg-gray-900 px-4 py-3 flex items-center justify-between">
                  <div className="text-white font-bold text-sm">ratee.me</div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                </div>

                {/* Content mockup */}
                <div className="p-6 space-y-4">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="text-3xl font-bold text-primary">8.4</div>
                      <div className="text-xs text-gray-600 mt-1">Average NPS</div>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="text-3xl font-bold text-green-600">24</div>
                      <div className="text-xs text-gray-600 mt-1">Feedbacks</div>
                    </div>
                  </div>

                  {/* Projects List Mockup */}
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                          i === 1 ? 'bg-green-100 text-green-700' :
                          i === 2 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {i === 1 ? '9.2' : i === 2 ? '7.8' : '8.5'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -right-4 -bottom-4 bg-white rounded-lg shadow-xl border-2 border-primary p-4 transform rotate-3">
                <div className="text-center">
                  <div className="text-xs text-gray-500">Client Satisfaction</div>
                  <div className="text-4xl font-bold text-primary">8.4</div>
                  <div className="text-xs text-gray-400">NPS Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
