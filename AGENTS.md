<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

<!-- END:nextjs-agent-rules -->

> **🧠 Read `taste.md` first.** It documents the project owner's preferences — package manager, architecture patterns, code style, and what to avoid. All agents should follow it.

# InstaPaws — Agent Guide

**Mission:** Expose, archive, and take action against Instagram videos showing cruelty toward dogs.
**Site:** https://www.instapaws.com

---

## Tech Stack

| Layer           | Technology                                                                               |
| --------------- | ---------------------------------------------------------------------------------------- |
| Framework       | Next.js 16.2.6 (App Router)                                                              |
| Language        | TypeScript 6.0.3                                                                         |
| Styling         | Tailwind CSS v4 (`tw-animate-css`, `shadcn/tailwind.css`)                                |
| UI Components   | shadcn/ui (Radix UI primitives)                                                          |
| Icons           | Lucide React (`lucide-react`) + Tabler Icons (`@tabler/icons-react`)                     |
| Fonts           | Solway (headings), Zilla Slab (body), Courier Prime (mono) — via `next/font/google`      |
| Animation       | `motion` (Motion library)                                                                |
| Backend / Auth  | Supabase (`@supabase/ssr`, `@supabase/supabase-js`) — gracefully falls back to mock data |
| Package Manager | Bun                                                                                      |
| Lint            | ESLint 10 (flat config via `@vijayhardaha/dev-config/eslint/next`)                       |
| Format          | Prettier (via `@vijayhardaha/dev-config/prettier` + `prettier-plugin-tailwindcss`)       |

---

## Project Architecture

```
src/
├── app/                          # Next.js App Router
│   ├── layout.tsx                # Root layout (<html>, <body>, metadata, fonts)
│   ├── globals.css               # Tailwind v4 design tokens (oklch color palette)
│   ├── (main)/                   # Public site route group
│   │   ├── layout.tsx            # Main layout (SiteWarningGate + Header + Footer)
│   │   ├── page.tsx              # Homepage (hero, stats, recent reports, CTAs)
│   │   ├── about/page.tsx        # Mission, editorial policy
│   │   ├── videos/page.tsx       # Video library (search + filter + paginate)
│   │   ├── videos/[id]/page.tsx  # Video detail (content warning gate + embed)
│   │   └── ...
│   ├── (moderation)/             # Moderation route group
│   │   └── moderate/page.tsx
├── components/
│   ├── ui/                       # shadcn/ui primitives (button, card, badge, etc.)
│   ├── layout/                   # header, footer, nav-links, emergency-banner
│   ├── shared/                   # section-heading, stat-card
│   └── warnings/                 # site-warning-gate
├── hooks/
│   └── use-outside-click.tsx     # Click-outside detection hook
├── lib/
│   ├── utils.ts                  # cn() helper (clsx + tailwind-merge)
│   ├── constants.ts              # SITE config, nav items, mock data
│   ├── types.ts                  # App-level TypeScript types
│   ├── fonts.ts                  # Google Fonts configuration
│   ├── rate-limiter.ts           # Submission rate limiting (per IP)
│   ├── actions/
│   │   └── videos.ts             # Server actions (submit, moderate, stats)
│   ├── data/
│   │   └── videos.ts             # Data fetching with Supabase → mock fallback
│   └── supabase/
│       ├── config.ts             # Env var detection
│       ├── client.ts             # Browser client (singleton)
│       ├── server.ts             # Server client (cookies-based auth)
│       └── database.types.ts     # DB schema types
```

---

## Key Conventions

### Imports

- **Absolute imports** use the `@/` alias: `@/components/ui/button`, `@/lib/utils`
- **Group order:** React → external packages → internal components → lib/utils → CSS
- **Separate groups** with a blank line

### Components

- **Server-first.** Pages and data-fetching components are async Server Components by default
- **Client components** are opt-in: add `'use client'` at the top for interactivity (hooks, event handlers, state)
- **Pattern:** Server Component shell fetches data → passes to Client Component via props
- Example: `videos/page.tsx` (server) → `video-library-client.tsx` (client)

