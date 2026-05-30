# InstaPaws — Code Taste & Preferences

> This file documents my coding preferences based on past choices.
> Agents should read this before making changes.

---

## Package Manager

- **Bun** — Always use `bun run`, `bun install`, `bunx`, etc. Never `npm` or `yarn`.

## Architecture

- **Server-first** — Pages are async Server Components by default. Client components only when interactivity (hooks, state, events) is needed.
- **Server → Client pattern** — Server Component fetches data, passes to Client Component via props. No data fetching in client components.
- **Mock fallback** — Data layer always tries Supabase first, falls back gracefully to mock data when unconfigured. Check `isSupabaseConfigured()`.
- **Server Actions** — Use `'use server'` in `lib/actions/` for form handling. Not API routes.
- **`html` element** — Add `data-scroll-behavior="smooth"` to suppress Next.js router transition warning when `scroll-behavior: smooth` is set in CSS.

## Code Style

- **Named exports** — Always `export function Foo()` not `export default function`.
- **Absolute imports** — Always use `@/` alias. Never relative imports like `../../`.
- **Import ordering** — React → external packages → internal components → lib/utils → CSS. Groups separated by blank lines.
- **TypeScript** — Strict. Define interfaces/types in `lib/types.ts`. No `any` casts.
- **JSDoc required for everything** — Every exported function, type, interface, constant, and component MUST have a JSDoc block. This includes:
  - Functions: `@param` and `@returns` tags with types and descriptions
  - Types/Interfaces: `@type` tag + `@property` for each field
  - Constants: Single-line summary description
  - Not optional — the linter enforces this. Run `bun run lint:fix` for auto-fixable issues, but most JSDoc must be written manually.
  - Rule of thumb: If you export it, document it with JSDoc before writing the implementation code.
- **`cn()` utility** — Always last className. Import from `@/lib/utils`. Never raw template strings for conditional classes.

## UI & Design

- **Tailwind CSS v4** — CSS `@import` statements, not JS config. `oklch()` color values.
- **Dark mode** — Via `.dark` class. Use `@custom-variant dark (&:is(.dark *))`.
- **shadcn/ui + radix-ui** — UI primitives. Don't reinvent. Only keep actively used exports.
- **Lucide React** — Primary icon set. Tabler Icons as secondary.
- **Serious tone** — Dark greys, muted orange accent, muted blue secondary. No pastels, no gradients, no playful elements.
- **Generous white space** — Not crowded layouts.

## Component Splitting

- **Reusable patterns → shared components** — When a layout/card/CTA pattern repeats across pages, extract into `src/components/shared/`. Favorite patterns: `CtaSection`, `HeroBanner`, `WarningBanner`, `VideoCard`, `PaginationBar`, `ActionCards`, `SuccessStoryCard`.
- **Large pages → smaller sections** — `page.tsx` >200 lines should extract sections into named helper components or separate files.
- **Large functions → named helpers** — Extract filter/sort/format logic into named functions (not inline lambdas) at module level for clarity and testability.
- **Date formatting** — Use `src/lib/utils/date.ts` (re-exported from `@/lib/utils`). Pure functions: `formatDate()`, `timeAgo()`. Accept `string` date values.

## Patterns to Always Use

- **`localStorage`/`sessionStorage` in SSR** — Wrap in try-catch inside lazy `useState(() => ...)` initializer.
- **`Math.random()` during render** — Use lazy `useState(() => Math.random())`, never inline.
- **`<img>` for external/CDN** — Add `// eslint-disable-next-line @next/next/no-img-element` comment. Use `next/image` only for local assets.
- **Form handling** — Use `FormData` API with Server Actions. Honey-pot for spam. Rate limiting via `lib/rate-limiter.ts`.
- **`React.ReactNode`** — Import as `import type { ReactNode } from 'react'`. Never reference `React.ReactNode` unqualified.

## What to Avoid

- Unused exports / dead code — remove them. Check with `fallow health` and code search.
- Large files (>200 lines) — split into smaller components.
- Large functions — break down into named helper functions.
- Client Components that don't need to be client — prefer server.
- `Math.random()` during render — causes hydration mismatches.
- Direct `localStorage`/`sessionStorage` access in SSR — causes ReferenceError.
- Unused imports after refactoring — double-check imports when removing/replacing components.
