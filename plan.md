## Now I have a complete picture of the project. Here is the comprehensive InstaPaws Implementation Plan.

🐾 InstaPaws — Implementation Plan
See. Report. Protect.

---

0. Current State Assessment
   Item Status
   Next.js 16.2.6 (App Router, params/searchParams are Promises, streaming metadata supported)
   React 19.2.6
   TypeScript 6.0.3
   Tailwind CSS v4
   shadcn/ui Present (button, card, badge, dialog, alert, tabs, input, pagination, etc.)
   Icons Lucide React
   Theme Light/dark via CSS variables
   Existing pages Only / (default CNA boilerplate)
   Routing None defined
   Data layer None
   Auth None

---

1. File Structure
   src/
   ├── app/
   │ ├── (main)/ # Route group — main site
   │ │ ├── layout.tsx # Main site layout (header, nav, footer)
   │ │ ├── page.tsx # Homepage
   │ │ ├── about/
   │ │ │ └── page.tsx # About page
   │ │ ├── contact/
   │ │ │ └── page.tsx # Contact / tips page
   │ │ ├── legal/
   │ │ │ └── page.tsx # Terms, disclaimer, DMCA policy
   │ │ ├── videos/
   │ │ │ ├── page.tsx # Video library (searchable, filterable)
   │ │ │ └── [id]/
   │ │ │ └── page.tsx # Video detail page
   │ │ ├── submit/
   │ │ │ └── page.tsx # Submit a video (report form)
   │ │ ├── rescue/
   │ │ │ └── page.tsx # Rescue / action page
   │ │ ├── success-stories/
   │ │ │ └── page.tsx # Success stories
   │ │ ├── identify-abuse/
   │ │ │ └── page.tsx # Educational guide
   │ │ ├── petition/
   │ │ │ └── page.tsx # Petition / campaigns page
   │ │ └── donate/
   │ │ └── page.tsx # Donate page
   │ │
   │ ├── (moderation)/ # Route group — moderation area
   │ │ ├── layout.tsx # Different layout (no public nav)
   │ │ └── moderate/
   │ │ └── page.tsx # Moderation queue (protected)
   │ │
   │ ├── globals.css # Global styles + design tokens
   │ ├── layout.tsx # Root layout (<html>, <body>, metadata)
   │ ├── not-found.tsx # Custom 404
   │ ├── error.tsx # Global error boundary
   │ └── loading.tsx # Global loading state
   │
   ├── components/
   │ ├── ui/ # shadcn components (already existing)
   │ ├── layout/
   │ │ ├── header.tsx # Site header / navigation
   │ │ ├── footer.tsx # Site footer
   │ │ ├── nav-links.tsx # Navigation links (client component)
   │ │ └── emergency-banner.tsx # Emergency alert banner
   │ ├── videos/
   │ │ ├── video-card.tsx # Video thumbnail card for listing
   │ │ ├── video-grid.tsx # Grid layout for video cards
   │ │ ├── video-detail.tsx # Full video detail with embed
   │ │ ├── content-warning.tsx # Content warning overlay
   │ │ └── context-overlay.tsx # Abuse context & status overlay
   │ ├── forms/
   │ │ ├── submit-video-form.tsx # Video submission form
   │ │ └── contact-form.tsx # Contact form
   │ ├── shared/
   │ │ ├── site-logo.tsx # InstaPaws logo (muted paw print)
   │ │ ├── stat-card.tsx # Statistics display card
   │ │ ├── section-heading.tsx # Section heading component
   │ │ └── cta-section.tsx # Call-to-action section
   │ └── warnings/
   │ ├── discretion-warning.tsx # "Viewer discretion advised" banner
   │ └── emergency-banner.tsx # "If dog is in immediate danger" banner
   │
   ├── lib/
   │ ├── utils.ts # cn() helper (already exists)
   │ ├── constants.ts # Site metadata, navigation, config
   │ ├── types.ts # TypeScript types & interfaces
   │ └── data/
   │ ├── videos.ts # Video data helpers / mock data
   │ └── site.ts # Site content constants
   │
   ├── hooks/
   │ ├── use-content-warning.ts # Content warning state management
   │ └── use-video-filter.ts # Video library filtering
   │
   └── public/
   ├── images/
   │ ├── logo.svg # InstaPaws logo
   │ ├── og-image.jpg # Open Graph image
   │ └── warning-banner.jpg # Content warning banner
   ├── favicon.ico
   ├── apple-icon.png
   └── robots.txt

