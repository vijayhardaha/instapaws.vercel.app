import { type ComponentProps, type JSX } from 'react';

import { ChevronDownIcon } from 'lucide-react';

import { cn } from '@/lib/utils';

type NativeSelectProps = Omit<ComponentProps<'select'>, 'size'> & { size?: 'sm' | 'default' };

/**
 * Native select dropdown component using the browser's built-in select.
 *
 * @param {NativeSelectProps} props - Component props.
 * @param {string} [props.className] - Additional CSS classes.
 * @param {string} [props.size] - Select size variant.
 *
 * @returns {JSX.Element} The native select element.
 */
function NativeSelect({ className, size = 'default', ...props }: NativeSelectProps): JSX.Element {
  return (
    <div
      className={cn('group/native-select relative w-fit has-[select:disabled]:opacity-50', className)}
      data-slot="native-select-wrapper"
      data-size={size}
    >
      <select
        data-slot="native-select"
        data-size={size}
        className={[
          // Layout and sizing
          'h-8 w-full min-w-0 py-1',
          // Appearance
          'border-input appearance-none rounded-lg border bg-transparent',
          // Padding
          'pr-8 pl-2.5',
          // Text styling
          'text-sm select-none',
          // Interactions
          'transition-colors outline-none',
          // Placeholder and selection
          'placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground',
          // Focus states
          'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-3',
          // Disabled states
          'disabled:pointer-events-none disabled:cursor-not-allowed',
          // Aria-invalid states
          'aria-invalid:border-destructive aria-invalid:ring-destructive/20 aria-invalid:ring-3',
          // Dark mode
          'dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40',
          // Small size variant
          'data-[size=sm]:h-7 data-[size=sm]:rounded-[min(var(--radius-md),10px)] data-[size=sm]:py-0.5',
        ].join(' ')}
        {...props}
      />
      <ChevronDownIcon
        className="text-muted-foreground pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 select-none"
        aria-hidden="true"
        data-slot="native-select-icon"
      />
    </div>
  );
}

export { NativeSelect };
