import type { ReactNode } from 'react';

import { EmergencyBanner } from '@/components/layout/emergency-banner';
import { Footer } from '@/components/layout/footer';
import { Header } from '@/components/layout/header';

/**
 * Main site layout — wraps all public pages with header, emergency banner,
 * content area, and footer.
 *
 * @param root0
 * @param root0.children
 */
export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <EmergencyBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
