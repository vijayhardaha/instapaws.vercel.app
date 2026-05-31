import type { ReactNode } from 'react';

import { ShieldCheck } from 'lucide-react';
import Link from 'next/link';

/**
 * Moderation layout — stripped-down layout without public site navigation.
 * Only a minimal top bar with a link back to the main site.
 *
 * @param {unknown} props - Component props.
 * @param {unknown} props.children - Child content to render.
 *
 * @returns {ReactNode} The moderation layout with minimal header.
 */
export default function ModerationLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <>
      <header className="border-border bg-background/95 sticky top-0 z-50 border-b backdrop-blur-sm">
        <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground flex items-center gap-2 text-xs font-semibold transition-colors"
          >
            <ShieldCheck className="h-3.5 w-3.5" />
            &larr; InstaPaws
          </Link>
          <span className="text-muted-foreground text-xs font-semibold tracking-widest uppercase">
            Moderation Queue
          </span>
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">{children}</main>
    </>
  );
}
