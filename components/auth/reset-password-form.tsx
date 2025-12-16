"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { ROUTES } from "@/lib/constants";
import { useLanguage } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createClient } from "@/lib/supabase/client";

export function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { text, lang } = useLanguage();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const code = searchParams.get("code");

  useEffect(() => {
    if (!code) {
      setError(text.auth.resetPassword.invalidLink);
    }
  }, [code, text]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!code) {
      setError(text.auth.resetPassword.invalidLink);
      return;
    }

    if (password.length < 8) {
      setError(
        lang === "fr"
          ? "Le mot de passe doit contenir au moins 8 caractères"
          : "Password must be at least 8 characters"
      );
      return;
    }

    if (password !== confirmPassword) {
      setError(
        lang === "fr"
          ? "Les mots de passe ne correspondent pas"
          : "Passwords do not match"
      );
      return;
    }

    setLoading(true);

    try {
      const supabase = createClient();

      const { error: resetError } = await supabase.auth.updateUser({
        password: password,
      });

      if (resetError) {
        setError(resetError.message);
        return;
      }

      setSuccess(true);

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push(ROUTES.LOGIN);
      }, 2000);
    } catch (err) {
      setError(text.auth.resetPassword.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="w-full bg-white border border-border shadow-sm">
        <CardHeader className="text-center space-y-2 pb-6">
          <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
          <CardTitle className="text-2xl! font-bold text-content-primary font-sora">
            {text.auth.resetPassword.successMessage}
          </CardTitle>
          <CardDescription className="text-sm text-content-secondary">
            {lang === "fr"
              ? "Vous allez être redirigé vers la page de connexion..."
              : "You will be redirected to the login page..."}
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white border border-border shadow-sm">
      <CardHeader className="text-center space-y-2 pb-6">
        <CardTitle className="text-2xl! font-bold text-content-primary font-sora">
          {text.auth.resetPassword.title}
        </CardTitle>
        <CardDescription className="text-sm text-content-secondary">
          {text.auth.resetPassword.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="password"
              className="text-sm font-medium text-content-primary"
            >
              {text.auth.resetPassword.passwordLabel}
            </Label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={text.auth.resetPassword.passwordPlaceholder}
              autoComplete="new-password"
            />
          </div>

          <div className="space-y-2">
            <Label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-content-primary"
            >
              {text.auth.resetPassword.confirmPasswordLabel}
            </Label>
            <Input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder={text.auth.resetPassword.confirmPasswordPlaceholder}
              autoComplete="new-password"
            />
          </div>

          {error && (
            <div className="p-3 bg-error-light border border-error/20 rounded-md">
              <p className="text-sm text-error">{error}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading || !code}
            className="w-full bg-emerald text-white hover:bg-emerald-dark transition-colors font-medium"
          >
            {loading
              ? text.auth.resetPassword.submitting
              : text.auth.resetPassword.submitButton}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-content-secondary">
          <Link
            href={ROUTES.LOGIN}
            className="text-emerald hover:text-emerald-dark font-medium"
          >
            {text.auth.resetPassword.backToLogin}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
