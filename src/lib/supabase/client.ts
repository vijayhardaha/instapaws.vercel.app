// =======================================================================
// Supabase Browser Client — singleton per browser session
// =======================================================================

import { createBrowserClient } from '@supabase/ssr';

import { isSupabaseConfigured, supabaseUrl, supabaseAnonKey } from './config';
import type { Database } from './database.types';

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 *
 */
export function createClient() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured');
  }

  if (client) return client;

  client = createBrowserClient<Database>(supabaseUrl, supabaseAnonKey, { isSingleton: true });

  return client;
}

/**
 * Get a Supabase browser client or null if not configured.
 */
export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) return null;
  return createClient();
}
