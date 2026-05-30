import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { SiteLogo } from '@/components/layout/site-logo';
import { Separator } from '@/components/ui/separator';
import { FOOTER_NAV_COLUMNS, SITE } from '@/lib/constants';

/**
 * Site footer with navigation columns, tagline, and legal disclaimer.
 *
 * @returns {unknown} The footer element.
 */
export function Footer() {
  return (
    <footer className="border-border bg-muted/50 border-t">
      <Container className="py-12">
        {/* Top section: Logo + nav columns */}
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 lg:grid-cols-5">
          {/* Brand column */}
          <div className="col-span-2 sm:col-span-3 lg:col-span-1">
            <SiteLogo />
            <p className="text-muted-foreground mt-3 text-xs font-semibold tracking-widest uppercase">{SITE.tagline}</p>
            <p className="text-muted-foreground mt-2 text-sm leading-relaxed">{SITE.description}</p>
          </div>

          {/* Nav columns */}
          {FOOTER_NAV_COLUMNS.map((column) => (
            <div key={column.title}>
              <h3 className="text-muted-foreground mb-3 text-base font-bold tracking-wide uppercase">{column.title}</h3>
              <ul className="space-y-2">
                {column.items.map((item) => (
                  <li key={item.label}>
                    <Link
                      href={item.href}
                      className="text-foreground/70 hover:text-foreground text-sm transition-colors"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        {/* Bottom section: disclaimer + copyright */}
        <div className="flex flex-col gap-2">
          <p className="text-muted-foreground shrink-0 text-sm">
            &copy; {SITE.year} {SITE.name}. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm leading-relaxed">
            <strong className="font-semibold">Disclaimer:</strong> InstaPaws does not host, store, or control any of the
            videos displayed on this site. All content is embedded from Instagram and is used for reporting, criticism,
            and awareness purposes under fair use. We manually review all submissions before publication.
          </p>
        </div>
      </Container>
    </footer>
  );
}
