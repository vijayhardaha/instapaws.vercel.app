// =======================================================================
// InstaPaws Type Definitions
// =======================================================================

// ---- Abuse Types ----
export type AbuseType =
  | 'physical-abuse'
  | 'neglect'
  | 'fighting'
  | 'baiting'
  | 'sexual-abuse'
  | 'hoarding'
  | 'abandonment'
  | 'other';

export const ABUSE_TYPE_LABELS: Record<AbuseType, string> = {
  'physical-abuse': 'Physical Abuse',
  neglect: 'Neglect / Starvation',
  fighting: 'Dog Fighting',
  baiting: 'Baiting',
  'sexual-abuse': 'Sexual Abuse',
  hoarding: 'Hoarding',
  abandonment: 'Abandonment',
  other: 'Other',
};

// ---- Report Status ----
export type ReportStatus =
  | 'pending-review'
  | 'under-investigation'
  | 'confirmed'
  | 'action-taken'
  | 'dismissed'
  | 'escalated';

export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  'pending-review': 'Pending Review',
  'under-investigation': 'Under Investigation',
  confirmed: 'Confirmed',
  'action-taken': 'Action Taken',
  dismissed: 'Dismissed',
  escalated: 'Escalated to Authorities',
};

export const REPORT_STATUS_VARIANTS: Record<ReportStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  'pending-review': 'outline',
  'under-investigation': 'secondary',
  confirmed: 'default',
  'action-taken': 'default',
  dismissed: 'outline',
  escalated: 'destructive',
};

// ---- Moderation ----
export type ModerationStatus = 'unmoderated' | 'approved' | 'rejected';

// ---- Video Report ----
export interface VideoReport {
  id: string;
  instagramUrl: string;
  embedUrl: string;
  thumbnailUrl: string;
  abuseType: AbuseType;
  description: string;
  location?: string;
  reportedAt: string;
  reportedToInstagramAt?: string;
  instagramResponse?: string;
  status: ReportStatus;
  moderationStatus: ModerationStatus;
  moderatedBy?: string;
  moderatedAt?: string;
  moderatorNotes?: string;
  viewCount: number;
  isGraphic: boolean;
}

// ---- Success Story ----
export interface SuccessStory {
  id: string;
  title: string;
  summary: string;
  outcome: string;
  videoId?: string;
  date: string;
  imageUrl?: string;
}

// ---- Site Stats ----
export interface SiteStats {
  videosFlagged: number;
  videosRemoved: number;
  investigationsOpened: number;
  dogsRescued: number;
}

// ---- Navigation ----
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}
