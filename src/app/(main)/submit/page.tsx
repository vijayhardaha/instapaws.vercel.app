import type { Metadata } from 'next';

import { SubmitFormClient } from './submit-form-client';

export const metadata: Metadata = {
  title: 'Submit a Video',
  description:
    'Report an Instagram video showing cruelty, neglect, or abuse toward dogs. All submissions are manually reviewed before publication.',
};

/**
 *
 */
export default function SubmitPage() {
  return <SubmitFormClient />;
}
