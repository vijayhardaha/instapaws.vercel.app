import { type ComponentProps, type JSX } from 'react';

import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

/**
 * Loading spinner icon.
 *
 * @param {unknown} props - Component props.
 * @param {unknown} props.className - Additional CSS classes.
 *
 * @returns {JSX.Element} The spinner element.
 */
function Spinner({ className, ...props }: ComponentProps<'svg'>): JSX.Element {
  return <Loader2Icon role="status" aria-label="Loading" className={cn('size-4 animate-spin', className)} {...props} />;
}

export { Spinner };
