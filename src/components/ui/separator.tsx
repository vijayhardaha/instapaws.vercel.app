'use client';

import { type ComponentProps, type JSX } from 'react';

import { Separator as SeparatorPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

interface SeparatorProps extends ComponentProps<typeof SeparatorPrimitive.Root> {}

/**
 * Separator / divider line.
 *
 * @param {SeparatorProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {string} [props.orientation] - Separator orientation.
 * @param {boolean} [props.decorative] - Whether the separator is purely decorative.
 *
 * @returns {JSX.Element} The separator element.
 *
 * @type {SeparatorProps}
 */
function Separator({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: SeparatorProps): JSX.Element {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={cn(
        [
          // Base styling
          'bg-border shrink-0',
          // Horizontal orientation
          'data-horizontal:h-px data-horizontal:w-full',
          // Vertical orientation
          'data-vertical:w-px data-vertical:self-stretch',
        ].join(' '),
        className
      )}
      {...props}
    />
  );
}

export { Separator };
