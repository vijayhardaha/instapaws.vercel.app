// =======================================================================
// Supabase Server Client — uses cookies for auth
// =======================================================================

import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

import { isSupabaseConfigured, supabaseUrl, supabasePublishableKey } from './config';
import type { Database } from './database.types';

export type SupabaseServerClient = ReturnType<typeof createSupabaseClient<Database>>;

/**
 * Create a Supabase server client using cookie-based auth.
 *
 * @returns {Promise<SupabaseServerClient>} Configured Supabase server client instance.
 */
export async function createClient(): Promise<SupabaseServerClient> {
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabasePublishableKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll().map(({ name, value }) => ({ name, value }));
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options));
        } catch {
          // setAll called from Server Component — ignore
        }
      },
    },
  });
}

/**
 * Get a Supabase server client, returning null if Supabase is not configured.
 *
 * @returns {Promise<SupabaseServerClient | null>} The Supabase client, or null if not configured.
 */
export async function getSupabaseServerClient(): Promise<SupabaseServerClient | null> {
  if (!isSupabaseConfigured()) return null;
  return createClient();
}
