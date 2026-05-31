'use client';

import type { JSX } from 'react';

import { AlertTriangle, RefreshCw, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

/**
 * Global error boundary — shown when an unexpected error
 * occurs during rendering. Allows retry or navigation home.
 *
 * @param {{ error: Error & { digest?: string }; reset: () => void }} props - Component props.
 * @param {Error} [props.error] - The error that occurred.
 * @param {() => void} [props.reset] - Function to reset the error boundary.
 *
 * @returns {JSX.Element} The error page with retry and home navigation.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}): JSX.Element {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="bg-destructive/10 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
        <AlertTriangle className="text-destructive h-10 w-10" aria-hidden="true" />
      </div>

      <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">Something went wrong</h1>
      <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
        An unexpected error occurred. If this persists, please contact us.
      </p>

      {error.digest && (
        <p className="text-muted-foreground/50 mt-2 text-xs">
          Error ID: <code className="bg-muted rounded px-1.5 py-0.5">{error.digest}</code>
        </p>
      )}

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button onClick={reset}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Try Again
        </Button>
        <Button asChild variant="outline">
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
      </div>
    </div>
  );
}
