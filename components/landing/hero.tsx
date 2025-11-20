"use client";

import { useLanguage } from "@/lib/i18n";
import { WaitlistForm } from "./waitlist-form";
import Link from "next/link";
import { useState, useEffect } from "react";

export function Hero() {
  const { text } = useLanguage();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % 3);
    }, 4000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const screens = [
    {
      id: "collect",
      title: "Collectez",
      description: "Envoyez des enquêtes NPS personnalisées",
      href: "#features",
      color: "from-accent-100 to-accent-50",
    },
    {
      id: "analyze",
      title: "Analysez",
      description: "Visualisez vos scores en temps réel",
      href: "#demo",
      color: "from-accent-50 to-white",
    },
    {
      id: "improve",
      title: "Améliorez",
      description: "Identifiez les axes d'amélioration",
      href: "#pricing",
      color: "from-white to-accent-50",
    },
  ];

  return (
    <section className="min-h-screen flex items-center pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-bg-primary">
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

            {/* Waitlist Form */}
            <WaitlistForm />
          </div>

          {/* Right: Stacked Screens */}
          <div
            className="relative min-h-[400px] flex items-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Floating geometric shapes */}
            <div
              className="absolute -top-20 -right-32 w-96 h-96 rounded-20 blur-xl z-0 pointer-events-none"
              style={{
                backgroundColor: "#6EDCC6",
                opacity: 0.5,
                animation: "float-slow 8s ease-in-out infinite",
              }}
            />
            <div
              className="absolute -bottom-20 -left-32 w-80 h-80 rounded-full blur-xl z-0 pointer-events-none"
              style={{
                backgroundColor: "#34D399",
                opacity: 0.4,
                animation: "float-slow 10s ease-in-out infinite reverse",
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
                  className="absolute w-full transition-all duration-700 ease-in-out hover:scale-[1.02] group origin-bottom"
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
                        : `bg-gradient-to-br ${screen.color} backdrop-blur-sm`
                    }
                    rounded-2xl
                    border border-white/50
                    shadow-xl
                    p-6
                    h-[280px]
                    transition-all duration-300
                    group-hover:shadow-2xl
                    group-hover:border-accent/30
                  `}
                  >
                    {/* Screen Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-error/60"></div>
                        <div className="w-3 h-3 rounded-full bg-warning/60"></div>
                        <div className="w-3 h-3 rounded-full bg-accent/60"></div>
                      </div>
                      <div className="font-inter text-xs text-content-tertiary">
                        ratee.me
                      </div>
                    </div>

                    {/* Screen Content */}
                    <div className="space-y-4">
                      <div>
                        <h3 className="font-sora text-2xl font-bold text-content-primary group-hover:text-accent transition-colors">
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
                            <div className="h-3 bg-white/80 rounded w-3/4"></div>
                            <div className="h-3 bg-white/60 rounded w-1/2"></div>
                            <div className="h-10 bg-accent/20 rounded-lg mt-4"></div>
                          </>
                        )}
                        {index === 1 && (
                          <div className="flex items-end gap-2 h-24">
                            {[40, 65, 45, 80, 55, 70].map((h, i) => (
                              <div
                                key={i}
                                className="flex-1 bg-accent/40 rounded-t"
                                style={{ height: `${h}%` }}
                              />
                            ))}
                          </div>
                        )}
                        {index === 2 && (
                          <div className="grid grid-cols-2 gap-3">
                            <div className="bg-white/80 rounded-lg p-3">
                              <div className="font-sora text-xl font-bold text-accent">
                                +12%
                              </div>
                              <div className="font-inter text-xs text-content-tertiary">
                                ce mois
                              </div>
                            </div>
                            <div className="bg-white/80 rounded-lg p-3">
                              <div className="font-sora text-xl font-bold text-content-primary">
                                85
                              </div>
                              <div className="font-inter text-xs text-content-tertiary">
                                NPS
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Hover indicator */}
                    <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="font-inter text-xs text-accent font-medium">
                        En savoir plus →
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
