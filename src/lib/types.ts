// =======================================================================
// InstaPaws Type Definitions
// =======================================================================

// ---- Abuse Types ----

/** Supported abuse type categories for video reports. */
export type AbuseType =
  | 'physical-abuse'
  | 'neglect'
  | 'fighting'
  | 'baiting'
  | 'sexual-abuse'
  | 'hoarding'
  | 'abandonment'
  | 'other';

/** Human-readable labels for each abuse type category. */
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

/** Possible statuses for a video report throughout its lifecycle. */
export type ReportStatus =
  | 'pending-review'
  | 'under-investigation'
  | 'confirmed'
  | 'action-taken'
  | 'dismissed'
  | 'escalated';

/** Human-readable labels for each report status. */
export const REPORT_STATUS_LABELS: Record<ReportStatus, string> = {
  'pending-review': 'Pending Review',
  'under-investigation': 'Under Investigation',
  confirmed: 'Confirmed',
  'action-taken': 'Action Taken',
  dismissed: 'Dismissed',
  escalated: 'Escalated to Authorities',
};

/** Badge variant mapping for each report status. */
export const REPORT_STATUS_VARIANTS: Record<ReportStatus, 'default' | 'secondary' | 'destructive' | 'outline'> = {
  'pending-review': 'outline',
  'under-investigation': 'secondary',
  confirmed: 'default',
  'action-taken': 'default',
  dismissed: 'outline',
  escalated: 'destructive',
};

// ---- Moderation ----

/** Moderation status for a video report. */
export type ModerationStatus = 'unmoderated' | 'approved' | 'rejected';

// ---- Video Report ----

/**
 * A video report submitted for review.
 *
 * @type {VideoReport}
 * @property {string} id - Unique identifier for the report.
 * @property {string} instagramUrl - URL of the original Instagram video.
 * @property {string} embedUrl - URL for embedded video playback.
 * @property {string} thumbnailUrl - URL of the video thumbnail image.
 * @property {AbuseType} abuseType - Category of abuse reported.
 * @property {string} description - Description of the reported content.
 * @property {string} [location] - Optional location where the abuse occurred.
 * @property {string} reportedAt - ISO timestamp when the report was submitted.
 * @property {string} [reportedToInstagramAt] - ISO timestamp when reported to Instagram.
 * @property {string} [instagramResponse] - Response received from Instagram.
 * @property {ReportStatus} status - Current lifecycle status of the report.
 * @property {ModerationStatus} moderationStatus - Internal moderation review status.
 * @property {string} [moderatedBy] - Moderator who reviewed the report.
 * @property {string} [moderatedAt] - ISO timestamp when moderation occurred.
 * @property {string} [moderatorNotes] - Notes from the moderator review.
 * @property {number} viewCount - Number of times the report has been viewed.
 * @property {boolean} isGraphic - Whether the content is graphic/disturbing.
 */
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

/**
 * A success story showcasing a positive outcome from a report.
 *
 * @type {SuccessStory}
 * @property {string} id - Unique identifier for the story.
 * @property {string} title - Story title or headline.
 * @property {string} summary - Brief summary of the story.
 * @property {string} outcome - Description of the positive outcome.
 * @property {string} [videoId] - Associated video report ID.
 * @property {string} date - ISO date when the story occurred.
 * @property {string} [imageUrl] - Optional image URL for the story.
 */
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

/**
 * Aggregate statistics displayed on the homepage.
 *
 * @type {SiteStats}
 * @property {number} videosFlagged - Total number of videos flagged.
 * @property {number} videosRemoved - Number of videos removed after action.
 * @property {number} investigationsOpened - Number of investigations initiated.
 * @property {number} dogsRescued - Number of dogs rescued through reports.
 */
export interface SiteStats {
  videosFlagged: number;
  videosRemoved: number;
  investigationsOpened: number;
  dogsRescued: number;
}

// ---- Navigation ----

/**
 * A single navigation link item.
 *
 * @type {NavItem}
 * @property {string} label - Display text for the navigation link.
 * @property {string} href - URL or route path for the link.
 * @property {boolean} [external] - Whether the link opens in a new tab.
 */
export interface NavItem {
  label: string;
  href: string;
  external?: boolean;
}
