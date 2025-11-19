import { getProjectByToken } from '@/lib/supabase/queries';
import { NPSForm } from '@/components/feedback/nps-form';
import { notFound } from 'next/navigation';

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-primary/10 rounded-full mb-6">
            <span className="text-primary font-semibold">ratee.me</span>
          </div>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            We'd love your feedback!
          </h1>

          <p className="text-xl text-gray-600 mb-2">
            Project: <span className="font-semibold text-gray-900">{project.name}</span>
          </p>

          <p className="text-gray-500">
            Your feedback helps us improve and deliver better results
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8 sm:p-12">
          <NPSForm project={project} token={token} />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500">
            Powered by{' '}
            <a
              href="https://ratee.me"
              className="text-primary font-semibold hover:underline"
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
