"use client";

import { useState } from "react";
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

export function LoginForm() {
  const router = useRouter();
  const { text } = useLanguage();
  const [formData, setFormData] = useState<LoginInput>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof LoginInput, string>>
  >({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

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
            <Label
              htmlFor="password"
              className="text-sm font-medium text-content-primary"
            >
              {text.auth.login.passwordLabel}
            </Label>
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
