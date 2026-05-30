import { type ComponentProps } from 'react';

import { cn } from '@/lib/utils';

/**
 * Pagination navigation component.
 *
 * @param {unknown} props - Component props.
 * @param {unknown} props.className - Additional CSS classes.
 *
 * @returns {unknown} The pagination navigation element.
 */
function Pagination({ className, ...props }: ComponentProps<'nav'>) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={cn('mx-auto flex w-full justify-center', className)}
      {...props}
    />
  );
}

export { Pagination };
