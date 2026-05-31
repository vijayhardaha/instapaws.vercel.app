import { type ComponentProps, type JSX } from 'react';

import { cn } from '@/lib/utils';

interface CardProps extends ComponentProps<'div'> {
  /** Card size variant. */
  size?: 'default' | 'sm';
}

/**
 * Card container component.
 *
 * @param {CardProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {'default' | 'sm'} [props.size] - Card size variant.
 *
 * @returns {JSX.Element} The card element.
 *
 * @type {CardProps}
 */
function Card({ className, size = 'default', ...props }: CardProps): JSX.Element {
  return (
    <div
      data-slot="card"
      data-size={size}
      className={cn(
        [
          // Layout and sizing
          'group/card flex flex-col gap-4 overflow-hidden rounded-xl py-4',
          // Background and styling
          'bg-card text-card-foreground ring-foreground/10 ring-1',
          // Footer states
          'has-data-[slot=card-footer]:pb-0',
          // Image styling
          'has-[>img:first-child]:pt-0 *:[img:first-child]:rounded-t-xl *:[img:last-child]:rounded-b-xl',
          // Small size variant
          'data-[size=sm]:gap-3 data-[size=sm]:py-3 data-[size=sm]:has-data-[slot=card-footer]:pb-0',
        ].join(' '),
        className
      )}
      {...props}
    />
  );
}

interface CardHeaderProps extends ComponentProps<'div'> {}

/**
 * Card header section.
 *
 * @param {CardHeaderProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} The card header element.
 *
 * @type {CardHeaderProps}
 */
function CardHeader({ className, ...props }: CardHeaderProps): JSX.Element {
  return (
    <div
      data-slot="card-header"
      className={cn(
        [
          // Layout and grid
          'group/card-header @container/card-header grid auto-rows-min items-start gap-1',
          // Styling
          'rounded-t-xl px-4',
          // With action slot
          'has-data-[slot=card-action]:grid-cols-[1fr_auto]',
          // With description
          'has-data-[slot=card-description]:grid-rows-[auto_auto]',
          // Border styling
          '[.border-b]:pb-4',
          // Small size variant
          'group-data-[size=sm]/card:px-3 group-data-[size=sm]/card:[.border-b]:pb-3',
        ].join(' '),
        className
      )}
      {...props}
    />
  );
}

interface CardTitleProps extends ComponentProps<'div'> {}

/**
 * Card title subcomponent.
 *
 * @param {CardTitleProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} The card title element.
 *
 * @type {CardTitleProps}
 */
function CardTitle({ className, ...props }: CardTitleProps): JSX.Element {
  return (
    <div
      data-slot="card-title"
      className={cn(
        [
          // Text styling
          'font-heading text-base leading-snug font-semibold',
          // Small size variant
          'group-data-[size=sm]/card:text-sm',
        ].join(' '),
        className
      )}
      {...props}
    />
  );
}

interface CardDescriptionProps extends ComponentProps<'div'> {}

/**
 * Card description subcomponent.
 *
 * @param {CardDescriptionProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} The card description element.
 *
 * @type {CardDescriptionProps}
 */
function CardDescription({ className, ...props }: CardDescriptionProps): JSX.Element {
  return <div data-slot="card-description" className={cn('text-muted-foreground text-sm', className)} {...props} />;
}

interface CardActionProps extends ComponentProps<'div'> {}

/**
 * Card action subcomponent — positioned in the top-right of the header.
 *
 * @param {CardActionProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} The card action element.
 *
 * @type {CardActionProps}
 */
function CardAction({ className, ...props }: CardActionProps): JSX.Element {
  return (
    <div
      data-slot="card-action"
      className={cn('col-start-2 row-span-2 row-start-1 self-start justify-self-end', className)}
      {...props}
    />
  );
}

interface CardContentProps extends ComponentProps<'div'> {}

/**
 * Card content section.
 *
 * @param {CardContentProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} The card content element.
 *
 * @type {CardContentProps}
 */
function CardContent({ className, ...props }: CardContentProps): JSX.Element {
  return <div data-slot="card-content" className={cn('px-4 group-data-[size=sm]/card:px-3', className)} {...props} />;
}

interface CardFooterProps extends ComponentProps<'div'> {}

/**
 * Card footer section.
 *
 * @param {CardFooterProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} The card footer element.
 *
 * @type {CardFooterProps}
 */
function CardFooter({ className, ...props }: CardFooterProps): JSX.Element {
  return (
    <div
      data-slot="card-footer"
      className={cn(
        [
          // Layout
          'flex items-center',
          // Styling
          'bg-muted/50 rounded-b-xl border-t p-4',
          // Small size variant
          'group-data-[size=sm]/card:p-3',
        ].join(' '),
        className
      )}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent };
