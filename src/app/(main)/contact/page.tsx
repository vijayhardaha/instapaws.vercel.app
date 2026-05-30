import { Send, Users, Newspaper, HelpCircle, MessageSquare } from 'lucide-react';
import type { Metadata } from 'next';

import { SectionHeading } from '@/components/shared/section-heading';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with InstaPaws. Submit a tip, inquire about partnerships, or reach our team.',
};

const CONTACT_TYPES = [
  { value: 'tip', label: 'Anonymous Tip', icon: HelpCircle },
  { value: 'partnership', label: 'Partnership Inquiry', icon: Users },
  { value: 'media', label: 'Media / Press', icon: Newspaper },
  { value: 'other', label: 'General Question', icon: MessageSquare },
];

/**
 *
 */
export default function ContactPage() {
  return (
    <>
      <section className="border-border bg-primary text-primary-foreground border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Contact"
            title="Get in Touch"
            description="Have a tip, a question, or a partnership idea? We are here to listen."
            className="text-primary-foreground"
          />
        </div>
      </section>

      <section className="border-border bg-background border-b">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Send a Message"
            title="Contact Form"
            description="All fields marked are optional — you may remain fully anonymous."
          />

          <form className="mt-10 space-y-6" action="#">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  Name (optional)
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Anonymous"
                  className="border-border bg-background w-full rounded-md border px-3 py-2 text-sm"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  Email (optional)
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="border-border bg-background w-full rounded-md border px-3 py-2 text-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Reason for Contact</label>
              <div className="grid gap-3 sm:grid-cols-4">
                {CONTACT_TYPES.map((t) => (
                  <div
                    key={t.value}
                    className="border-border hover:bg-muted/50 flex cursor-pointer items-center gap-2 rounded-md border p-3 text-sm transition-colors"
                  >
                    <t.icon className="text-muted-foreground h-4 w-4" aria-hidden="true" />
                    <span>{t.label}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="subject" className="text-sm font-medium">
                Subject
              </label>
              <input
                id="subject"
                type="text"
                placeholder="Brief summary of your message"
                className="border-border bg-background w-full rounded-md border px-3 py-2 text-sm"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <textarea
                id="message"
                rows={6}
                placeholder="Describe your message in detail..."
                className="border-border bg-background w-full rounded-md border px-3 py-2 text-sm"
                required
              />
            </div>

            <div className="flex items-center gap-4">
              <button
                type="submit"
                className="bg-primary text-primary-foreground hover:bg-primary/90 inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
              <p className="text-muted-foreground text-xs">Your information is kept confidential.</p>
            </div>
          </form>
        </div>
      </section>

      <section className="border-border bg-muted/30 border-b">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Anonymous Tips"
            title="Submit a Tip Without Identifying Yourself"
            description="If you have information about dog abuse on Instagram and wish to remain anonymous, you can reach us without providing any personal details."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <h3 className="text-base font-semibold">Email Us Directly</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Send an email to <strong className="text-foreground">{SITE.email}</strong> from any email address. You
                  do not need to use your real name.
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <h3 className="text-base font-semibold">Use the Submit Form</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Our{' '}
                  <a href="/submit" className="hover:text-foreground underline">
                    video submission form
                  </a>{' '}
                  does not require an account or any personal information.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Collaborate"
            title="Partnership Inquiries"
            description="We work with animal welfare organizations, journalists, and advocacy groups."
          />
          <div className="text-muted-foreground mt-10 space-y-4 text-sm leading-relaxed">
            <p>
              We welcome partnerships with shelters, rescue organizations, law enforcement agencies, and media outlets.
              If you represent an organization interested in collaborating on animal welfare advocacy, please reach out
              using the contact form above.
            </p>
            <p>
              We are particularly interested in working with organizations that can help investigate and rescue dogs
              featured in the videos we archive.
            </p>
          </div>
          <Separator className="my-8" />
          <p className="text-muted-foreground text-xs">
            <strong>Media inquiries:</strong> Journalists and researchers may contact us for interviews, data access, or
            case studies. We respond to media requests within 48 hours.
          </p>
        </div>
      </section>
    </>
  );
}
