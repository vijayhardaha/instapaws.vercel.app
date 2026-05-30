import { PenLine, ExternalLink, CheckCircle2, Share2 } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { SectionHeading } from '@/components/shared/section-heading';
import { StatCard } from '@/components/shared/stat-card';
import { Button } from '@/components/ui/button';
import { Card, CardHeader } from '@/components/ui/card';

export const metadata: Metadata = {
  title: 'Petition Instagram',
  description:
    'Demand Instagram improve animal abuse detection and response times. Sign the petition and share it with others.',
};

const DEMANDS = [
  {
    title: 'AI-based Animal Abuse Detection',
    description:
      'Instagram must deploy ML models specifically trained to detect animal cruelty — not just generic violence filters.',
  },
  {
    title: 'Reduce Response Time to 24 Hours',
    description:
      'Reports of animal abuse must be reviewed and acted upon within 24 hours. Currently, many go unanswered for weeks.',
  },
  {
    title: 'Dedicated Animal Welfare Team',
    description:
      'Instagram should employ specialists trained in animal welfare assessment — not generic content moderators.',
  },
  {
    title: 'Mandatory Account Suspension',
    description:
      'Accounts found posting animal abuse must face immediate and permanent suspension with IP-level blocking.',
  },
  {
    title: 'Transparent Quarterly Reports',
    description:
      'Instagram must publish transparency reports detailing how many animal abuse reports were received, reviewed, and acted upon.',
  },
];

const SIGNATURE_GOAL = 50000;
const CURRENT_SIGNATURES = 12847;
const PROGRESS_PERCENT = Math.round((CURRENT_SIGNATURES / SIGNATURE_GOAL) * 100);

/**
 *
 */
export default function PetitionPage() {
  return (
    <>
      <section className="border-border bg-primary text-primary-foreground border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Campaign"
            title="Demand Better From Instagram"
            description="Instagram fails to detect and remove animal abuse content. We are demanding real change."
            className="text-primary-foreground"
          />
        </div>
      </section>

      <section className="border-border bg-background border-b">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <StatCard value={CURRENT_SIGNATURES.toLocaleString()} label="Signatures" />
            <StatCard value={SIGNATURE_GOAL.toLocaleString()} label="Goal" />
            <StatCard value="47" label="Videos Flagged" />
            <StatCard value="14" label="Investigations" />
          </div>
        </div>
      </section>

      <section className="border-border bg-muted/30 border-b">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Progress"
            title="Petition Status"
            description={`We are ${PROGRESS_PERCENT}% of the way to our goal. Every signature counts.`}
          />
          <div className="mt-10">
            <div className="mb-2 flex items-center justify-between text-sm">
              <span className="text-foreground font-semibold">{CURRENT_SIGNATURES.toLocaleString()} signatures</span>
              <span className="text-muted-foreground">{SIGNATURE_GOAL.toLocaleString()} goal</span>
            </div>
            <div className="bg-muted h-3 w-full overflow-hidden rounded-full">
              <div className="bg-accent h-full rounded-full transition-all" style={{ width: `${PROGRESS_PERCENT}%` }} />
            </div>
          </div>
        </div>
      </section>

      <section className="border-border bg-background border-b">
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <SectionHeading
            tag="Our Demands"
            title="What We Are Asking For"
            description="Five concrete steps we demand Instagram and Meta take to protect animals."
          />
          <div className="mt-10 space-y-6">
            {DEMANDS.map((demand, i) => (
              <Card key={i} className="border-l-accent border-l-4">
                <CardHeader>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="text-accent mt-0.5 h-5 w-5 shrink-0" aria-hidden="true" />
                    <div>
                      <h3 className="text-base font-semibold">
                        Demand {i + 1}: {demand.title}
                      </h3>
                      <p className="text-muted-foreground mt-1 text-sm">{demand.description}</p>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-6xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Sign the Petition. Share It Widely.</h2>
          <p className="text-primary-foreground/80 mx-auto mt-4 max-w-xl">
            Together we can force Instagram to take animal welfare seriously.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button asChild size="lg" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <a href="#" target="_blank" rel="noopener noreferrer">
                <PenLine className="mr-2 h-4 w-4" />
                Sign the Petition <ExternalLink className="ml-2 h-4 w-4" />
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="border-primary-foreground/20 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
            >
              <a href="#" target="_blank" rel="noopener noreferrer">
                <Share2 className="mr-2 h-4 w-4" />
                Share on Social Media
              </a>
            </Button>
          </div>
        </div>
      </section>

      <section className="bg-muted/50">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <p className="text-muted-foreground text-sm">
            Want to do more?{' '}
            <Link href="/submit" className="hover:text-foreground font-medium underline">
              Submit a video report
            </Link>{' '}
            or{' '}
            <Link href="/donate" className="hover:text-foreground font-medium underline">
              donate to rescue organizations
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
