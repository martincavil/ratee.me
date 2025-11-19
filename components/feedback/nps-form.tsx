'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import type { Project } from '@/types/database';

interface NPSFormProps {
  project: Project;
  token: string;
}

export function NPSForm({ project, token }: NPSFormProps) {
  const router = useRouter();
  const [selectedScore, setSelectedScore] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: project.client_email || '',
    comment: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleScoreClick = (score: number) => {
    setSelectedScore(score);
    setErrors((prev) => ({ ...prev, score: '' }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setApiError(null);

    // Validation
    const newErrors: Record<string, string> = {};

    if (selectedScore === null) {
      newErrors.score = 'Please select a score';
    }

    if (!formData.client_name.trim()) {
      newErrors.client_name = 'Name is required';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('/api/feedback/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          project_token: token,
          nps_score: selectedScore,
          client_name: formData.client_name,
          client_email: formData.client_email || undefined,
          comment: formData.comment || undefined,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        setApiError(data.error || 'Failed to submit feedback');
        return;
      }

      // Redirect to thank you page
      router.push(`/feedback/${token}/thank-you`);
    } catch (error) {
      setApiError('An unexpected error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getScoreLabel = (score: number) => {
    if (score <= 6) return 'Not likely';
    if (score <= 8) return 'Likely';
    return 'Very likely';
  };

  const getScoreColor = (score: number) => {
    if (score <= 6) return 'bg-red-500 hover:bg-red-600';
    if (score <= 8) return 'bg-yellow-500 hover:bg-yellow-600';
    return 'bg-green-500 hover:bg-green-600';
  };

  return (
    <div className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* NPS Score Selection */}
        <div>
          <label className="block text-lg font-semibold text-gray-900 mb-4">
            How likely are you to recommend us to a friend or colleague?
          </label>

          <div className="grid grid-cols-11 gap-2 mb-2">
            {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((score) => (
              <button
                key={score}
                type="button"
                onClick={() => handleScoreClick(score)}
                className={`aspect-square rounded-lg font-bold text-white transition-all ${
                  selectedScore === score
                    ? `${getScoreColor(score)} ring-4 ring-offset-2 ring-primary scale-110`
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
              >
                {score}
              </button>
            ))}
          </div>

          <div className="flex justify-between text-sm text-gray-600 mt-2">
            <span>Not likely at all</span>
            <span>Extremely likely</span>
          </div>

          {selectedScore !== null && (
            <div className="mt-4 text-center">
              <span className="inline-block px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 font-medium">
                {getScoreLabel(selectedScore)} - Score: {selectedScore}/10
              </span>
            </div>
          )}

          {errors.score && (
            <p className="mt-2 text-sm text-red-600">{errors.score}</p>
          )}
        </div>

        {/* Client Name */}
        <div>
          <label
            htmlFor="client_name"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your Name *
          </label>
          <input
            type="text"
            id="client_name"
            name="client_name"
            value={formData.client_name}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.client_name ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="John Doe"
          />
          {errors.client_name && (
            <p className="mt-1 text-sm text-red-600">{errors.client_name}</p>
          )}
        </div>

        {/* Client Email (optional) */}
        <div>
          <label
            htmlFor="client_email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your Email (optional)
          </label>
          <input
            type="email"
            id="client_email"
            name="client_email"
            value={formData.client_email}
            onChange={handleChange}
            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
              errors.client_email ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="john@example.com"
          />
          {errors.client_email && (
            <p className="mt-1 text-sm text-red-600">{errors.client_email}</p>
          )}
        </div>

        {/* Comment */}
        <div>
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            What could we improve? (optional)
          </label>
          <textarea
            id="comment"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary resize-none"
            placeholder="Share your thoughts..."
          />
        </div>

        {/* API Error */}
        {apiError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{apiError}</p>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full px-6 py-4 bg-primary text-white rounded-lg font-semibold text-lg hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:shadow-lg"
        >
          {loading ? 'Submitting...' : 'Submit Feedback'}
        </button>
      </form>
    </div>
  );
}
