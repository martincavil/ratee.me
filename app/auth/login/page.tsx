import { LoginForm } from '@/components/auth/login-form';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Connexion - ratee.me',
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-gray-50">
      <div className="w-full max-w-md">
        {/* Beta notice */}
        <div className="mb-6 p-4 bg-amber-50 border border-amber-200 rounded-lg text-center">
          <p className="text-sm text-amber-800">
            <strong>Beta privée</strong> - Réservé aux testeurs invités
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
