'use client';

import { type ComponentProps, type JSX } from 'react';

import { HoverCard as HoverCardPrimitive } from 'radix-ui';

/**
 * Hover card — shows content on hover.
 *
 * @param {unknown} props - Component props forwarded to the Radix root.
 *
 * @returns {JSX.Element} The hover card component.
 */
function HoverCard({ ...props }: ComponentProps<typeof HoverCardPrimitive.Root>): JSX.Element {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

export { HoverCard };
