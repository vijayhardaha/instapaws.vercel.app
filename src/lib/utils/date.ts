/**
 * Date formatting utilities for the InstaPaws project.
 */

type DateStyle = 'short' | 'long' | 'numeric';

const FORMATTERS: Record<DateStyle, Intl.DateTimeFormatOptions> = {
  short: { month: 'short', day: 'numeric', year: 'numeric' },
  long: { year: 'numeric', month: 'long', day: 'numeric' },
  numeric: {},
};

const INVALID_DATE_FALLBACK = '—';

/**
 * Safely parse a date string, returning null for invalid dates.
 *
 * @param {string} dateStr - ISO date string
 *
 * @returns {Date | null} Parsed date object, or null if the input is invalid.
 */
function parseSafe(dateStr: string): Date | null {
  const d = new Date(dateStr);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Format a date string to a human-readable format.
 * Returns '—' for invalid dates.
 *
 * @param {string} dateStr - ISO date string
 * @param {DateStyle} style - 'short' (Jan 1, 2026), 'long' (January 1, 2026), or 'numeric'
 *
 * @returns {string} Formatted date string, or '—' for invalid dates.
 */
export function formatDate(dateStr: string, style: DateStyle = 'short'): string {
  const d = parseSafe(dateStr);
  return d ? d.toLocaleDateString('en-US', FORMATTERS[style]) : INVALID_DATE_FALLBACK;
}

/**
 * Format a date string relative to now (e.g., "2 days ago").
 * Returns '—' for invalid dates.
 *
 * @param {string} dateStr - ISO date string
 *
 * @returns {string} Relative time string (e.g., '2 days ago'), or '—' for invalid dates.
 */
export function timeAgo(dateStr: string): string {
  const d = parseSafe(dateStr);
  if (!d) return INVALID_DATE_FALLBACK;

  const now = Date.now();
  const then = d.getTime();
  const diffMs = now - then;
  const seconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'just now';
}
