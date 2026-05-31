import { type ComponentProps, type JSX } from 'react';

import { cn } from '@/lib/utils';

interface PaginationProps extends ComponentProps<'nav'> {}

/**
 * Pagination navigation component.
 *
 * @param {PaginationProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} The pagination navigation element.
 *
 * @type {PaginationProps}
 */
function Pagination({ className, ...props }: PaginationProps): JSX.Element {
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
