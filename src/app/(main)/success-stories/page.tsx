import { Heart, ArrowRight, Flag, Calendar } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { SectionHeading } from '@/components/shared/section-heading';
import { StatCard } from '@/components/shared/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { SITE_STATS } from '@/lib/constants';
import { fetchSuccessStories } from '@/lib/data/videos';

export const metadata: Metadata = {
  title: 'Success Stories',
  description:
    'Cases where exposure led to rescue, arrests, or Instagram removing abusive content. See the real impact of reporting.',
};

/**
 *
 */
export default async function SuccessStoriesPage() {
  const stories = await fetchSuccessStories();

  return (
    <>
      <section className="border-border bg-primary text-primary-foreground border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Impact"
            title="Success Stories"
            description="Real cases where reporting led to action. Every report matters. These are the results."
            className="text-primary-foreground"
          />
        </div>
      </section>

      <section className="border-border bg-background border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <StatCard value={SITE_STATS.videosRemoved} label="Videos Removed" />
            <StatCard value={SITE_STATS.investigationsOpened} label="Investigations" />
            <StatCard value={SITE_STATS.dogsRescued} label="Dogs Rescued" />
            <StatCard value={stories.length} label="Stories Published" />
          </div>
        </div>
      </section>

      <section className="border-border bg-background border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {stories.map((story) => (
              <Card key={story.id} className="flex flex-col">
                <CardHeader>
                  <div className="bg-accent/10 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                    <Heart className="text-accent h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base leading-tight font-semibold">{story.title}</h3>
                  <div className="mt-2 flex items-center gap-2">
                    <Calendar className="text-muted-foreground h-3.5 w-3.5" aria-hidden="true" />
                    <span className="text-muted-foreground text-xs">
                      {new Date(story.date).toLocaleDateString('en-US', {
                        month: 'long',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm leading-relaxed">{story.summary}</p>
                </CardContent>
                <CardFooter className="border-border border-t pt-4">
                  <Badge variant="outline" className="text-xs">
                    Outcome: {story.outcome}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Help Us Create More Success Stories</h2>
          <p className="text-primary-foreground/80 mx-auto mt-4 max-w-xl">
            Your reports directly lead to rescued animals. Submit a video or spread the word.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/submit">
                <Flag className="mr-2 h-4 w-4" />
                Report a Video
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              <Link href="/rescue">
                Take Action <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
