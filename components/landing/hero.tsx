"use client";

import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import { useState, useEffect } from "react";

const screensContent = {
  en: [
    {
      id: "automate",
      title: "Automated email campaigns",
      description:
        "Send feedback requests at perfect timing: D-Day, D+30, D+90",
      href: "#features",
      color: "from-emerald-100 to-emerald-50",
    },
    {
      id: "analyze",
      title: "Analyze your internal processes",
      description: "Real-time dashboard with actionable insights",
      href: "#features",
      color: "from-emerald-50 to-white",
    },
    {
      id: "improve",
      title: "Be proud of your work",
      description: "Display your credibility with embeddable badges",
      href: "/pricing/",
      color: "from-white to-emerald-50",
    },
  ],
  fr: [
    {
      id: "automate",
      title: "Automatisation des emails",
      description: "Envoie de feedbacks au bon moment: J-0, J+30, J+90",
      href: "#features",
      color: "from-emerald-100 to-emerald-50",
    },
    {
      id: "analyze",
      title: "Analyse tes process internes",
      description: "Dashboard temps réel avec insights actionnables",
      href: "#features",
      color: "from-emerald-50 to-white",
    },
    {
      id: "improve",
      title: "Sois fier de ton travail",
      description: "Montre ta crédibilité avec des badges intégrables",
      href: "/pricing/",
      color: "from-white to-emerald-50",
    },
  ],
};

