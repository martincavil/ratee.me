import { createClient } from '@supabase/supabase-js';

/**
 * Create a Supabase admin client that BYPASSES Row Level Security
 * Use ONLY in API routes where you need admin access
 *
 * ⚠️ WARNING: This client has full access to all data!
 * Only use when absolutely necessary and always validate permissions manually
 *
 * Usage:
 * import { createAdminClient } from '@/lib/supabase/admin';
 * const supabase = createAdminClient();
 */
export function createAdminClient() {
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error('SUPABASE_SERVICE_ROLE_KEY is not set');
  }

  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    }
  );
}
