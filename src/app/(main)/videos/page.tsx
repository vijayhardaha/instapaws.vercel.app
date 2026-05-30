import type { Metadata } from 'next';

import { fetchVideos } from '@/lib/data/videos';

import { VideoLibraryClient } from './video-library-client';

export const metadata: Metadata = {
  title: 'Video Library',
  description:
    'Search and browse archived Instagram videos showing cruelty, neglect, and abuse toward dogs. Each entry includes context, status, and action taken.',
};

/**
 * Video Library page — server component shell that fetches data and passes to client.
 */
export default async function VideoLibraryPage() {
  const { videos, total } = await fetchVideos({ pageSize: 100 });

  return <VideoLibraryClient initialVideos={videos} initialTotal={total} />;
}
