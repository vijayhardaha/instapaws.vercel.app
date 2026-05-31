import type { JSX } from 'react';

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { incrementViewCount } from '@/lib/actions/videos';
import { fetchVideoById } from '@/lib/data/videos';

import { VideoDetailClient } from './video-detail-client';

/**
 * Props for the video detail page.
 *
 * @type {Props}
 * @property {Promise<{ id: string }>} params - Route parameters including video ID.
 */
interface Props {
  params: Promise<{ id: string }>;
}

/**
 * Generate metadata for the video detail page.
 *
 * @param {{ params: Promise<{ id: string }> }} props - Component props.
 * @param {{ id: string }} [props.params] - Route parameters including video ID.
 *
 * @returns {JSX.Element} The page metadata.
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const video = await fetchVideoById(id);
  if (!video) return { title: 'Video Not Found' };

  return { title: `${video.abuseType.replace('-', ' ')} — Video Report`, description: video.description.slice(0, 160) };
}

/**
 * Video detail page — shows video report with content warning gate.
 *
 * @param {{ params: Promise<{ id: string }> }} props - Component props.
 * @param {{ id: string }} [props.params] - Route parameters including video ID.
 *
 * @returns {Promise<JSX.Element>} The video detail page content.
 */
export default async function VideoDetailPage({ params }: Props): Promise<JSX.Element> {
  const { id } = await params;
  const video = await fetchVideoById(id);
  if (!video) notFound();

  await incrementViewCount(id);

  return <VideoDetailClient video={video} />;
}
