'use client';

import { type ComponentProps } from 'react';

import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

/**
 * Alert dialog overlay — a modal dialog for urgent confirmations.
 *
 * @param {unknown} props - Component props forwarded to the Radix root.
 *
 * @returns {unknown} The alert dialog component.
 */
function AlertDialog({ ...props }: ComponentProps<typeof AlertDialogPrimitive.Root>) {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

export { AlertDialog };
