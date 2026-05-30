import type { Metadata, Viewport } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';

import './globals.css';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });

const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

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
  metadataBase: new URL('https://www.instapaws.com'),
  openGraph: {
    title: 'InstaPaws — See It. Report It. Protect Them.',
    description:
      'Exposing Instagram videos where dogs are being harmed. A compassion-driven collection hub for accountability and action.',
    url: 'https://www.instapaws.com',
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
 * @param root0
 * @param root0.children
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
