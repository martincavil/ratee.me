"use client";

import { useLanguage } from "@/lib/i18n";
import { useEffect, useRef, useState } from "react";

export function Timeline() {
  const { text } = useLanguage();
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set());
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    itemRefs.current.forEach((ref, index) => {
      if (!ref) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setVisibleItems((prev) => new Set([...prev, index]));
            }
          });
        },
        { threshold: 0.3, rootMargin: "0px 0px -100px 0px" }
      );

      observer.observe(ref);
      observers.push(observer);
    });

    return () => {
      observers.forEach((obs) => obs.disconnect());
    };
  }, []);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {text.timeline.title}
          </h2>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 top-0 bottom-0 bg-gradient-to-b from-emerald-200 via-emerald-500 to-emerald-200 hidden md:block" />

          {/* Items */}
          <div className="space-y-8 md:space-y-12">
            {text.timeline.items.map((item, index) => {
              const isLeft = index % 2 === 0;
              const isVisible = visibleItems.has(index);

              return (
                <div
                  key={index}
                  ref={(el) => {
                    itemRefs.current[index] = el;
                  }}
                  className={`relative md:flex md:items-center md:min-h-[200px] ${
                    isLeft ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Card */}
                  <div
                    className={`w-full md:w-[calc(50%-2rem)] transition-all duration-700 ease-out ${
                      isVisible
                        ? "opacity-100 translate-x-0"
                        : isLeft
                        ? "opacity-0 -translate-x-8"
                        : "opacity-0 translate-x-8"
                    }`}
                  >
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 hover:shadow-xl hover:border-emerald-500/30 transition-all">
                      <div className="flex items-start gap-4">
                        <div className="text-lg flex-shrink-0">{item.icon}</div>
                        <div>
                          <h3 className="text-xl! font-semibold text-gray-900 mb-2">
                            {item.title}
                          </h3>
                          <p className="text-sm text-gray-600 leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Center dot */}
                  <div
                    className={`hidden md:flex absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full border-4 border-white shadow-md transition-all duration-500 ${
                      isVisible
                        ? "bg-emerald-500 scale-100"
                        : "bg-gray-300 scale-75"
                    }`}
                  />

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-[calc(50%-2rem)]" />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
