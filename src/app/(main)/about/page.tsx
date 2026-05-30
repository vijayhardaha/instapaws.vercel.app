import { ShieldCheck, Users, Scale, Flag, ArrowRight, Heart, Eye, Ban } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { CtaSection } from '@/components/shared/cta-section';
import { HeroBanner } from '@/components/shared/hero-banner';
import { SectionHeading } from '@/components/shared/section-heading';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'About',
  description: 'Why InstaPaws exists. Our mission, editorial policy, and commitment to compassion and accountability.',
};

const PRINCIPLES = [
  {
    icon: ShieldCheck,
    title: 'Accuracy First',
    text: 'Every submission is manually reviewed. We verify genuine harm before publishing.',
  },
  {
    icon: Scale,
    title: 'Fair Use & Legal Compliance',
    text: 'We do not host videos. We embed public Instagram content under fair use.',
  },
  {
    icon: Users,
    title: 'Anonymity & Safety',
    text: 'Reporters can submit anonymously. We protect identities to prevent retaliation.',
  },
  {
    icon: Heart,
    title: 'Compassion, Not Sensationalism',
    text: 'We blur graphic content by default. Accountability over clicks.',
  },
];

const MODERATION_STEPS = [
  'Every submission is queued for manual review by a trained volunteer.',
  'A reviewer verifies the Instagram URL is live and depicts animal harm.',
  'Graphic content is flagged and blurred by default on the site.',
  'If verified, the video is reported to Instagram and logged in our archive.',
  'Submissions that cannot be verified are rejected with notes.',
];

const BOUNDARIES = [
  { icon: Eye, text: 'We do not display unmoderated graphic content.' },
  { icon: Ban, text: 'We do not publish personal information about reporters.' },
  { icon: Scale, text: 'We do not make legal accusations — we document and escalate.' },
  { icon: ShieldCheck, text: 'We do not accept paid submissions or sponsorships.' },
];

/**
 * About page — mission, principles, moderation process, boundaries.
 *
 * @returns {unknown} The about page content.
 */
export default function AboutPage() {
  return (
    <>
      <HeroBanner
        tag="About InstaPaws"
        title="A Compassion Hub for Dogs in Distress"
        description={`${SITE.name} exists because animals cannot speak for themselves. We archive, expose, and take action against Instagram videos showing cruelty and abuse toward dogs.`}
      />

      <section className="border-border bg-background border-b">
        <Container className="py-16">
          <SectionHeading
            tag="Our Mission"
            title="Why We Built This"
            description="Every day, videos of dogs being harmed appear on Instagram. InstaPaws fills the gap when platforms fail to act."
          />
          <div className="text-muted-foreground mt-10 space-y-6 text-base leading-relaxed">
            <p>
              InstaPaws is not a social media platform. We do not host videos. We do not profit from suffering. We are a
              transparent archive that documents evidence of animal abuse found on Instagram and takes action to get it
              removed.
            </p>
            <p>
              Our team consists of volunteers and animal welfare advocates who believe that public exposure is one of
              the most effective tools for accountability.
            </p>
          </div>
        </Container>
      </section>

      <section className="border-border bg-muted/30 border-b">
        <Container className="py-16">
          <SectionHeading tag="Editorial Policy" title="Our Principles" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {PRINCIPLES.map((p) => (
              <Card key={p.title}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="bg-accent/10 flex h-10 w-10 items-center justify-center rounded-full">
                      <p.icon className="text-accent h-5 w-5" aria-hidden="true" />
                    </div>
                    <h3 className="text-base font-semibold">{p.title}</h3>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-sm leading-relaxed">{p.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-border bg-background border-b">
        <Container className="py-16">
          <SectionHeading
            tag="Moderation"
            title="How We Review Submissions"
            description="No video is published automatically. Every submission goes through human review."
          />
          <ol className="mt-10 space-y-4">
            {MODERATION_STEPS.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="bg-accent text-accent-foreground mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold">
                  {i + 1}
                </span>
                <p className="text-muted-foreground text-sm leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="border-border bg-destructive/5 border-b">
        <Container className="py-16">
          <SectionHeading tag="Boundaries" title="What We Do Not Do" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {BOUNDARIES.map((item) => (
              <div key={item.text} className="border-border flex items-start gap-3 rounded-md border p-4">
                <item.icon className="text-destructive/80 mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                <p className="text-muted-foreground text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title="Join the Fight Against Animal Cruelty"
        description="Report a video, sign the petition, or donate — every action counts."
        buttons={[
          { label: 'Report a Video', href: '/submit', icon: <Flag className="mr-2 h-4 w-4" /> },
          { label: 'Take Action', href: '/rescue', icon: <ArrowRight className="ml-2 h-4 w-4" />, variant: 'outline' },
        ]}
      />

      <section className="bg-muted/50">
        <Container className="py-16">
          <p className="text-muted-foreground leading-relaxed">
            <strong>Legal Note:</strong> InstaPaws is independent and not affiliated with Instagram or Meta Platforms,
            Inc. All embedded content is publicly available and used under fair use. If you believe your content has
            been used improperly, please{' '}
            <Link href="/contact" className="hover:text-foreground underline">
              contact us
            </Link>
            .
          </p>
        </Container>
      </section>
    </>
  );
}
