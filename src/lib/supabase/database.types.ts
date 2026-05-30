// =======================================================================
// Supabase Database Types — auto-generated pattern
// =======================================================================

export type AbuseTypeEnum =
  | 'physical-abuse'
  | 'neglect'
  | 'fighting'
  | 'baiting'
  | 'sexual-abuse'
  | 'hoarding'
  | 'abandonment'
  | 'other';

export type ReportStatusEnum =
  | 'pending-review'
  | 'under-investigation'
  | 'confirmed'
  | 'action-taken'
  | 'dismissed'
  | 'escalated';

export type ModerationStatusEnum = 'unmoderated' | 'approved' | 'rejected';

export interface Database {
  public: {
    Tables: {
      videos: {
        Row: {
          id: string;
          instagram_url: string;
          embed_url: string;
          thumbnail_url: string;
          abuse_type: AbuseTypeEnum;
          description: string;
          location: string | null;
          status: ReportStatusEnum;
          moderation_status: ModerationStatusEnum;
          is_graphic: boolean;
          view_count: number;
          reported_at: string;
          reported_to_instagram_at: string | null;
          instagram_response: string | null;
          moderated_by: string | null;
          moderated_at: string | null;
          moderator_notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          instagram_url: string;
          embed_url: string;
          thumbnail_url: string;
          abuse_type: AbuseTypeEnum;
          description: string;
          location?: string | null;
          status?: ReportStatusEnum;
          moderation_status?: ModerationStatusEnum;
          is_graphic?: boolean;
          view_count?: number;
          reported_at?: string;
          reported_to_instagram_at?: string | null;
          instagram_response?: string | null;
          moderated_by?: string | null;
          moderated_at?: string | null;
          moderator_notes?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          instagram_url?: string;
          embed_url?: string;
          thumbnail_url?: string;
          abuse_type?: AbuseTypeEnum;
          description?: string;
          location?: string | null;
          status?: ReportStatusEnum;
          moderation_status?: ModerationStatusEnum;
          is_graphic?: boolean;
          view_count?: number;
          reported_at?: string;
          reported_to_instagram_at?: string | null;
          instagram_response?: string | null;
          moderated_by?: string | null;
          moderated_at?: string | null;
          moderator_notes?: string | null;
          created_at?: string;
        };
      };
      success_stories: {
        Row: {
          id: string;
          title: string;
          summary: string;
          outcome: string;
          video_id: string | null;
          date: string;
          image_url: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          summary: string;
          outcome: string;
          video_id?: string | null;
          date: string;
          image_url?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          summary?: string;
          outcome?: string;
          video_id?: string | null;
          date?: string;
          image_url?: string | null;
          created_at?: string;
        };
      };
      site_stats: {
        Row: { key: string; value: number; updated_at: string };
        Insert: { key: string; value: number; updated_at?: string };
        Update: { key?: string; value?: number; updated_at?: string };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: { abuse_type: AbuseTypeEnum; report_status: ReportStatusEnum; moderation_status: ModerationStatusEnum };
  };
}
