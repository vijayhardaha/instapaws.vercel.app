'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { MAIN_NAV } from '@/lib/constants';
import { cn } from '@/lib/utils';

/**
 * Navigation links with active state tracking.
 * Client component to use usePathname().
 *
 * @param root0
 * @param root0.className
 * @param root0.mobile
 */
export function NavLinks({ className, mobile }: { className?: string; mobile?: boolean }) {
  const pathname = usePathname();

  return (
    <nav className={className} aria-label="Main navigation">
      <ul className={cn('flex items-center gap-1', mobile && 'flex-col items-stretch gap-1')}>
        {MAIN_NAV.map((item) => {
          const isActive = item.href === '/' ? pathname === '/' : pathname.startsWith(item.href);

          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  'inline-flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors',
                  isActive ? 'bg-muted text-foreground' : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  mobile && 'w-full justify-start'
                )}
                aria-current={isActive ? 'page' : undefined}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
