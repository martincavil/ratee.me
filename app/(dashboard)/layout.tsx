import { requireAuth, getUserProfile } from '@/lib/supabase/auth';
import { Navbar } from '@/components/shared/navbar';

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Require authentication - redirects to /login if not authenticated
  await requireAuth();

  // Get user profile for navbar
  const profile = await getUserProfile();

  if (!profile) {
    // This shouldn't happen, but handle gracefully
    throw new Error('User profile not found');
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar user={profile} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