export function Hero() {
  const { text, lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const screens = screensContent[lang];

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-bg-primary overflow-hidden"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="font-sora text-4xl sm:text-5xl lg:text-6xl font-bold text-content-primary leading-tight">
                {text.hero.headline}
              </h1>
              <p className="font-inter text-lg sm:text-xl text-content-secondary leading-relaxed max-w-lg">
                {text.hero.subheadline}
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/auth/signup"
                className="px-8 py-4 bg-[#10B981] text-white rounded-lg font-inter font-semibold hover:bg-[#047857] transition-all hover:scale-105 hover:shadow-md text-center cursor-pointer"
              >
                {text.hero.cta}
              </Link>
              <Link
                href="/pricing"
                className="px-8 py-4 bg-white text-content-primary rounded-lg font-inter font-semibold border-2 border-border hover:bg-gray-50 transition-all text-center cursor-pointer"
              >
                {lang === "fr" ? "Voir les tarifs" : "View pricing"}
              </Link>
            </div>

            {/* Social Proof */}
            <div className="flex items-center gap-2 text-sm text-content-secondary">
              <svg
                className="w-5 h-5 text-green-500"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>
                {lang === "fr"
                  ? "Inscription gratuite • Sans carte bancaire"
                  : "Free signup • No credit card required"}
              </span>
            </div>
          </div>

          {/* Right: Stacked Screens */}
          <div
            className="relative min-h-[400px] flex items-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Floating geometric shapes */}
            <div
              className="hidden md:flex absolute -top-20 -right-32 w-96 h-96 rounded-20 blur-xl z-0 pointer-events-none"
              style={{
                backgroundColor: "#6EDCC6",
                opacity: 0.5,
                animation: "float-fast 8s ease-in-out infinite",
              }}
            />
            <div
              className="absolute -bottom-20 -left-32 w-80 h-80 rounded-full blur-xl z-0 pointer-events-none"
              style={{
                backgroundColor: "#34D399",
                opacity: 0.4,
                animation: "float-fast 10s ease-in-out infinite reverse",
              }}
            />
            <div
              className="hidden lg:flex absolute top-1/3 -right-20 w-48 h-48 rounded-full blur-lg z-0 pointer-events-none"
              style={{
                backgroundColor: "#10B981",
                opacity: 0.3,
                animation: "float-fast 6s ease-in-out infinite",
              }}
            />
            {screens.map((screen, index) => {
              // Calculate position based on activeIndex
              const relativeIndex =
                (index - activeIndex + screens.length) % screens.length;

              return (
                <Link
                  key={screen.id}
                  href={screen.href}
                  className="absolute w-full transition-all duration-700 ease-in-out hover:scale-[1.02] group origin-bottom cursor-pointer"
                  style={{
                    top:
                      relativeIndex === 0
                        ? "48px"
                        : relativeIndex === 1
                        ? "0px"
                        : "-48px",
                    zIndex: screens.length - relativeIndex,
                    transform: `scale(${1 - relativeIndex * 0.05})`,
                    opacity:
                      relativeIndex === 0 ? 1 : relativeIndex === 1 ? 0.8 : 0,
                  }}
                >
                  <div
                    className={`
                    ${
                      relativeIndex === 0
                        ? "bg-white"
                        : `bg-linear-to-br ${screen.color} backdrop-blur-sm`
                    }
                    rounded-2xl
                    border border-white/50
                    shadow-lg
                    p-6
                    h-[400px]
                    transition-all duration-300
                    group-hover:shadow-xl
                    group-hover:border-emerald-500/30
                  `}
                  >
                    {/* Screen Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-error/60"></div>
                        <div className="w-3 h-3 rounded-full bg-warning/60"></div>
                        <div className="w-3 h-3 rounded-full bg-emerald-500/60"></div>
                      </div>
                      <div className="font-inter text-xs text-content-tertiary">
                        ratee.me
                      </div>
                    </div>

                    {/* Screen Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-sora text-2xl font-bold text-content-primary group-hover:text-emerald-500 transition-colors">
                          {screen.title}
                        </h3>
                        <p className="font-inter text-sm text-content-secondary mt-1">
                          {screen.description}
                        </p>
                      </div>

                      {/* Mockup Content */}
                      <div className="space-y-3">
                        {index === 0 && (
                          <>
                            {/* Email Automation Timeline */}
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="font-inter text-[10px] font-semibold text-content-primary mb-3">
                                {lang === "fr"
                                  ? "Campagne email automatisée"
                                  : "Automated email campaign"}
                              </div>

                              {/* Timeline */}
                              <div className="space-y-2">
                                {/* J-0 */}
                                <div className="flex items-start gap-2">
                                  <div className="flex flex-col items-center">
                                    <div className="w-6 h-6 rounded-full bg-emerald-500 flex items-center justify-center">
                                      <svg
                                        className="w-3 h-3 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                      </svg>
                                    </div>
                                    <div className="w-0.5 h-8 bg-emerald-200"></div>
                                  </div>
                                  <div className="flex-1 pt-0.5">
                                    <div className="flex items-center justify-between mb-0.5">
                                      <span className="font-inter text-[9px] font-semibold text-emerald-600">
                                        J-0
                                      </span>
                                      <span className="px-1.5 py-0.5 bg-emerald-100 text-emerald-600 text-[7px] font-semibold rounded">
                                        {lang === "fr" ? "ENVOYÉ" : "SENT"}
                                      </span>
                                    </div>
                                    <div className="font-inter text-[8px] text-content-secondary">
                                      {lang === "fr"
                                        ? "Fin de mission - Demande de feedback"
                                        : "Mission end - Feedback request"}
                                    </div>
                                  </div>
                                </div>

                                {/* J+30 */}
                                <div className="flex items-start gap-2">
                                  <div className="flex flex-col items-center">
                                    <div className="w-6 h-6 rounded-full bg-amber-500 flex items-center justify-center">
                                      <svg
                                        className="w-3 h-3 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                      </svg>
                                    </div>
                                    <div className="w-0.5 h-8 bg-amber-200"></div>
                                  </div>
                                  <div className="flex-1 pt-0.5">
                                    <div className="flex items-center justify-between mb-0.5">
                                      <span className="font-inter text-[9px] font-semibold text-amber-600">
                                        J+30
                                      </span>
                                      <span className="px-1.5 py-0.5 bg-amber-100 text-amber-600 text-[7px] font-semibold rounded">
                                        {lang === "fr"
                                          ? "PLANIFIÉ"
                                          : "SCHEDULED"}
                                      </span>
                                    </div>
                                    <div className="font-inter text-[8px] text-content-secondary">
                                      {lang === "fr"
                                        ? "Suivi - Comment ça se passe ?"
                                        : "Follow-up - How's it going?"}
                                    </div>
                                  </div>
                                </div>

                                {/* J+90 */}
                                <div className="flex items-start gap-2">
                                  <div className="flex flex-col items-center">
                                    <div className="w-6 h-6 rounded-full bg-gray-300 flex items-center justify-center">
                                      <svg
                                        className="w-3 h-3 text-white"
                                        fill="currentColor"
                                        viewBox="0 0 20 20"
                                      >
                                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                                      </svg>
                                    </div>
                                  </div>
                                  <div className="flex-1 pt-0.5">
                                    <div className="flex items-center justify-between mb-0.5">
                                      <span className="font-inter text-[9px] font-semibold text-gray-600">
                                        J+90
                                      </span>
                                      <span className="px-1.5 py-0.5 bg-gray-100 text-gray-600 text-[7px] font-semibold rounded">
                                        {lang === "fr"
                                          ? "EN ATTENTE"
                                          : "PENDING"}
                                      </span>
                                    </div>
                                    <div className="font-inter text-[8px] text-content-secondary">
                                      {lang === "fr"
                                        ? "Relance - Nouveau projet ?"
                                        : "Reminder - New project?"}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>

                            {/* OLD FEEDBACK FORM MOCKUP - COMMENTED OUT
                            <div className="bg-white rounded-lg p-3 border border-gray-200">
                              <div className="text-center mb-3">
                                <div className="font-inter text-[10px] text-content-tertiary mb-1">
                                  {lang === "fr"
                                    ? "Sur une échelle de 0 à 10"
                                    : "On a scale of 0 to 10"}
                                </div>
                                <div className="font-inter text-xs font-medium text-content-primary">
                                  {lang === "fr"
                                    ? "Recommanderiez-vous nos services ?"
                                    : "How likely are you to recommend us?"}
                                </div>
                              </div>
                              <div className="flex gap-0.5 mb-3">
                                {[...Array(11)].map((_, i) => (
                                  <div
                                    key={i}
                                    className={`flex-1 h-7 rounded text-[9px] flex items-center justify-center font-bold transition-all ${
                                      i === 9
                                        ? "bg-emerald-500 text-white scale-110 shadow-sm"
                                        : i === 10
                                        ? "bg-emerald-100 text-emerald-600"
                                        : i >= 7
                                        ? "bg-amber-100 text-amber-600"
                                        : "bg-gray-100 text-gray-400"
                                    }`}
                                  >
                                    {i}
                                  </div>
                                ))}
                              </div>
                              <div className="bg-gray-50 rounded p-2 mb-2">
                                <div className="font-inter text-[9px] text-content-tertiary italic">
                                  {lang === "fr"
                                    ? '"Service excellent, très réactif..."'
                                    : '"Excellent service, very responsive..."'}
                                </div>
                              </div>
                              <div className="h-7 bg-emerald-500 rounded flex items-center justify-center cursor-pointer hover:bg-emerald-600 transition-colors">
                                <span className="font-inter text-[10px] text-white font-semibold">
                                  {lang === "fr"
                                    ? "Envoyer mon avis"
                                    : "Submit Feedback"}
                                </span>
                              </div>
                            </div>
                            */}
                          </>
                        )}
                        {index === 1 && (
                          <>
                            {/* Dashboard Stats Mockup */}
                            <div className="grid grid-cols-2 gap-2 mb-2">
                              <div className="bg-white rounded-lg p-2 border border-gray-200">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-inter text-[8px] text-content-tertiary">
                                      {lang === "fr" ? "Projets" : "Projects"}
                                    </div>
                                    <div className="font-sora text-base font-bold text-content-primary">
                                      12
                                    </div>
                                  </div>
                                  <div className="w-5 h-5 bg-blue-100 rounded flex items-center justify-center">
                                    <svg
                                      className="w-3 h-3 text-blue-600"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                                      />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                              <div className="bg-white rounded-lg p-2 border border-gray-200">
                                <div className="flex items-center justify-between">
                                  <div>
                                    <div className="font-inter text-[8px] text-content-tertiary">
                                      NPS
                                    </div>
                                    <div className="font-sora text-base font-bold text-emerald-500">
                                      8.7
                                    </div>
                                  </div>
                                  <div className="w-5 h-5 bg-emerald-500/10 rounded flex items-center justify-center">
                                    <svg
                                      className="w-3 h-3 text-emerald-500"
                                      fill="currentColor"
                                      viewBox="0 0 20 20"
                                    >
                                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                    </svg>
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* NPS Distribution */}
                            <div className="bg-white rounded-lg p-2 border border-gray-200">
                              <div className="font-inter text-[8px] text-content-tertiary mb-2">
                                {lang === "fr"
                                  ? "Distribution NPS"
                                  : "NPS Distribution"}
                              </div>
                              <div className="flex items-center gap-2">
                                <div className="flex-1">
                                  <div className="flex h-3 rounded-full overflow-hidden">
                                    <div className="bg-emerald-500 w-[65%]"></div>
                                    <div className="bg-warning w-[25%]"></div>
                                    <div className="bg-error w-[10%]"></div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex justify-between mt-1">
                                <span className="font-inter text-[7px] text-emerald-500 font-medium">
                                  18 {lang === "fr" ? "clients" : "clients"}
                                </span>
                                <span className="font-inter text-[7px] text-warning font-medium">
                                  6 {lang === "fr" ? "passifs" : "passives"}
                                </span>
                                <span className="font-inter text-[7px] text-error font-medium">
                                  2{" "}
                                  {lang === "fr" ? "détracteurs" : "detractors"}
                                </span>
                              </div>
                            </div>
                            {/* Recent Feedback */}
                            <div className="bg-white rounded-lg p-2 border border-gray-200">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5">
                                  <div className="w-4 h-4 bg-gray-200 rounded-full"></div>
                                  <span className="font-inter text-[8px] font-medium">
                                    Hugo D.
                                  </span>
                                </div>
                                <span className="px-1.5 py-0.5 bg-emerald-500/10 text-emerald-500 text-[8px] font-bold rounded">
                                  9/10
                                </span>
                              </div>
                            </div>
                          </>
                        )}
                        {index === 2 && (
                          <div className="bg-gray-50 rounded-lg overflow-hidden border border-gray-200">
                            {/* Browser Chrome */}
                            <div className="bg-gray-100 px-2 py-1.5 flex items-center gap-1.5 border-b border-gray-200">
                              <div className="flex gap-1">
                                <div className="w-1.5 h-1.5 rounded-full bg-red-400" />
                                <div className="w-1.5 h-1.5 rounded-full bg-yellow-400" />
                                <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                              </div>
                              <div className="flex-1 ml-2">
                                <div className="bg-white rounded px-2 py-0.5 text-[7px] text-gray-500 max-w-[120px]">
                                  {lang === "fr"
                                    ? "tonsite.com"
                                    : "yourwebsite.com"}
                                </div>
                              </div>
                            </div>

                            {/* Website Content */}
                            <div className="bg-gradient-to-br from-gray-50 to-white p-3">
                              <div className="grid grid-cols-2 gap-3 items-center">
                                {/* Left: Hero Content */}
                                <div>
                                  <div className="inline-block px-1.5 py-0.5 bg-emerald-100 text-emerald-700 rounded-full text-[7px] font-medium mb-1">
                                    {lang === "fr"
                                      ? "Développeur Freelance"
                                      : "Freelance Developer"}
                                  </div>
                                  <h3 className="font-sora text-[10px]! font-bold text-gray-900 mb-1">
                                    {lang === "fr"
                                      ? "Je crée des solutions web"
                                      : "I build web solutions"}
                                  </h3>
                                  <p className="text-[7px] text-gray-600 mb-2 leading-tight">
                                    {lang === "fr"
                                      ? "Expert en développement web moderne."
                                      : "Expert in modern web development."}
                                  </p>
                                  <div className="flex gap-1">
                                    <div className="px-2 py-1 bg-emerald-600 text-white rounded text-[6px] font-medium">
                                      {lang === "fr"
                                        ? "Me contacter"
                                        : "Contact me"}
                                    </div>
                                    <div className="px-2 py-1 bg-white border border-gray-300 text-gray-700 rounded text-[6px] font-medium">
                                      {lang === "fr"
                                        ? "Mes projets"
                                        : "My projects"}
                                    </div>
                                  </div>
                                </div>

                                {/* Right: NPS Badge */}
                                <div className="flex justify-end">
                                  <div className="inline-block">
                                    {/* Badge Container with glow effect */}
                                    <div className="relative">
                                      {/* Glow effect */}
                                      <div className="absolute inset-0 bg-emerald-400/20 blur-lg rounded-md" />

                                      {/* Badge */}
                                      <div className="relative bg-white border border-emerald-500 rounded-md p-2 shadow-md max-w-[90px]">
                                        <div className="text-center">
                                          <div className="text-[6px] text-gray-600 mb-0.5 font-medium">
                                            {lang === "fr"
                                              ? "Satisfaction clients"
                                              : "Client satisfaction"}
                                          </div>
                                          <div className="text-2xl font-bold text-emerald-600 mb-0.5">
                                            9.2
                                          </div>
                                          <div className="text-[5px] text-gray-500 mb-1">
                                            {lang === "fr"
                                              ? "Note NPS"
                                              : "NPS score"}
                                          </div>
                                          <div className="text-[6px] text-gray-600 font-medium mb-1">
                                            {lang === "fr"
                                              ? "24 clients"
                                              : "24 clients"}
                                          </div>
                                          <div className="pt-1 border-t border-gray-200">
                                            <div className="flex items-center justify-center gap-0.5 text-[5px] text-gray-400">
                                              <svg
                                                className="w-1.5 h-1.5"
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
                                                  ? "ratee.me"
                                                  : "ratee.me"}
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
                        )}
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-inter text-xs text-emerald-500 font-medium">
                        {lang === "fr" ? "En savoir plus →" : "Learn more →"}
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
