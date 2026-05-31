'use client';

import type { JSX } from 'react';

import { Analytics, type BeforeSendEvent } from '@vercel/analytics/next';

/**
 * Client wrapper for Vercel Analytics.
 * Extracted to a client component so the `beforeSend` callback
 * can be passed directly without Server Component restrictions.
 *
 * @returns {JSX.Element} The Vercel Analytics component.
 */
export function VercelAnalytics(): JSX.Element {
  return (
    <Analytics
      mode="production"
      beforeSend={(event: BeforeSendEvent) => {
        if (event.url.includes('/moderate')) {
          return null;
        }
        return event;
      }}
    />
  );
}