---

2. Route Map
   Route Page
   / Homepage
   /videos Video Library
   /videos/[id] Video Detail
   /submit Submit a Video
   /rescue Rescue / Action
   /about About
   /contact Contact
   /legal Legal
   /success-stories Success Stories
   /identify-abuse How to Identify Abuse
   /petition Petition / Campaigns
   /donate Donate
   /moderate Moderation Queue

---

3. Design Token System (Tailwind v4)
   Update globals.css with InstaPaws-specific design tokens replacing the default neutral scheme:
   :root {
   /_ Core palette _/
   --background: oklch(0.97 0 0); /_ Near-white _/
   --foreground: oklch(0.15 0 0); /_ Dark grey text _/
   --card: oklch(0.99 0 0);
   --card-foreground: oklch(0.2 0 0);

/_ Brand _/
--primary: oklch(0.3 0 0); /_ Dark grey _/
--primary-foreground: oklch(0.95 0 0);

/_ Alert / warning _/
--destructive: oklch(0.6 0.2 30); /_ Muted orange-red _/

/_ Accent _/
--accent: oklch(0.6 0.12 50); /_ Muted orange _/
--accent-foreground: oklch(0.15 0 0);

/_ Muted blue for secondary elements _/
--secondary: oklch(0.6 0.08 240); /_ Muted blue _/
--secondary-foreground: oklch(0.98 0 0);
}
Key design principles:

