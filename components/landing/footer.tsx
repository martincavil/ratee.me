"use client";

import { useLanguage } from "@/lib/i18n";
import Link from "next/link";

export function Footer() {
  const { text } = useLanguage();

  return (
    <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Main footer content */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {/* Brand column */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-xl font-bold text-white mb-3 block">
              ratee.me
            </Link>
            <p className="text-sm text-gray-400! leading-relaxed">
              {text.footer.tagline}
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="font-semibold text-white! text-sm! mb-3">
              {text.footer.product.title}
            </h3>
            <ul className="space-y-2">
              {text.footer.product.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="font-semibold text-white! text-sm! mb-3">
              {text.footer.company.title}
            </h3>
            <ul className="space-y-2">
              {text.footer.company.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal links */}
          <div>
            <h3 className="font-semibold text-white! text-sm! mb-3">
              {text.footer.legal.title}
            </h3>
            <ul className="space-y-2">
              {text.footer.legal.links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-emerald-400 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <p className="text-gray-500">{text.footer.copyright}</p>
          <p className="text-gray-500">{text.footer.madeIn}</p>
        </div>
      </div>
    </footer>
  );
}
