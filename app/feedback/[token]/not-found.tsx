import Link from 'next/link';

export default function FeedbackNotFound() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Error Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-red-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
          </div>
        </div>

        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Invalid Feedback Link
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          This feedback link is invalid or has expired.
        </p>

        {/* Message */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            The feedback link you're trying to access doesn't exist or is no longer valid.
          </p>

          <p className="text-gray-600">
            If you believe this is an error, please contact the person who sent you this
            link.
          </p>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-lg"
          >
            Go to ratee.me Homepage
          </Link>

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
