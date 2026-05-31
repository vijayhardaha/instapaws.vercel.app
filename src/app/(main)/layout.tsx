import type { ReactNode } from 'react';

import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';
import { SiteWarningGate } from '@/components/warnings/site-warning-gate';

/**
 * Main site layout — wraps all public pages with header, emergency banner,
 * content area, and footer.
 *
 * @param {{ children: ReactNode }} props - Component props.
 * @param {ReactNode} [props.children] - Child content to render.
 *
 * @returns {ReactNode} The layout with header, content, and footer.
 */
export default function MainLayout({ children }: { children: ReactNode }): ReactNode {
  return (
    <>
      <SiteWarningGate />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
