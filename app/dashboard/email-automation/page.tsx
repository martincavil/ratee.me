"use client";

import { useState, useEffect } from "react";
import { useLanguage } from "@/lib/i18n";
import { Spinner } from "@/components/ui/spinner";
import { Modal } from "@/components/ui/modal";
import Link from "next/link";

interface EmailTemplate {
  id: string;
  name: string;
  description: string;
  trigger: string;
  subject: string;
  bodyPreview: string;
  bodyFull: string;
  isPro: boolean;
  icon: string;
}

interface UserPlan {
  plan: "free" | "pro";
}

const emailTemplates: EmailTemplate[] = [
  {
    id: "onboarding",
    name: "J+0 : Demande de feedback initiale",
    description: "Envoyé automatiquement le jour de la livraison du projet",
    trigger: "À la livraison du projet",
    subject: "Votre avis sur {projectName} nous intéresse",
    bodyPreview:
      "Bonjour {clientName}! Nous espérons que vous êtes satisfait de {projectName}. Votre retour est précieux pour nous...",
    bodyFull: `Bonjour {clientName}!

Nous espérons que vous êtes satisfait de {projectName}. Votre retour est précieux pour nous et nous aidera à continuer à améliorer nos services.

Nous aimerions connaître votre avis en quelques questions rapides. Cela ne vous prendra que 2 minutes:

👉 {feedbackLink}

Votre feedback nous permet de :
• Comprendre ce qui a bien fonctionné
• Identifier les axes d'amélioration
• Mieux vous servir sur les prochains projets

Un grand merci d'avance pour votre temps!

Cordialement,
{freelanceName}`,
    isPro: false,
    icon: "📧",
  },
  {
    id: "30_days_followup",
    name: "J+30 : Suivi satisfaction",
    description:
      "Demande une mise à jour du feedback 30 jours après la livraison",
    trigger: "30 jours après la livraison",
    subject: "Comment ça se passe avec {projectName}?",
    bodyPreview:
      "Salut {clientName}, Un mois a passé depuis qu'on a livré {projectName}. Ça tourne bien? Des questions?...",
    bodyFull: `Salut {clientName}!

Un mois a passé depuis qu'on a livré {projectName}. J'espère que tout se passe bien de votre côté!

Je voulais prendre de vos nouvelles:
• Est-ce que tout fonctionne comme prévu?
• Avez-vous des questions ou besoin d'ajustements?
• Y a-t-il quelque chose que nous pourrions améliorer?

N'hésitez pas à me faire signe si vous avez besoin de quoi que ce soit. Je suis là pour vous accompagner!

Si vous avez 2 minutes, j'aimerais vraiment avoir votre retour:
👉 {feedbackLink}

À très bientôt,
{freelanceName}`,
    isPro: true,
    icon: "🔄",
  },
  {
    id: "90_days_reminder",
    name: "J+90 : Rappel et opportunité",
    description:
      "Rappel amical et opportunité de nouveau projet 90 jours après",
    trigger: "90 jours après la livraison",
    subject: "On pense à toi! 😊",
    bodyPreview:
      "Salut {clientName}, 3 mois maintenant depuis {projectName}! Comment ça se passe? Si tu es heureux, on aimerait que tu nous recommandes...",
    bodyFull: `Salut {clientName}!

3 mois déjà depuis qu'on a terminé {projectName}! Le temps passe vite 😊

J'espère que tout roule de votre côté. Je voulais prendre contact pour:

1. **Savoir comment ça se passe** avec le projet - Est-ce qu'il répond toujours à vos attentes?

2. **Voir si vous avez de nouveaux projets** en tête - Je serais ravi de collaborer à nouveau avec vous!

3. **Vous demander une faveur** - Si vous êtes satisfait de notre collaboration, un petit témoignage ou une recommandation serait vraiment apprécié 🙏

Donnez-moi votre retour ici:
👉 {feedbackLink}

Au plaisir d'échanger avec vous!

Cordialement,
{freelanceName}`,
    isPro: true,
    // icon: "🚀",
  },
];

