import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ratee.me - Coming Soon",
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="text-center">
        <div className="text-5xl mb-6">✨</div>

        <h1 className="text-2xl! font-bold text-content-primary font-sora mb-2">
          Un peu de patience
        </h1>

        <h2 className="text-lg text-content-secondary mb-6">
          ça arrive très vite 😉
        </h2>

        <p className="text-content-secondary mb-8 leading-relaxed text-sm">
          ratee.me est en version bêta.
          <br />
          Inscris-toi à la waitlist pour être parmi les premiers à l'utiliser.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-emerald text-white rounded-lg font-medium hover:bg-emerald-dark transition-colors"
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          Retour à l&apos;accueil
        </Link>
      </div>
    </div>
  );
}
