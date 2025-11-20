import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'ratee.me - Coming Soon',
  robots: {
    index: false,
    follow: false,
  },
};

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="text-center max-w-md">
        <div className="text-6xl mb-6">✨</div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Un peu de patience
        </h1>

        <h2 className="text-xl text-gray-600 mb-6">
          ça arrive très vite 😉
        </h2>

        <p className="text-gray-500 mb-8 leading-relaxed">
          ratee.me est en version bêta.
          <br />
          Inscris-toi à la waitlist pour être parmi les premiers.
        </p>

        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-all"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Retour à l'accueil
        </Link>
      </div>
    </div>
  );
}
