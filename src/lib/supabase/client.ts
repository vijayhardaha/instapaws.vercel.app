// =======================================================================
// Supabase Browser Client — singleton per browser session
// =======================================================================

import { createBrowserClient } from '@supabase/ssr';

import { isSupabaseConfigured, supabaseUrl, supabasePublishableKey } from './config';
import type { Database } from './database.types';

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;

/**
 * Create or return the singleton Supabase browser client.
 *
 * @returns {ReturnType<typeof createBrowserClient<Database>>} The Supabase browser client instance.
 *
 * @throws {Error} Throws if Supabase is not configured.
 */
export function createClient() {
  if (!isSupabaseConfigured()) {
    throw new Error('Supabase is not configured');
  }

  if (client) return client;

  client = createBrowserClient<Database>(supabaseUrl, supabasePublishableKey, { isSingleton: true });

  return client;
}

/**
 * Get a Supabase browser client, returning null if Supabase is not configured.
 *
 * @returns {ReturnType<typeof createBrowserClient<Database>> | null} The Supabase client, or null if not configured.
 */
export function getSupabaseBrowserClient() {
  if (!isSupabaseConfigured()) return null;
  return createClient();
}
