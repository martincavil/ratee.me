import { requireAdmin } from '@/lib/supabase/auth';
import Link from 'next/link';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Require admin access - redirects to dashboard if not admin
  await requireAdmin();

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center gap-8">
              <Link href="/admin/beta" className="font-bold text-xl text-gray-900">
                Admin
              </Link>
              <div className="flex gap-4">
                <Link
                  href="/admin/beta"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Beta Invites
                </Link>
                <Link
                  href="/admin/waitlist"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Waitlist
                </Link>
                <Link
                  href="/admin/email-logs"
                  className="text-gray-600 hover:text-gray-900 font-medium"
                >
                  Email Logs
                </Link>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/dashboard"
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Dashboard
              </Link>
            </div>
          </div>
        </div>
      </nav>
      <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
