'use client';

import { type ComponentProps, type JSX } from 'react';

import { ChevronDownIcon, CheckIcon, ChevronUpIcon } from 'lucide-react';
import { Select as SelectPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

/**
 * Props for the select root component.
 *
 * @type {SelectProps}
 */
interface SelectProps extends ComponentProps<typeof SelectPrimitive.Root> {}

/**
 * Select dropdown component.
 *
 * @param {SelectProps} props - Component props forwarded to the Radix root.
 *
 * @returns {JSX.Element} The select component.
 */
function Select({ ...props }: SelectProps): JSX.Element {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

/**
 * Props for the select value display component.
 *
 * @type {SelectValueProps}
 */
interface SelectValueProps extends ComponentProps<typeof SelectPrimitive.Value> {}

/**
 * Select value display component.
 *
 * @param {SelectValueProps} props - Component props forwarded to the Radix value.
 *
 * @returns {JSX.Element} The select value element.
 */
function SelectValue({ ...props }: SelectValueProps): JSX.Element {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

/**
 * Props for the select trigger component.
 *
 * @type {SelectTriggerProps}
 * @property {string} [className] - Additional CSS classes.
 * @property {'sm' | 'default'} [size] - Trigger size variant.
 * @property {JSX.Element} [children] - Child content.
 */
interface SelectTriggerProps extends ComponentProps<typeof SelectPrimitive.Trigger> {
  size?: 'sm' | 'default';
}

/**
 * Select trigger button.
 *
 * @param {SelectTriggerProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {string} [props.size] - Trigger size variant.
 * @param {JSX.Element} [props.children] - Child content.
 *
 * @returns {JSX.Element} The select trigger element.
 */
function SelectTrigger({ className, size = 'default', children, ...props }: SelectTriggerProps): JSX.Element {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        [
          // Layout
          'flex w-fit items-center justify-between gap-1.5',
          // Border and background
          'border-input rounded-lg border bg-transparent',
          // Padding and sizing
          'py-2 pr-2 pl-2.5 data-[size=default]:h-8 data-[size=sm]:h-7',
          // Text styling
          'text-sm whitespace-nowrap select-none',
          // Interactions
          'transition-colors outline-none',
          // Placeholder
          'data-placeholder:text-muted-foreground',
          // Focus states
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
          // Disabled states
          'disabled:cursor-not-allowed disabled:opacity-50',
          // Aria-invalid states
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-3',
          // Small size variant
          'data-[size=sm]:rounded-[min(var(--radius-md),10px)]',
          // Dark mode
          'dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
          // Select value child
          '*:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5',
          // Icon styling
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        ].join(' '),
        className
      )}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className="text-muted-foreground pointer-events-none size-4" />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  );
}

/**
 * Props for the select dropdown content component.
 *
 * @type {SelectContentProps}
 * @property {string} [className] - Additional CSS classes.
 * @property {JSX.Element} [children] - Child content (option items).
 * @property {string} [position] - Positioning strategy.
 * @property {string} [align] - Content alignment.
 */
interface SelectContentProps extends ComponentProps<typeof SelectPrimitive.Content> {}

/**
 * Select dropdown content.
 *
 * @param {SelectContentProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {JSX.Element} [props.children] - Child content (option items).
 * @param {string} [props.position] - Positioning strategy.
 * @param {string} [props.align] - Content alignment.
 *
 * @returns {JSX.Element} The select content element.
 */
