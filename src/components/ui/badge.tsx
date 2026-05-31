import { type ComponentProps, type JSX } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

/**
 * Base badge classes applied to all badge variants.
 */
const baseClasses = [
  'group/badge inline-flex h-5 w-fit shrink-0 items-center justify-center gap-1',
  'overflow-hidden rounded-4xl border border-transparent px-2 py-0.5',
  'text-xs font-semibold whitespace-nowrap transition-all',
  'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
  'has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
  'aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40',
  '[&>svg]:pointer-events-none [&>svg]:size-3!',
];

/**
 * Default badge variant with primary background.
 *
 * @returns {string} CSS class string for default variant.
 */
function getDefaultVariant(): string {
  return 'bg-primary text-primary-foreground [a]:hover:bg-primary/80';
}

/**
 * Secondary badge variant with secondary background.
 *
 * @returns {string} CSS class string for secondary variant.
 */
function getSecondaryVariant(): string {
  return 'bg-secondary text-secondary-foreground [a]:hover:bg-secondary/80';
}

/**
 * Destructive badge variant with destructive color styling.
 *
 * @returns {string} CSS class string for destructive variant.
 */
function getDestructiveVariant(): string {
  return 'bg-destructive/10 text-destructive focus-visible:ring-destructive/20 dark:bg-destructive/20 dark:focus-visible:ring-destructive/40 [a]:hover:bg-destructive/20';
}

/**
 * Outline badge variant with border and transparent background.
 *
 * @returns {string} CSS class string for outline variant.
 */
function getOutlineVariant(): string {
  return 'border-border text-foreground [a]:hover:bg-muted [a]:hover:text-muted-foreground';
}

/**
 * Ghost badge variant with transparent background and hover highlight.
 *
 * @returns {string} CSS class string for ghost variant.
 */
function getGhostVariant(): string {
  return 'hover:bg-muted hover:text-muted-foreground dark:hover:bg-muted/50';
}

/**
 * Link badge variant with text-only styling and underline on hover.
 *
 * @returns {string} CSS class string for link variant.
 */
function getLinkVariant(): string {
  return 'text-primary underline-offset-4 hover:underline';
}

/**
 * Variant classes object mapping variant names to their CSS class strings.
 */
const variantClasses = {
  default: getDefaultVariant(),
  secondary: getSecondaryVariant(),
  destructive: getDestructiveVariant(),
  outline: getOutlineVariant(),
  ghost: getGhostVariant(),
  link: getLinkVariant(),
};

const badgeVariants = cva(baseClasses.join(' '), {
  variants: { variant: variantClasses },
  defaultVariants: { variant: 'default' },
});

/**
 * Badge component for labels, statuses, and tags.
 *
 * @param {unknown} props - Component props.
 * @param {unknown} props.className - Additional CSS classes.
 * @param {unknown} props.variant - Visual variant.
 * @param {unknown} props.asChild - Whether to render as a child of the parent.
 *
 * @returns {JSX.Element} The badge element.
 */
function Badge({
  className,
  variant = 'default',
  asChild = false,
  ...props
}: ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }): JSX.Element {
  const Comp = asChild ? Slot.Root : 'span';

  return (
    <Comp data-slot="badge" data-variant={variant} className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
