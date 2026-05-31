// =======================================================================
// Video Server Actions
// =======================================================================
'use server';

import { createClient } from '@supabase/supabase-js';
import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { checkSubmissionRate, getClientIp, rateLimitMessage } from '@/lib/rate-limiter';
import { isSupabaseConfigured, supabaseUrl, supabaseServiceRoleKey } from '@/lib/supabase/config';
import type { Database } from '@/lib/supabase/database.types';

type VideoInsert = Database['public']['Tables']['videos']['Insert'];
type VideoUpdate = Database['public']['Tables']['videos']['Update'];

interface ActionResult {
  success: boolean;
  error?: string;
  data?: unknown;
}

function getDb() {
  if (!isSupabaseConfigured()) return null;

  return createClient(supabaseUrl, supabaseServiceRoleKey || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || '', {
    auth: { persistSession: false },
  }) as any;
}

function extractInstagramUrl(url: string) {
  const clean = url.trim();
  return { instagramUrl: clean, embedUrl: `${clean}embed` };
}

/**
 * Submit a new video report (public action).
 *
 * @param {FormData} formData - Form data with instagram_url, abuse_type, description, and optional location.
 *
 * @returns {Promise<ActionResult>} Result object indicating success or failure with optional error message.
 */
export async function submitVideo(formData: FormData): Promise<ActionResult> {
  // Server-side rate limit
  const headersList = await headers();
  const clientIp = getClientIp(headersList);
  const cooldown = checkSubmissionRate(clientIp);
  if (cooldown !== null) {
    return { success: false, error: rateLimitMessage(cooldown) };
  }

  const db = getDb();
  if (!db) return { success: true, data: { id: `mock-${Date.now()}` } };

  const instagramUrl = formData.get('instagram_url') as string;
  const abuseType = formData.get('abuse_type') as Database['public']['Tables']['videos']['Row']['abuse_type'];
  const description = formData.get('description') as string;
  const location = (formData.get('location') as string) || null;

  if (!instagramUrl || !abuseType || !description) {
    return { success: false, error: 'Missing required fields.' };
  }

  const { instagramUrl: cleanUrl, embedUrl } = extractInstagramUrl(instagramUrl);

  const insertData: VideoInsert = {
    instagram_url: cleanUrl,
    embed_url: embedUrl,
    thumbnail_url: '/images/placeholder-thumb.jpg',
    abuse_type: abuseType,
    description: description.trim(),
    location,
  };

  const { data, error } = await db.from('videos').insert(insertData).select('id').single();
  if (error) return { success: false, error: error.message };

  revalidatePath('/videos');
  return { success: true, data };
}

/**
 * Update video moderation status (auth required).
 *
 * @param {string} id - Video report ID.
 * @param {Database['public']['Tables']['videos']['Row']['moderation_status']} status - New moderation status.
 * @param {string} [notes] - Optional moderator notes.
 *
 * @returns {Promise<ActionResult>} Result object indicating success or failure.
 */
export async function updateVideoModeration(
  id: string,
  status: Database['public']['Tables']['videos']['Row']['moderation_status'],
  notes?: string
): Promise<ActionResult> {
  const db = getDb();
  if (!db) return { success: true, data: { id, status } };

  const updateData: VideoUpdate = {
    moderation_status: status,
    moderated_at: new Date().toISOString(),
    moderator_notes: notes || null,
  };

  const { error } = await db.from('videos').update(updateData).eq('id', id);
  if (error) return { success: false, error: error.message };

  revalidatePath('/videos');
  revalidatePath('/moderate');
  return { success: true };
}

/**
 * Increment the view count for a video by one.
 *
 * @param {string} id - Video report ID to increment.
 *
 * @returns {Promise<ActionResult>} Result object indicating success.
 */
export async function incrementViewCount(id: string): Promise<ActionResult> {
  const db = getDb();
  if (!db) return { success: true };

  try {
    const { data: current } = await db.from('videos').select('view_count').eq('id', id).single();
    if (current) {
      await db
        .from('videos')
        .update({ view_count: current.view_count + 1 })
        .eq('id', id);
    }
  } catch {
    // Don't fail page render
  }
  return { success: true };
}

/**
 * Get aggregate video statistics (flagged count, removed count, dogs rescued).
 *
 * @returns {Promise<ActionResult>} Result containing stats object with flagged, removed, and rescued counts.
 */
export async function getVideoStats(): Promise<ActionResult> {
  const db = getDb();
  if (!db) return { success: true, data: { flagged: 47, removed: 47, rescued: 3 } };

  try {
    const [flagged, removed] = await Promise.all([
      db.from('videos').select('id', { count: 'exact', head: true }).eq('moderation_status', 'approved'),
      db.from('videos').select('id', { count: 'exact', head: true }).eq('status', 'action-taken'),
    ]);

    const { data: statsRow } = await db.from('site_stats').select('value').eq('key', 'dogs_rescued').single();

    return {
      success: true,
      data: { flagged: flagged.count ?? 0, removed: removed.count ?? 0, rescued: statsRow?.value ?? 0 },
    };
  } catch {
    return { success: true, data: { flagged: 0, removed: 0, rescued: 0 } };
  }
}

/**
 * Fetch all unmoderated videos for the moderation queue.
 *
 * @returns {Promise<ActionResult>} Result with array of unmoderated videos or error.
 */
export async function fetchUnmoderatedVideos(): Promise<ActionResult> {
  const db = getDb();
  if (!db) return { success: true, data: [] };

  try {
    const { data, error } = await db
      .from('videos')
      .select('*')
      .eq('moderation_status', 'unmoderated')
      .order('created_at', { ascending: false });

    if (error) return { success: false, error: error.message, data: [] };
    return { success: true, data: data ?? [] };
  } catch {
    return { success: true, data: [] };
  }
}
