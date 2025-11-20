'use client';

import { useLanguage } from '@/lib/i18n';
import { WaitlistForm } from './waitlist-form';

export function Hero() {
  const { text } = useLanguage();

  return (
    <section className="min-h-screen flex items-center pt-20 pb-16 px-4 sm:px-6 lg:px-8 bg-bg-primary">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="font-sora text-4xl sm:text-5xl lg:text-6xl font-bold text-text-primary leading-tight">
                {text.hero.headline}
              </h1>
              <p className="font-inter text-xl sm:text-2xl text-text-secondary leading-relaxed">
                {text.hero.subheadline}
              </p>
            </div>

            <p className="font-inter text-lg text-text-tertiary leading-relaxed max-w-2xl">
              {text.hero.description}
            </p>

            {/* Waitlist Form */}
            <WaitlistForm />
          </div>

          {/* Right: Visual */}
          <div className="relative">
            <div className="bg-gradient-to-br from-accent-100 to-accent-50 rounded-2xl p-8 shadow-2xl border border-border">
              {/* Dashboard Preview Mockup */}
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                {/* Navbar mockup */}
                <div className="bg-text-primary px-4 py-3 flex items-center justify-between">
                  <div className="text-white font-sora font-bold text-sm">ratee.me</div>
                  <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-error"></div>
                    <div className="w-3 h-3 rounded-full bg-warning"></div>
                    <div className="w-3 h-3 rounded-full bg-accent"></div>
                  </div>
                </div>

                {/* Content mockup */}
                <div className="p-6 space-y-4">
                  {/* Stats Cards */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-accent-50 border border-accent-200 rounded-lg p-4">
                      <div className="font-sora text-3xl font-bold text-accent">8.4</div>
                      <div className="font-inter text-xs text-text-secondary mt-1">Average NPS</div>
                    </div>
                    <div className="bg-accent-100 border border-accent-200 rounded-lg p-4">
                      <div className="font-sora text-3xl font-bold text-accent-700">24</div>
                      <div className="font-inter text-xs text-text-secondary mt-1">Feedbacks</div>
                    </div>
                  </div>

                  {/* Projects List Mockup */}
                  <div className="space-y-2">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="flex items-center gap-3 p-3 bg-bg-secondary rounded-lg">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent-400 to-accent-600"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-gray-300 rounded w-3/4 mb-2"></div>
                          <div className="h-2 bg-gray-200 rounded w-1/2"></div>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-inter font-medium ${
                          i === 1 ? 'bg-accent-100 text-accent-700' :
                          i === 2 ? 'bg-warning-light text-warning' :
                          'bg-accent-50 text-accent-600'
                        }`}>
                          {i === 1 ? '9.2' : i === 2 ? '7.8' : '8.5'}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -right-4 -bottom-4 bg-white rounded-lg shadow-xl border-2 border-accent p-4 transform rotate-3">
                <div className="text-center">
                  <div className="font-inter text-xs text-text-tertiary">Client Satisfaction</div>
                  <div className="font-sora text-4xl font-bold text-accent">8.4</div>
                  <div className="font-inter text-xs text-text-tertiary">NPS Score</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
