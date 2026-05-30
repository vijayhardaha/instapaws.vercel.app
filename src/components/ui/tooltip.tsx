'use client';

import { type ComponentProps, type JSX } from 'react';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

/**
 * Tooltip component built on Radix UI Tooltip primitive.
 *
 * @param {unknown} props - Component props extending Radix Tooltip root.
 *
 * @returns {JSX.Element} A tooltip trigger wrapping the children.
 */
function Tooltip({ ...props }: ComponentProps<typeof TooltipPrimitive.Root>): JSX.Element {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

export { Tooltip };
