'use client';

import { type ComponentProps, type JSX } from 'react';

import { CheckIcon } from 'lucide-react';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';

import { cn } from '@/lib/utils';

interface CheckboxProps extends ComponentProps<typeof CheckboxPrimitive.Root> {}

/**
 * Checkbox input component.
 *
 * @param {CheckboxProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 *
 * @returns {JSX.Element} The checkbox element.
 *
 * @type {CheckboxProps}
 */
function Checkbox({ className, ...props }: CheckboxProps): JSX.Element {
  return (
    <CheckboxPrimitive.Root
      data-slot="checkbox"
      className={cn(
        [
          // Layout and sizing
          'relative flex size-4 shrink-0 items-center justify-center',
          // Border and styling
          'peer border-input rounded-lg border bg-transparent transition-colors',
          // Focus states
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
          // Checked states
          'data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground',
          // Disabled states
          'group-has-disabled/field:opacity-50 disabled:cursor-not-allowed disabled:opacity-50',
          // Aria-invalid states
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:aria-checked:border-primary aria-invalid:ring-3',
          // Dark mode
          'dark:bg-input/30 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 dark:data-checked:bg-primary',
          // Outline and interaction
          'outline-none after:absolute after:-inset-x-3 after:-inset-y-2',
        ].join(' '),
        className
      )}
      {...props}
    >
      <CheckboxPrimitive.Indicator
        data-slot="checkbox-indicator"
        className="grid place-content-center text-current transition-none [&>svg]:size-3.5"
      >
        <CheckIcon />
      </CheckboxPrimitive.Indicator>
    </CheckboxPrimitive.Root>
  );
}

export { Checkbox };
