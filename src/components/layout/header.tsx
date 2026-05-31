'use client';

import { useState, type JSX } from 'react';

import { Menu, X } from 'lucide-react';

import { Container } from '@/components/layout/container';
import { NavLinks } from '@/components/layout/nav-links';
import { SiteLogo } from '@/components/layout/site-logo';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

/**
 * Site header with logo, navigation, and mobile hamburger menu.
 *
 * @returns {JSX.Element} The header element.
 */
export function Header(): JSX.Element {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-border bg-background/95 sticky top-0 z-50 border-b backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <SiteLogo />

        {/* Desktop nav */}
        <NavLinks className="hidden md:flex" />

        {/* Mobile menu button */}
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </Container>

      {/* Mobile navigation */}
      <div
        className={cn(
          'border-border overflow-hidden border-t transition-all duration-200 md:hidden',
          mobileOpen ? 'max-h-96' : 'max-h-0'
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="px-4 py-3">
          <NavLinks mobile />
        </div>
      </div>
    </header>
  );
}
