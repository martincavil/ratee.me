"use client";

import { useLanguage } from "@/lib/i18n";
import Link from "next/link";
import { useState, useEffect } from "react";
import type { User } from "@/types/database";

export function LandingNavbar() {
  const { lang, setLang, text } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Fetch current user if authenticated
    async function fetchUser() {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data?.user) {
            setUser(data.data.user);
          }
        }
      } catch {
        // User not authenticated
      }
    }
    fetchUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 md:px-4 md:py-3">
      <div
        className={`max-w-6xl mx-auto transition-all duration-300 ${
          scrolled
            ? "bg-white/60 backdrop-blur-xl shadow-lg md:rounded-full px-6"
            : "px-6"
        } bg-white md:bg-transparent`}
      >
        <div className="flex items-center justify-between h-14">
          {/* Logo */}
          {/* Add logo and keep text */}
          <Link
            href="/"
            className="font-sora text-3xl font-semibold text-content-primary"
          >
            ratee.me
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <NavLink href="#features">{text.nav.features}</NavLink>
            <NavLink href="#pricing">{text.nav.pricing}</NavLink>
            <NavLink href="#demo">{text.nav.demo}</NavLink>

            {/* Language toggle */}
            <div className="flex items-center gap-1 bg-bg-secondary rounded-full p-1">
              <button
                onClick={() => setLang("fr")}
                className={`px-3 py-1 rounded-full text-sm font-inter font-medium transition-all ${
                  lang === "fr"
                    ? "bg-white text-content-primary shadow-sm"
                    : "text-content-tertiary hover:text-accent"
                }`}
              >
                🇫🇷 FR
              </button>
              <button
                onClick={() => setLang("en")}
                className={`px-3 py-1 rounded-full text-sm font-inter font-medium transition-all ${
                  lang === "en"
                    ? "bg-white text-content-primary shadow-sm"
                    : "text-content-tertiary hover:text-accent"
                }`}
              >
                🇺🇸 EN
              </button>
            </div>

            {user ? (
              <Link
                href="/dashboard"
                className="flex items-center gap-2 font-inter text-sm font-medium text-content-primary hover:text-accent transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-accent-light flex items-center justify-center">
                  <span className="text-accent font-semibold text-xs">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                </div>
                {user.name}
              </Link>
            ) : (
              <>
                <NavLink href="/auth/login">{text.nav.login}</NavLink>
                <Link
                  href="/auth/signup"
                  className="px-5 py-2 bg-accent text-white rounded-full font-inter font-semibold text-sm hover:bg-accent-dark transition-all hover:scale-105"
                >
                  {text.nav.signup}
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-bg-secondary"
          >
            <svg
              className="w-6 h-6 text-content-primary"
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
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <MobileNavLink
                href="#features"
                onClick={() => setMobileMenuOpen(false)}
              >
                {text.nav.features}
              </MobileNavLink>
              <MobileNavLink
                href="#pricing"
                onClick={() => setMobileMenuOpen(false)}
              >
                {text.nav.pricing}
              </MobileNavLink>
              <MobileNavLink
                href="#demo"
                onClick={() => setMobileMenuOpen(false)}
              >
                {text.nav.demo}
              </MobileNavLink>

              <div className="pt-4 border-t border-border">
                <div className="flex items-center gap-2 mb-4">
                  <button
                    onClick={() => {
                      setLang("fr");
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2 rounded-full text-sm font-inter font-medium ${
                      lang === "fr"
                        ? "bg-accent"
                        : "bg-bg-secondary text-content-secondary"
                    }`}
                  >
                    🇫🇷 Français
                  </button>
                  <button
                    onClick={() => {
                      setLang("en");
                      setMobileMenuOpen(false);
                    }}
                    className={`py-2 rounded-full text-sm font-inter font-medium ${
                      lang === "en"
                        ? "bg-accent"
                        : "bg-bg-secondary text-content-secondary"
                    }`}
                  >
                    🇺🇸 English
                  </button>
                </div>

                {user ? (
                  <Link
                    href="/dashboard"
                    className=" w-full py-3 text-accent rounded-full font-inter font-semibold"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {user.name}
                  </Link>
                ) : (
                  <>
                    <Link
                      href="/auth/login"
                      className="block w-full px-5 py-3 bg-bg-secondary text-content-primary text-center rounded-full font-inter font-semibold mb-3"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {text.nav.login}
                    </Link>
                    <Link
                      href="/auth/signup"
                      className="block w-full px-5 py-3 bg-accent text-white text-center rounded-full font-inter font-semibold"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {text.nav.signup}
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}

// Desktop nav link with underline animation
function NavLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative font-inter text-sm font-medium text-content-primary hover:text-accent transition-colors duration-300 group"
    >
      {children}
      <span className="absolute left-0 -bottom-1 h-0.5 bg-accent w-0 group-hover:w-full transition-all duration-300 ease-out" />
    </Link>
  );
}

// Mobile nav link
function MobileNavLink({
  href,
  onClick,
  children,
}: {
  href: string;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="font-inter text-content-primary hover:text-accent font-medium"
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