- No pastels, no bright colors, no playful gradients
- Muted orange (#C85A17-adjacent) for alerts and CTAs
- Dark grey (#2C2C2C) for backgrounds and text
- Muted blue (#4A6FA5) for secondary info/links
- White space is generous — serious, journalistic feel
- Typography: Inter (sans-serif) — already available via Geist as fallback

---

4. TypeScript Data Model
   // ============ Core Types ============
   export type AbuseType =
   | 'physical-abuse'
   | 'neglect'
   | 'fighting'
   | 'baiting'
   | 'sexual-abuse'
   | 'hoarding'
   | 'abandonment'
   | 'other';
   export type ReportStatus =
   | 'pending-review' // Submitted, awaiting moderation
   | 'under-investigation' // Being reviewed by team
   | 'confirmed' // Verified as abuse
   | 'action-taken' // Instagram/authorities acted
   | 'dismissed' // Determined not abuse
   | 'escalated'; // Sent to authorities
   export type ModerationStatus =
   | 'unmoderated'
   | 'approved'
   | 'rejected';
   // ============ Video Report ============
   export interface VideoReport {
   id: string;
   instagramUrl: string; // Original IG URL
   embedUrl: string; // oEmbed-compatible URL
   thumbnailUrl: string;

abuseType: AbuseType;
description: string; // What the reporter observed
location?: string; // Approximate location (optional)

reportedAt: string; // ISO date
reportedToInstagramAt?: string;
instagramResponse?: string; // Instagram's response if any

status: ReportStatus;
moderationStatus: ModerationStatus;

// Moderation
moderatedBy?: string;
moderatedAt?: string;
moderatorNotes?: string;

// Metadata
viewCount: number;
isGraphic: boolean; // ⚠️ Graphic content flag
}
// ============ Success Story ============
export interface SuccessStory {
id: string;
title: string;
summary: string;
outcome: string; // e.g., "Dog rescued", "Content removed"
videoId?: string; // Links back to the video
date: string;
imageUrl?: string;
}
// ============ Stats ============
export interface SiteStats {
videosFlagged: number;
videosRemoved: number;
investigationsOpened: number;
dogsRescued: number;
}
// ============ Navigation ============
export interface NavItem {
label: string;
href: string;
external?: boolean;
}

---

## 5. Component Architecture (Key Components)

### 5.1 Content Warning Overlay

- **File**: `src/components/videos/content-warning.tsx`
- **Behavior**: Full-screen overlay before video loads
- **Text**: "⚠️ Warning: This video may contain disturbing content showing harm to dogs. Viewer discretion advised."
- **Actions**: [Watch Video] [Go Back]
- **State**: Uses `use-content-warning` hook to track acceptance per session

### 5.2 Video Card (Library view)

- **Props**: `VideoReport` (partial: thumbnail, abuse type, status, date)
- **No auto-play**
- Shows abuse type badge + status indicator
- Optional blur thumbnail toggle for graphic content

### 5.3 Video Detail Page

- Content warning gate → Instagram oEmbed → Context overlay
- **Context overlay** shows:
  - Type of abuse
  - Date reported to Instagram
  - Status
  - Direct link to report on Instagram
- Emergency banner at top if immediate danger

### 5.4 Submission Form

- **Fields**: Instagram URL, abuse type dropdown, description (textarea), optional location
- **No auth required** (anonymized)
- **Honeypot spam protection** + rate limiting
- IP logging for abuse prevention (stored hashed)
- Success message: "Thank you for reporting. Your submission will be reviewed within 24-48 hours."

### 5.5 Moderation Queue

- **Protected**: Basic auth (or simple token gate for v1)
- List view of unmoderated submissions
- Approve / Reject actions
- Notes field for moderator comments
- Link to Instagram post for verification

### 5.6 Emergency Banner

- Sticky top banner on ALL pages
- Text: "If a dog is in immediate danger, contact local authorities. Do not engage the poster."
- Dismissible with session storage

---

6. Data Layer Strategy
   Phase 1 (MVP) — Static / JSON-based

- Use a src/lib/data/videos.ts module that exports typed arrays
- Mock data for all pages
- Filter/sort logic in-memory
- Fast iteration, no database setup needed
  Phase 2 — File-based CMS
- Move data to Markdown files or JSON files in a content/ directory
- Add a simple build-time data loading script
  Phase 3 — Database (future)
- SQLite (via Turso/LibSQL) or PostgreSQL
- API routes for CRUD operations
- Moderation workflow via database state machine

---

7. Implementation Phases
   Phase 1: Foundation ✅ (Week 1)
   Task Details
   1.1 Design tokens in globals.css
   1.2 Root layout metadata update
   1.3 Header + Footer components
   1.4 Navigation (route group layout)
   1.5 Emergency banner (global)
   1.6 Site logo SVGs
   1.7 Homepage (hero, stats, recent flags, CTAs)
   Phase 2: Core Pages ✅ (Week 2)
   Task Details
   2.1 Video Library page with mock data
   2.2 Video Card + Video Grid components
   2.3 Video Detail page with content warning
   2.4 Submit a Video form
   2.5 Context overlay + status display
   2.6 Rescue / Action page
   Phase 3: Informational Pages ✅ (Week 3)
   Task Details
   3.1 About page (mission, editorial policy)
   3.2 Contact page (tips, media inquiries)
   3.3 Legal page (terms, disclaimer, DMCA)
   3.4 Success Stories page
   3.5 How to Identify Abuse (educational)
   Phase 4: Advanced Features ✅ (Week 4)
   Task Details
   4.1 Moderation queue (basic auth gate)
   4.2 Petition / Campaigns page
   4.3 Donate page (transparent split)
   4.4 Video library search & filtering
   4.5 Pagination for video library
   4.6 Stats dashboard on homepage
   Phase 5: Polish & Legal ✅ (Week 5)
   Task
   5.1
   5.2
   5.3
   5.4
   5.5
   5.6
   5.7

---

8. Security & Risk Mitigation
   Risk Implementation
   Spam submissions Honeypot field in form + rate limiting (localStorage timestamp)
   False accusations All submissions moderated before going live
   Abuser retaliation No public reporter info; hash IPs only for abuse prevention
   Legal threats Disclaimer: "We embed public Instagram content for reporting/criticism under fair use." No videos hosted locally.
   User trauma Content warning gate on every video page; optional blur thumbnails
   Instagram blocking Use Instagram oEmbed API; don't hotlink
   CSRF on forms Next.js Server Actions have built-in CSRF protection

---

9. Metadata Strategy
   Update src/app/layout.tsx with the serious-tone metadata from the spec:
   export const metadata: Metadata = {
   title: {
   default: 'InstaPaws — Exposing Instagram Videos Where Dogs Are Harmed',
   template: '%s | InstaPaws',
   },
   description: 'A collection hub for compassion. Report, archive, and take action against Instagram videos showing cruelty, neglect, and abuse toward dogs.',
   metadataBase: new URL('https://www.instapaws.com'),
   openGraph: {
   title: 'InstaPaws — See It. Report It. Protect Them.',
   description: 'Exposing Instagram videos where dogs are being harmed.',
   siteName: 'InstaPaws',
   type: 'website',
   },
   twitter: {
   card: 'summary_large_image',
   title: 'InstaPaws — Stop Dog Abuse on Instagram',
   description: 'Collecting, exposing, and reporting Instagram videos of dog cruelty.',
   },
   // ...
   };

---

## 10. Content Warning Implementation

Two layers of content warnings:

1. **Site-level** (homepage entrance):
   - "⚠️ This site contains disturbing content showing harm to dogs."
   - [Enter] [Learn why this exists]
   - Dismissed = session storage flag
2. **Video-level** (per video page):
   - "⚠️ Warning: This video may contain disturbing content. Viewer discretion advised."
   - [Watch Video] [Go Back]
   - Must click to reveal
   - No auto-play

---

11. Moderation Workflow
    User submits video
    │
    ▼
    [Pending Review] ─── Moderator reviews ─── [Approved] → Public on site
    │ │
    │ ▼
    │ [Live on Video Library]
    │
    └── [Rejected] → Not published; reporter notified (v2)
    Moderation view shows:

- Instagram embed (with content warning)
- Reporter's description
- Abuse type
- Approve / Reject buttons
- Notes field

---

12. Key Dependencies (Already Available)
    These shadcn components are already installed and will be used extensively:
    Component
    button
    card
    badge
    alert
    dialog
    input
    textarea
    select / native-select
    tabs
    pagination
    separator
    spinner
    toggle
    sonner

---

## 13. Starting Implementation Order

Based on the analysis, I recommend we **begin implementation now** in this order:

1. **Design tokens** → Update `globals.css` with InstaPaws palette
2. **Root layout** → Update metadata, add font configuration
3. **Constants & types** → Define all TypeScript types, nav structure
4. **Layout components** → Header, Footer, NavLinks, EmergencyBanner
5. **Route group** → `(main)/layout.tsx` wrapping header/footer
6. **Homepage** → Full redesign with mission, stats, recent flags, CTAs
7. **Video Library** → With mock data, filtering, search
8. **Video Detail** → Content warning + embed + context overlay
9. **Submit form** → Report a video
10. **Remaining pages** → About, Contact, Legal, etc.
11. **Moderation queue** → Basic protected route

---

✅ Final Check (Per Your Spec)

- [x] Content warning on every video page
- [x] No auto-play
- [x] Moderation queue (all submissions reviewed)
- [x] Anonymized reporting (no account needed)
- [x] Emergency banner (immediate danger warning)
- [x] Context overlay (abuse type, status, report link)
- [x] Clear report flow to Instagram
- [x] Legal disclaimer / fair use statement
- [x] Serious design tone (dark grey, muted blue, orange alerts)
- [x] Journalistic/activist vibe (no pastels, no hearts)
- [x] All 12+ pages mapped
