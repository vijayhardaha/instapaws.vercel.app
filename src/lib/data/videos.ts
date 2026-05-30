// =======================================================================
// Data Fetching — Videos & Success Stories
// =======================================================================

import { getMockVideos, getMockVideoById, getRecentMockVideos, MOCK_SUCCESS_STORIES } from '@/lib/constants';
import { isSupabaseConfigured } from '@/lib/supabase/config';
import type { Database } from '@/lib/supabase/database.types';
import { createClient } from '@/lib/supabase/server';
import type { VideoReport, SuccessStory } from '@/lib/types';

type DbVideo = Database['public']['Tables']['videos']['Row'];

/**
 * Convert DB row → app VideoReport type.
 *
 * @param row
 */
function dbVideoToReport(row: DbVideo): VideoReport {
  return {
    id: row.id,
    instagramUrl: row.instagram_url,
    embedUrl: row.embed_url,
    thumbnailUrl: row.thumbnail_url,
    abuseType: row.abuse_type,
    description: row.description,
    location: row.location ?? undefined,
    reportedAt: row.reported_at,
    reportedToInstagramAt: row.reported_to_instagram_at ?? undefined,
    instagramResponse: row.instagram_response ?? undefined,
    status: row.status,
    moderationStatus: row.moderation_status,
    moderatedBy: row.moderated_by ?? undefined,
    moderatedAt: row.moderated_at ?? undefined,
    moderatorNotes: row.moderator_notes ?? undefined,
    viewCount: row.view_count,
    isGraphic: row.is_graphic,
  };
}

/**
 * Convert DB success_story row → app SuccessStory type.
 *
 * @param row
 */
function dbStoryToStory(row: Database['public']['Tables']['success_stories']['Row']): SuccessStory {
  return {
    id: row.id,
    title: row.title,
    summary: row.summary,
    outcome: row.outcome,
    videoId: row.video_id ?? undefined,
    date: row.date,
    imageUrl: row.image_url ?? undefined,
  };
}

export interface VideoFilters {
  search?: string;
  abuseType?: string;
  status?: string;
  showGraphic?: boolean;
  sortBy?: 'newest' | 'oldest' | 'status';
  page?: number;
  pageSize?: number;
}

/**
 * Fetch videos with filters, search, sort, and pagination.
 *
 * @param filters
 */
export async function fetchVideos(filters: VideoFilters = {}): Promise<{ videos: VideoReport[]; total: number }> {
  if (!isSupabaseConfigured()) {
    let videos = getMockVideos().filter((v) => v.moderationStatus === 'approved');
    const total = videos.length;
    return { videos, total };
  }

  const { search, abuseType, status, showGraphic = false, sortBy = 'newest', page = 1, pageSize = 12 } = filters;

  try {
    const supabase = await createClient();
    let query = supabase.from('videos').select('*', { count: 'exact' }).eq('moderation_status', 'approved');

    if (!showGraphic) query = query.eq('is_graphic', false);
    if (abuseType && abuseType !== 'all') query = query.eq('abuse_type', abuseType);
    if (status && status !== 'all') query = query.eq('status', status);
    if (search) {
      query = query.or(`description.ilike.%${search}%,location.ilike.%${search}%`);
    }

    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    if (sortBy === 'newest') query = query.order('reported_at', { ascending: false });
    else if (sortBy === 'oldest') query = query.order('reported_at', { ascending: true });
    else query = query.order('status', { ascending: true });

    query = query.range(from, to);

    const { data, error, count } = await query;
    if (error) throw error;

    return { videos: (data ?? []).map(dbVideoToReport), total: count ?? 0 };
  } catch {
    return { videos: getMockVideos().filter((v) => v.moderationStatus === 'approved'), total: 0 };
  }
}

/**
 * Fetch a single video by ID.
 *
 * @param id
 */
export async function fetchVideoById(id: string): Promise<VideoReport | null> {
  if (!isSupabaseConfigured()) {
    return getMockVideoById(id) ?? null;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('videos').select('*').eq('id', id).single();

    if (error || !data) return null;
    return dbVideoToReport(data);
  } catch {
    return getMockVideoById(id) ?? null;
  }
}

/**
 * Fetch recent approved videos for the homepage.
 *
 * @param count
 */
export async function fetchRecentVideos(count = 3): Promise<VideoReport[]> {
  if (!isSupabaseConfigured()) {
    return getRecentMockVideos(count);
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('moderation_status', 'approved')
      .order('reported_at', { ascending: false })
      .limit(count);

    if (error || !data) return getRecentMockVideos(count);
    return data.map(dbVideoToReport);
  } catch {
    return getRecentMockVideos(count);
  }
}

/** Fetch all unmoderated videos. */
export async function fetchUnmoderatedVideos(): Promise<VideoReport[]> {
  if (!isSupabaseConfigured()) {
    return getMockVideos().filter((v) => v.moderationStatus === 'unmoderated');
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('moderation_status', 'unmoderated')
      .order('reported_at', { ascending: false });

    if (error || !data) return [];
    return data.map(dbVideoToReport);
  } catch {
    return [];
  }
}

/** Fetch all success stories. */
export async function fetchSuccessStories(): Promise<SuccessStory[]> {
  if (!isSupabaseConfigured()) {
    return MOCK_SUCCESS_STORIES;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.from('success_stories').select('*').order('date', { ascending: false });

    if (error || !data) return MOCK_SUCCESS_STORIES;
    return data.map(dbStoryToStory);
  } catch {
    return MOCK_SUCCESS_STORIES;
  }
}
