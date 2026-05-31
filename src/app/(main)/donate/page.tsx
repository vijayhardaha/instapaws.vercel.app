import type { JSX } from 'react';

import { Heart, ExternalLink, DollarSign, ShieldCheck } from 'lucide-react';
import type { Metadata } from 'next';

import { Container } from '@/components/layout/container';
import { CtaSection } from '@/components/shared/cta-section';
import { HeroBanner } from '@/components/shared/hero-banner';
import { SectionHeading } from '@/components/shared/section-heading';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

export const metadata: Metadata = {
  title: 'Donate',
  description:
    'Support animal welfare organizations that rescue dogs from abuse. Learn where funds go and how you can help.',
};

const FUND_SPLITS = [
  {
    percent: '40%',
    label: 'Direct Rescue Operations',
    description: 'Funding immediate rescue and veterinary care for dogs in crisis.',
  },
  {
    percent: '25%',
    label: 'Legal & Advocacy',
    description: 'Supporting prosecution of abusers and stronger animal welfare laws.',
  },
  {
    percent: '20%',
    label: 'Shelter & Foster Programs',
    description: 'Temporary housing, food, and rehabilitation for rescued dogs.',
  },
  {
    percent: '15%',
    label: 'Education & Prevention',
    description: 'Community education programs to prevent abuse before it happens.',
  },
];

const PARTNER_ORGS = [
  {
    name: 'ASPCA',
    description: 'Leading animal welfare organization since 1866. Fighting cruelty through rescue and advocacy.',
    url: 'https://www.aspca.org',
  },
  {
    name: 'Humane Society',
    description: 'The Humane Society of the United States. Advocacy and rescue for animals nationwide.',
    url: 'https://www.humanesociety.org',
  },
  {
    name: 'Best Friends',
    description: "Operating the nation's largest no-kill sanctuary for companion animals.",
    url: 'https://bestfriends.org',
  },
  {
    name: 'PETA',
    description: 'Investigating cruelty and running rescue operations worldwide.',
    url: 'https://www.peta.org',
  },
  {
    name: 'AKC Rescue Network',
    description: 'The largest network of dog rescue groups in the United States.',
    url: 'https://www.akc.org/rescue/',
  },
  {
    name: 'RedRover',
    description: 'Emergency animal sheltering during natural disasters and cruelty cases.',
    url: 'https://redrover.org',
  },
];

/**
 * Donate page — fund allocation breakdown and partner organizations.
 *
 * @returns {JSX.Element} The donate page content.
 */
export default function DonatePage(): JSX.Element {
  return (
    <>
      <HeroBanner
        tag="Support the Cause"
        title="Donate to Help Dogs in Need"
        description="Your donation supports verified animal welfare organizations that rescue and rehabilitate dogs every day."
      />

      <section className="border-border bg-background border-b">
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Transparency"
            title="Where Your Money Goes"
            description="Here is how donations are allocated across our partner organizations."
          />
          <div className="mt-10 space-y-6">
            {FUND_SPLITS.map((split) => (
              <div key={split.label} className="border-border flex items-start gap-4 rounded-md border p-4">
                <span className="bg-accent/10 text-accent flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-lg font-bold">
                  {split.percent}
                </span>
                <div>
                  <h3 className="text-sm font-semibold">{split.label}</h3>
                  <p className="text-muted-foreground mt-1 text-sm">{split.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-border bg-muted/30 border-b">
        <Container className="py-16">
          <SectionHeading
            tag="Partners"
            title="Where to Donate"
            description="Donate directly to these trusted organizations. Every dollar counts."
          />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {PARTNER_ORGS.map((org) => (
              <Card key={org.name} className="flex flex-col">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 flex h-10 w-10 items-center justify-center rounded-full">
                      <ShieldCheck className="text-accent h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-semibold">{org.name}</h3>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground mb-4 text-sm">{org.description}</p>
                  <Button asChild variant="outline" size="sm">
                    <a href={org.url} target="_blank" rel="noopener noreferrer">
                      <DollarSign className="mr-1 h-3.5 w-3.5" />
                      Donate <ExternalLink className="ml-1 h-3 w-3" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title="Every Dollar Saves a Life"
        description="Even a small donation can provide emergency care, food, or shelter for a dog in crisis."
        buttons={[
          { label: 'Donate Now', href: 'https://www.aspca.org', icon: <Heart className="mr-2 h-4 w-4" /> },
          { label: 'Report a Video Instead', href: '/submit', variant: 'outline' },
        ]}
      />

      <section className="bg-muted/50">
        <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
          <Separator className="mb-6" />
          <p className="text-muted-foreground text-xs leading-relaxed">
            <strong>Note:</strong> InstaPaws does not collect donations directly. All links point to official partner
            websites. We receive no commissions.
          </p>
        </div>
      </section>
    </>
  );
}
