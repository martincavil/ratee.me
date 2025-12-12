"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { signupSchema, type SignupInput } from "@/lib/validators";
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

export function SignupForm() {
  const router = useRouter();
  const { text, lang } = useLanguage();
  const [formData, setFormData] = useState<SignupInput>({
    email: "",
    password: "",
    name: "",
    company_name: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof SignupInput, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
    if (errors[name as keyof SignupInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);
    setSuccessMessage(null);

    const result = signupSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SignupInput, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof SignupInput] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        setApiError(data.error || "Signup failed");
        return;
      }

      // If email confirmation is required, show translated message
      if (data.emailConfirmationRequired) {
        setSuccessMessage(text.auth.signup.successEmailConfirmation);
        return;
      }

      // Otherwise redirect to dashboard
      router.push(ROUTES.DASHBOARD);
      router.refresh();
    } catch {
      setApiError(text.auth.signup.errorGeneric);
    } finally {
      setLoading(false);
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
    <Card className="w-full">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl">{text.auth.signup.title}</CardTitle>
        <CardDescription>{text.auth.signup.subtitle}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">{text.auth.signup.nameLabel}</Label>
            <Input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder={text.auth.signup.namePlaceholder}
              className={errors.name ? "border-red-500" : ""}
            />
            {errors.name && (
              <p className="text-sm text-red-600">{errors.name}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">{text.auth.signup.emailLabel}</Label>
            <Input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={text.auth.signup.emailPlaceholder}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && (
              <p className="text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">{text.auth.signup.passwordLabel}</Label>
            <Input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={text.auth.signup.passwordPlaceholder}
              className={errors.password ? "border-red-500" : ""}
            />
            {errors.password && (
              <p className="text-sm text-red-600">{errors.password}</p>
            )}
            <p className="text-xs text-gray-500">
              {text.auth.signup.passwordHint}
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="company_name">
              {text.auth.signup.companyLabel}{" "}
              <span className="text-gray-400">{text.auth.signup.companyOptional}</span>
            </Label>
            <Input
              type="text"
              id="company_name"
              name="company_name"
              value={formData.company_name}
              onChange={handleChange}
              placeholder={text.auth.signup.companyPlaceholder}
              className={errors.company_name ? "border-red-500" : ""}
            />
            {errors.company_name && (
              <p className="text-sm text-red-600">{errors.company_name}</p>
            )}
          </div>

          {apiError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-md">
              <p className="text-sm text-red-600">{apiError}</p>
            </div>
          )}

          {successMessage && (
            <div className="p-3 bg-green-50 border border-green-200 rounded-md">
              <p className="text-sm text-green-600">{successMessage}</p>
            </div>
          )}

          <Button type="submit" disabled={loading} className="w-full">
            {loading ? text.auth.signup.submitting : text.auth.signup.submitButton}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-600">
          {text.auth.signup.hasAccount}{" "}
          <Link
            href={ROUTES.LOGIN}
            className="text-emerald-500 hover:underline font-medium"
          >
            {text.auth.signup.loginLink}
          </Link>
        </p>
      </CardContent>
    </Card>
  );
}
