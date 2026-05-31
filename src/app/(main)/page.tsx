import type { JSX } from 'react';

import { Flag, Heart, Search, ShieldCheck } from 'lucide-react';
import Link from 'next/link';

import { Container } from '@/components/layout/container';
import { ActionCards } from '@/components/shared/action-cards';
import { CtaSection } from '@/components/shared/cta-section';
import { HeroBanner } from '@/components/shared/hero-banner';
import { SectionHeading } from '@/components/shared/section-heading';
import { StatCard } from '@/components/shared/stat-card';
import { SuccessStoryCard } from '@/components/shared/success-story-card';
import { VideoCard } from '@/components/shared/video-card';
import { WarningBanner } from '@/components/shared/warning-banner';
import { Button } from '@/components/ui/button';
import { getVideoStats } from '@/lib/actions/videos';
import { SITE_STATS } from '@/lib/constants';
import { fetchRecentVideos, fetchSuccessStories } from '@/lib/data/videos';

const HELP_CARDS = [
  {
    icon: <Flag className="text-accent h-6 w-6" aria-hidden="true" />,
    title: 'Report a Video',
    description:
      'Found an Instagram video showing abuse? Submit it to our review queue. We verify and escalate every report.',
    cta: { label: 'Report Now', href: '/submit' },
  },
  {
    icon: <Heart className="text-accent h-6 w-6" aria-hidden="true" />,
    title: 'Petition Instagram',
    description: 'Join our campaign demanding better animal abuse detection and faster response times from Instagram.',
    cta: { label: 'Sign Petition', href: '/petition', variant: 'outline' as const },
  },
  {
    icon: <ShieldCheck className="text-accent h-6 w-6" aria-hidden="true" />,
    title: 'Support Rescue Orgs',
    description: 'Donate to verified animal welfare organizations that rescue dogs from harmful situations every day.',
    cta: { label: 'Donate Now', href: '/donate', variant: 'outline' as const },
  },
];

/**
 * Homepage — mission statement, recent flags, stats, CTAs, success stories.
 *
 * @returns {Promise<JSX.Element>} The homepage content.
 */
export default async function HomePage(): Promise<JSX.Element> {
  const [recentVideos, successStories] = await Promise.all([fetchRecentVideos(3), fetchSuccessStories()]);
  const statsResult = await getVideoStats();
  const stats = statsResult.success
    ? (statsResult.data as { flagged: number; removed: number; rescued: number })
    : { flagged: SITE_STATS.videosFlagged, removed: SITE_STATS.videosRemoved, rescued: SITE_STATS.dogsRescued };

  return (
    <>
      {/* Hero */}
      <HeroBanner
        tag="See. Report. Protect."
        title={
          <>
            Exposing Instagram Videos
            <br />
            <span className="text-accent">Where Dogs Are Harmed</span>
          </>
        }
        description="A collection hub for compassion. We archive, expose, and take action against Instagram videos showing cruelty, neglect, and abuse toward dogs. One click can save a life."
      >
        <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/videos">
              <Search className="mr-2 h-4 w-4" />
              Browse Video Library
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 w-full bg-transparent sm:w-auto"
          >
            <Link href="/submit">
              <Flag className="mr-2 h-4 w-4" />
              Report a Video
            </Link>
          </Button>
        </div>
      </HeroBanner>

      {/* Stats */}
      <section className="border-border bg-background border-b">
        <Container className="py-16">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <StatCard value={stats.flagged} label="Videos Flagged" />
            <StatCard value={stats.removed} label="Removed by Instagram" />
            <StatCard value={SITE_STATS.investigationsOpened} label="Investigations Opened" />
            <StatCard value={stats.rescued} label="Dogs Rescued" />
          </div>
        </Container>
      </section>

      {/* Emergency alert */}
      <WarningBanner title="If you see immediate danger:" variant="destructive">
        <p className="text-muted-foreground mt-1 text-sm">
          Contact your local animal welfare authorities or police immediately.{' '}
          <strong>Do not engage the person posting the content.</strong> Your safety comes first.
        </p>
      </WarningBanner>

      {/* Recent videos */}
      <section className="border-border bg-background border-b">
        <Container className="py-16">
          <SectionHeading
            tag="Recent Reports"
            title="Recently Flagged Videos"
            description="Each submission is manually reviewed before publication. These are confirmed cases where dogs are being harmed."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentVideos.map((video) => (
              <VideoCard key={video.id} video={video} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/videos">
                <Search className="mr-2 h-4 w-4" />
                View Full Video Library
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* How You Can Help */}
      <section className="border-border bg-muted/30 border-b">
        <Container className="py-16">
          <SectionHeading
            tag="Take Action"
            title="How You Can Help"
            description="Every action counts. Here is how you can make a difference today."
            align="center"
          />
          <ActionCards cards={HELP_CARDS} />
          <div className="mt-8 text-center">
            <Button asChild variant="link" className="text-sm">
              <Link href="/rescue">Learn what to do if you witness abuse &rarr;</Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* Success stories */}
      <section className="border-border bg-background border-b">
        <Container className="py-16">
          <SectionHeading
            tag="Impact"
            title="Success Stories"
            description="Cases where exposure led to rescue, arrests, or Instagram removing content."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {successStories.map((story) => (
              <SuccessStoryCard key={story.id} story={story} />
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/success-stories">
                View All Success Stories <Search className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </Container>
      </section>

      {/* CTA */}
      <CtaSection
        title="One Report Can Save a Life"
        description="If you see something, say something. Every video flagged is a chance for intervention. Do not look away."
        buttons={[
          { label: 'Report a Video Now', href: '/submit', icon: <Flag className="mr-2 h-4 w-4" /> },
          { label: 'Learn About Our Mission', href: '/about', variant: 'outline' },
        ]}
      />

      {/* Disclaimer */}
      <section className="bg-muted/50">
        <Container className="py-8">
          <p className="text-muted-foreground text-center text-xs leading-relaxed">
            <strong>Legal Disclaimer:</strong> InstaPaws does not host, store, or control any videos on this site. All
            content is embedded from Instagram and is used for reporting, criticism, and awareness purposes under fair
            use. All submissions are manually reviewed before publication to prevent false reporting.
          </p>
        </Container>
      </section>
    </>
  );
}
