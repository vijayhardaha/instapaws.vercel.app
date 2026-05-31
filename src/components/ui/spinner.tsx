import { type ComponentProps, type JSX } from 'react';

import { Loader2Icon } from 'lucide-react';

import { cn } from '@/lib/utils';

interface SpinnerProps extends ComponentProps<'svg'> {}

/**
 * Loading spinner icon.
 *
 * @param {SpinnerProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} The spinner element.
 *
 * @type {SpinnerProps}
 */
function Spinner({ className, ...props }: SpinnerProps): JSX.Element {
  return <Loader2Icon role="status" aria-label="Loading" className={cn('size-4 animate-spin', className)} {...props} />;
}

export { Spinner };
