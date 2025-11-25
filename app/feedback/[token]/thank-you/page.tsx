import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Success Icon */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
            <svg
              className="w-12 h-12 text-green-600"
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
        </div>

        {/* Header */}
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
          Thank You!
        </h1>

        <p className="text-xl text-gray-600 mb-8">
          Your feedback has been successfully submitted.
        </p>

        {/* Message */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-200 p-8 mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            We really appreciate you taking the time to share your thoughts with
            us. Your feedback helps us improve and deliver better results.
          </p>

          <p className="text-gray-600">
            If you have any additional questions or concerns, feel free to reach
            out to us directly.
          </p>
        </div>

        {/* CTA */}
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-block px-8 py-3 bg-primary text-white rounded-lg font-semibold hover:bg-primary/90 transition-all hover:shadow-lg"
          >
            Learn More About ratee.me
          </Link>

          <p className="text-sm text-gray-500">
            Powered by{" "}
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
