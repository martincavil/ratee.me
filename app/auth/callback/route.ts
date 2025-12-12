import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * GET /auth/callback
 * Handle email confirmation callback from Supabase
 * Exchanges the code for a session and redirects to dashboard
 */
export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') ?? '/dashboard';

  const supabase = await createClient();

  // Check if user is already authenticated
  const { data: { user: existingUser } } = await supabase.auth.getUser();

  // If user is already logged in and no code is provided, redirect to dashboard
  if (existingUser && !code) {
    return NextResponse.redirect(new URL(next, requestUrl.origin));
  }

  if (code) {
    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      // Redirect to dashboard or specified page
      return NextResponse.redirect(new URL(next, requestUrl.origin));
    }

    // If there's an error, redirect to login with error message
    return NextResponse.redirect(
      new URL(`/auth/login?error=${encodeURIComponent(error.message)}`, requestUrl.origin)
    );
  }

  // No code provided and not authenticated, redirect to home
  return NextResponse.redirect(new URL('/', requestUrl.origin));
}
