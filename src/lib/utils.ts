import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export { formatDate, timeAgo } from '@/lib/utils/date';
export { siteUrl, getPermaLink } from '@/lib/utils/url';

/**
 * Merge Tailwind CSS class names, resolving conflicts via tailwind-merge.
 *
 * @param {...ClassValue[]} inputs - Class values to merge (strings, objects, arrays).
 *
 * @returns {string} Merged class string with conflicting Tailwind classes resolved.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
