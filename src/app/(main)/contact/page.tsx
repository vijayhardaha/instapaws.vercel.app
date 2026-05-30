import type { Metadata } from 'next';

import { ContactFormClient } from '@/components/forms/contact-form-client';
import { Container } from '@/components/layout/container';
import { SectionHeading } from '@/components/shared/section-heading';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Get in touch with InstaPaws. Submit a tip, inquire about partnerships, or reach our team.',
};

/**
 * Contact page with form submission and partnership info.
 *
 * @returns {unknown} The contact page content.
 */
export default function ContactPage() {
  return (
    <>
      <section className="border-border bg-primary text-primary-foreground border-b">
        <Container className="py-16">
          <SectionHeading
            tag="Contact"
            title="Get in Touch"
            description="Have a tip, a question, or a partnership idea? We are here to listen."
            className="text-primary-foreground"
          />
        </Container>
      </section>

      <section className="border-border bg-background border-b">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Send a Message"
            title="Contact Form"
            description="All fields marked are optional — you may remain fully anonymous."
          />
          <ContactFormClient />
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
