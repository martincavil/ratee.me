"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginSchema, type LoginInput } from "@/lib/validators";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { createClient } from "@/lib/supabase/client";

export function LoginForm() {
  const router = useRouter();
  const { text, lang } = useLanguage();
  const [formData, setFormData] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginInput, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordLoading, setForgotPasswordLoading] = useState(false);
  const [forgotPasswordSuccess, setForgotPasswordSuccess] = useState(false);
  const [forgotPasswordError, setForgotPasswordError] = useState<string | null>(null);
  const [googleLoading, setGoogleLoading] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    async function checkAuth() {
      try {
        const response = await fetch("/api/auth/me");
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.data?.user) {
            setIsLoggedIn(true);
          }
        }
      } catch {
        // User not authenticated
      }
    }
    checkAuth();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof LoginInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);

    const result = loginSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof LoginInput, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof LoginInput] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        setApiError(data.error || "Login failed");
        return;
      }

      router.push(ROUTES.DASHBOARD);
      router.refresh();
    } catch {
      setApiError(text.auth.login.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setForgotPasswordError(null);
    setForgotPasswordSuccess(false);

    if (!forgotPasswordEmail || !forgotPasswordEmail.includes("@")) {
      setForgotPasswordError(
        lang === "fr" ? "Email invalide" : "Invalid email"
      );
      return;
    }

    setForgotPasswordLoading(true);

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotPasswordEmail }),
      });

      const data = await response.json();

      if (data.success) {
        setForgotPasswordSuccess(true);
        setForgotPasswordEmail("");
      } else {
        setForgotPasswordError(data.error || text.auth.forgotPassword.errorGeneric);
      }
    } catch {
      setForgotPasswordError(text.auth.forgotPassword.errorGeneric);
    } finally {
      setForgotPasswordLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setGoogleLoading(true);
    setApiError(null);

    try {
      const supabase = createClient();
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
        },
      });

      if (error) {
        setApiError(lang === "fr" ? "Erreur lors de la connexion avec Google" : "Error signing in with Google");
        setGoogleLoading(false);
      }
      // Don't set loading to false on success - user will be redirected
    } catch {
      setApiError(text.auth.login.errorGeneric);
      setGoogleLoading(false);
    }
  };

  // If user is already logged in, show message
  if (isLoggedIn) {
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
            {lang === "fr" ? "Vous êtes déjà connecté" : "You are already logged in"}
          </CardTitle>
          <CardDescription className="text-sm text-content-secondary">
            {lang === "fr"
              ? "Vous pouvez accéder à votre tableau de bord."
              : "You can access your dashboard."
            }
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link
            href={ROUTES.DASHBOARD}
            className="block w-full px-4 py-3 bg-emerald-500 text-white text-center rounded-lg font-inter font-semibold hover:bg-emerald-600 transition-colors cursor-pointer"
          >
            {lang === "fr" ? "Aller au Dashboard" : "Go to Dashboard"}
          </Link>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-white border border-border shadow-sm">
      <CardHeader className="text-center space-y-2 pb-6">
        <CardTitle className="text-2xl! font-bold text-content-primary font-sora">
          {text.auth.login.title}
        </CardTitle>
        <CardDescription className="text-sm text-content-secondary">
          {text.auth.login.subtitle}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label
              htmlFor="email"
              className="text-sm font-medium text-content-primary"
            >
              {text.auth.login.emailLabel}
            </Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={text.auth.login.emailPlaceholder}
              autoComplete="email"
              className={errors.email ? "border-error" : ""}
            />
            {errors.email && (
              <p className="text-sm text-error">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label
                htmlFor="password"
                className="text-sm font-medium text-content-primary"
              >
                {text.auth.login.passwordLabel}
              </Label>
              <Dialog open={forgotPasswordOpen} onOpenChange={setForgotPasswordOpen}>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    className="text-sm text-emerald hover:text-emerald-dark font-medium"
                  >
                    {text.auth.login.forgotPassword}
                  </button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-md">
                  <DialogHeader>
                    <DialogTitle>{text.auth.forgotPassword.title}</DialogTitle>
                    <DialogDescription>
                      {text.auth.forgotPassword.subtitle}
                    </DialogDescription>
                  </DialogHeader>
                  {forgotPasswordSuccess ? (
                    <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-md">
                      <p className="text-sm text-emerald-700">
                        {text.auth.forgotPassword.successMessage}
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleForgotPassword} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="forgot-email">
                          {text.auth.forgotPassword.emailLabel}
                        </Label>
                        <Input
                          type="email"
                          id="forgot-email"
                          value={forgotPasswordEmail}
                          onChange={(e) => setForgotPasswordEmail(e.target.value)}
                          placeholder={text.auth.forgotPassword.emailPlaceholder}
                          autoComplete="email"
                        />
                      </div>
                      {forgotPasswordError && (
                        <div className="p-3 bg-error-light border border-error/20 rounded-md">
                          <p className="text-sm text-error">{forgotPasswordError}</p>
                        </div>
                      )}
                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setForgotPasswordOpen(false);
                            setForgotPasswordEmail("");
                            setForgotPasswordError(null);
                            setForgotPasswordSuccess(false);
                          }}
                          className="flex-1"
                        >
                          {text.auth.forgotPassword.backToLogin}
                        </Button>
                        <Button
                          type="submit"
                          disabled={forgotPasswordLoading}
                          className="flex-1 bg-emerald text-white hover:bg-emerald-dark"
                        >
                          {forgotPasswordLoading
                            ? text.auth.forgotPassword.submitting
                            : text.auth.forgotPassword.submitButton}
                        </Button>
                      </div>
                    </form>
                  )}
                </DialogContent>
              </Dialog>
            </div>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={text.auth.login.passwordPlaceholder}
              autoComplete="current-password"
              className={errors.password ? "border-error" : ""}
            />
            {errors.password && (
              <p className="text-sm text-error">{errors.password}</p>
            )}
          </div>

          {apiError && (
            <div className="p-3 bg-error-light border border-error/20 rounded-md">
              <p className="text-sm text-error">{apiError}</p>
            </div>
          )}

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald text-white hover:bg-emerald-dark transition-colors font-medium"
          >
            {loading ? text.auth.login.submitting : text.auth.login.submitButton}
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-border"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-4 bg-white text-content-secondary">
              {lang === "fr" ? "Ou continuer avec" : "Or continue with"}
            </span>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          onClick={handleGoogleLogin}
          disabled={googleLoading || loading}
          className="w-full border-border hover:bg-gray-50 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="#34A853"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="#FBBC05"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="#EA4335"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          {googleLoading
            ? (lang === "fr" ? "Connexion..." : "Signing in...")
            : (lang === "fr" ? "Continuer avec Google" : "Continue with Google")
          }
        </Button>

        <p className="mt-6 text-center text-sm text-content-secondary">
          {text.auth.login.noAccount}{" "}
          <Link
            href={ROUTES.SIGNUP}
            className="text-emerald hover:text-emerald-dark font-medium"
          >
            {text.auth.login.signupLink}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
