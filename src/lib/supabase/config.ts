// =======================================================================
// Supabase Environment Detection
// =======================================================================

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

/**
 * Check whether Supabase environment variables are configured with real values.
 *
 * @returns {boolean} True if all required env vars are set and contain non-placeholder values.
 */
export function isSupabaseConfigured(): boolean {
  return (
    !!SUPABASE_URL
    && !!SUPABASE_PUBLISHABLE_KEY
    && SUPABASE_URL !== 'your-project-url'
    && SUPABASE_PUBLISHABLE_KEY !== 'your-publishable-key'
  );
}

export const supabaseUrl = SUPABASE_URL ?? '';
export const supabasePublishableKey = SUPABASE_PUBLISHABLE_KEY ?? '';
export const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
