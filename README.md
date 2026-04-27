# Portal Gineco

Plataforma de portafolio digital y seguimiento para la **II Cátedra de Clínica Ginecológica** del Hospital Universitario de Maternidad y Neonatología (Maternidad Nacional), Facultad de Ciencias Médicas, Universidad Nacional de Córdoba.

> **Estado:** Fase 1 — Frontend mockup deployable. Toda la data es mock (en memoria) para que el equipo docente pueda revisar el flujo y la UI antes de conectar Supabase + IA.

## Funciones implementadas (con mocks)

- **Login** con selector de rol (Estudiante / Docente / Administración).
- **Estudiante:** dashboard con KPIs, escáner QR de rotación (`html5-qrcode`), historial de rotaciones, portafolio con CRUD de casos clínicos (markdown + imágenes), foro con tutor/a y vista de notas.
- **Docente / Tutor:** lista de alumnas/os a cargo, vista 360° con tabs (portafolio, rotaciones, foro, calificación), generador de **nota IA** simulada con justificación.
- **Administración:** gestión de lugares de rotación con generación de QR imprimibles, listado de usuarios.
- **Theming:** dark/light mode, paleta institucional UNC, mobile-first, accesible.

## Stack

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS + componentes estilo shadcn/ui inline + Radix UI
- Lucide icons · `next-themes` · `sonner` (toasts) · `react-markdown`
- `html5-qrcode` (escáner) · `qrcode.react` (generación)
- Listo para deploy en Vercel sin variables de entorno.

## Correr en local

```bash
npm install
npm run dev
# http://localhost:3000
```

Al entrar redirige a `/login`. Elegí cualquier rol para entrar — no hay backend en esta fase.

## Estructura

```
src/
├─ app/
│  ├─ login/                   # login mock con role selector
│  ├─ (app)/                   # rutas protegidas con shell común
│  │  ├─ student/              # dashboard, scan, rotations, portfolio, forum, grades
│  │  ├─ teacher/              # alumnos, foros, calificación
│  │  └─ admin/                # lugares + QR, usuarios
│  ├─ actions/auth.ts          # server actions de login/logout/switchRole
│  ├─ layout.tsx · globals.css
│  └─ page.tsx                 # redirect según rol
├─ components/
│  ├─ ui/                      # primitives shadcn-style (Button, Card, Dialog…)
│  ├─ app-shell.tsx · maternidad-logo.tsx · theme-*
│  ├─ qr-scanner.tsx · case-card.tsx · forum-chat.tsx
│  └─ empty-state.tsx · stat-card.tsx · page-header.tsx
└─ lib/
   ├─ types.ts                 # tipos del dominio (mapean al schema Supabase futuro)
   ├─ session.ts               # sesión mock vía cookie `pg_role`
   ├─ utils.ts
   └─ mock/                    # datos en memoria + helpers de acceso
```

## Roadmap

### Fase 2 — Supabase
- Schema SQL con RLS (`users`, `locations`, `check_ins`, `clinical_cases`, `case_images`, `forum_threads`, `forum_messages`, `grades`).
- Auth con email institucional UNC (magic link).
- Server actions reemplazando los helpers mock (mismos tipos en `lib/types.ts`).

### Fase 3 — Storage + Realtime
- Supabase Storage para imágenes del portafolio.
- Realtime para el foro alumno↔tutor.
- QR estáticos por sector + QR dinámicos por fecha si se necesita.

### Fase 4 — Nota IA
- Vercel AI SDK + Claude Haiku 4.5 (mejor relación costo/latencia para esta tarea).
- Prompt determinista con: portafolio (títulos + reflexiones), check-ins QR, mensajes del foro, nota conceptual del docente.
- Output: `{ score: number, justification: string }` mostrado al docente para revisión antes de confirmar.

## Deploy a Vercel

1. Push del repo a GitHub.
2. Importarlo en Vercel — sin env vars en Fase 1.
3. La app se sirve directo en la URL del proyecto Vercel.

---

II Cátedra de Clínica Ginecológica · FCM UNC · 2026
