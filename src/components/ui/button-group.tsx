import { type ComponentProps, type JSX } from 'react';

import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

/**
 * Base button group classes for layout and focus management.
 */
const baseClasses = [
  'group/button-group flex w-fit items-stretch',
  '*:focus-visible:relative *:focus-visible:z-10',
  'has-[>[data-slot=button-group]]:gap-2',
  'has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-r-lg',
  "[&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit",
  '[&>input]:flex-1',
];

/**
 * Horizontal orientation variant with side-by-side layout.
 *
 * @returns {string} CSS class string for horizontal orientation.
 */
function getHorizontalOrientation(): string {
  return '[&>*:not(:first-child)]:rounded-l-none [&>*:not(:first-child)]:border-l-0 [&>*:not(:last-child)]:rounded-r-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-r-lg!';
}

/**
 * Vertical orientation variant with stacked layout.
 *
 * @returns {string} CSS class string for vertical orientation.
 */
function getVerticalOrientation(): string {
  return 'flex-col [&>*:not(:first-child)]:rounded-t-none [&>*:not(:first-child)]:border-t-0 [&>*:not(:last-child)]:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-lg!';
}

/**
 * Orientation classes object mapping orientation names to their CSS class strings.
 */
const orientationClasses = { horizontal: getHorizontalOrientation(), vertical: getVerticalOrientation() };

const buttonGroupVariants = cva(baseClasses.join(' '), {
  variants: { orientation: orientationClasses },
  defaultVariants: { orientation: 'horizontal' },
});

/**
 * Button group — horizontally or vertically groups buttons together.
 *
 * @param {unknown} props - Component props.
 * @param {unknown} props.className - Additional CSS classes.
 * @param {unknown} props.orientation - Layout orientation.
 *
 * @returns {JSX.Element} The button group element.
 */
function ButtonGroup({
  className,
  orientation,
  ...props
}: ComponentProps<'div'> & VariantProps<typeof buttonGroupVariants>): JSX.Element {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={cn(buttonGroupVariants({ orientation }), className)}
      {...props}
    />
  );
}

export { ButtonGroup };
