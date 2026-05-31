import type { JSX } from 'react';

import { ShieldAlert, ArrowLeft, Flag } from 'lucide-react';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

/**
 * Custom 404 page — informs the user the page doesn't exist
 * and offers clear navigation paths back into the site.
 *
 * @returns {JSX.Element} The not-found page content.
 */
export default function NotFound(): JSX.Element {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center px-4 py-16 text-center">
      <div className="bg-accent/10 mb-6 flex h-20 w-20 items-center justify-center rounded-full">
        <ShieldAlert className="text-accent h-10 w-10" aria-hidden="true" />
      </div>

      <h1 className="text-5xl font-extrabold tracking-tight sm:text-6xl">404</h1>
      <p className="text-muted-foreground mt-4 text-lg leading-relaxed">
        This page does not exist. It may have been removed, or the link you followed might be broken.
      </p>

      <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
        <Button asChild>
          <Link href="/">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Link>
        </Button>
        <Button asChild variant="outline">
          <Link href="/submit">
            <Flag className="mr-2 h-4 w-4" />
            Report a Video
          </Link>
        </Button>
      </div>

      <p className="text-muted-foreground/50 mt-12 text-xs">
        If you believe this is an error, please{' '}
        <Link href="/contact" className="text-accent underline underline-offset-2 hover:no-underline">
          contact us
        </Link>
        .
      </p>
    </div>
  );
}
