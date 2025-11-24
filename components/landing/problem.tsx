"use client";

import { useLanguage } from "@/lib/i18n";
import { useState, useEffect } from "react";

// Screen content for each accordion item
const screensContent = {
  fr: {
    automation: {
      title: "Automatisation des feedbacks",
      stages: ["Onboarding", "En cours", "Livraison"],
    },
    badge: {
      title: "Badge NPS",
      score: "8.7",
      label: "Score NPS",
    },
    dashboard: {
      title: "Clients satisfaits",
      clients: [
        { name: "Studio Créatif", nps: 10, status: "Promoteur" },
        { name: "Agence Digital", nps: 9, status: "Promoteur" },
        { name: "Startup Tech", nps: 8, status: "Passif" },
      ],
    },
    analytics: {
      title: "Tendances NPS",
      months: ["Jan", "Fév", "Mar", "Avr"],
    },
  },
  en: {
    automation: {
      title: "Feedback Automation",
      stages: ["Onboarding", "In Progress", "Delivery"],
    },
    badge: {
      title: "NPS Badge",
      score: "8.7",
      label: "NPS Score",
    },
    dashboard: {
      title: "Satisfied Clients",
      clients: [
        { name: "Creative Studio", nps: 10, status: "Promoter" },
        { name: "Digital Agency", nps: 9, status: "Promoter" },
        { name: "Tech Startup", nps: 8, status: "Passive" },
      ],
    },
    analytics: {
      title: "NPS Trends",
      months: ["Jan", "Feb", "Mar", "Apr"],
    },
  },
};

export function Problem() {
  const { text, lang } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const screens = screensContent[lang as keyof typeof screensContent];

  // Auto-cycle through items with progress bar
  useEffect(() => {
    const duration = 5000; // 5 seconds per item
    const interval = 50; // Update progress every 50ms
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          setActiveIndex(
            (current) => (current + 1) % text.problem.issues.length
          );
          return 0;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [text.problem.issues.length]);

  // Reset progress when manually clicking
  const handleItemClick = (index: number) => {
    setActiveIndex(index);
    setProgress(0);
  };

  const renderScreen = (screenType: string) => {
    switch (screenType) {
      case "automation":
        return (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="text-sm font-semibold text-gray-900 mb-4">
              {screens.automation.title}
            </div>
            <div className="space-y-3">
              {screens.automation.stages.map((stage, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                        i <= 1
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {i + 1}
                    </div>
                    <span className="text-sm text-gray-700">{stage}</span>
                  </div>
                  {i <= 1 && (
                    <svg
                      className="w-5 h-5 text-emerald-500"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-emerald-50 rounded-lg border border-emerald-100">
              <div className="text-xs text-emerald-700 font-medium">
                {lang === "fr"
                  ? "Feedback envoyé automatiquement"
                  : "Feedback sent automatically"}
              </div>
            </div>
          </div>
        );

      case "badge":
        return (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="text-sm font-semibold text-gray-900 mb-4">
              {screens.badge.title}
            </div>
            <div className="flex flex-col items-center py-6">
              <div className="w-32 h-32 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">
                    {screens.badge.score}
                  </div>
                  <div className="text-xs text-emerald-100">
                    {screens.badge.label}
                  </div>
                </div>
              </div>
              <div className="mt-4 px-4 py-2 bg-gray-100 rounded-lg">
                <code className="text-xs text-gray-600">
                  {'<embed src="ratee.me/badge/..." />'}
                </code>
              </div>
            </div>
          </div>
        );

      case "dashboard":
        return (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="text-sm font-semibold text-gray-900 mb-4">
              {screens.dashboard.title}
            </div>
            <div className="space-y-3">
              {screens.dashboard.clients.map((client, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div>
                    <div className="text-sm font-medium text-gray-900">
                      {client.name}
                    </div>
                    <div className="text-xs text-gray-500">{client.status}</div>
                  </div>
                  <div
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      client.nps >= 9
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-amber-100 text-amber-700"
                    }`}
                  >
                    {client.nps}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case "analytics":
        return (
          <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100">
            <div className="text-sm font-semibold text-gray-900 mb-4">
              {screens.analytics.title}
            </div>
            <div className="h-40 flex items-end justify-between gap-2 px-2">
              {[65, 72, 78, 85].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center">
                  <div
                    className="w-full bg-gradient-to-t from-emerald-500 to-emerald-400 rounded-t-md"
                    style={{ height: `${height}%` }}
                  />
                  <div className="text-xs text-gray-500 mt-2">
                    {screens.analytics.months[i]}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <span className="text-xs text-emerald-600 font-medium">
                +20% {lang === "fr" ? "ce trimestre" : "this quarter"}
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-primary">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {text.problem.title}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {text.problem.subtitle}
          </p>
        </div>

        {/* Accordion + Screen Layout */}
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Accordion Items */}
          <div className="space-y-4">
            {text.problem.issues.map((issue, index) => (
              <div
                key={index}
                onClick={() => handleItemClick(index)}
                className={`relative cursor-pointer rounded-xl transition-all duration-300 ${
                  activeIndex === index
                    ? "bg-white shadow-md border border-gray-100"
                    : "hover:bg-white/50"
                }`}
              >
                {/* Progress bar for active item */}
                {activeIndex === index && (
                  <div className="absolute rounded-l-xl -left-0.5 top-1 bottom-1 w-1 bg-gray-200 overflow-hidden">
                    <div
                      className="w-full bg-emerald-500 transition-all duration-75 ease-linear"
                      style={{ height: `${progress}%` }}
                    />
                  </div>
                )}

                <div className="p-5 pl-6">
                  <div className="flex items-start gap-4">
                    <div
                      className={`text-lg flex-shrink-0 ${
                        activeIndex === index ? "" : "opacity-60"
                      }`}
                    >
                      {issue.icon}
                    </div>
                    <div>
                      <h3
                        className={`text-xl! font-semibold mb-1 transition-colors ${
                          activeIndex === index
                            ? "text-gray-900"
                            : "text-gray-600"
                        }`}
                      >
                        {issue.title}
                      </h3>
                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          activeIndex === index
                            ? "max-h-40 opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <p className="text-sm text-gray-600 leading-relaxed">
                          {issue.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Screen Display */}
          <div className="lg:sticky lg:top-24">
            <div className="relative">
              {text.problem.issues.map((issue, index) => (
                <div
                  key={index}
                  className={`transition-all duration-500 ${
                    activeIndex === index
                      ? "opacity-100 translate-y-0"
                      : "opacity-0 translate-y-4 absolute inset-0 pointer-events-none"
                  }`}
                >
                  {renderScreen(issue.screen)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
