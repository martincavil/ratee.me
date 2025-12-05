"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { ROUTES } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";
import type { User } from "@/types/database";

interface NavbarProps {
  user: User;
}

export function Navbar({ user }: NavbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { lang, setLang, text } = useLanguage();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isPro, setIsPro] = useState(false);

  useEffect(() => {
    const fetchSubscription = async () => {
      try {
        const res = await fetch("/api/subscriptions");
        const data = await res.json();
        if (data.success && data.data?.plan === "pro") {
          setIsPro(true);
        }
      } catch (error) {
        console.error("Failed to fetch subscription:", error);
      }
    };
    fetchSubscription();
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push(ROUTES.LOGIN);
      router.refresh();
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
    }
  };

  const navLinks = [
    {
      href: ROUTES.DASHBOARD,
      label: text.navbar.dashboard,
    },
    { href: ROUTES.PROJECTS, label: text.navbar.projects },
    { href: ROUTES.FEEDBACKS, label: text.navbar.feedbacks },
    { href: ROUTES.BADGE, label: text.navbar.badge },
    { href: ROUTES.EMAIL_AUTOMATION, label: text.navbar.emailAutomation },
  ];

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side: Logo + Nav Links */}
          <div className="flex">
            {/* Logo */}
            <Link href={ROUTES.DASHBOARD} className="flex items-center">
              <span className="text-2xl font-bold text-primary">ratee.me</span>
            </Link>

            {/* Nav Links (Desktop) */}
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navLinks.map((link) => {
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium transition-colors ${
                      isActive
                        ? "border-primary text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right side: User Menu */}
          <div className="flex items-center">
            <div className="relative">
              {/* User Button */}
              <button
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center space-x-3 focus:bg-gray-50  rounded-lg px-3 py-2 hover:bg-gray-50 transition-colors"
              >
                {/* Avatar */}
                <div className="relative">
                  <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center font-medium">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  {/* Pro Badge */}
                  {isPro && (
                    <div className="absolute -top-1 -left-4 bg-white text-primary text-[9px] font-bold px-1.5 py-0.5 rounded-full border border-primary shadow-sm">
                      PRO
                    </div>
                  )}
                </div>
                {/* User Info (Hidden on mobile) */}
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium text-gray-700">
                    {user.name}
                  </div>
                  {user.company_name && (
                    <div className="text-xs text-gray-500">
                      {user.company_name}
                    </div>
                  )}
                </div>
                {/* Dropdown Icon */}
                <svg
                  className={`w-4 h-4 text-gray-500 transition-transform ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M19 9l-7 7-7-7"></path>
                </svg>
              </button>

              {/* Dropdown Menu */}
              {isUserMenuOpen && (
                <>
                  {/* Backdrop */}
                  <div
                    className="fixed inset-0 z-10"
                    onClick={() => setIsUserMenuOpen(false)}
                  ></div>

                  {/* Menu */}
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg pt-1 z-20 border border-gray-200">
                    {/* User Info (Mobile only) */}
                    <div className="md:hidden px-4 py-3 border-b border-gray-200">
                      <div className="text-sm font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                      {user.company_name && (
                        <div className="text-xs text-gray-500 mt-1">
                          {user.company_name}
                        </div>
                      )}
                    </div>

                    {/* Menu Items */}
                    <Link
                      href={ROUTES.SETTINGS}
                      onClick={() => setIsUserMenuOpen(false)}
                      className="block px-4 py-2 text-sm text-content-primary hover:bg-bg-secondary transition-colors"
                    >
                      {text.navbar.settings}
                    </Link>

                    {/* Language Selector */}
                    <div className="px-4 py-2 border-t border-border">
                      <div className="text-xs text-content-secondary mb-2">
                        {text.navbar.language}
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            setLang("fr");
                            setIsUserMenuOpen(false);
                          }}
                          className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                            lang === "fr"
                              ? "bg-emerald text-white"
                              : "bg-bg-secondary text-content-secondary hover:bg-border"
                          }`}
                        >
                          🇫🇷 FR
                        </button>
                        <button
                          onClick={() => {
                            setLang("en");
                            setIsUserMenuOpen(false);
                          }}
                          className={`flex-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                            lang === "en"
                              ? "bg-emerald text-white"
                              : "bg-bg-secondary text-content-secondary hover:bg-border"
                          }`}
                        >
                          🇺🇸 EN
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full text-left px-4 py-2 text-sm text-error hover:bg-error-light transition-colors disabled:opacity-50 rounded-b-md disabled:cursor-not-allowed border-t border-border"
                    >
                      {isLoggingOut
                        ? text.navbar.loggingOut
                        : text.navbar.logout}
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Mobile Nav Links */}
        <div className="sm:hidden pb-3 space-y-1">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium transition-colors ${
                  isActive
                    ? "border-primary bg-blue-50 text-primary"
                    : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
