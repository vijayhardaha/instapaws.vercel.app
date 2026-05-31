'use client';

import { type ComponentProps, type JSX } from 'react';

import { Label as LabelPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

interface LabelProps extends ComponentProps<typeof LabelPrimitive.Root> {}

/**
 * Label component.
 *
 * @param {LabelProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} The label element.
 *
 * @type {LabelProps}
 */
function Label({ className, ...props }: LabelProps): JSX.Element {
  return (
    <LabelPrimitive.Root
      data-slot="label"
      className={cn(
        [
          // Layout
          'flex items-center gap-2',
          // Text styling
          'text-sm leading-none font-semibold',
          // Interaction
          'cursor-pointer select-none',
          // Group disabled state
          'group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50',
          // Peer disabled state
          'peer-disabled:cursor-not-allowed peer-disabled:opacity-50',
        ].join(' '),
        className
      )}
      {...props}
    />
  );
}

export { Label };
