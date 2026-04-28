# AGENTS.md — Portal Gineco

Compact guidance for OpenCode sessions. Omitting anything obvious from filenames or standard Next.js docs.

> Also see `CLAUDE.md` for equivalent Claude Code guidance.

## Domain context (critical)

This app is for the **II Cátedra de Clínica Ginecológica** (Hospital Universitario de Maternidad y Neonatología — Maternidad Nacional, FCM-UNC). It manages **gynecology** clinical rotations, portfolios, and tutoring — **not obstetrics, not pediatrics, not neonatology**. All mock cases, locations, and terminology reflect adult gynecology (e.g., colposcopy, ovarian tumors, LEEP, oncología ginecológica). Do not introduce obstetric or baby-related content unless explicitly asked.

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
```

No env vars required. The app runs entirely on in-memory mocks.

## Build & verify

```bash
npm run build      # production build (not static export)
npm run lint       # Next.js default ESLint (no custom config file)
```

There are **no tests, no CI workflows, no Prettier config, and no pre-commit hooks** yet.

## Architecture (single package)

- **Next.js 15** (App Router) + React 19 + TypeScript.
- All data is mock. Real backend (Supabase) is planned for Phase 2 — see `PLAN.md` for roadmap only.
- Entrypoints:
  - `src/app/page.tsx` — redirects to role dashboard or `/login`.
  - `src/app/login/page.tsx` — role selector form that calls server action `loginAsRole`.
  - `src/app/(app)/layout.tsx` — protected layout; redirects unauthenticated to `/login`.
  - **Student:** `src/app/(app)/student/page.tsx` (dashboard), `/student/scan` (QR scanner), `/student/rotations` (check-in history), `/student/portfolio` (case grid), `/student/portfolio/new`, `/student/portfolio/[id]`, `/student/portfolio/[id]/edit` (case CRUD), `/student/forum` (tutor chat), `/student/grades` (grades).
  - **Teacher:** `src/app/(app)/teacher/page.tsx` (student list), `/teacher/students/[id]` (360° view with tabs: portfolio, rotations, forum, grading), `/teacher/forum` (thread list).
  - **Admin:** `src/app/(app)/admin/locations/page.tsx` (location + QR management), `/admin/users` (user list).
- No API routes (`src/app/api` does not exist).

## Auth & session (mock)

- Server actions live in `src/app/actions/auth.ts`.
- Session is a single cookie `pg_role` (`student` | `teacher` | `admin`), 30 days, `httpOnly: false`, `sameSite: lax`.
- `src/lib/session.ts` reads the cookie and returns a hard-coded user per role from `src/lib/mock/data.ts`.
- To “log in” locally, just pick a role on the login page.

## Data layer

- `src/lib/mock/data.ts` — raw mock arrays (users, locations, cases, check-ins, forum, grades). Cases are gynecology-specific clinical scenarios (e.g., ovarian borderline tumors, HSIL/colposcopy, cervical cancer screening).
- `src/lib/mock/index.ts` — typed helper functions that simulate future Supabase queries (e.g. `getCasesByStudent`, `getThreadByPair`).
- `src/lib/types.ts` — domain types designed to map 1-to-1 with the future Supabase schema. Keep them in sync if you extend mocks.

## Styling & UI conventions

- Tailwind CSS with `darkMode: "class"` (managed by `next-themes`).
- CSS variables for the institutional palette are defined in `src/app/globals.css` (UNC blue primary `#13294B`, medical blue accent `#4B9CD3`, maternal green success).
- Components in `src/components/ui/` are hand-written shadcn/ui-style primitives using Radix UI + `class-variance-authority`. They include custom variants/sizes (e.g., Button has `accent`, `success`, and `xl`), so avoid blindly overwriting them with `npx shadcn add`.
- Preserve `data-[state]` selectors and Radix patterns when editing.
- Use `cn(...)` from `src/lib/utils.ts` for conditional classes.
- `next/font/google` loads Inter via CSS variable `--font-inter`.
- Image domains allowed: `images.unsplash.com`, `picsum.photos`, `i.pravatar.cc`, `upload.wikimedia.org` (`next.config.ts`).

## Path alias

`@/*` maps to `./src/*` (see `tsconfig.json`).

## Language

UI copy is in **Spanish** (`es`). Keep new user-facing text in Spanish.

## Roadmap context

`PLAN.md` describes Phases 2–4 (Supabase, Storage, Realtime, AI grading). Do not treat it as executable source — the current codebase is Phase 1 only.
