'use client';

import { type ComponentProps, type JSX } from 'react';

import { Tooltip as TooltipPrimitive } from 'radix-ui';

interface TooltipProps extends ComponentProps<typeof TooltipPrimitive.Root> {}

/**
 * Tooltip component built on Radix UI Tooltip primitive.
 *
 * @param {TooltipProps} props - Component props extending Radix Tooltip root.
 *
 * @returns {JSX.Element} A tooltip trigger wrapping the children.
 *
 * @type {TooltipProps}
 */
function Tooltip({ ...props }: TooltipProps): JSX.Element {
  return <TooltipPrimitive.Root data-slot="tooltip" {...props} />;
}

export { Tooltip };
