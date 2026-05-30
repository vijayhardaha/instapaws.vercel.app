import { AlertTriangle, Hand, Droplets, Swords, Bone, Home, MapPin, Flag, ArrowRight } from 'lucide-react';
import type { Metadata } from 'next';

import { Container } from '@/components/layout/container';
import { CtaSection } from '@/components/shared/cta-section';
import { HeroBanner } from '@/components/shared/hero-banner';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { NoiseBackground } from '@/components/ui/noise-background';

export const metadata: Metadata = {
  title: 'How to Identify Abuse',
  description:
    'Learn to recognize the different types of dog abuse commonly found on social media. Know the signs. Report with confidence.',
};

const ABUSE_TYPES = [
  {
    icon: Hand,
    title: 'Physical Abuse',
    severity: 'Critical',
    description:
      'Deliberate infliction of pain or injury on a dog through hitting, kicking, burning, or other violent acts.',
    signs: [
      'Visible flinching or cowering when a person approaches',
      'Unexplained bruises, cuts, or burns on the body',
      'Person striking, kicking, or throwing the dog on camera',
      'Dog showing signs of extreme fear or pain response',
    ],
  },
  {
    icon: Droplets,
    title: 'Neglect & Starvation',
    severity: 'Serious',
    description: 'Failure to provide basic necessities like food, water, shelter, or veterinary care.',
    signs: [
      'Visible ribs, spine, or hip bones protruding (emaciation)',
      'Dog chained or confined without food, water, or shelter',
      'Overgrown nails, matted fur, or untreated wounds',
      'Extreme dehydration or heat exposure',
    ],
  },
  {
    icon: Swords,
    title: 'Dog Fighting',
    severity: 'Critical',
    description: 'Organized or recreational fighting between dogs, often staged for entertainment or profit.',
    signs: [
      'Two or more dogs in a confined space showing aggression',
      'Visible bite wounds, scarring, or blood on the dogs',
      'Spectators cheering or recording the activity',
      'Makeshift ring or enclosed fighting area',
    ],
  },
  {
    icon: Bone,
    title: 'Baiting',
    severity: 'Critical',
    description: 'Using a live animal as bait to train or test the aggression of fighting dogs.',
    signs: [
      'Small animal attached or held near aggressive dogs',
      'Dog being taunted or provoked for the camera',
      'Video framed as entertainment or a joke',
      'Small animal showing signs of distress or injury',
    ],
  },
  {
    icon: Home,
    title: 'Hoarding',
    severity: 'Serious',
    description: 'Keeping an excessive number of dogs in inadequate conditions, often leading to neglect.',
    signs: [
      'Large number of dogs in a small or confined space',
      'Unsanitary living conditions with accumulated waste',
      'Dogs showing signs of illness or untreated disease',
      'Overwhelmed caretaker unable to provide individual care',
    ],
  },
  {
    icon: MapPin,
    title: 'Abandonment',
    severity: 'High',
    description: 'Leaving a dog behind in a public or private location with no provision for its continued care.',
    signs: [
      'Dog tied to a fence, post, or left in a parked car',
      'Dog left near a shelter, park, or roadside',
      'Collar, leash, or signs of recent ownership',
      'Dog appearing confused, distressed, or searching for owner',
    ],
  },
];

/**
 * Identify Abuse page — abuse types, signs, and CTAs.
 *
 * @returns {unknown} The identify-abuse page content.
 */
export default function IdentifyAbusePage() {
  return (
    <>
      <HeroBanner
        tag="Education"
        title="How to Identify Dog Abuse"
        description="Understanding the types of abuse helps you report more effectively. Learn the signs so you can take action."
      />

      <section className="bg-destructive/10 border-destructive/20 border-b">
        <Container className="flex items-start gap-4 py-6">
          <AlertTriangle className="text-destructive mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-destructive font-semibold">Content Warning</p>
            <p className="text-muted-foreground mt-1 text-sm">
              The signs described below may be distressing. If you see a dog in immediate danger, contact local
              authorities first.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-background relative">
        <NoiseBackground
          gradientColors={['rgb(220, 80, 80)', 'rgb(180, 60, 60)', 'rgb(240, 120, 80)']}
          noiseIntensity={0.08}
          speed={0.05}
          className="py-16"
        >
          <Container>
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {ABUSE_TYPES.map((type) => (
                <Card key={type.title} className="flex flex-col">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="bg-accent/10 flex h-10 w-10 items-center justify-center rounded-full">
                        <type.icon className="text-accent h-5 w-5" aria-hidden="true" />
                      </div>
                      <Badge variant={type.severity === 'Critical' ? 'destructive' : 'secondary'} className="text-xs">
                        {type.severity}
                      </Badge>
                    </div>
                    <h3 className="mt-4 text-lg font-semibold">{type.title}</h3>
                    <p className="text-muted-foreground text-sm">{type.description}</p>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <p className="text-muted-foreground mb-3 text-xs font-semibold tracking-wider uppercase">
                      Signs to look for:
                    </p>
                    <ul className="space-y-2">
                      {type.signs.map((sign, i) => (
                        <li key={i} className="text-muted-foreground flex items-start gap-2 text-sm">
                          <span className="bg-accent/50 mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                          {sign}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </Container>
        </NoiseBackground>
      </section>

      <CtaSection
        title="Spotted the Signs? Take Action Now."
        description="If you have witnessed any of these signs on Instagram, report it immediately."
        buttons={[
          { label: 'Report a Video', href: '/submit', icon: <Flag className="mr-2 h-4 w-4" /> },
          {
            label: 'Full Action Guide',
            href: '/rescue',
            icon: <ArrowRight className="ml-2 h-4 w-4" />,
            variant: 'outline',
          },
        ]}
      />
    </>
  );
}
