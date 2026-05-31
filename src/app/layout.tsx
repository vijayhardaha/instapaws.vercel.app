import type { ReactNode } from 'react';

import { GoogleAnalytics } from '@next/third-parties/google';
import type { Metadata, Viewport } from 'next';

import { VercelAnalytics } from '@/components/shared/vercel-analytics';
import { fontClassNames } from '@/lib/fonts';
import { siteUrl } from '@/lib/utils/url';

import './globals.css';

const BASE_URL = siteUrl();
const GA_ID = process.env.NEXT_PUBLIC_GA_ID;

// ---- Metadata ----
export const metadata: Metadata = {
  title: { default: 'InstaPaws — Exposing Instagram Videos Where Dogs Are Harmed', template: '%s | InstaPaws' },
  description:
    'A collection hub for compassion. Report, archive, and take action against Instagram videos showing cruelty, neglect, and abuse toward dogs.',
  keywords: [
    'dog abuse videos',
    'instagram animal cruelty',
    'report dog abuse',
    'animal welfare',
    'compassion for dogs',
    'expose dog harm',
  ],
  authors: [{ name: 'InstaPaws' }],
  creator: 'InstaPaws',
  publisher: 'InstaPaws',
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: 'InstaPaws — See It. Report It. Protect Them.',
    description:
      'Exposing Instagram videos where dogs are being harmed. A compassion-driven collection hub for accountability and action.',
    url: BASE_URL,
    siteName: 'InstaPaws',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'InstaPaws — Stop Dog Abuse on Instagram',
    description: 'Collecting, exposing, and reporting Instagram videos of dog cruelty. Compassion through action.',
    site: '@instapaws',
  },
  robots: { index: true, follow: true },
  other: { 'content-warning': 'This site contains disturbing content showing harm to dogs' },
};

export const viewport: Viewport = { themeColor: '#2C2C2C', width: 'device-width', initialScale: 1 };

/**
 * Root layout — defines <html> and <body> tags, font loading.
 * Metadata is handled above.
 *
 * @param {unknown} props - Component props.
 * @param {unknown} props.children - Child content to render.
 *
 * @returns {ReactNode} The root HTML document structure.
 */
export default function RootLayout({ children }: Readonly<{ children: ReactNode }>): ReactNode {
  return (
    <html
      lang="en"
      className={`${fontClassNames} h-full font-sans text-base font-medium antialiased`}
      data-scroll-behavior="smooth"
    >
      <body className="flex min-h-full flex-col">
        {children}
        {process.env.NODE_ENV === 'production' && GA_ID && <GoogleAnalytics gaId={GA_ID} />}
        {process.env.NODE_ENV === 'production' && <VercelAnalytics />}
      </body>
    </html>
  );
}
