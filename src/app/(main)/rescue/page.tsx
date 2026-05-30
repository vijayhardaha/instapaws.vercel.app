import { AlertTriangle, PhoneCall, FileText, ShieldCheck, Flag, BookOpen } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { SectionHeading } from '@/components/shared/section-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Take Action',
  description:
    'What to do if you see dog abuse on Instagram. Step-by-step guide to report to Instagram, local authorities, and animal welfare organizations.',
};

const STEPS = [
  {
    icon: PhoneCall,
    title: '1. Immediate Danger? Call Authorities',
    description:
      'If a dog is in immediate danger, contact your local police or animal welfare authorities right away. Do not engage with the person posting the content.',
    details: [
      'Call your local police non-emergency number (or emergency if life-threatening)',
      'Contact animal control in your area',
      'Take screenshots and record URLs before reporting',
      'Do not share the video further — let authorities handle it',
    ],
    variant: 'destructive' as const,
  },
  {
    icon: Flag,
    title: '2. Report to Instagram',
    description: 'Instagram has reporting tools for animal cruelty. Here is how to use them effectively.',
    details: [
      'Open the post and tap the three dots (⋯) menu',
      'Select "Report" → "Animal Abuse" or "Violent Content"',
      'Provide context in the report — be specific about what you see',
      'Include links to any evidence or cross-platform posts',
    ],
    variant: 'default' as const,
  },
  {
    icon: FileText,
    title: '3. Submit to InstaPaws',
    description: 'Help us build the archive. Submit the video to InstaPaws so we can track it and escalate if needed.',
    details: [
      'Use our Submit form with the Instagram URL',
      'Describe what you observed — context matters',
      'Our moderation team reviews every submission',
      'We track Instagram response and escalate inaction',
    ],
    variant: 'default' as const,
  },
  {
    icon: ShieldCheck,
    title: '4. Contact Animal Welfare Orgs',
    description: 'For serious or ongoing cases, involve professional animal welfare organizations.',
    details: [
      'ASPCA (US): (888) 666-4679 — tip line for animal cruelty',
      'PETA: (757) 622-7382 — cruelty investigations',
      'Local animal shelters and rescue organizations',
      'International: Search for animal welfare orgs in your country',
    ],
    variant: 'default' as const,
  },
  {
    icon: BookOpen,
    title: '5. Educate & Advocate',
    description: 'Long-term change requires awareness and advocacy.',
    details: [
      'Learn to identify signs of abuse (see our guide)',
      'Sign our petition demanding better Instagram moderation',
      'Share resources responsibly — do not reshare abuse videos',
      'Support animal rescue organizations',
    ],
    variant: 'default' as const,
  },
];

/**
 *
 */
export default function RescuePage() {
  return (
    <>
      <section className="border-border bg-primary text-primary-foreground border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Action Guide"
            title="What to Do If You See Dog Abuse"
            description="A step-by-step guide to reporting, documenting, and escalating Instagram videos showing cruelty toward dogs."
            className="text-primary-foreground"
          />
        </div>
      </section>

      <section className="bg-destructive/10 border-destructive/20 border-b">
        <div className="mx-auto max-w-6xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-start gap-3">
            <AlertTriangle className="text-destructive mt-0.5 h-5 w-5 shrink-0" />
            <p className="text-destructive text-sm font-medium">
              If a dog is in immediate danger, call local authorities immediately.{' '}
              <strong>Do not engage the person posting the content.</strong>
            </p>
          </div>
        </div>
      </section>

      <section className="bg-background flex-1">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="space-y-8">
            {STEPS.map((step) => (
              <Card
                key={step.title}
                className={`border-l-4 ${step.variant === 'destructive' ? 'border-l-destructive' : 'border-l-accent'}`}
              >
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-full ${step.variant === 'destructive' ? 'bg-destructive/10' : 'bg-accent/10'}`}
                    >
                      <step.icon
                        className={`h-5 w-5 ${step.variant === 'destructive' ? 'text-destructive' : 'text-accent'}`}
                      />
                    </div>
                    <div>
                      <h2 className="text-lg font-semibold">{step.title}</h2>
                      <p className="text-muted-foreground text-sm">{step.description}</p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {step.details.map((detail, i) => (
                      <li key={i} className="text-muted-foreground flex items-start gap-2 text-sm">
                        <span className="bg-accent/50 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                        {detail}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border bg-muted/30 border-t">
        <div className="mx-auto max-w-6xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Ready to Take Action?</h2>
          <p className="text-muted-foreground mx-auto mt-3 max-w-lg text-sm">
            Every report counts. If you have seen something, do not look away.
          </p>
          <div className="mt-6 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/submit">
                <Flag className="mr-2 h-4 w-4" />
                Report a Video Now
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/identify-abuse">
                <BookOpen className="mr-2 h-4 w-4" />
                Learn to Identify Abuse
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
