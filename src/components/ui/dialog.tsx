'use client';

import { type ComponentProps, type JSX } from 'react';

import { Dialog as DialogPrimitive } from 'radix-ui';

/**
 * Dialog modal component.
 *
 * @param {unknown} props - Component props forwarded to the Radix root.
 *
 * @returns {JSX.Element} The dialog component.
 */
function Dialog({ ...props }: ComponentProps<typeof DialogPrimitive.Root>): JSX.Element {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

export { Dialog };
