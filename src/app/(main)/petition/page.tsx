import { PenLine, CheckCircle2, Share2 } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { CtaSection } from '@/components/shared/cta-section';
import { HeroBanner } from '@/components/shared/hero-banner';
import { SectionHeading } from '@/components/shared/section-heading';
import { StatCard } from '@/components/shared/stat-card';
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
 * Petition page — demands, progress bar, and CTAs.
 *
 * @returns {unknown} The petition page content.
 */
export default function PetitionPage() {
  return (
    <>
      <HeroBanner
        tag="Campaign"
        title="Demand Better From Instagram"
        description="Instagram fails to detect and remove animal abuse content. We are demanding real change."
      />

      <section className="border-border bg-background border-b">
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            <StatCard value={CURRENT_SIGNATURES.toLocaleString()} label="Signatures" />
            <StatCard value={SIGNATURE_GOAL.toLocaleString()} label="Goal" />
            <StatCard value="47" label="Videos Flagged" />
            <StatCard value="14" label="Investigations" />
          </div>
        </div>
      </section>

      <section className="border-border bg-muted/30 border-b">
        <div className="px-4 py-16 sm:px-6 lg:px-8">
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
        <div className="px-4 py-16 sm:px-6 lg:px-8">
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

      <CtaSection
        title="Sign the Petition. Share It Widely."
        description="Together we can force Instagram to take animal welfare seriously."
        buttons={[
          { label: 'Sign the Petition', href: '#', icon: <PenLine className="mr-2 h-4 w-4" /> },
          { label: 'Share on Social Media', href: '#', icon: <Share2 className="mr-2 h-4 w-4" />, variant: 'outline' },
        ]}
      />

      <section className="bg-muted/50">
        <div className="px-4 py-12 text-center sm:px-6 lg:px-8">
          <p className="text-muted-foreground text-sm">
            Want to do more?{' '}
            <Link href="/submit" className="hover:text-foreground font-semibold underline">
              Submit a video report
            </Link>{' '}
            or{' '}
            <Link href="/donate" className="hover:text-foreground font-semibold underline">
              donate to rescue organizations
            </Link>
            .
          </p>
        </div>
      </section>
    </>
  );
}
