import type { JSX } from 'react';

import { Flag } from 'lucide-react';
import type { Metadata } from 'next';

import { Container } from '@/components/layout/container';
import { CtaSection } from '@/components/shared/cta-section';
import { HeroBanner } from '@/components/shared/hero-banner';
import { StatCard } from '@/components/shared/stat-card';
import { SuccessStoryCard } from '@/components/shared/success-story-card';
import { SITE_STATS } from '@/lib/constants';
import { fetchSuccessStories } from '@/lib/data/videos';

export const metadata: Metadata = {
  title: 'Success Stories',
  description:
    'Cases where exposure led to rescue, arrests, or Instagram removing abusive content. See the real impact of reporting.',
};

/**
 * Success Stories page — stats grid and story cards.
 *
 * @returns {Promise<JSX.Element>} The success stories page content.
 */
export default async function SuccessStoriesPage(): Promise<JSX.Element> {
  const stories = await fetchSuccessStories();

  return (
    <>
      <HeroBanner
        tag="Impact"
        title="Success Stories"
        description="Real cases where reporting led to action. Every report matters. These are the results."
      />

      <section className="border-border bg-background border-b">
        <Container className="py-16">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <StatCard value={SITE_STATS.videosRemoved} label="Videos Removed" />
            <StatCard value={SITE_STATS.investigationsOpened} label="Investigations" />
            <StatCard value={SITE_STATS.dogsRescued} label="Dogs Rescued" />
            <StatCard value={stories.length} label="Stories Published" />
          </div>
        </Container>
      </section>

      <section className="border-border bg-background border-b">
        <Container className="py-16">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <SuccessStoryCard key={story.id} story={story} />
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title="Help Us Create More Success Stories"
        description="Your reports directly lead to rescued animals. Submit a video or spread the word."
        buttons={[
          { label: 'Report a Video', href: '/submit', icon: <Flag className="mr-2 h-4 w-4" /> },
          { label: 'Take Action', href: '/rescue', icon: <Flag className="mr-2 h-4 w-4" />, variant: 'outline' },
        ]}
      />
    </>
  );
}
