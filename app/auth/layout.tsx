import type { Metadata } from "next";
import { LanguageProvider } from "@/lib/i18n";

export const metadata: Metadata = {
  title: "Authentication - ratee.me",
  description: "Sign in or create an account",
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <LanguageProvider>
      <div className="h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-emerald-200">
        <div className="w-full max-w-3xl px-4">
          {/* Logo */}
          <div className="text-center mb-6">
            <h1 className="text-4xl font-bold text-primary">ratee.me</h1>
            <p className="text-muted-foreground mt-2">
              Automate your client feedback
            </p>
          </div>

          {/* Auth form card */}
          <div className="">{children}</div>

          {/* Footer */}
          <div className="text-center mt-6 text-sm text-muted-foreground">
            <p>&copy; 2025 ratee.me. All rights reserved.</p>
          </div>
        </div>
      </div>
    </LanguageProvider>
  );
}
