import { type ComponentPropsWithoutRef, forwardRef } from 'react';

import { cn } from '@/lib/utils';

const BASE_CLASSES = 'mx-auto max-w-6xl px-4 sm:px-6 lg:px-8';

/**
 * Full-width section container with responsive max-width and horizontal padding.
 * Pass additional classes (spacing, flex, text alignment, etc.) via `className`.
 *
 * @example
 *   <Container className="py-16">…</Container>
 *   <Container className="flex items-center gap-4 py-6">…</Container>
 */
export const Container = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(({ className, ...rest }, ref) => (
  <div ref={ref} className={cn(BASE_CLASSES, className)} {...rest} />
));

Container.displayName = 'Container';
