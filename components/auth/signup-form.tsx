"use client";

import { useState } from "react";
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
  const { text } = useLanguage();
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

      router.push(ROUTES.DASHBOARD);
      router.refresh();
    } catch {
      setApiError(text.auth.signup.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

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
