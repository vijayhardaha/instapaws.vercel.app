'use client';

import { createContext, useContext, type ComponentProps, type CSSProperties, type JSX } from 'react';

import { type VariantProps } from 'class-variance-authority';
import { ToggleGroup as ToggleGroupPrimitive } from 'radix-ui';

import { toggleVariants } from '@/components/ui/toggle';
import { cn } from '@/lib/utils';

const ToggleGroupContext = createContext<
  VariantProps<typeof toggleVariants> & { spacing?: number; orientation?: 'horizontal' | 'vertical' }
>({ size: 'default', variant: 'default', spacing: 2, orientation: 'horizontal' });

/**
 * Props for the toggle group root component.
 *
 * @typedef {object} ToggleGroupProps
 * @property {string} [className] - Additional CSS classes.
 * @property {string} [variant] - Visual variant.
 * @property {string} [size] - Button size.
 * @property {number} [spacing] - Gap between items.
 * @property {'horizontal' | 'vertical'} [orientation] - Layout orientation.
 */
type ToggleGroupProps = ComponentProps<typeof ToggleGroupPrimitive.Root> & {
  variant?: VariantProps<typeof toggleVariants>['variant'];
  size?: VariantProps<typeof toggleVariants>['size'];
  spacing?: number;
  orientation?: 'horizontal' | 'vertical';
};

/**
 * Toggle group — groups toggle buttons together.
 *
 * @param {ToggleGroupProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {string} [props.variant] - Visual variant.
 * @param {string} [props.size] - Button size.
 * @param {number} [props.spacing] - Gap between items.
 * @param {string} [props.orientation] - Layout orientation.
 *
 * @returns {JSX.Element} The toggle group element.
 */
function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = 'horizontal',
  children,
  ...props
}: ToggleGroupProps): JSX.Element {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      data-orientation={orientation}
      style={{ '--gap': spacing } as CSSProperties}
      className={cn(
        'group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] rounded-lg data-vertical:flex-col data-vertical:items-stretch data-[size=sm]:rounded-[min(var(--radius-md),10px)]',
        className
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing, orientation }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  );
}

/**
 * Props for the toggle group item component.
 *
 * @typedef {object} ToggleGroupItemProps
 * @property {string} [className] - Additional CSS classes.
 * @property {string} [variant] - Visual variant.
 * @property {string} [size] - Button size.
 */
type ToggleGroupItemProps = ComponentProps<typeof ToggleGroupPrimitive.Item> & {
  variant?: VariantProps<typeof toggleVariants>['variant'];
  size?: VariantProps<typeof toggleVariants>['size'];
};

/**
 * Toggle group item button.
 *
 * @param {ToggleGroupItemProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {string} [props.variant] - Visual variant.
 * @param {string} [props.size] - Button size.
 *
 * @returns {JSX.Element} The toggle group item element.
 */
function ToggleGroupItem({
  className,
  children,
  variant = 'default',
  size = 'default',
  ...props
}: ToggleGroupItemProps): JSX.Element {
  const context = useContext(ToggleGroupContext);

  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        'shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pr-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:pl-1.5 group-data-horizontal/toggle-group:data-[spacing=0]:first:rounded-l-lg group-data-vertical/toggle-group:data-[spacing=0]:first:rounded-t-lg group-data-horizontal/toggle-group:data-[spacing=0]:last:rounded-r-lg group-data-vertical/toggle-group:data-[spacing=0]:last:rounded-b-lg group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:border-l-0 group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-horizontal/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-l group-data-vertical/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t',
        toggleVariants({ variant: context.variant || variant, size: context.size || size }),
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  );
}

export { ToggleGroup, ToggleGroupItem };
