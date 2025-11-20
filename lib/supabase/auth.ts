import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import { ROUTES, ADMIN_EMAILS } from '@/lib/constants';

/**
 * Get the current authenticated user (Server Components only)
 * Returns null if not authenticated
 *
 * Usage:
 * const user = await getUser();
 * if (!user) redirect('/login');
 */
export async function getUser() {
  const supabase = await createClient();

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return null;
  }

  return user;
}

/**
 * Require authentication - throws and redirects if not logged in
 * Use in Server Components that need auth
 *
 * Usage:
 * const user = await requireAuth();
 * // user is guaranteed to be defined here
 */
export async function requireAuth() {
  const user = await getUser();

  if (!user) {
    redirect(ROUTES.LOGIN);
  }

  return user;
}

/**
 * Get the current session (with tokens)
 * Returns null if no active session
 *
 * Usage:
 * const session = await getSession();
 */
export async function getSession() {
  const supabase = await createClient();

  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error || !session) {
    return null;
  }

  return session;
}

/**
 * Get user profile from database (joins auth.users with public.users)
 * Returns null if not authenticated or profile doesn't exist
 *
 * Usage:
 * const profile = await getUserProfile();
 */
export async function getUserProfile() {
  const user = await getUser();
  if (!user) return null;

  const supabase = await createClient();

  const { data, error } = await supabase
    .from('users')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

/**
 * Sign out the current user
 * Use in Server Actions
 *
 * Usage:
 * await signOut();
 */
export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect(ROUTES.LOGIN);
}

/**
 * Check if the current user is an admin
 * Returns true if user email is in ADMIN_EMAILS list
 */
export async function isAdmin() {
  const user = await getUser();
  if (!user?.email) return false;
  return ADMIN_EMAILS.includes(user.email as typeof ADMIN_EMAILS[number]);
}

/**
 * Require admin access - redirects to dashboard if not admin
 * Use in Server Components for admin pages
 */
export async function requireAdmin() {
  const user = await requireAuth();

  if (!user.email || !ADMIN_EMAILS.includes(user.email as typeof ADMIN_EMAILS[number])) {
    redirect(ROUTES.DASHBOARD);
  }

  return user;
}
