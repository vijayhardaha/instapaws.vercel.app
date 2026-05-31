import { type ComponentProps, type JSX } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';

import { cn } from '@/lib/utils';

/**
 * Base button classes applied to all button variants and sizes.
 */
const baseClasses = [
  // Layout and sizing
  'group/button inline-flex shrink-0 items-center justify-center',
  // Border and background
  'rounded-lg border border-transparent bg-clip-padding',
  // Text styling
  'text-sm font-semibold whitespace-nowrap',
  // Transitions and interactions
  'transition-all outline-none select-none cursor-pointer',
  // Focus states
  'focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50',
  // Active and disabled states
  'active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50',
  // Aria-invalid states
  'aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20',
  'dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
  // SVG styling
  "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
];

/**
 * Default button variant with primary background and hover state.
 *
 * @returns {string} CSS class string for default variant.
 */
function getDefaultVariant(): string {
  return ['bg-primary text-primary-foreground', 'hover:bg-primary/80'].join(' ');
}

/**
 * Outline button variant with border and transparent background.
 *
 * @returns {string} CSS class string for outline variant.
 */
function getOutlineVariant(): string {
  return [
    'border-border bg-background',
    'hover:bg-muted hover:text-foreground',
    'aria-expanded:bg-muted aria-expanded:text-foreground',
    'dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
  ].join(' ');
}

/**
 * Secondary button variant with secondary color and color-mix hover.
 *
 * @returns {string} CSS class string for secondary variant.
 */
function getSecondaryVariant(): string {
  return [
    'bg-secondary text-secondary-foreground',
    'hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]',
    'aria-expanded:bg-secondary aria-expanded:text-secondary-foreground',
  ].join(' ');
}

/**
 * Ghost button variant with transparent background and hover highlight.
 *
 * @returns {string} CSS class string for ghost variant.
 */
function getGhostVariant(): string {
  return [
    'hover:bg-muted hover:text-foreground',
    'aria-expanded:bg-muted aria-expanded:text-foreground',
    'dark:hover:bg-muted/50',
  ].join(' ');
}

/**
 * Destructive button variant with destructive color and warning states.
 *
 * @returns {string} CSS class string for destructive variant.
 */
function getDestructiveVariant(): string {
  return [
    'bg-destructive text-destructive-foreground',
    'hover:bg-destructive/90',
    'focus-visible:border-destructive/40 focus-visible:ring-destructive/20',
    'dark:bg-destructive dark:hover:bg-destructive/30 dark:focus-visible:ring-destructive/40',
  ].join(' ');
}

/**
 * Link button variant with text-only styling and underline on hover.
 *
 * @returns {string} CSS class string for link variant.
 */
function getLinkVariant(): string {
  return ['text-primary', 'underline-offset-4 hover:underline'].join(' ');
}

// Size functions

/**
 * Default button size with standard height and padding.
 *
 * @returns {string} CSS class string for default size.
 */
function getDefaultSize(): string {
  return ['h-9 gap-1.5 px-4', 'has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2'].join(' ');
}

/**
 * Extra small button size with compact height and padding.
 *
 * @returns {string} CSS class string for extra small size.
 */
function getXsSize(): string {
  return [
    'h-7 gap-1 px-2 text-xs rounded-[min(var(--radius-md),10px)]',
    'in-data-[slot=button-group]:rounded-lg',
    'has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
    "[&_svg:not([class*='size-'])]:size-3",
  ].join(' ');
}

/**
 * Small button size with reduced height and padding.
 *
 * @returns {string} CSS class string for small size.
 */
function getSmSize(): string {
  return [
    'h-8 gap-1 px-3 text-[0.8rem] rounded-[min(var(--radius-md),12px)]',
    'in-data-[slot=button-group]:rounded-lg',
    'has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5',
    "[&_svg:not([class*='size-'])]:size-3.5",
  ].join(' ');
}

/**
 * Large button size with increased height and padding.
 *
 * @returns {string} CSS class string for large size.
 */
function getLgSize(): string {
  return ['h-10 gap-1.5 px-5', 'has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2'].join(' ');
}

/**
 * Fixed icon button size (square).
 *
 * @returns {string} CSS class string for icon size.
 */
function getIconSize(): string {
  return 'size-8';
}

/**
 * Extra small fixed icon button size (square).
 *
 * @returns {string} CSS class string for extra small icon size.
 */
function getIconXsSize(): string {
  return [
    'size-6 rounded-[min(var(--radius-md),10px)]',
    'in-data-[slot=button-group]:rounded-lg',
    "[&_svg:not([class*='size-'])]:size-3",
  ].join(' ');
}

/**
 * Small fixed icon button size (square).
 *
 * @returns {string} CSS class string for small icon size.
 */
function getIconSmSize(): string {
  return ['size-7 rounded-[min(var(--radius-md),12px)]', 'in-data-[slot=button-group]:rounded-lg'].join(' ');
}

/**
 * Large fixed icon button size (square).
 *
 * @returns {string} CSS class string for large icon size.
 */
function getIconLgSize(): string {
  return 'size-9';
}

/**
 * Variant classes object mapping variant names to their CSS class strings.
 */
const variantClasses = {
  default: getDefaultVariant(),
  outline: getOutlineVariant(),
  secondary: getSecondaryVariant(),
  ghost: getGhostVariant(),
  destructive: getDestructiveVariant(),
  link: getLinkVariant(),
};

/**
 * Size classes object mapping size names to their CSS class strings.
 */
const sizeClasses = {
  default: getDefaultSize(),
  xs: getXsSize(),
  sm: getSmSize(),
  lg: getLgSize(),
  icon: getIconSize(),
  'icon-xs': getIconXsSize(),
  'icon-sm': getIconSmSize(),
  'icon-lg': getIconLgSize(),
};

const buttonVariants = cva(baseClasses.join(' '), {
  variants: { variant: variantClasses, size: sizeClasses },
  defaultVariants: { variant: 'default', size: 'default' },
});

/**
 * Button component with variants and sizes.
 *
 * @param {unknown} props - Component props.
 * @param {unknown} props.className - Additional CSS classes.
 * @param {unknown} props.variant - Visual variant.
 * @param {unknown} props.size - Button size.
 * @param {unknown} props.asChild - Whether to render as a child of the parent.
 *
 * @returns {JSX.Element} The button element.
 */
function Button({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: ComponentProps<'button'> & VariantProps<typeof buttonVariants> & { asChild?: boolean }): JSX.Element {
  const Comp = asChild ? Slot.Root : 'button';

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
