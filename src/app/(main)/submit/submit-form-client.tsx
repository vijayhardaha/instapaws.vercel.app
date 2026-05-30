'use client';

import { useState, useTransition } from 'react';

import { AlertTriangle, ShieldCheck, Send, CheckCircle, Loader2 } from 'lucide-react';

import { SectionHeading } from '@/components/shared/section-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { submitVideo } from '@/lib/actions/videos';
import { ABUSE_TYPE_LABELS, type AbuseType } from '@/lib/types';

const ABUSE_TYPES: AbuseType[] = [
  'physical-abuse',
  'neglect',
  'fighting',
  'baiting',
  'sexual-abuse',
  'hoarding',
  'abandonment',
  'other',
];

/** Anonymized video submission form. */
export function SubmitFormClient() {
  const [submitted, setSubmitted] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState('');
  const [instagramUrl, setInstagramUrl] = useState('');
  const [abuseType, setAbuseType] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const formData = new FormData();
    formData.set('instagram_url', instagramUrl);
    formData.set('abuse_type', abuseType);
    formData.set('description', description);
    formData.set('location', location);

    startTransition(async () => {
      const result = await submitVideo(formData);
      if (result.success) {
        setSubmitted(true);
      } else {
        setError(result.error || 'Something went wrong. Please try again.');
      }
    });
  };

  if (submitted) {
    return (
      <section className="bg-background flex-1">
        <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6 lg:px-8">
          <div className="bg-accent/10 mx-auto flex h-16 w-16 items-center justify-center rounded-full">
            <CheckCircle className="text-accent h-8 w-8" />
          </div>
          <h1 className="mt-6 text-2xl font-bold">Thank You for Reporting</h1>
          <p className="text-muted-foreground mx-auto mt-4 max-w-md text-sm">
            Your submission has been received. Our moderation team will review it within 24-48 hours. If confirmed, it
            will be added to the video library.
          </p>
          <p className="text-muted-foreground/60 mt-4 text-xs">
            Ref: {Math.random().toString(36).slice(2, 10).toUpperCase()}
          </p>
          <Button asChild className="mt-8">
            <a href="/">Return to Home</a>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="border-border bg-primary text-primary-foreground border-b">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Report"
            title="Submit a Video"
            description="Found an Instagram video showing harm to a dog? Submit it here. All reports are manually reviewed before publication."
            className="text-primary-foreground"
          />
        </div>
      </section>

      <section className="bg-destructive/5 border-destructive/20 border-b">
        <div className="mx-auto flex max-w-2xl items-start gap-3 px-4 py-4 sm:px-6 lg:px-8">
          <AlertTriangle className="text-destructive mt-0.5 h-5 w-5 shrink-0" />
          <div>
            <p className="text-destructive text-sm font-medium">Before you submit:</p>
            <ul className="text-muted-foreground mt-1 space-y-1 text-xs">
              <li>• Only submit videos showing genuine harm, abuse, neglect, or cruelty.</li>
              <li>• Do not submit content as revenge or harassment — false reports may be pursued legally.</li>
              <li>• Your submission is anonymous. We do not collect personal information.</li>
              <li>• IP addresses are logged for abuse prevention only and are never shared.</li>
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-background flex-1">
        <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="instagram-url">Instagram Video URL *</Label>
              <Input
                id="instagram-url"
                type="url"
                placeholder="https://www.instagram.com/p/..."
                value={instagramUrl}
                onChange={(e) => setInstagramUrl(e.target.value)}
                required
              />
              <p className="text-muted-foreground text-xs">Paste the full URL of the Instagram post or Reel.</p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="abuse-type">Type of Abuse *</Label>
              <Select value={abuseType} onValueChange={setAbuseType} required>
                <SelectTrigger id="abuse-type">
                  <SelectValue placeholder="Select abuse type" />
                </SelectTrigger>
                <SelectContent>
                  {ABUSE_TYPES.map((t) => (
                    <SelectItem key={t} value={t}>
                      {ABUSE_TYPE_LABELS[t]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description of What You Observed *</Label>
              <Textarea
                id="description"
                placeholder="Describe what happens in the video. Include context like location, date observed, and why you believe this is abuse."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={5}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Location (Optional)</Label>
              <Input
                id="location"
                placeholder="City, region, or general area"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <p className="text-muted-foreground text-xs">Approximate location only — do not share exact addresses.</p>
            </div>

            <div className="absolute -left-[9999px]" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
            </div>

            <Card className="border-accent/30 bg-accent/5">
              <CardContent className="flex items-start gap-3 py-4">
                <ShieldCheck className="text-accent mt-0.5 h-5 w-5 shrink-0" />
                <div>
                  <p className="text-sm font-medium">Your submission is anonymous</p>
                  <p className="text-muted-foreground mt-1 text-xs">
                    No account needed. We do not store your name, email, or personal info. IPs are hashed for abuse
                    prevention only.
                  </p>
                </div>
              </CardContent>
            </Card>

            {error && <div className="bg-destructive/10 text-destructive rounded-md p-3 text-sm">{error}</div>}

            <Button
              type="submit"
              size="lg"
              className="w-full sm:w-auto"
              disabled={!instagramUrl || !abuseType || !description || isPending}
            >
              {isPending ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Send className="mr-2 h-4 w-4" />}
              {isPending ? 'Submitting...' : 'Submit Report'}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
