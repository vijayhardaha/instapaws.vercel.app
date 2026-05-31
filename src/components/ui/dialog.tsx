'use client';

import { type ComponentProps, type JSX } from 'react';

import { Dialog as DialogPrimitive } from 'radix-ui';

interface DialogProps extends ComponentProps<typeof DialogPrimitive.Root> {}

/**
 * Dialog modal component.
 *
 * @param {DialogProps} props - Component props forwarded to the Radix root.
 *
 * @returns {JSX.Element} The dialog component.
 *
 * @type {DialogProps}
 */
function Dialog({ ...props }: DialogProps): JSX.Element {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />;
}

export { Dialog };
