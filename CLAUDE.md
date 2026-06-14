# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Personal Shopper Imobiliário — a luxury real estate landing page and blog for Godoy Prime (Barra da Tijuca, Rio de Janeiro). The site combines a public-facing marketing page and blog with an admin dashboard for lead management, article publishing, newsletter, and comment moderation.

**Stack:** React 18 + TypeScript, Vite, Tailwind CSS, shadcn-ui (Radix UI), TanStack React Query, React Router v7, Supabase (PostgreSQL + Auth + Edge Functions).

## Commands

```bash
npm run dev        # start dev server (port 8080); also runs sitemap generation first
npm run build      # production build; also runs sitemap generation first
npm run lint       # ESLint
npm run preview    # preview production build
```

There is no test runner configured.

The `predev` and `prebuild` scripts run `bunx tsx scripts/generate-sitemap.ts`, which fetches active articles from Supabase and writes `public/sitemap.xml`. This requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_PUBLISHABLE_KEY` to be set (falls back to hardcoded project defaults if missing).

## Architecture

### Route Structure (`src/App.tsx`)

Public routes are eagerly imported. All routes that touch the Supabase client — Auth, ResetPassword, and all `/admin/*` routes — are **lazy-loaded** via `React.lazy()`. This prevents crashes on the landing page when env vars are absent.

Admin routes are wrapped in `<RequireAdmin>` (also lazy), which checks both an active session and a row in the `user_roles` table.

```
/                     → Index → LandingPageV4
/artigos              → blog listing
/artigos/:slug        → single article
/auth                 → login/signup
/reset-password       → password reset
/admin/leads          → CRM dashboard
/admin/artigos        → article CRUD
/admin/comentarios    → comment moderation
/admin/configuracoes  → site settings
/admin/newsletter     → newsletter management
```

### Supabase Client Pattern

Never import `@/integrations/supabase/client` directly in components that could render without Supabase configured. Instead, use `getBackendClient()` from `@/lib/backend`:

```ts
import { getBackendClient } from "@/lib/backend";

const client = await getBackendClient(); // returns null if env vars missing
if (!client) return;
```

The `@/integrations/supabase/client` module holds the actual `createClient` call; `@/lib/backend` lazily imports it and memoizes the promise.

Generated TypeScript types for the database live in `src/integrations/supabase/types.ts` — regenerate with the Supabase CLI (`supabase gen types typescript --project-id kufrldjlrudnnjeipfjx`) after schema changes.

### Data Fetching

Pages fetch data directly with `useEffect` + `getBackendClient()`, not via React Query hooks. React Query's `QueryClientProvider` is present in `App.tsx` but used selectively. Always set a `cancelled` flag in `useEffect` cleanup to prevent state updates after unmount:

```ts
useEffect(() => {
  let cancelled = false;
  (async () => {
    const client = await getBackendClient();
    if (cancelled || !client) return;
    // fetch...
    if (cancelled) return;
    setState(data);
  })();
  return () => { cancelled = true; };
}, []);
```

### Article Content Rendering

`src/lib/renderArticleContent.tsx` handles both HTML and Markdown article bodies. It sanitizes HTML through an allowlist (`ALLOWED_TAGS`, `ALLOWED_CLASSES`), converts `h1` → `h2`, and strips dangerous attributes. Only specific CSS classes are preserved (e.g., `article-lead`, `callout`, `stat-row`). Do not add new classes to article content without adding them to `ALLOWED_CLASSES`.

### Styling Conventions

- **Tailwind utility-first** with the full shadcn-ui component set in `src/components/ui/`
- **Custom design tokens** defined as CSS HSL variables in `src/index.css`: `--luxury-navy`, `--luxury-gold`, `--luxury-charcoal`, etc. Reference via Tailwind classes like `bg-luxury-navy`
- **Class composition**: use `cn()` from `@/lib/utils` (wraps `clsx` + `tailwind-merge`) for conditional or merged class strings
- Component variants use `class-variance-authority` (CVA)
- Per-page CSS files live in `src/styles/` (e.g., `landing-v4.css`, `blog.css`)

### Supabase Edge Functions

Located in `supabase/functions/`. Current functions:

- `send-crm-lead` / `retry-crm-lead` / `retry-crm-leads-cron` — DateAHome CRM integration
- `send-email` — Resend email service
- `send-whatsapp` / `track-wa-click` — Z-API WhatsApp
- `gerar-artigo-ia` — AI article generation

### Language Convention

All UI text, database field names, variable names, and comments are in **Portuguese**. Maintain this convention when adding new features.

### SEO

Pages use `react-helmet-async` for `<title>`, meta tags, and Open Graph. The `HelmetProvider` wraps the app in `src/main.tsx`. Add canonical links and OG tags to any new public-facing page.

### HeyGen Avatar

`HeygenAvatar` is imported but commented out in `App.tsx`. Do not remove the comment — it is temporarily disabled pending a knowledge base update.
