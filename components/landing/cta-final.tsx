"use client";

import { useLanguage } from "@/lib/i18n";
import Link from "next/link";

export function CTAFinal() {
  const { text } = useLanguage();

  return (
    <section className="md:py-20 md:px-4 lg:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <div className="relative bg-linear-to-br from-emerald-500 to-emerald-600 md:rounded-3xl p-10 md:p-16 text-center overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white! mb-4 leading-tight">
              {text.ctaFinal.headline}
            </h2>

            <p className="text-emerald-100! mb-8 max-w-2xl mx-auto">
              {text.ctaFinal.subheadline}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="#waitlist"
                className="px-8 py-3 bg-white text-emerald-600 rounded-lg font-semibold hover:bg-gray-100 transition-all hover:scale-105 shadow-lg cursor-pointer"
              >
                {text.ctaFinal.ctaPrimary}
              </Link>
              <Link
                href="/pricing/"
                className="px-8 py-3 bg-transparent text-white rounded-lg font-semibold border-2 border-white/50 hover:bg-white/10 transition-all cursor-pointer"
              >
                {text.ctaFinal.ctaSecondary}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
