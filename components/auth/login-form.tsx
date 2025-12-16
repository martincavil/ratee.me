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
