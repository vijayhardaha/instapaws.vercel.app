'use client';

import { type ComponentProps } from 'react';

import { Dialog as DialogPrimitive } from 'radix-ui';

/**
 * Dialog modal component.
 *
 * @param {unknown} props - Component props forwarded to the Radix root.
 *
 * @returns {unknown} The dialog component.
 */
function Dialog({ ...props }: ComponentProps<typeof DialogPrimitive.Root>) {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

export { Dialog };