### Data Layer

- **Always dual-path:** try Supabase first, fall back to mock data on failure or when Supabase is unconfigured
- Check `isSupabaseConfigured()` before calling Supabase
- Server actions in `lib/actions/` use `'use server'` directive
- Data fetching in `lib/data/` uses Supabase server client

### Styling

- **Tailwind CSS v4** with CSS `@import` statements (not JS config)
- **Class merging:** use the `cn()` utility from `@/lib/utils` — always the last className
- **Design tokens:** all colors use `oklch()` in CSS variables (see `globals.css`)
- **Dark mode:** via `.dark` class — use `@custom-variant dark (&:is(.dark *))`

### UI Components

- Most shadcn/ui components named after their function (not dead sub-components)
- Only **actively used** exports are preserved — dead sub-components have been removed
- If you need a sub-component (e.g., `SelectContent`), check that it's exported from the file first
- `radix-ui` package provides primitives (Dialog, Select, Tooltip, etc.)
- `@base-ui/react` provides Combobox

### Fonts

- Configured in `src/lib/fonts.ts` — Solway (heading), Zilla Slab (body), Courier Prime (mono)
- Applied in root `layout.tsx` via `fontClassNames` on the `<html>` element
- CSS variables: `--font-heading`, `--font-body`, `--font-mono`

### Forms & Actions

- Use Next.js Server Actions (`'use server'` in `lib/actions/`)
- `FormData` API for form handling
- Rate limiting via `src/lib/rate-limiter.ts` (checks localStorage/IP cooldown)
- Honeypot field for spam prevention

### Moderation

- Videos have 3 moderation states: `unmoderated` → `approved` | `rejected`
- Only `approved` videos appear on the public site
- Moderation view authenticated via simple token gate (session storage)

---

## Design System

### Color Palette (oklch)

| Token           | Light            | Dark          | Usage                     |
| --------------- | ---------------- | ------------- | ------------------------- |
| `--primary`     | Dark charcoal    | Near-white    | Hero sections, CTAs       |
| `--accent`      | Muted orange     | Muted orange  | CTAs, badges, highlights  |
| `--destructive` | Muted orange-red | Lighter red   | Warnings, graphic content |
| `--secondary`   | Muted blue       | Muted blue    | Secondary info, links     |
| `--background`  | Near-white       | Dark charcoal | Page backgrounds          |
| `--muted`       | Light grey       | Dark grey     | Secondary backgrounds     |

### Tone

- **Serious, journalistic, activist.** No pastels, no bright colors, no playful gradients.
- Generous white space. Dark grey + muted orange + muted blue.
- Content warnings on all graphic content. No auto-play. No sensationalism.

---

## Important Gotchas

1. **Read `taste.md`** — It documents the project owner's coding preferences. Always check it before making changes.

2. **Next.js 16 — params/searchParams are Promises.** Must await them: `const { id } = await params`
3. **Supabase config check:** Always call `isSupabaseConfigured()` before creating a client — returns false with placeholder env vars
4. **Server client needs async:** `const supabase = await createClient()` (cookies are async now)
5. **Strict JSDoc lint:** Every exported function needs `@param` and `@returns` JSDoc tags — run `bun run lint:fix` to auto-fix
6. **`<img>` vs `next/image`:** Use `<img>` with `// eslint-disable-next-line @next/next/no-img-element` for external/CDN images only; use Next.js `<Image>` for local assets
7. **No `Math.random()` during render** — use lazy `useState(() => Math.random())` instead
8. **`localStorage`/`sessionStorage` in SSR:** Wrap in try-catch inside lazy `useState` initializer to prevent ReferenceError during prerendering
9. **Dead UI files have been cleaned up** — if you need a component from `@/components/ui/`, check it exists first rather than assuming
10. **No auth system** — moderation uses sessionStorage-based token gate (no real auth yet)
11. **`bun run`** for all scripts (not npm/yarn)
