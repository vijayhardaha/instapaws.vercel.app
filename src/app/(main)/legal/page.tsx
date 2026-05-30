import { Scale, FileText, Shield, AlertTriangle } from 'lucide-react';
import type { Metadata } from 'next';
import Link from 'next/link';

import { HeroBanner } from '@/components/shared/hero-banner';
import { Separator } from '@/components/ui/separator';
import { SITE } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms & Disclaimer',
  description: 'Terms of use, fair use disclaimer, DMCA policy, and viewer discretion advisory for InstaPaws.',
};

const SECTIONS = [
  {
    icon: FileText,
    title: 'Terms of Use',
    content: [
      'By accessing InstaPaws, you agree to use this site only for lawful purposes related to animal welfare awareness and reporting.',
      'All content on this site is provided for informational and educational purposes. We make no guarantees about the accuracy of third-party content embedded from Instagram.',
      'Users may not reproduce, redistribute, or commercially exploit any content from this site without written permission.',
      'We reserve the right to modify these terms at any time. Continued use of the site constitutes acceptance of any changes.',
    ],
  },
  {
    icon: Scale,
    title: 'Fair Use Disclaimer',
    content: [
      'InstaPaws operates under fair use (17 U.S.C. § 107) for purposes of criticism, commentary, news reporting, teaching, scholarship, and research.',
      'All videos embedded on this site are publicly available Instagram content. We do not host, store, or serve video files from our servers.',
      'Embedding does not imply ownership. All intellectual property rights belong to their respective owners.',
      'If you are the copyright holder and believe your content has been used inappropriately, please contact us immediately.',
    ],
  },
  {
    icon: Shield,
    title: 'DMCA Policy',
    content: [
      'InstaPaws respects the intellectual property rights of others and expects the same from our users.',
      `If you believe that content embedded on our site infringes your copyright, you may submit a DMCA takedown request to ${SITE.email}.`,
      'Your request must include: identification of the copyrighted work, the URL of the infringing content, your contact information, and a good-faith statement.',
      'We will review all DMCA requests promptly and remove or disable access to the content if a valid claim is made.',
    ],
  },
  {
    icon: AlertTriangle,
    title: 'Viewer Discretion Advisory',
    content: [
      'This site contains content depicting animal abuse and cruelty. Such content may be distressing to some viewers.',
      'All graphic content is blurred by default. Users must actively choose to view unblurred material.',
      'If you are sensitive to this type of content, please exercise caution when browsing.',
      'If you encounter content that you find excessively graphic or disturbing, please report it to us so we can review it.',
    ],
  },
];

/**
 * Legal page — terms, disclaimers, policies.
 *
 * @returns {unknown} The legal page content.
 */
export default function LegalPage() {
  return (
    <>
      <HeroBanner
        tag="Legal"
        title="Terms, Disclaimer & Policies"
        description="Important legal information about using InstaPaws. Please read carefully."
      />

      <section className="bg-background">
        <div className="px-4 py-16 sm:px-6 lg:px-8">
          <div className="space-y-12">
            {SECTIONS.map((section) => (
              <article key={section.title} id={section.title.toLowerCase().replace(/\s+/g, '-')}>
                <div className="mb-4 flex items-center gap-3">
                  <div className="bg-accent/10 flex h-10 w-10 items-center justify-center rounded-full">
                    <section.icon className="text-accent h-5 w-5" aria-hidden="true" />
                  </div>
                  <h2 className="text-xl font-bold tracking-tight">{section.title}</h2>
                </div>
                <div className="space-y-4 pl-[52px]">
                  {section.content.map((p, i) => (
                    <p key={i} className="text-muted-foreground text-sm leading-relaxed">
                      {p}
                    </p>
                  ))}
                </div>
                <Separator className="mt-12" />
              </article>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="text-muted-foreground text-xs">
              Last updated: {SITE.year}. If you have questions about these policies,{' '}
              <Link href="/contact" className="hover:text-foreground underline">
                contact us
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
