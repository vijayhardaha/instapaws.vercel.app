'use client';

import { type ComponentProps } from 'react';

import { HoverCard as HoverCardPrimitive } from 'radix-ui';

/**
 * Hover card — shows content on hover.
 *
 * @param {unknown} props - Component props forwarded to the Radix root.
 *
 * @returns {unknown} The hover card component.
 */
function HoverCard({ ...props }: ComponentProps<typeof HoverCardPrimitive.Root>) {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

export { HoverCard };
