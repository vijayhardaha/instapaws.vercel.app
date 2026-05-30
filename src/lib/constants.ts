// =======================================================================
// InstaPaws Constants & Site Configuration
// =======================================================================

import { siteUrl } from '@/lib/utils/url';

import type { NavItem, SiteStats, SuccessStory, VideoReport } from './types';

// ---- Site Metadata ----
export const SITE = {
  name: 'InstaPaws',
  tagline: 'See. Report. Protect.',
  description:
    'A collection hub for compassion. Report, archive, and take action against Instagram videos showing cruelty, neglect, and abuse toward dogs.',
  get url() {
    return siteUrl();
  },
  email: 'contact@instapaws.com',
  contentWarning: 'This site contains disturbing content showing harm to dogs.',
  year: new Date().getFullYear(),
} as const;

// ---- Navigation ----
export const MAIN_NAV: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Video Library', href: '/videos' },
  { label: 'Submit a Video', href: '/submit' },
  { label: 'Take Action', href: '/rescue' },
  { label: 'About', href: '/about' },
];

export const FOOTER_NAV_COLUMNS: { title: string; items: NavItem[] }[] = [
  {
    title: 'Site',
    items: [
      { label: 'Home', href: '/' },
      { label: 'Video Library', href: '/videos' },
      { label: 'Submit a Video', href: '/submit' },
      { label: 'Success Stories', href: '/success-stories' },
    ],
  },
  {
    title: 'Learn',
    items: [
      { label: 'How to Identify Abuse', href: '/identify-abuse' },
      { label: 'Take Action', href: '/rescue' },
      { label: 'About InstaPaws', href: '/about' },
    ],
  },
  {
    title: 'Engage',
    items: [
      { label: 'Petition Instagram', href: '/petition' },
      { label: 'Donate', href: '/donate' },
      { label: 'Contact Us', href: '/contact' },
    ],
  },
  {
    title: 'Legal',
    items: [
      { label: 'Terms & Disclaimer', href: '/legal' },
      { label: 'Privacy Policy', href: '/legal' },
      { label: 'DMCA Policy', href: '/legal' },
    ],
  },
];

// ---- Site Stats ----
export const SITE_STATS: SiteStats = { videosFlagged: 47, videosRemoved: 47, investigationsOpened: 14, dogsRescued: 3 };

