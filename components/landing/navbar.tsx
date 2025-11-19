'use client';

import { useLanguage } from '@/lib/i18n';
import Link from 'next/link';
import { useState } from 'react';

export function LandingNavbar() {
  const { lang, setLang, text } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="text-2xl font-bold text-gray-900">
            ratee.me
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              {text.nav.features}
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              {text.nav.pricing}
            </a>
            <a href="#demo" className="text-gray-600 hover:text-gray-900 font-medium transition-colors">
              {text.nav.demo}
            </a>

            {/* Language toggle */}
            <div className="flex items-center gap-1 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setLang('fr')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  lang === 'fr'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🇫🇷 FR
              </button>
              <button
                onClick={() => setLang('en')}
                className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
                  lang === 'en'
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                🇺🇸 EN
              </button>
            </div>

            <Link
              href="/login"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
            >
              {text.nav.login}
            </Link>

            <Link
              href="/signup"
              className="px-5 py-2 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all hover:scale-105"
            >
              {text.nav.signup}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6 text-gray-900"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col gap-4">
              <a
                href="#features"
                className="text-gray-600 hover:text-gray-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {text.nav.features}
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-gray-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {text.nav.pricing}
              </a>
              <a
                href="#demo"
                className="text-gray-600 hover:text-gray-900 font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                {text.nav.demo}
              </a>

              <div className="pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => {
                      setLang('fr');
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      lang === 'fr'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    🇫🇷 Français
                  </button>
                  <button
                    onClick={() => {
                      setLang('en');
                      setMobileMenuOpen(false);
                    }}
                    className={`px-4 py-2 rounded-lg text-sm font-medium ${
                      lang === 'en'
                        ? 'bg-primary text-white'
                        : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    🇺🇸 English
                  </button>
                </div>

                <Link
                  href="/login"
                  className="block w-full px-5 py-3 bg-gray-100 text-gray-900 text-center rounded-lg font-semibold mb-3"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {text.nav.login}
                </Link>

                <Link
                  href="/signup"
                  className="block w-full px-5 py-3 bg-primary text-white text-center rounded-lg font-semibold"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {text.nav.signup}
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
