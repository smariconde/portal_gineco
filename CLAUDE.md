# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build
npm run lint     # ESLint via Next.js
```

No test framework is configured yet.

## Architecture

**Stack:** Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS + shadcn/ui

### Route Structure

All protected routes live under `src/app/(app)/` and are guarded by `src/app/(app)/layout.tsx`, which calls `getCurrentUser()` and redirects unauthenticated users to `/login`.

Three roles exist — **student**, **teacher**, **admin** — each with distinct navigation:
- Student: `/student` (dashboard), `/student/scan`, `/student/rotations`, `/student/portfolio`, `/student/forum`, `/student/grades`
- Teacher: `/teacher` (student list), `/teacher/students/[id]` (360° tabbed view), `/teacher/forum`
- Admin: `/admin/locations` (QR management), `/admin/users`

The root `/` page reads the session role and redirects accordingly via `defaultLandingForRole()`.

### Auth & Session

Auth is a **mock cookie system** — no real authentication. The cookie `pg_role` holds `"student" | "teacher" | "admin"`.

- `src/lib/session.ts` — `getCurrentUser()`, `getCurrentRole()`, `setCurrentRole()`, `clearCurrentRole()`. Each role returns a hard-coded user from mock data.
- `src/app/actions/auth.ts` — Server actions: `loginAsRole(formData)`, `logout()`, `switchRole(role)`. These set/clear the cookie and redirect.
- Cookie: `httpOnly: false`, `sameSite: lax`, 30-day expiry.

### Data Layer

All data is in-memory mock, structured to make the Supabase migration (Phase 2) as a near drop-in replacement:

- `src/lib/mock/data.ts` — Raw arrays: `mockUsers`, `mockLocations`, `mockCheckIns`, `mockCases`, `mockForumMessages`, `mockForumThreads`, `mockGrades`.
- `src/lib/mock/index.ts` — Query helper functions (`getUserById`, `getCheckInsByStudent`, `getCasesByStudent`, `getGradeByStudent`, etc.) with the exact signatures that will map to Supabase queries.
- `src/lib/types.ts` — All domain types: `User`, `Location`, `CheckIn`, `ClinicalCase`, `ForumMessage`, `ForumThread`, `Grade`.

Pages call mock helpers directly (they're synchronous). When migrating to Supabase, only the implementation inside `src/lib/mock/index.ts` needs to change.

### Key Components

- `src/components/app-shell.tsx` — Main navigation shell. Handles role-based nav tabs, mobile hamburger → Sheet sidebar, theme toggle, user avatar dropdown.
- `src/components/qr-scanner.tsx` — Uses `html5-qrcode`. Full-screen mobile UI with camera permission handling and manual fallback.
- `src/components/forum-chat.tsx` — Private tutor↔student chat with markdown support.
- `src/app/(app)/student/portfolio/case-form.tsx` — Clinical case form, reused for create and edit. Uses `react-hook-form` + `zod`. Supports multi-image upload (base64), markdown description, date picker, location select.
- `src/app/(app)/teacher/students/[id]/grade-panel.tsx` — Grading interface for teachers.

### Styling

Tailwind CSS with a custom CSS variable palette in `src/globals.css`:
- `--primary`: `#13294B` (UNC institutional dark blue)
- `--accent`: `#4B9CD3` (medical blue)
- Dark mode: class-based via `next-themes`

shadcn/ui components live in `src/components/ui/` (30+ files). The `Button` component uses CVA with custom variants: `accent`, `success` in addition to the standard set.

Utility helpers in `src/lib/utils.ts`: `cn()`, `formatDate()`, `formatDateTime()`, `initials()`.

### Domain Context

This is a **gynecology residency training portal** (not obstetrics). Clinical cases use Spanish labels and are medically realistic (ovarian tumors, HSIL colposcopy, endometrial carcinoma). The mock data includes patient histories, exam findings, and histopathology details with markdown formatting.

### Roadmap (from PLAN.md)

- **Phase 1** (complete): All UI with mock data
- **Phase 2**: Supabase DB + Auth integration
- **Phase 3**: Storage (case images) + Realtime (forum)
- **Phase 4**: AI grading via Claude Haiku (Anthropic API)