function SelectContent({
  className,
  children,
  position = 'item-aligned',
  align = 'center',
  ...props
}: SelectContentProps): JSX.Element {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        data-align-trigger={position === 'item-aligned'}
        className={cn(
          [
            // Layout and sizing
            'relative z-50 max-h-(--radix-select-content-available-height) min-w-36',
            // Overflow and origin
            'origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto',
            // Styling
            'bg-popover text-popover-foreground ring-foreground/10 rounded-lg shadow-md ring-1',
            // Animation - open state
            'data-open:animate-in data-open:fade-in-0 data-open:zoom-in-95',
            // Animation - closed state
            'data-closed:animate-out data-closed:fade-out-0 data-closed:zoom-out-95',
            // Slide-in animation
            'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
            // Duration and align-trigger
            'duration-100 data-[align-trigger=true]:animate-none',
            // Popper positioning
            ...(position === 'popper'
              ? [
                  'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
                ]
              : []),
          ]
            .filter(Boolean)
            .join(' '),
          className
        )}
        position={position}
        align={align}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          data-position={position}
          className={cn(
            'data-[position=popper]:h-(--radix-select-trigger-height) data-[position=popper]:w-full data-[position=popper]:min-w-(--radix-select-trigger-width)',
            position === 'popper' && ''
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

/**
 * Props for the select option item component.
 *
 * @type {SelectItemProps}
 * @property {string} [className] - Additional CSS classes.
 * @property {JSX.Element} [children] - Item content.
 */
interface SelectItemProps extends ComponentProps<typeof SelectPrimitive.Item> {}

/**
 * Select option item.
 *
 * @param {SelectItemProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {JSX.Element} [props.children] - Item content.
 *
 * @returns {JSX.Element} The select item element.
 */
function SelectItem({ className, children, ...props }: SelectItemProps): JSX.Element {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        [
          // Layout
          'relative flex w-full items-center gap-1.5',
          // Styling
          'rounded-md py-1 pr-8 pl-1.5 text-sm',
          // Interaction
          'cursor-default outline-hidden select-none',
          // Focus state
          'focus:bg-accent focus:text-accent-foreground',
          // Destructive variant
          'not-data-[variant=destructive]:focus:**:text-accent-foreground',
          // Disabled state
          'data-disabled:pointer-events-none data-disabled:opacity-50',
          // SVG styling
          "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          // Span children
          '*:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2',
        ].join(' '),
        className
      )}
      {...props}
    >
      <span className="pointer-events-none absolute right-2 flex size-4 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className="pointer-events-none" />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

/**
 * Props for the select scroll up button component.
 *
 * @type {SelectScrollUpButtonProps}
 * @property {string} [className] - Additional CSS classes.
 */
interface SelectScrollUpButtonProps extends ComponentProps<typeof SelectPrimitive.ScrollUpButton> {}

/**
 * Select scroll up button.
 *
 * @param {SelectScrollUpButtonProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} The scroll up button element.
 */
function SelectScrollUpButton({ className, ...props }: SelectScrollUpButtonProps): JSX.Element {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        [
          // Layout and styling
          'bg-popover z-10 flex items-center justify-center py-1',
          // Interaction
          'cursor-default',
          // Icon sizing
          "[&_svg:not([class*='size-'])]:size-4",
        ].join(' '),
        className
      )}
      {...props}
    >
      <ChevronUpIcon />
    </SelectPrimitive.ScrollUpButton>
  );
}

/**
 * Props for the select scroll down button component.
 *
 * @type {SelectScrollDownButtonProps}
 * @property {string} [className] - Additional CSS classes.
 */
interface SelectScrollDownButtonProps extends ComponentProps<typeof SelectPrimitive.ScrollDownButton> {}

/**
 * Select scroll down button.
 *
 * @param {SelectScrollDownButtonProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} The scroll down button element.
 */
function SelectScrollDownButton({ className, ...props }: SelectScrollDownButtonProps): JSX.Element {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        [
          // Layout and styling
          'bg-popover z-10 flex items-center justify-center py-1',
          // Interaction
          'cursor-default',
          // Icon sizing
          "[&_svg:not([class*='size-'])]:size-4",
        ].join(' '),
        className
      )}
      {...props}
    >
      <ChevronDownIcon />
    </SelectPrimitive.ScrollDownButton>
  );
}

export { Select, SelectContent, SelectItem, SelectTrigger, SelectValue };
