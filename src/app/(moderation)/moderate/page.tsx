import type { Metadata } from 'next';

import { fetchUnmoderatedVideos } from '@/lib/data/videos';

import { ModerateAuthGate } from './moderate-auth-gate';
import { ModerateClient } from './moderate-client';

export const metadata: Metadata = {
  title: 'Moderation Queue',
  description: 'Review and moderate submitted video reports before publication.',
};

/**
 * Moderation page — password-protected queue for reviewing
 * and approving/rejecting submitted video reports.
 *
 * @returns {unknown} The moderation page content.
 */
export default async function ModeratePage() {
  const videos = await fetchUnmoderatedVideos();
  return (
    <ModerateAuthGate>
      <ModerateClient initialVideos={videos} />
    </ModerateAuthGate>
  );
}
