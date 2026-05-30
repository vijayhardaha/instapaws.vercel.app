import type { Metadata } from 'next';

import { SubmitFormClient } from './submit-form-client';

export const metadata: Metadata = {
  title: 'Submit a Video',
  description:
    'Report an Instagram video showing cruelty, neglect, or abuse toward dogs. All submissions are manually reviewed before publication.',
};

/**
 * Submit page — renders the video submission form.
 *
 * @returns {unknown} The submit page content.
 */
export default function SubmitPage() {
  return <SubmitFormClient />;
}
