import { LoginForm } from "@/components/auth/login-form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Connexion - ratee.me",
  robots: {
    index: false,
    follow: false,
  },
};

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-full max-w-md">
        {/* Beta notice */}
        <div className="mb-6 p-4 bg-warning-light border border-warning/20 rounded-lg text-center">
          <p className="text-sm text-content-primary font-medium">
            <strong className="text-warning">Beta privée</strong> - Réservé aux
            testeurs invités
          </p>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
