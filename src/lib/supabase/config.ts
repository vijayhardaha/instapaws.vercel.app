// =======================================================================
// Supabase Environment Detection
// =======================================================================

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

/**
 *
 */
export function isSupabaseConfigured(): boolean {
  return (
    !!SUPABASE_URL
    && !!SUPABASE_ANON_KEY
    && SUPABASE_URL !== 'your-project-url'
    && SUPABASE_ANON_KEY !== 'your-anon-key'
  );
}

export const supabaseUrl = SUPABASE_URL ?? '';
export const supabaseAnonKey = SUPABASE_ANON_KEY ?? '';
export const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
