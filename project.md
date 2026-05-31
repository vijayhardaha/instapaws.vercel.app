# InstaPaws — Project Documentation

> **Mission:** Archive, expose, and take action against Instagram videos showing cruelty, neglect, and abuse toward dogs.
> **Tagline:** See. Report. Protect.

---

## Table of Contents

1. [Project Overview](#project-overview)
2. [Architecture Overview](#architecture-overview)
3. [Page-by-Page Documentation](#page-by-page-documentation)
   - [Homepage (`/`)](#homepage-)
   - [About (`/about`)](#about-about)
   - [Contact (`/contact`)](#contact-contact)
   - [Donate (`/donate`)](#donate-donate)
   - [Submit a Video (`/submit`)](#submit-a-video-submit)
   - [Take Action (`/rescue`)](#take-action-rescue)
   - [Video Library (`/videos`)](#video-library-videos)
   - [Video Detail (`/videos/[id]`)](#video-detail-videosid)
   - [Success Stories (`/success-stories`)](#success-stories-success-stories)
   - [Legal (`/legal`)](#legal-legal)
   - [Identify Abuse (`/identify-abuse`)](#identify-abuse-identify-abuse)
   - [Petition (`/petition`)](#petition-petition)
4. [Layout & Navigation](#layout--navigation)
5. [Shared Components Catalog](#shared-components-catalog)
6. [Data Model](#data-model)
7. [Design System](#design-system)

---

## Project Overview

InstaPaws is a Next.js 16 (App Router) application that serves as a **transparent archive and reporting hub** for Instagram videos showing dog abuse. The project uses:

| Layer           | Technology                              |
| --------------- | --------------------------------------- |
| Framework       | Next.js 16.2.6 (App Router)             |
| UI Library      | React 19.2.6                            |
| Language        | TypeScript 6.0.3                        |
| Styling         | Tailwind CSS v4 + shadcn/ui             |
| Icons           | Lucide React                            |
| State           | React hooks (no external state library) |
| Data            | Supabase (Postgres) + mock fallback     |
| Auth            | Supabase SSR (moderation only)          |
| Package Manager | Bun                                     |

**Core principles:**

- No videos are hosted locally — all content is embedded from Instagram via oEmbed
- Every submission is manually reviewed before publication
- Reporters can remain fully anonymous
- Graphic content is blurred by default
- Serious, journalistic design tone — no pastels, no playful elements

---

## Architecture Overview

```
src/
├── app/
│   ├── layout.tsx              # Root layout (<html>, <body>, fonts, metadata)
│   ├── globals.css              # Design tokens, Tailwind layers, custom CSS
│   ├── (main)/                  # Route group — public site pages
│   │   ├── layout.tsx           # Main layout (SiteWarningGate + Header + <main> + Footer)
│   │   ├── page.tsx             # Homepage
│   │   ├── about/page.tsx       # About / mission
│   │   ├── contact/page.tsx     # Contact / tips
│   │   ├── donate/page.tsx      # Donate / partner orgs
│   │   ├── identify-abuse/page.tsx  # Educational guide
│   │   ├── legal/page.tsx       # Terms, DMCA, disclaimers
│   │   ├── petition/page.tsx    # Instagram petition campaign
│   │   ├── rescue/page.tsx      # Action guide
│   │   ├── submit/page.tsx      # Video submission form
│   │   ├── success-stories/page.tsx  # Impact stories
│   │   └── videos/
│   │       ├── page.tsx                   # Video library (searchable)
│   │       └── [id]/page.tsx              # Video detail page
│   └── (moderation)/            # Route group — moderator area
│       └── moderate/page.tsx    # Moderation queue (protected)
├── components/
│   ├── ui/                      # shadcn/ui primitives (button, card, badge, etc.)
│   ├── layout/                  # Header, Footer, NavLinks, SiteLogo, EmergencyBanner, Container
│   ├── shared/                  # HeroBanner, SectionHeading, CtaSection, StatCard, VideoCard, etc.
│   ├── forms/                   # ContactFormClient
│   ├── warnings/                # SiteWarningGate
├── lib/
│   ├── types.ts                 # All TypeScript types (AbuseType, VideoReport, SuccessStory, etc.)
│   ├── constants.ts             # Site config, nav, mock data, stats
│   ├── utils.ts                 # cn(), re-exports formatters
│   ├── utils/                   # formatDate, timeAgo, siteUrl, getPermaLink
│   ├── actions/                 # Server actions (submitVideo, updateVideoModeration, etc.)
│   ├── data/                    # Data fetching (fetchVideos, fetchVideoById, etc.)
│   └── supabase/                # Supabase client, server, config, database types
```

---

## Page-by-Page Documentation

---

### Homepage (`/`)

**File:** `src/app/(main)/page.tsx` — Server Component

**Purpose:** The landing page that establishes the mission, builds trust through statistics, showcases recent reports, and directs users to key actions. Serves as the emotional and informational entry point.

**Sections:**

| Order | Section                     | Component                                     | Content                                                                                                                                  |
| ----- | --------------------------- | --------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | **Hero Banner**             | `HeroBanner`                                  | Tag: "See. Report. Protect." Title: "Exposing Instagram Videos Where Dogs Are Harmed". Two CTAs: [Browse Video Library] [Report a Video] |
| 2     | **Statistics Grid**         | `StatCard` × 4                                | Videos Flagged, Removed by Instagram, Investigations Opened, Dogs Rescued                                                                |
| 3     | **Emergency Warning**       | `WarningBanner`                               | Destructive variant: "If you see immediate danger: Contact local authorities. Do not engage the poster."                                 |
| 4     | **Recently Flagged Videos** | `SectionHeading` + `VideoCard` × 3 + `Button` | Shows 3 most recent approved reports. Link to full library.                                                                              |
| 5     | **How You Can Help**        | `SectionHeading` + `ActionCards` × 3          | Report a Video, Petition Instagram, Support Rescue Orgs. Each card has icon + title + description + CTA.                                 |
| 6     | **Success Stories**         | `SectionHeading` + `SuccessStoryCard` × 3     | Impact cases where reporting led to rescue or content removal.                                                                           |
| 7     | **Call to Action**          | `CtaSection`                                  | "One Report Can Save a Life" — [Report a Video Now] [Learn About Our Mission]                                                            |
| 8     | **Legal Disclaimer**        | Plain `<section>`                             | Fair use note, site purpose disclaimer.                                                                                                  |

**How it helps the project:** Converts visitors into reporters. Builds credibility through stats and success stories. Makes the mission immediately clear.

---

### About (`/about`)

**File:** `src/app/(main)/about/page.tsx` — Server Component

**Purpose:** Explains why InstaPaws exists, establishes editorial principles, documents the moderation process, and sets boundaries. Builds trust through transparency.

**Sections:**

| Order | Section                       | Component                                 | Content                                                                                                 |
| ----- | ----------------------------- | ----------------------------------------- | ------------------------------------------------------------------------------------------------------- |
| 1     | **Hero Banner**               | `HeroBanner`                              | Tag: "About InstaPaws". Title: "A Compassion Hub for Dogs in Distress". Mission statement.              |
| 2     | **Our Mission**               | `SectionHeading` + prose                  | "Why We Built This" — explains the gap in platform response, transparency commitment.                   |
| 3     | **Our Principles**            | `SectionHeading` + `Card` × 4             | Accuracy First, Fair Use & Legal Compliance, Anonymity & Safety, Compassion Not Sensationalism.         |
| 4     | **How We Review Submissions** | `SectionHeading` + ordered list (5 steps) | Numbered moderation workflow from queue → verification → blur → report → reject.                        |
| 5     | **What We Do Not Do**         | `SectionHeading` + boundary cards × 4     | No unmoderated graphic content, no personal info publishing, no legal accusations, no paid submissions. |
| 6     | **Call to Action**            | `CtaSection`                              | "Join the Fight Against Animal Cruelty" — [Report a Video] [Take Action]                                |
| 7     | **Legal Note**                | Plain `<section>`                         | Independence from Meta/Instagram, fair use, DMCA contact link.                                          |

**How it helps the project:** Provides transparency that builds trust. Establishes editorial credibility. Sets clear expectations for users about what the platform does and doesn't do.

---

### Contact (`/contact`)

**File:** `src/app/(main)/contact/page.tsx` — Server Component

**Purpose:** Provides multiple ways to reach the team — anonymous contact form, direct email, and partnership inquiries.

**Sections:**

| Order | Section                   | Component                              | Content                                                                            |
| ----- | ------------------------- | -------------------------------------- | ---------------------------------------------------------------------------------- |
| 1     | **Hero Banner**           | `HeroBanner`                           | Tag: "Contact". Title: "Get in Touch". Description: tips, questions, partnerships. |
| 2     | **Contact Form**          | `SectionHeading` + `ContactFormClient` | Full contact form with name, email, subject, message. Honeypot + rate limiting.    |
| 3     | **Anonymous Tips**        | `SectionHeading` + `Card` × 2          | Email Us Directly (with SITE.email), Use the Submit Form (link to /submit).        |
| 4     | **Partnership Inquiries** | `SectionHeading` + prose               | Collaboration with shelters, rescue orgs, law enforcement, media.                  |

**How it helps the project:** Lowers barrier for tips and collaboration. Maintains anonymity options to protect reporters. Opens door for organizational partnerships.

---

### Donate (`/donate`)

**File:** `src/app/(main)/donate/page.tsx` — Server Component

**Purpose:** Directs supporters to verified animal welfare organizations with complete transparency about where funds go.

**Sections:**

| Order | Section                   | Component                               | Content                                                                                               |
| ----- | ------------------------- | --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| 1     | **Hero Banner**           | `HeroBanner`                            | Tag: "Support the Cause". Title: "Donate to Help Dogs in Need".                                       |
| 2     | **Where Your Money Goes** | `SectionHeading` + fund split cards × 4 | 40% Direct Rescue, 25% Legal & Advocacy, 20% Shelter & Foster, 15% Education & Prevention.            |
| 3     | **Where to Donate**       | `SectionHeading` + `Card` × 6           | Partner orgs: ASPCA, Humane Society, Best Friends, PETA, AKC Rescue, RedRover. Each with donate link. |
| 4     | **Call to Action**        | `CtaSection`                            | "Every Dollar Saves a Life" — [Donate Now] [Report a Video Instead]                                   |
| 5     | **Disclaimer**            | Plain `<section>`                       | Notes InstaPaws does not collect donations directly.                                                  |

**How it helps the project:** Provides a meaningful way for supporters to contribute financially. Transparency builds trust. Partners connect the project to established animal welfare infrastructure.

---

### Submit a Video (`/submit`)

**File:** `src/app/(main)/submit/page.tsx` → `SubmitFormClient`

**Purpose:** The core action page — allows anonymous submission of Instagram video URLs for review. This is the primary funnel for user-generated content.

**Sections:**

| Order | Section                | Component                                                      | Content                                                                                                                               |
| ----- | ---------------------- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | **Hero Banner**        | `HeroBanner`                                                   | Tag: "Report". Title: "Submit a Video". Description with moderation context.                                                          |
| 2     | **Guidelines Warning** | `AlertTriangle` + bullet list                                  | Before-you-submit rules: genuine harm only, no harassment, anonymous, IP logging.                                                     |
| 3     | **Submission Form**    | `Input` + `Select` + `Textarea` + honeypot + `Card` + `Button` | Fields: Instagram URL, Abuse Type (dropdown), Description, Location (optional). Honeypot spam protection. Anonymity reassurance card. |
| 4     | **Success State**      | `CheckCircle` + message                                        | "Thank You for Reporting" — reference ID, moderation timeline info.                                                                   |

**How it helps the project:** This is the primary content acquisition mechanism. Every video in the library originated from this form. Low-friction anonymous submission maximizes reports.

---

### Take Action (`/rescue`)

**File:** `src/app/(main)/rescue/page.tsx` — Server Component

**Purpose:** Step-by-step emergency action guide for someone who has witnessed dog abuse. Converts passive concern into concrete action.

**Sections:**

| Order | Section                   | Component                          | Content                                                                                                                                                                                                   |
| ----- | ------------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | **Hero Banner**           | `HeroBanner`                       | Tag: "Action Guide". Title: "What to Do If You See Dog Abuse".                                                                                                                                            |
| 2     | **Emergency Warning**     | `WarningBanner`                    | "If a dog is in immediate danger, call local authorities immediately."                                                                                                                                    |
| 3     | **Action Steps**          | `Card` × 5 with left border accent | Step 1: Immediate Danger? Call Authorities (destructive). Step 2: Report to Instagram. Step 3: Submit to InstaPaws. Step 4: Contact Animal Welfare Orgs (with phone numbers). Step 5: Educate & Advocate. |
| 4     | **Ready to Take Action?** | `Container` + `Button` × 2         | [Report a Video Now] [Learn to Identify Abuse]                                                                                                                                                            |

**How it helps the project:** Provides immediate, actionable guidance that reduces hesitation. Positions InstaPaws as part of a broader response ecosystem. Converts witnesses into reporters.

---

### Video Library (`/videos`)

**File:** `src/app/(main)/videos/page.tsx` → `VideoLibraryClient`

**Purpose:** Searchable, filterable, paginated collection of all approved video reports. The public-facing evidence archive.

**Sections:**

| Order | Section          | Component                                                                                      | Content                                                                                                             |
| ----- | ---------------- | ---------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| 1     | **Hero Banner**  | `HeroBanner`                                                                                   | Tag: "Archive". Title: "Video Library". Description + count of results.                                             |
| 2     | **Filters Bar**  | `Input` (search) + `Select` × 3 (abuse type, status, sort) + checkbox (graphic content toggle) | Search by description/location, filter by abuse type, status, sort order.                                           |
| 3     | **Results Grid** | `VideoCard` × N (pagination-aware)                                                             | 3-column grid of video cards showing thumbnail placeholder, badges, description, location, status, and detail link. |
| 4     | **Empty State**  | `AlertTriangle` + text + `Button`                                                              | "No videos found" — clear filters button.                                                                           |
| 5     | **Pagination**   | `PaginationBar`                                                                                | Page numbers with ellipsis for large page counts.                                                                   |

**How it helps the project:** Serves as the public evidence archive — the core asset that demonstrates the scope of the problem. Search/filter enables researchers, journalists, and advocates to find specific content.

---

### Video Detail (`/videos/[id]`)

**File:** `src/app/(main)/videos/[id]/page.tsx` → `VideoDetailClient`

**Purpose:** Full detail view of a single video report with content warning gate, embedded video, and context overlay.

**Sections:**

| Order | Section                  | Component                           | Content                                                                                                     |
| ----- | ------------------------ | ----------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| 1     | **Back Link**            | `Button` + `Link`                   | "Back to Video Library"                                                                                     |
| 2     | **Metadata Bar**         | `Badge` × 3 + date                  | Abuse type badge, graphic content badge (if applicable), status badge. Report date.                         |
| 3     | **Content Warning Gate** | `Card` + `AlertTriangle`            | Full-screen warning before video. [I Understand — Show Video] [Go Back]. Extra warning for graphic content. |
| 4     | **Video Embed**          | Placeholder div                     | [Instagram Embed Placeholder] — URL shown.                                                                  |
| 5     | **Report Details**       | `Card` + description + location     | Full description and location of the report.                                                                |
| 6     | **Status & Actions**     | `Card` + definition list + `Button` | Current Status, Reported to Instagram date, Instagram Response, Views. [Report to Instagram Directly] link. |
| 7     | **Emergency Disclaimer** | `AlertTriangle` + text              | "If the dog is in immediate danger: Contact authorities. Do not engage the poster."                         |
| 8     | **Fair Use Note**        | Plain `<p>`                         | Embedding disclosure.                                                                                       |

**How it helps the project:** Provides the evidence in context. Content warning gate protects sensitive viewers. Context overlay gives journalists and advocates the complete picture. Direct Instagram report link enables action.

---

### Success Stories (`/success-stories`)

**File:** `src/app/(main)/success-stories/page.tsx` — Server Component

**Purpose:** Showcases real impact cases where reporting led to rescue, content removal, or arrests. Demonstrates the project's effectiveness.

**Sections:**

| Order | Section            | Component              | Content                                                                                           |
| ----- | ------------------ | ---------------------- | ------------------------------------------------------------------------------------------------- |
| 1     | **Hero Banner**    | `HeroBanner`           | Tag: "Impact". Title: "Success Stories". Description: "Real cases where reporting led to action." |
| 2     | **Impact Stats**   | `StatCard` × 4         | Videos Removed, Investigations, Dogs Rescued, Stories Published.                                  |
| 3     | **Stories Grid**   | `SuccessStoryCard` × N | 3-column grid of cards with heart icon, title, date, summary, outcome badge.                      |
| 4     | **Call to Action** | `CtaSection`           | "Help Us Create More Success Stories" — [Report a Video] [Take Action]                            |

**How it helps the project:** Provides social proof and emotional motivation. Converts abstract statistics into human stories. Encourages reporting by showing results.

---

### Legal (`/legal`)

**File:** `src/app/(main)/legal/page.tsx` — Server Component

**Purpose:** Comprehensive legal documentation — terms of use, fair use disclaimer, DMCA policy, viewer discretion advisory.

**Sections:**

| Order | Section                        | Component                     | Content                                                                              |
| ----- | ------------------------------ | ----------------------------- | ------------------------------------------------------------------------------------ |
| 1     | **Hero Banner**                | `HeroBanner`                  | Tag: "Legal". Title: "Terms, Disclaimer & Policies".                                 |
| 2     | **Terms of Use**               | Article with icon + prose × 4 | Lawful use, informational purpose, no redistribution, terms may change.              |
| 3     | **Fair Use Disclaimer**        | Article with icon + prose × 4 | 17 U.S.C. § 107, embedding vs hosting, no ownership claim, copyright holder contact. |
| 4     | **DMCA Policy**                | Article with icon + prose × 4 | Takedown process, required information, prompt review.                               |
| 5     | **Viewer Discretion Advisory** | Article with icon + prose × 4 | Disturbing content, blurred by default, sensitivity warning, reporting.              |

**How it helps the project:** Legal protection against liability. Establishes fair use framework for embedded content. Provides DMCA compliance path. Protects both the project and visitors.

---

### Identify Abuse (`/identify-abuse`)

**File:** `src/app/(main)/identify-abuse/page.tsx` — Server Component

**Purpose:** Educational resource that teaches users how to recognize different types of animal abuse. Empowers confident reporting.

**Sections:**

| Order | Section              | Component                      | Content                                                                                                                                                                                                     |
| ----- | -------------------- | ------------------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | **Hero Banner**      | `HeroBanner`                   | Tag: "Education". Title: "How to Identify Dog Abuse".                                                                                                                                                       |
| 2     | **Content Warning**  | `AlertTriangle` + text         | Distressing content warning about signs described below.                                                                                                                                                    |
| 3     | **Abuse Types Grid** | `NoiseBackground` + `Card` × 6 | Physical Abuse (Critical), Neglect & Starvation (Serious), Dog Fighting (Critical), Baiting (Critical), Hoarding (Serious), Abandonment (High). Each with severity badge, description, and signs checklist. |
| 4     | **Call to Action**   | `CtaSection`                   | "Spotted the Signs? Take Action Now." — [Report a Video] [Full Action Guide]                                                                                                                                |

**How it helps the project:** Educates the public to recognize abuse they might otherwise miss. Improves report quality by helping submitters accurately categorize abuse. Positions InstaPaws as a trusted educational resource.

---

### Petition (`/petition`)

**File:** `src/app/(main)/petition/page.tsx` — Server Component

**Purpose:** Campaign page demanding Instagram improve animal abuse detection and response. Mobilizes collective action.

**Sections:**

| Order | Section               | Component                       | Content                                                                                                                                                  |
| ----- | --------------------- | ------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1     | **Hero Banner**       | `HeroBanner`                    | Tag: "Campaign". Title: "Demand Better From Instagram".                                                                                                  |
| 2     | **Campaign Stats**    | `StatCard` × 4                  | Signatures (current), Goal, Videos Flagged, Investigations.                                                                                              |
| 3     | **Petition Progress** | `SectionHeading` + progress bar | Visual progress bar showing % toward signature goal.                                                                                                     |
| 4     | **Our Demands**       | `SectionHeading` + `Card` × 5   | Demand 1: AI-based Detection. Demand 2: 24hr Response. Demand 3: Dedicated Welfare Team. Demand 4: Mandatory Suspension. Demand 5: Transparency Reports. |
| 5     | **Call to Action**    | `CtaSection`                    | "Sign the Petition. Share It Widely." — [Sign] [Share]                                                                                                   |
| 6     | **More Ways to Help** | Plain `<section>`               | Links to /submit and /donate.                                                                                                                            |

**How it helps the project:** Drives systemic change beyond individual video reports. Gives users a collective advocacy outlet. Creates pressure on Instagram/Meta through public demand.

---

## Layout & Navigation

### Root Layout (`src/app/layout.tsx`)

- **Purpose:** Defines `<html>` and `<body>` tags, font loading, global metadata, viewport, analytics
- **Metadata:** OG tags, Twitter card, robots, content-warning header
- **Analytics:** Google Analytics (production only), Vercel Analytics (production only)

### Main Layout (`src/app/(main)/layout.tsx`)

- **Structure:** `SiteWarningGate` → `Header` → `<main>{children}</main>` → `Footer`
- **SiteWarningGate:** Full-screen content warning popup that blocks entry unless accepted (persists 7 days in localStorage). Hidden on /about page.

### Header (`src/components/layout/header.tsx`)

- Sticky header with backdrop blur
- `SiteLogo` (SVG paw print + "InstaPaws" text in orange accent)
- `NavLinks` — desktop (horizontal) and mobile (hamburger menu)
- Navigation items: Home, Video Library, Submit a Video, Take Action, About

### Footer (`src/components/layout/footer.tsx`)

- 4-column navigation: Site, Learn, Engage, Legal
- Logo + tagline + description
- Copyright + fair use disclaimer

---

## Shared Components Catalog

| Component          | Used On                                                                    | Purpose                                                           |
| ------------------ | -------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| `HeroBanner`       | All pages                                                                  | Dark hero section with tag, title, description, optional children |
| `SectionHeading`   | All content pages                                                          | Optional tag label + h2 title + description                       |
| `CtaSection`       | Homepage, About, Success Stories, Donate, Petition, Identify Abuse, Rescue | Full-width dark CTA with 1-2 buttons                              |
| `StatCard`         | Homepage, Success Stories, Petition                                        | Large number + small label display                                |
| `VideoCard`        | Homepage, Video Library                                                    | Abuse type badge + description + status + detail link             |
| `SuccessStoryCard` | Homepage, Success Stories                                                  | Heart icon + title + date + summary + outcome                     |
| `ActionCards`      | Homepage                                                                   | 3-column grid of icon + title + description + CTA                 |
| `WarningBanner`    | Homepage, Rescue, Video Detail                                             | Alert triangle + title + description/children                     |
| `PaginationBar`    | Video Library                                                              | Page numbers with ellipsis                                        |
| `Container`        | All pages                                                                  | Max-width content wrapper with responsive padding                 |
| `SiteWarningGate`  | All pages (except /about)                                                  | Content warning popup with 7-day persistence                      |

---

## Data Model

**Core Types** (from `src/lib/types.ts`):

| Type               | Purpose                                                                                                                 |
| ------------------ | ----------------------------------------------------------------------------------------------------------------------- |
| `AbuseType`        | Union of 8 abuse categories (physical-abuse, neglect, fighting, baiting, sexual-abuse, hoarding, abandonment, other)    |
| `ReportStatus`     | Union of 6 lifecycle statuses (pending-review → under-investigation → confirmed → action-taken / dismissed / escalated) |
| `ModerationStatus` | Union of 3 review states (unmoderated, approved, rejected)                                                              |
| `VideoReport`      | Full report object with 16 fields covering URL, abuse details, timestamps, moderation, metadata                         |
| `SuccessStory`     | Impact story with title, summary, outcome, optional video link                                                          |
| `SiteStats`        | Aggregate counters for homepage display                                                                                 |
| `NavItem`          | Navigation link with label, href, external flag                                                                         |

**Data Flow:**

1. User submits video via `/submit` → server action (`submitVideo`) → Supabase `videos` table
2. Moderator reviews via `/moderate` → server action (`updateVideoModeration`) → moderation fields updated
3. Public pages fetch via `src/lib/data/videos.ts` → Supabase query or mock fallback
4. Client components use React hooks (`useState`, `useMemo`) for filtering/sorting/pagination

---

## Design System

**Palette** (from `globals.css` tokens):

| Token           | Value (Light) | Role                                 |
| --------------- | ------------- | ------------------------------------ |
| `--background`  | `#f4f5f7`     | Page background                      |
| `--foreground`  | `#14161a`     | Text color                           |
| `--primary`     | `#1f2227`     | Dark sections, CTAs                  |
| `--secondary`   | `#43789c`     | Muted blue — secondary info          |
| `--accent`      | `#c96736`     | Muted orange — alerts, CTAs, accents |
| `--destructive` | `#dc1600`     | Red — danger/emergency               |
| `--muted`       | `#e6e8eb`     | Muted backgrounds                    |

**Tone:** Serious, journalistic, activist. No pastels, no gradients, no playful elements.
**Typography:** System sans-serif (body), heading font (titles), monospace (code). Bold, clean, readable.
