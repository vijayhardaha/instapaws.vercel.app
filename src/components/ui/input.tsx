import { type ComponentProps, type JSX } from 'react';

import { cn } from '@/lib/utils';

interface InputProps extends ComponentProps<'input'> {}

/**
 * Text input component.
 *
 * @param {InputProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {string} [props.type] - Input type attribute.
 *
 * @returns {JSX.Element} The input element.
 *
 * @type {InputProps}
 */
function Input({ className, type, ...props }: InputProps): JSX.Element {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        [
          // Size and spacing
          'h-8 w-full min-w-0 px-2.5 py-1',
          // Border and background
          'border-input rounded-lg border bg-transparent',
          // Text styling
          'text-base md:text-sm',
          // Transitions and interactions
          'transition-colors outline-none',
          // Placeholder styling
          'placeholder:text-muted-foreground',
          // File input styling
          'file:text-foreground file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-semibold',
          // Focus states
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
          // Disabled states
          'disabled:bg-input/50 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
          // Aria-invalid states
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-3',
          // Dark mode
          'dark:bg-input/30 dark:disabled:bg-input/80 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
        ].join(' '),
        className
      )}
      {...props}
    />
  );
}

export { Input };
