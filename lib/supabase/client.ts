import { createBrowserClient } from '@supabase/ssr';

/**
 * Create a Supabase client for use in browser/client components
 * This client respects RLS policies and uses the anon key
 *
 * Usage:
 * import { createClient } from '@/lib/supabase/client';
 * const supabase = createClient();
 */
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
