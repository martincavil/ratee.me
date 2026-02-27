"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n";

interface CheckoutButtonProps {
  tierName: string;
  isPopular?: boolean;
  cta: string;
}

export function CheckoutButton({ tierName, isPopular, cta }: CheckoutButtonProps) {
  const [loading, setLoading] = useState(false);
  const { lang } = useLanguage();

  const handleCheckout = async (interval: 'monthly' | 'yearly' = 'monthly') => {
    setLoading(true);
    try {
      const response = await fetch('/api/payment/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ interval, language: lang }),
      });

      const data = await response.json();

      // If user is not authenticated, redirect to login
      if (response.status === 401) {
        window.location.href = `/auth/login?redirect=/pricing`;
        return;
      }

      if (data.url) {
        // Redirect to Stripe Checkout
        window.location.href = data.url;
      } else {
        console.error('Checkout error:', data.error, data.details);
        alert('Erreur lors de la création du checkout. Veuillez réessayer.');
        setLoading(false);
      }
    } catch (error) {
      console.error('Checkout error:', error);
      alert('Erreur lors de la création du checkout. Veuillez réessayer.');
      setLoading(false);
    }
  };

  // Free tier - link to signup
  if (tierName === 'Free') {
    return (
      <Link
        href="/auth/signup"
        className={`block w-full py-3 px-4 rounded-lg font-inter font-semibold text-sm text-center transition-all cursor-pointer ${
          isPopular
            ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg'
            : 'bg-gray-100 text-content-primary hover:bg-gray-200'
        }`}
      >
        {cta}
      </Link>
    );
  }

  // TODO: Business plan - À implémenter plus tard
  // Business tier - link to contact
  // if (tierName === 'Business') {
  //   return (
  //     <Link
  //       href="/contact"
  //       className={`block w-full py-3 px-4 rounded-lg font-inter font-semibold text-sm text-center transition-all cursor-pointer ${
  //         isPopular
  //           ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg'
  //           : 'bg-gray-100 text-content-primary hover:bg-gray-200'
  //       }`}
  //     >
  //       {cta}
  //     </Link>
  //   );
  // }

  // Pro tier - Stripe checkout
  return (
    <button
      onClick={() => handleCheckout('monthly')}
      disabled={loading}
      className={`block w-full py-3 px-4 rounded-lg font-inter font-semibold text-sm text-center transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${
        isPopular
          ? 'bg-emerald-500 text-white hover:bg-emerald-600 shadow-md hover:shadow-lg'
          : 'bg-gray-100 text-content-primary hover:bg-gray-200'
      }`}
    >
      {loading ? 'Chargement...' : cta}
    </button>
  );
}
