import { AlertTriangle, ShieldCheck, Flag, Eye, ArrowRight, ExternalLink, Heart, Search } from 'lucide-react';
import Link from 'next/link';

import { SectionHeading } from '@/components/shared/section-heading';
import { StatCard } from '@/components/shared/stat-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardFooter } from '@/components/ui/card';
import { SiteWarningGate } from '@/components/warnings/site-warning-gate';
import { getVideoStats } from '@/lib/actions/videos';
import { SITE_STATS } from '@/lib/constants';
import { fetchRecentVideos, fetchSuccessStories } from '@/lib/data/videos';
import { ABUSE_TYPE_LABELS, REPORT_STATUS_LABELS } from '@/lib/types';

/**
 * Homepage — mission statement, recent flags, stats, CTAs, success stories.
 */
export default async function HomePage() {
  const [recentVideos, successStories] = await Promise.all([fetchRecentVideos(3), fetchSuccessStories()]);
  const statsResult = await getVideoStats();
  const stats = statsResult.success
    ? (statsResult.data as { flagged: number; removed: number; rescued: number })
    : { flagged: SITE_STATS.videosFlagged, removed: SITE_STATS.videosRemoved, rescued: SITE_STATS.dogsRescued };

  return (
    <>
      {/* Content warning gate */}
      <SiteWarningGate />

      {/* ===== HERO SECTION ===== */}
      <section className="border-border bg-primary text-primary-foreground border-b">
        <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <p className="bg-primary-foreground/10 text-accent mb-4 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-semibold tracking-widest uppercase">
              <ShieldCheck className="h-3.5 w-3.5" aria-hidden="true" />
              See. Report. Protect.
            </p>

            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Exposing Instagram Videos
              <br />
              <span className="text-accent">Where Dogs Are Harmed</span>
            </h1>
            <p className="text-primary-foreground/80 mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
              A collection hub for compassion. We archive, expose, and take action against Instagram videos showing
              cruelty, neglect, and abuse toward dogs. One click can save a life.
            </p>

            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button asChild size="lg" className="w-full sm:w-auto">
                <Link href="/videos">
                  <Eye className="mr-2 h-4 w-4" />
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
          </div>
        </div>
      </section>

      {/* ===== STATS SECTION ===== */}
      <section className="border-border bg-background border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <StatCard value={stats.flagged} label="Videos Flagged" />
            <StatCard value={stats.removed} label="Removed by Instagram" />
            <StatCard value={SITE_STATS.investigationsOpened} label="Investigations Opened" />
            <StatCard value={stats.rescued} label="Dogs Rescued" />
          </div>
        </div>
      </section>

      {/* ===== EMERGENCY ALERT ===== */}
      <section className="bg-destructive/10 border-destructive/20 border-b">
        <div className="mx-auto flex max-w-6xl items-start gap-4 px-4 py-6 sm:px-6 lg:px-8">
          <AlertTriangle className="text-destructive mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
          <div>
            <p className="text-destructive font-semibold">If you see immediate danger:</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Contact your local animal welfare authorities or police immediately.{' '}
              <strong>Do not engage the person posting the content.</strong> Your safety comes first.
            </p>
          </div>
        </div>
      </section>

      {/* ===== RECENT VIDEOS ===== */}
      <section className="border-border bg-background border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Recent Reports"
            title="Recently Flagged Videos"
            description="Each submission is manually reviewed before publication. These are confirmed cases where dogs are being harmed."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {recentVideos.map((video) => (
              <Card key={video.id} className="flex flex-col">
                <CardHeader>
                  <div className="bg-muted mb-3 flex aspect-video items-center justify-center rounded-md">
                    <span className="text-muted-foreground text-sm">⚠️ Content Warning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={video.isGraphic ? 'destructive' : 'secondary'}>
                      {ABUSE_TYPE_LABELS[video.abuseType]}
                    </Badge>
                    {video.isGraphic && (
                      <Badge variant="destructive" className="bg-destructive/20 text-destructive">
                        Graphic
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground line-clamp-3 text-sm">{video.description}</p>
                  {video.location && <p className="text-muted-foreground/60 mt-2 text-xs">📍 {video.location}</p>}
                </CardContent>
                <CardFooter className="border-border flex items-center justify-between border-t pt-4">
                  <Badge variant="outline" className="text-xs">
                    {REPORT_STATUS_LABELS[video.status]}
                  </Badge>
                  <Button asChild variant="ghost" size="sm">
                    <Link href={`/videos/${video.id}`}>
                      View Details <ArrowRight className="ml-1 h-3 w-3" />
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
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
        </div>
      </section>

      {/* ===== HOW YOU CAN HELP ===== */}
      <section className="border-border bg-muted/30 border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Take Action"
            title="How You Can Help"
            description="Every action counts. Here is how you can make a difference today."
            align="center"
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            <Card className="text-center">
              <CardHeader>
                <div className="bg-accent/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                  <Flag className="text-accent h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Report a Video</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Found an Instagram video showing abuse? Submit it to our review queue. We verify and escalate every
                  report.
                </p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button asChild>
                  <Link href="/submit">
                    Report Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-accent/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                  <Heart className="text-accent h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Petition Instagram</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Join our campaign demanding better animal abuse detection and faster response times from Instagram.
                </p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button asChild variant="outline">
                  <Link href="/petition">
                    Sign Petition <ExternalLink className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <div className="bg-accent/10 mx-auto flex h-12 w-12 items-center justify-center rounded-full">
                  <ShieldCheck className="text-accent h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="mt-4 text-lg font-semibold">Support Rescue Orgs</h3>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">
                  Donate to verified animal welfare organizations that rescue dogs from harmful situations every day.
                </p>
              </CardContent>
              <CardFooter className="justify-center">
                <Button asChild variant="outline">
                  <Link href="/donate">
                    Donate Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="link" className="text-sm">
              <Link href="/rescue">Learn what to do if you witness abuse &rarr;</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== SUCCESS STORIES ===== */}
      <section className="border-border bg-background border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Impact"
            title="Success Stories"
            description="Cases where exposure led to rescue, arrests, or Instagram removing content."
          />

          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {successStories.map((story) => (
              <Card key={story.id} className="flex flex-col">
                <CardHeader>
                  <div className="bg-accent/10 mb-2 flex h-10 w-10 items-center justify-center rounded-full">
                    <Heart className="text-accent h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-semibold">{story.title}</h3>
                </CardHeader>
                <CardContent className="flex-1">
                  <p className="text-muted-foreground text-sm">{story.summary}</p>
                </CardContent>
                <CardFooter className="border-border border-t pt-4">
                  <Badge variant="outline" className="text-xs">
                    {story.outcome}
                  </Badge>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Button asChild variant="outline">
              <Link href="/success-stories">
                View All Success Stories <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ===== FINAL CTA ===== */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">One Report Can Save a Life</h2>
          <p className="text-primary-foreground/80 mx-auto mt-4 max-w-2xl text-lg">
            If you see something, say something. Every video flagged is a chance for intervention. Do not look away.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Link href="/submit">
                <Flag className="mr-2 h-4 w-4" />
                Report a Video Now
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              <Link href="/about">Learn About Our Mission</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Disclaimer */}
      <section className="bg-muted/50">
        <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 lg:px-8">
          <p className="text-muted-foreground text-center text-xs leading-relaxed">
            <strong>Legal Disclaimer:</strong> InstaPaws does not host, store, or control any videos on this site. All
            content is embedded from Instagram and is used for reporting, criticism, and awareness purposes under fair
            use. All submissions are manually reviewed before publication to prevent false reporting.
          </p>
        </div>
      </section>
    </>
  );
}
