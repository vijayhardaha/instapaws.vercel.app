import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { incrementViewCount } from '@/lib/actions/videos';
import { fetchVideoById } from '@/lib/data/videos';

import { VideoDetailClient } from './video-detail-client';

interface Props {
  params: Promise<{ id: string }>;
}

/**
 *
 * @param root0
 * @param root0.params
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const video = await fetchVideoById(id);
  if (!video) return { title: 'Video Not Found' };

  return { title: `${video.abuseType.replace('-', ' ')} — Video Report`, description: video.description.slice(0, 160) };
}

/**
 *
 * @param root0
 * @param root0.params
 */
export default async function VideoDetailPage({ params }: Props) {
  const { id } = await params;
  const video = await fetchVideoById(id);
  if (!video) notFound();

  await incrementViewCount(id);

  return <VideoDetailClient video={video} />;
}
