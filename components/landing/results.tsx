"use client";

import { useLanguage } from "@/lib/i18n";

export function Results() {
  const { text, lang } = useLanguage();

  return (
    <section
      id="results"
      className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-emerald-50"
    >
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {lang === "fr"
              ? "Sois fier de ton travail 💪"
              : "Be proud of your work 💪"}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {lang === "fr"
              ? "Affiche ton badge NPS sur ton site pour rassurer tes futurs clients"
              : "Display your NPS badge on your website to reassure future clients"}
          </p>
        </div>

        {/* Website Mockup with Badge */}
        <div className="mb-16">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden border border-gray-200">
            {/* Browser Chrome */}
            <div className="bg-gray-100 px-4 py-3 flex items-center gap-2 border-b border-gray-200">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
              </div>
              <div className="flex-1 ml-4">
                <div className="bg-white rounded px-3 py-1 text-xs text-gray-500 max-w-md">
                  {lang === "fr" ? "tonsite.com" : "yourwebsite.com"}
                </div>
              </div>
            </div>

            {/* Website Content */}
            <div className="bg-linear-to-br from-gray-50 to-white p-8 sm:p-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                {/* Left: Hero Content */}
                <div>
                  <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-medium mb-4">
                    {lang === "fr"
                      ? "Développeur Freelance"
                      : "Freelance Developer"}
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4 font-sora">
                    {lang === "fr"
                      ? "Je crée des solutions web"
                      : "I build web solutions"}
                  </h1>
                  <p className="text-gray-600 mb-6 leading-relaxed">
                    {lang === "fr"
                      ? "Expert en développement web moderne. React, Next.js, Node.js."
                      : "Expert in modern web development. React, Next.js, Node.js."}
                  </p>
                  <div className="flex gap-3">
                    <div className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium">
                      {lang === "fr" ? "Me contacter" : "Contact me"}
                    </div>
                    <div className="px-4 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg text-sm font-medium">
                      {lang === "fr" ? "Mes projets" : "My projects"}
                    </div>
                  </div>
                </div>

                {/* Right: NPS Badge */}
                <div className="flex justify-center lg:justify-end">
                  <div className="inline-block">
                    {/* Badge Container with glow effect */}
                    <div className="relative">
                      {/* Glow effect */}
                      <div className="absolute inset-0 bg-emerald-400/20 blur-xl rounded-lg" />

                      {/* Badge */}
                      <div className="relative bg-white border-2 border-emerald-500 rounded-lg p-6 shadow-lg max-w-[280px]">
                        <div className="text-center">
                          <div className="text-sm text-gray-600 mb-2 font-medium">
                            {lang === "fr"
                              ? "Satisfaction clients"
                              : "Client satisfaction"}
                          </div>
                          <div className="text-6xl font-bold text-emerald-600 mb-1">
                            9.2
                          </div>
                          <div className="text-xs text-gray-500 mb-4">
                            {lang === "fr"
                              ? "Note NPS moyenne"
                              : "Average NPS score"}
                          </div>
                          <div className="text-sm text-gray-600 font-medium mb-4">
                            {lang === "fr"
                              ? "24 clients satisfaits"
                              : "24 satisfied clients"}
                          </div>
                          <div className="pt-4 border-t border-gray-200">
                            <div className="flex items-center justify-center gap-1 text-xs text-gray-400">
                              <svg
                                className="w-3 h-3"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                  clipRule="evenodd"
                                />
                              </svg>
                              <span>
                                {lang === "fr"
                                  ? "Certifié ratee.me"
                                  : "Certified by ratee.me"}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Caption */}
          <p className="text-center text-sm text-gray-500 mt-6 italic">
            {lang === "fr"
              ? "Ton badge NPS s'intègre parfaitement à ton site web"
              : "Your NPS badge integrates perfectly into your website"}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {text.results.stats.map((stat, index) => (
            <div
              key={index}
              className="relative bg-white rounded-2xl p-8 shadow-md border border-emerald-100 text-center hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden"
            >
              {/* Subtle accent decoration */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />

              <div className="mb-4">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-5xl font-bold text-emerald-600">
                    {stat.number}
                  </span>
                  {"unit" in stat && stat.unit && (
                    <span className="text-lg font-medium text-emerald-500">
                      {stat.unit}
                    </span>
                  )}
                </div>
              </div>

              <h3 className="text-xl! font-semibold text-gray-900 mb-2"></h3>

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
