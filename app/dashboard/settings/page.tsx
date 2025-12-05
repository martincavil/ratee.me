"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/lib/i18n";
import { ROUTES } from "@/lib/constants";
import { updateProfileSchema, type UpdateProfileInput } from "@/lib/validators";
import { Spinner } from "@/components/ui/spinner";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  company_name: string | null;
  avatar_url: string | null;
}

export default function SettingsPage() {
  const router = useRouter();
  const { text } = useLanguage();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [formData, setFormData] = useState<UpdateProfileInput>({
    full_name: "",
    company_name: "",
    avatar_url: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof UpdateProfileInput, string>>
  >({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Password change state
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<{
    newPassword?: string;
    confirmPassword?: string;
  }>({});
  const [passwordSuccess, setPasswordSuccess] = useState<string | null>(null);
  const [passwordApiError, setPasswordApiError] = useState<string | null>(null);
  const [changingPassword, setChangingPassword] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/auth/me");
      const data = await response.json();

      if (data.success && data.data.user) {
        const user = data.data.user;
        setProfile(user);
        setFormData({
          full_name: user.full_name || "",
          company_name: user.company_name || "",
          avatar_url: user.avatar_url || "",
        });
      } else {
        setApiError("Failed to load profile");
      }
    } catch (error) {
      setApiError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof UpdateProfileInput]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setSuccessMessage(null);
    setApiError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);
    setSuccessMessage(null);

    const result = updateProfileSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof UpdateProfileInput, string>> = {};
      result.error.issues.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0] as keyof UpdateProfileInput] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setSaving(true);

    try {
      const response = await fetch("/api/user/profile", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!data.success) {
        setApiError(data.error || "Failed to update profile");
        return;
      }

      setProfile(data.data.user);
      setSuccessMessage(text.settings.form.successMessage);
      setTimeout(() => setSuccessMessage(null), 3000);
    } catch (error) {
      setApiError("An unexpected error occurred");
    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswordData((prev) => ({ ...prev, [name]: value }));
    if (passwordErrors[name as keyof typeof passwordErrors]) {
      setPasswordErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    setPasswordSuccess(null);
    setPasswordApiError(null);
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordErrors({});
    setPasswordApiError(null);
    setPasswordSuccess(null);

    // Validation
    const errors: typeof passwordErrors = {};

    if (!passwordData.newPassword) {
      errors.newPassword = "Le nouveau mot de passe est requis";
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword =
        "Le mot de passe doit contenir au moins 8 caractères";
    }

    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Veuillez confirmer le nouveau mot de passe";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Les mots de passe ne correspondent pas";
    }

    if (Object.keys(errors).length > 0) {
      setPasswordErrors(errors);
      return;
    }

    setChangingPassword(true);

    try {
      const response = await fetch("/api/auth/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newPassword: passwordData.newPassword,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setPasswordApiError(
          data.error || "Échec de la modification du mot de passe"
        );
        return;
      }

      setPasswordSuccess("Mot de passe modifié avec succès");
      setPasswordData({
        newPassword: "",
        confirmPassword: "",
      });
      setTimeout(() => setPasswordSuccess(null), 5000);
    } catch (error) {
      setPasswordApiError("Une erreur inattendue s'est produite");
    } finally {
      setChangingPassword(false);
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push(ROUTES.LOGIN);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="w-8 h-8 text-emerald" />
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl! font-bold text-content-primary font-sora mb-6">
        {text.settings.title}
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Profile Form */}
        <div className="lg:col-span-3 bg-white rounded-lg border border-border p-6">
          <h2 className="text-xl! font-semibold text-content-primary font-sora mb-6">
            {text.settings.sections.profile}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-content-primary mb-1">
                {text.settings.form.email.label}
              </label>
              <input
                type="email"
                value={profile?.email || ""}
                disabled
                className="w-full px-3 py-2 border border-border rounded-md bg-bg-secondary text-content-tertiary cursor-not-allowed text-sm"
              />
              <p className="mt-1 text-xs text-content-tertiary">
                {text.settings.form.email.helper}
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-content-primary mb-1">
                {text.settings.form.fullName.label}
              </label>
              <input
                type="text"
                name="full_name"
                value={formData.full_name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald text-sm ${
                  errors.full_name ? "border-error" : "border-border"
                }`}
              />
              {errors.full_name && (
                <p className="mt-1 text-xs text-error">{errors.full_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-content-primary mb-1">
                {text.settings.form.companyName.label}
              </label>
              <input
                type="text"
                name="company_name"
                value={formData.company_name}
                onChange={handleChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald text-sm ${
                  errors.company_name ? "border-error" : "border-border"
                }`}
              />
              {errors.company_name && (
                <p className="mt-1 text-xs text-error">{errors.company_name}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-medium text-content-primary mb-1">
                {text.settings.form.avatarUrl.label}
              </label>
              <input
                type="url"
                name="avatar_url"
                value={formData.avatar_url}
                onChange={handleChange}
                placeholder="https://exemple.com/avatar.jpg"
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald text-sm ${
                  errors.avatar_url ? "border-error" : "border-border"
                }`}
              />
              {errors.avatar_url && (
                <p className="mt-1 text-xs text-error">{errors.avatar_url}</p>
              )}
              <p className="mt-1 text-xs text-content-tertiary">
                {text.settings.form.avatarUrl.helper}
              </p>
            </div>

            {successMessage && (
              <div className="p-3 bg-emerald-light border border-emerald/20 rounded-md">
                <p className="text-sm text-emerald-dark">{successMessage}</p>
              </div>
            )}

            {apiError && (
              <div className="p-3 bg-error-light border border-error/20 rounded-md">
                <p className="text-sm text-error">{apiError}</p>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={saving}
                className="w-full px-4 py-2 bg-emerald text-white rounded-md hover:bg-emerald-dark disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm transition-colors"
              >
                {saving ? text.settings.form.saving : text.settings.form.save}
              </button>
            </div>
          </form>
        </div>

        {/* Password Change */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-border p-6">
          <h2 className="text-xl! font-semibold text-content-primary font-sora mb-2">
            Sécurité
          </h2>
          <p className="text-sm text-content-secondary mb-6">
            Définissez un nouveau mot de passe pour votre compte
          </p>

          <form onSubmit={handlePasswordSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-content-primary mb-1">
                Nouveau mot de passe
              </label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald text-sm ${
                  passwordErrors.newPassword ? "border-error" : "border-border"
                }`}
              />
              {passwordErrors.newPassword && (
                <p className="mt-1 text-xs text-error">
                  {passwordErrors.newPassword}
                </p>
              )}
              <p className="mt-1 text-xs text-content-tertiary">
                Au moins 8 caractères
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-content-primary mb-1">
                Confirmer le nouveau mot de passe
              </label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-emerald text-sm ${
                  passwordErrors.confirmPassword
                    ? "border-error"
                    : "border-border"
                }`}
              />
              {passwordErrors.confirmPassword && (
                <p className="mt-1 text-xs text-error">
                  {passwordErrors.confirmPassword}
                </p>
              )}
            </div>

            {passwordSuccess && (
              <div className="p-3 bg-emerald-light border border-emerald/20 rounded-md">
                <p className="text-sm text-emerald-dark">{passwordSuccess}</p>
              </div>
            )}

            {passwordApiError && (
              <div className="p-3 bg-error-light border border-error/20 rounded-md">
                <p className="text-sm text-error">{passwordApiError}</p>
              </div>
            )}

            <div className="pt-4">
              <button
                type="submit"
                disabled={changingPassword}
                className="w-full px-4 py-2 bg-emerald text-white rounded-md hover:bg-emerald-dark disabled:opacity-50 disabled:cursor-not-allowed font-medium text-sm transition-colors"
              >
                {changingPassword
                  ? "Modification en cours..."
                  : "Modifier le mot de passe"}
              </button>
            </div>
          </form>
        </div>

        {/* Account Actions */}
        <div className="lg:col-span-2 flex flex-col gap-4 justify-between">
          {/* Account Info */}
          <div className="bg-white rounded-lg border border-border p-5">
            <h2 className="text-xl! font-semibold text-content-primary font-sora mb-4">
              {text.settings.sections.account}
            </h2>
            <div className="space-y-3">
              <div>
                <p className="text-xs text-content-secondary">
                  {text.settings.account.accountId}
                </p>
                <p className="text-xs font-mono text-content-primary break-all">
                  {profile?.id.substring(0, 8)}...
                </p>
              </div>
              <div>
                <p className="text-xs text-content-secondary">
                  {text.settings.account.status.label}
                </p>
                <span className="inline-flex items-center px-2 py-1 text-xs font-medium rounded-full bg-emerald-light text-emerald-dark">
                  {text.settings.account.status.active}
                </span>
              </div>
            </div>
          </div>

          {/* Sign Out */}
          <div className="bg-white rounded-lg border border-border p-5">
            <h2 className="text-xl! font-semibold text-content-primary font-sora mb-4">
              {text.settings.sections.session}
            </h2>
            <button
              onClick={handleSignOut}
              className="w-full px-4 py-2 bg-content-primary text-white rounded-md hover:bg-content-secondary font-medium text-sm transition-colors"
            >
              {text.settings.session.signOut}
            </button>
          </div>

          {/* Danger Zone */}
          <div className="bg-white rounded-lg border-2 border-error/30 p-5">
            <h2 className="text-xl! font-semibold text-error font-sora mb-2">
              {text.settings.sections.dangerZone}
            </h2>
            <p className="text-xs text-content-secondary mb-4">
              {text.settings.dangerZone.description}
            </p>
            <button
              onClick={() => alert(text.settings.dangerZone.comingSoon)}
              className="w-full px-4 py-2 bg-error text-white rounded-md hover:bg-error/80 font-medium text-sm transition-colors"
            >
              {text.settings.dangerZone.deleteAccount}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