// ---- Mock Video Reports ----
const MOCK_VIDEOS: VideoReport[] = [
  {
    id: 'vid-001',
    instagramUrl: 'https://www.instagram.com/p/example1/',
    embedUrl: 'https://www.instagram.com/p/example1/embed',
    thumbnailUrl: '/images/placeholder-thumb.jpg',
    abuseType: 'physical-abuse',
    description:
      'Video shows a person repeatedly kicking a dog in a residential area. The dog appears to be cowering and whimpering.',
    location: 'Urban area, reported coordinates masked',
    reportedAt: '2026-05-28T10:30:00Z',
    reportedToInstagramAt: '2026-05-28T11:00:00Z',
    instagramResponse: 'Content removed after review',
    status: 'action-taken',
    moderationStatus: 'approved',
    viewCount: 342,
    isGraphic: true,
  },
  {
    id: 'vid-002',
    instagramUrl: 'https://www.instagram.com/p/example2/',
    embedUrl: 'https://www.instagram.com/p/example2/embed',
    thumbnailUrl: '/images/placeholder-thumb.jpg',
    abuseType: 'neglect',
    description:
      'Dog left chained up without food or water in extreme heat. Video shows the dog emaciated and distressed.',
    reportedAt: '2026-05-27T14:00:00Z',
    status: 'under-investigation',
    moderationStatus: 'approved',
    viewCount: 128,
    isGraphic: false,
  },
  {
    id: 'vid-003',
    instagramUrl: 'https://www.instagram.com/p/example3/',
    embedUrl: 'https://www.instagram.com/p/example3/embed',
    thumbnailUrl: '/images/placeholder-thumb.jpg',
    abuseType: 'fighting',
    description:
      'Graphic footage of dogs being forced to fight in a makeshift ring. Distressed barking and visible injuries.',
    location: 'Location hidden for safety',
    reportedAt: '2026-05-25T09:15:00Z',
    reportedToInstagramAt: '2026-05-25T09:30:00Z',
    status: 'action-taken',
    moderationStatus: 'approved',
    viewCount: 891,
    isGraphic: true,
  },
  {
    id: 'vid-004',
    instagramUrl: 'https://www.instagram.com/p/example4/',
    embedUrl: 'https://www.instagram.com/p/example4/embed',
    thumbnailUrl: '/images/placeholder-thumb.jpg',
    abuseType: 'baiting',
    description: 'Small animal being used as bait to train fighting dogs. Extremely graphic content.',
    reportedAt: '2026-05-26T16:45:00Z',
    status: 'pending-review',
    moderationStatus: 'unmoderated',
    viewCount: 0,
    isGraphic: true,
  },
  {
    id: 'vid-005',
    instagramUrl: 'https://www.instagram.com/p/example5/',
    embedUrl: 'https://www.instagram.com/p/example5/embed',
    thumbnailUrl: '/images/placeholder-thumb.jpg',
    abuseType: 'abandonment',
    description: 'Dog left tied to a fence outside a shelter after hours. No food, water, or shelter provided.',
    location: 'Rural area, shelter parking lot',
    reportedAt: '2026-05-24T08:00:00Z',
    reportedToInstagramAt: '2026-05-24T08:30:00Z',
    instagramResponse: 'Under review by Instagram',
    status: 'under-investigation',
    moderationStatus: 'approved',
    viewCount: 56,
    isGraphic: false,
  },
  {
    id: 'vid-006',
    instagramUrl: 'https://www.instagram.com/p/example6/',
    embedUrl: 'https://www.instagram.com/p/example6/embed',
    thumbnailUrl: '/images/placeholder-thumb.jpg',
    abuseType: 'physical-abuse',
    description:
      'Person striking a dog with an object. Video is being circulated as a "joke" but clearly shows distress.',
    reportedAt: '2026-05-23T19:20:00Z',
    status: 'dismissed',
    moderationStatus: 'rejected',
    moderatorNotes: 'Unable to verify context. Video quality too low to confirm abuse.',
    viewCount: 12,
    isGraphic: true,
  },
];

/**
 * Get all mock video reports.
 *
 * @returns {VideoReport[]} Array of mock video report objects.
 */
export function getMockVideos(): VideoReport[] {
  return MOCK_VIDEOS;
}

/**
 * Get a single mock video report by its ID.
 *
 * @param {string} id - Video report identifier.
 *
 * @returns {VideoReport | undefined} The matching video report, or undefined if not found.
 */
export function getMockVideoById(id: string): VideoReport | undefined {
  return MOCK_VIDEOS.find((v) => v.id === id);
}

/**
 * Get the most recent approved mock video reports.
 *
 * @param {number} count - Number of recent videos to return (default 3).
 *
 * @returns {VideoReport[]} Array of the most recently reported approved videos.
 */
export function getRecentMockVideos(count: number = 3): VideoReport[] {
  return MOCK_VIDEOS.filter((v) => v.moderationStatus === 'approved')
    .sort((a, b) => new Date(b.reportedAt).getTime() - new Date(a.reportedAt).getTime())
    .slice(0, count);
}

// ---- Mock Success Stories ----
export const MOCK_SUCCESS_STORIES: SuccessStory[] = [
  {
    id: 'story-001',
    title: 'Kicking Video Leads to Welfare Check',
    summary:
      'After being flagged on InstaPaws, the video was reported to local authorities who conducted a welfare check on the dog.',
    outcome: 'Dog removed from harmful environment',
    videoId: 'vid-001',
    date: '2026-05-30',
  },
  {
    id: 'story-002',
    title: 'Instagram Removes Fighting Ring Content',
    summary:
      'Three videos showing organized dog fighting were reported via our platform. Instagram removed all three within 48 hours.',
    outcome: 'Content removed, investigation ongoing',
    videoId: 'vid-003',
    date: '2026-05-28',
  },
  {
    id: 'story-003',
    title: 'Community Rallies for Abandoned Dog',
    summary:
      'A video of an abandoned dog led to community members organizing a rescue and finding the dog a foster home.',
    outcome: 'Dog rescued and rehomed',
    date: '2026-05-20',
  },
];
