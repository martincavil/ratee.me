"use client";

import { useLanguage } from "@/lib/i18n";
import { useState } from "react";

export function FAQ() {
  const { text, lang } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-bg-primary">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            {text.faq.title}
          </h2>
        </div>

        <div className="space-y-3">
          {text.faq.items.map((item, index) => (
            <div
              key={index}
              className={`bg-white rounded-xl border overflow-hidden transition-all ${
                openIndex === index
                  ? "border-emerald-200 shadow-md"
                  : "border-gray-100 hover:border-emerald-100"
              }`}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-gray-50 transition-colors"
              >
                <span className="font-medium text-gray-900 text-sm pr-4">
                  {item.question}
                </span>
                <svg
                  className={`w-5 h-5 text-emerald-500 flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "max-h-96" : "max-h-0"
                }`}
              >
                <div className="px-5 pb-4">
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-gray-500 mb-2">
            {lang === "fr"
              ? "D'autres questions ?"
              : "More questions?"}
          </p>
          <a
            href="mailto:hello@ratee.me"
            className="text-emerald-600 font-medium text-sm hover:underline"
          >
            hello@ratee.me
          </a>
        </div>
      </div>
    </section>
  );
}
