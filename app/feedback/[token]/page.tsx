"use client";

import { useState, useEffect } from "react";
import { FeedbackForm } from "@/components/feedback/feedback-form";
import { SuccessMessage } from "@/components/feedback/success-message";
import { useRouter } from "next/navigation";

interface FeedbackPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default function FeedbackPage({ params }: FeedbackPageProps) {
  const router = useRouter();
  const [token, setToken] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [project, setProject] = useState<any>(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Get token from params
    params.then(({ token: t }) => {
      setToken(t);
      validateToken(t);
    });
  }, [params]);

  const validateToken = async (token: string) => {
    try {
      const response = await fetch(`/api/feedback/validate?token=${token}`);
      const data = await response.json();

      if (!data.success) {
        setError(data.error || "Lien invalide ou expiré");
        return;
      }

      setProject(data.data);
    } catch (err) {
      console.error("Validation error:", err);
      setError("Une erreur est survenue");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    setSuccess(true);
  };

  const handleAutoRedirect = () => {
    router.push("/");
  };

  // Loading state
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-blue-50 to-emerald-200">
        <div className="text-center">
          <div className="animate-spin w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-600 font-inter">Chargement...</p>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen bg-[#F5F3F0] flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-2xl shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg
              className="w-8 h-8 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 font-sora mb-3">
            ❌ {error}
          </h1>
          <p className="text-gray-600 font-inter mb-6">
            Le lien de feedback n&apos;est plus valide ou a expiré.
          </p>
          <button
            onClick={() => router.push("/")}
            className="px-6 py-3 bg-emerald-500 text-white rounded-lg font-sora font-semibold hover:bg-emerald-600 transition-colors"
          >
            Retour à l&apos;accueil
          </button>
        </div>
      </div>
    );
  }

  // Success state
  if (success) {
    return (
      <div className="min-h-screen bg-[#F5F3F0] flex items-center justify-center">
        <SuccessMessage onAutoRedirect={handleAutoRedirect} />
      </div>
    );
  }

  // Form state
  return (
    <div className="min-h-screen py-8 px-4 sm:px-6 lg:px-8  bg-linear-to-br from-blue-50 to-emerald-200">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-md p-6 sm:p-8 lg:p-12">
          <FeedbackForm
            token={token}
            projectName={project?.name || ""}
            onSuccess={handleSuccess}
          />
        </div>
      </div>
    </div>
  );
}
