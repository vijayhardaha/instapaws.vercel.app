'use client';

import { type ComponentProps, type JSX } from 'react';

import { AlertDialog as AlertDialogPrimitive } from 'radix-ui';

interface AlertDialogProps extends ComponentProps<typeof AlertDialogPrimitive.Root> {}

/**
 * Alert dialog overlay — a modal dialog for urgent confirmations.
 *
 * @param {AlertDialogProps} props - Component props forwarded to the Radix root.
 *
 * @returns {JSX.Element} The alert dialog component.
 *
 * @type {AlertDialogProps}
 */
function AlertDialog({ ...props }: AlertDialogProps): JSX.Element {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />;
}

export { AlertDialog };
