'use client';

import { useState, type JSX, type SubmitEvent } from 'react';

import { Send, CheckCircle, Loader2, AlertTriangle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { submitContact } from '@/lib/actions/contact';

/**
 * Contact form client — submits via server action with honeypot spam protection.
 *
 * @returns {JSX.Element} The contact form or success message state.
 */
export function ContactFormClient(): JSX.Element {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.set('name', name);
    formData.set('email', email);
    formData.set('subject', subject);
    formData.set('message', message);

    // Honeypot timestamp — if submitted too fast, likely a bot
    formData.set('honeypot_timestamp', String(Date.now()));
    // Honeypot website field — manual FormData bypasses hidden input,
    // so we inject an empty string here. Bots that bypass JS will
    // still be caught by the hidden input in the JSX below.
    formData.set('website', '');

    setIsPending(true);
    const result = await submitContact(null, formData);
    setIsPending(false);

    if (result.success) {
      setSubmitted(true);
    } else {
      setError(result.error || 'Something went wrong. Please try again.');
    }
  };

  if (submitted) {
    return (
      <div className="flex flex-col items-center py-16 text-center">
        <div className="bg-accent/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
          <CheckCircle className="text-accent h-8 w-8" />
        </div>
        <h2 className="mt-6 text-2xl font-bold">Message Sent</h2>
        <p className="text-muted-foreground mt-4 text-sm">
          Thank you for reaching out. If you included an email address, we will respond within 48 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-10 space-y-6">
      {/* Honeypot — hidden from real users. Catches bots that bypass JS form interception. */}
      <div className="absolute -left-9999" aria-hidden="true">
        <label htmlFor="contact-website">Website</label>
        <input id="contact-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Timestamp honeypot — reject submissions faster than 3s (likely bots) */}
      <input type="hidden" name="honeypot_timestamp" value="" />

      <div className="grid gap-6 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="contact-name">Name (optional)</Label>
          <Input
            id="contact-name"
            type="text"
            placeholder="Anonymous"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="contact-email">Email (optional)</Label>
          <Input
            id="contact-email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-subject">Subject</Label>
        <Input
          id="contact-subject"
          type="text"
          placeholder="Brief summary of your message"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="contact-message">Message</Label>
        <Textarea
          id="contact-message"
          placeholder="Describe your message in detail..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          rows={6}
          required
        />
      </div>

      {error && (
        <div className="bg-destructive/10 text-destructive flex items-start gap-2 rounded-md p-3 text-sm">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="flex items-center gap-4">
        <Button type="submit" disabled={!subject || !message || isPending}>
          {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
          {isPending ? 'Sending...' : 'Send Message'}
        </Button>
        <p className="text-muted-foreground text-xs">Your information is kept confidential.</p>
      </div>
    </form>
  );
}
