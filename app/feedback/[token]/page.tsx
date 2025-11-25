import { getProjectByToken } from "@/lib/supabase/queries";
import { NPSForm } from "@/components/feedback/nps-form";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getFeedbackText, type FeedbackLanguage } from "@/lib/feedback-i18n";

interface FeedbackPageProps {
  params: Promise<{
    token: string;
  }>;
}

export default async function FeedbackPage({ params }: FeedbackPageProps) {
  const { token } = await params;
  const project = await getProjectByToken(token);

  if (!project) {
    notFound();
  }

  // Détecter la langue du navigateur ou utiliser 'fr' par défaut
  const headersList = await headers();
  const acceptLanguage = headersList.get('accept-language') || 'fr';
  const language: FeedbackLanguage = acceptLanguage.toLowerCase().startsWith('fr') ? 'fr' : 'en';

  const t = getFeedbackText(language);

  return (
    <div className="min-h-screen bg-bg-primary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-5 py-2.5 bg-emerald/10 rounded-full mb-8">
            <span className="text-emerald font-bold text-lg!">ratee.me</span>
          </div>

          <h1 className="text-4xl! font-bold font-sora text-content-primary mb-4">
            {t.title}
          </h1>

          <p className="text-xl! text-content-secondary mb-2 font-inter">
            {t.subtitle}{" "}
            <span className="font-semibold text-content-primary">{project.name}</span>
          </p>

          <p className="text-content-tertiary font-inter">
            {t.description}
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg border border-border p-8 sm:p-12">
          <NPSForm project={project} token={token} language={language} />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm! text-content-tertiary font-inter">
            {t.footer}{" "}
            <a
              href="https://ratee.me"
              className="text-emerald font-semibold hover:underline transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              ratee.me
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
