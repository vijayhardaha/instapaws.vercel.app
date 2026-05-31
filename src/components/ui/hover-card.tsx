'use client';

import { type ComponentProps, type JSX } from 'react';

import { HoverCard as HoverCardPrimitive } from 'radix-ui';

interface HoverCardProps extends ComponentProps<typeof HoverCardPrimitive.Root> {}

/**
 * Hover card — shows content on hover.
 *
 * @param {HoverCardProps} props - Component props forwarded to the Radix root.
 *
 * @returns {JSX.Element} The hover card component.
 *
 * @type {HoverCardProps}
 */
function HoverCard({ ...props }: HoverCardProps): JSX.Element {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />;
}

export { HoverCard };
