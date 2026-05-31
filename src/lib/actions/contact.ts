// =======================================================================
// Contact Form Server Action
// =======================================================================
'use server';

import { revalidatePath } from 'next/cache';
import { headers } from 'next/headers';

import { checkSubmissionRate, getClientIp, rateLimitMessage } from '@/lib/rate-limiter';

/**
 * Result returned by the contact form server action.
 *
 * @type {ActionResult}
 * @property {boolean} success - Whether the submission succeeded.
 * @property {string} [error] - Error message if the submission failed.
 */
interface ActionResult {
  success: boolean;
  error?: string;
}

/**
 * Handle contact form submission.
 * Validates required fields, checks honeypot, and processes the message.
 * In production, this would send an email to the team.
 *
 * @param {ActionResult | null} _prevState - Previous form state from useActionState.
 * @param {FormData} formData - Form data with name, email, subject, message, and honeypot fields.
 *
 * @returns {Promise<ActionResult>} Result object indicating success or failure with optional error message.
 */
export async function submitContact(_prevState: ActionResult | null, formData: FormData): Promise<ActionResult> {
  // Honeypot check — if filled, it's a bot (check first to avoid leaking info)
  const website = formData.get('website') as string;
  if (website) {
    return { success: true };
  }

  // Validate honeypot field on server
  const honeypotTimestamp = formData.get('honeypot_timestamp') as string;
  if (honeypotTimestamp) {
    const elapsed = Date.now() - Number(honeypotTimestamp);
    if (elapsed < 3000) {
      return { success: true }; // Silently reject fast bots
    }
  }

  // Server-side rate limit
  const headersList = await headers();
  const clientIp = getClientIp(headersList);
  const cooldown = checkSubmissionRate(clientIp);
  if (cooldown !== null) {
    return { success: false, error: rateLimitMessage(cooldown) };
  }

  const name = (formData.get('name') as string) || 'Anonymous';
  const email = (formData.get('email') as string) || null;
  const subject = formData.get('subject') as string;
  const message = formData.get('message') as string;

  if (!subject?.trim()) {
    return { success: false, error: 'Subject is required.' };
  }
  if (!message?.trim()) {
    return { success: false, error: 'Message is required.' };
  }

  if (message.trim().length < 10) {
    return { success: false, error: 'Message must be at least 10 characters.' };
  }

  // In production, this would:
  // 1. Store in a database or email queue
  // 2. Send notification email to SITE.email
  // 3. Log the submission for spam analysis
  //
  // For MVP: log to console in dev
  if (process.env.NODE_ENV === 'development') {
    console.log('[Contact Submission]', { name, email, subject: subject.trim(), message: message.trim() });
  }

  revalidatePath('/contact');
  return { success: true };
}