export default function EmailAutomationPage() {
  const { lang, text } = useLanguage();
  const [userPlan, setUserPlan] = useState<UserPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedTemplate, setSelectedTemplate] =
    useState<EmailTemplate | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showFullContent, setShowFullContent] = useState(false);
  const [stats, setStats] = useState<{ sent: number; scheduled: number }>({
    sent: 0,
    scheduled: 0,
  });

  useEffect(() => {
    fetchUserPlan();
    fetchStats();
  }, []);

  const fetchUserPlan = async () => {
    try {
      const response = await fetch("/api/user/subscription");
      const data = await response.json();
      if (data.success) {
        setUserPlan({ plan: data.data.plan || "free" });
      }
    } catch (error) {
      console.error("Failed to fetch user plan:", error);
      setUserPlan({ plan: "free" });
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    try {
      const response = await fetch("/api/email-automation/stats");
      const data = await response.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch stats:", error);
    }
  };

  const handleViewTemplate = (template: EmailTemplate) => {
    setSelectedTemplate(template);
    setShowFullContent(false);
    setIsModalOpen(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Spinner className="w-8 h-8 text-emerald" />
      </div>
    );
  }

  const isPro = userPlan?.plan === "pro";

  return (
    <div className="max-w-5xl">
      <div className="mb-8">
        <h1 className="text-2xl! font-bold text-content-primary font-sora mb-2">
          {lang === "fr"
            ? "📧 Automatisation des emails"
            : "📧 Email Automation"}
        </h1>
        <p className="text-content-secondary text-sm">
          {lang === "fr"
            ? "Gérez vos emails automatiques envoyés à vos clients"
            : "Manage your automated emails sent to clients"}
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className="bg-white rounded-lg border border-border p-5">
          <p className="text-xs font-medium text-content-secondary mb-1">
            {lang === "fr" ? "Emails envoyés" : "Emails sent"}
          </p>
          <p className="text-2xl font-bold text-emerald">{stats.sent}</p>
        </div>
        <div className="bg-white rounded-lg border border-border p-5">
          <p className="text-xs font-medium text-content-secondary mb-1">
            {lang === "fr" ? "Emails planifiés" : "Scheduled emails"}
          </p>
          <p className="text-2xl font-bold text-content-primary">
            {stats.scheduled}
          </p>
        </div>
      </div>

      {/* Email Templates */}
      <div className="space-y-4">
        {emailTemplates.map((template) => {
          const isLocked = template.isPro && !isPro;

          return (
            <div
              key={template.id}
              className={`bg-white rounded-lg border-2 p-6 transition-all ${
                isLocked
                  ? "border-border opacity-75"
                  : "border-emerald-200 hover:border-emerald-400 hover:shadow-md"
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    {/* <span className="text-2xl">{template.icon}</span> */}
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-content-primary font-sora">
                        {template.name}
                      </h3>
                      {template.isPro && (
                        <span className="px-2 py-0.5 bg-emerald-100 text-emerald-700 text-xs font-bold rounded">
                          PRO
                        </span>
                      )}
                      {isLocked && <span className="text-gray-400">🔒</span>}
                    </div>
                  </div>

                  <p className="text-sm text-content-secondary mb-3">
                    {template.description}
                  </p>

                  <div className="flex items-center gap-4 text-xs text-content-tertiary mb-4">
                    <span className="flex items-center gap-1">
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                      {template.trigger}
                    </span>
                  </div>

                  <div className="bg-gray-50 rounded-lg p-3 mb-4">
                    <p className="text-xs font-medium text-gray-500 mb-1">
                      {lang === "fr" ? "Sujet" : "Subject"}:
                    </p>
                    <p className="text-sm text-gray-700 font-medium">
                      {template.subject}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewTemplate(template)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        isLocked
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                      }`}
                      disabled={isLocked}
                    >
                      {lang === "fr" ? "Voir l'aperçu" : "View preview"}
                    </button>
                    {isLocked && (
                      <Link
                        href="/pricing"
                        className="px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-medium hover:bg-emerald-700 transition-all"
                      >
                        {lang === "fr"
                          ? "🔓 Débloquer avec PRO"
                          : "🔓 Unlock with PRO"}
                      </Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Upgrade CTA for Free users */}
      {!isPro && (
        <div className="mt-8 bg-gradient-to-r from-emerald-50 to-emerald-100 border-2 border-emerald-200 rounded-lg p-6">
          <div className="flex items-start gap-4">
            <span className="text-3xl">⚡</span>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-emerald-900 mb-2">
                {lang === "fr"
                  ? "Débloquez les emails de suivi avec PRO"
                  : "Unlock follow-up emails with PRO"}
              </h3>
              <p className="text-sm text-emerald-700 mb-4">
                {lang === "fr"
                  ? "Automatisez vos relances à J+30 et J+90 pour maintenir le contact avec vos clients et générer de nouvelles opportunités."
                  : "Automate your J+30 and J+90 follow-ups to stay in touch with clients and generate new opportunities."}
              </p>
              <Link
                href="/pricing"
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all"
              >
                {lang === "fr" ? "Passer à PRO" : "Upgrade to PRO"}
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* Template Preview Modal */}
      {selectedTemplate && (
        <Modal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedTemplate.name}
        >
          <div className="space-y-4">
            {/* Subject */}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">
                {lang === "fr" ? "Sujet de l'email" : "Email subject"}:
              </p>
              <p className="text-sm font-medium text-gray-900 bg-gray-50 rounded-lg p-3">
                {selectedTemplate.subject}
              </p>
            </div>

            {/* Body Preview */}
            <div>
              <p className="text-xs font-medium text-gray-500 mb-2">
                {lang === "fr" ? "Aperçu du contenu" : "Content preview"}:
              </p>
              <div className="text-sm text-gray-700 bg-gray-50 rounded-lg p-4 border border-gray-200 leading-relaxed whitespace-pre-line">
                {showFullContent
                  ? selectedTemplate.bodyFull
                  : selectedTemplate.bodyPreview}
              </div>
              <button
                onClick={() => setShowFullContent(!showFullContent)}
                className="mt-2 text-sm text-emerald-600 hover:text-emerald-700 font-medium flex items-center gap-1"
              >
                {showFullContent
                  ? text.emailAutomationPage.showLess
                  : text.emailAutomationPage.showMore}
                <svg
                  className={`w-4 h-4 transition-transform ${
                    showFullContent ? "rotate-180" : ""
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>
            </div>

            {/* Trigger info */}
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
              <p className="text-xs font-medium text-emerald-900 mb-1">
                {lang === "fr" ? "📅 Déclencheur" : "📅 Trigger"}
              </p>
              <p className="text-sm text-emerald-700">
                {selectedTemplate.trigger}
              </p>
            </div>

            {/* Variables info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-xs font-medium text-blue-900 mb-2">
                {lang === "fr"
                  ? "📝 Variables disponibles"
                  : "📝 Available variables"}
                :
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs text-blue-700">
                <code className="bg-blue-100 px-2 py-1 rounded">
                  {"{"}clientName{"}"}
                </code>
                <code className="bg-blue-100 px-2 py-1 rounded">
                  {"{"}projectName{"}"}
                </code>
                <code className="bg-blue-100 px-2 py-1 rounded">
                  {"{"}freelanceName{"}"}
                </code>
                <code className="bg-blue-100 px-2 py-1 rounded">
                  {"{"}feedbackLink{"}"}
                </code>
              </div>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}
