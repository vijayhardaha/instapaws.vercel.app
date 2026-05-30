// =======================================================================
// Supabase Server Client — uses cookies for auth
// =======================================================================

import { createServerClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';

import { isSupabaseConfigured, supabaseUrl, supabaseAnonKey } from './config';
import type { Database } from './database.types';

export type SupabaseServerClient = ReturnType<typeof createSupabaseClient<Database>>;

/**
 *
 */
export async function createClient(): Promise<SupabaseServerClient> {
  const cookieStore = await cookies();

  return createServerClient<Database>(supabaseUrl, supabaseAnonKey, {
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

/** Get a Supabase server client or null if not configured. */
export async function getSupabaseServerClient() {
  if (!isSupabaseConfigured()) return null;
  return createClient();
}
