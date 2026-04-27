# Plan — Portal Gineco

Plataforma de portafolio digital y seguimiento para la **II Cátedra de Clínica Ginecológica** del Hospital Universitario de Maternidad y Neonatología (Maternidad Nacional), Facultad de Ciencias Médicas, Universidad Nacional de Córdoba.

---

## Fase 1 — Frontend Mockup deployable ✅

> **Objetivo:** mockup navegable, bonito y deployable a Vercel **sin backend**. Todo con datos simulados en memoria. Desbloquea feedback visual rápido del docente antes de invertir en Supabase + IA.

### 1. Bootstrap del proyecto
- Next.js 15 (App Router) + TypeScript + ESLint + alias `@/*`.
- shadcn-style components inlined (estilo "new-york", base color "slate", CSS variables).
- Componentes: button, card, dialog, sheet, tabs, table, badge, avatar, dropdown-menu, select, separator, skeleton, scroll-area, popover, input, label, textarea.
- Dependencias: `lucide-react`, `react-hook-form`, `zod`, `date-fns`, `next-themes`, `html5-qrcode`, `qrcode.react`, `react-markdown`, `sonner`.

### 2. Branding + theming
- `globals.css`: paleta institucional UNC en CSS vars (light/dark).
  - Primary `#13294B` (azul UNC), Accent `#4B9CD3` (azul médico), Success verde salud materna.
- Fuente Inter vía `next/font`.
- Favicon: SVG minimalista (bebé + estetoscopio).
- Componente `<MaternidadLogo />` SVG inline.
- `ThemeProvider` con `next-themes` + toggle en header.

### 3. Layout y navegación
- `app/layout.tsx`: shell global con header (logo + nav + theme toggle + avatar), footer institucional.
- Mobile-first: nav colapsa a `Sheet` lateral.
- `(app)` route group para rutas protegidas con shell común.
- Login con form que setea cookie `pg_role` y redirige.
- Selector de rol en el login mock para demo: Estudiante / Docente / Admin.

### 4. Capa de datos mock
- `src/lib/mock/` con módulos tipados (Zod schemas + TS types reutilizables luego para Supabase):
  - `users` (alumnos, tutores, admins).
  - `locations` (Aula, Quirófano, Consultorio Externo, Sala de Partos, Guardia, Internación).
  - `checkIns` (registros QR).
  - `cases` (portafolio: título, markdown, imágenes Unsplash placeholder, fecha, lugar).
  - `forum` (hilos alumno↔tutor).
  - `grades` (parcial, conceptual, IA, promedio).
- Imágenes: Unsplash con tags médicos.

### 5. Páginas — rol Estudiante
- `/student` Dashboard: saludo, KPIs (rotaciones, casos, promedio), CTA gigante "Escanear QR".
- `/student/scan`: vista full-screen con `html5-qrcode` + fallback manual. Al detectar QR → toast + redirige a "crear caso" con `lugar` precargado.
- `/student/rotations`: tabla/lista de check-ins.
- `/student/portfolio`: grid de casos, botón "Nuevo caso".
- `/student/portfolio/new` y `/student/portfolio/[id]/edit`: formulario (título, markdown textarea, multi-image upload, fecha, lugar select).
- `/student/portfolio/[id]`: detalle con `react-markdown`.
- `/student/forum`: layout tipo chat (lista de mensajes + composer + adjuntos).
- `/student/grades`: card con parcial, nota IA, conceptual, promedio, estado de promoción.

### 6. Páginas — rol Docente/Tutor
- `/teacher` Dashboard: tabla de alumnos con avatar, nombre, #casos, #check-ins, último mensaje, estado.
- `/teacher/students/[id]`: tabs → Portafolio · Rotaciones · Foro · Calificación.
- En tab Calificación: input nota conceptual + parcial, botón "Generar nota IA" (mock: timeout + nota calculada + justificación).
- `/teacher/forum`: listado de hilos por alumna/o.

### 7. Páginas — Admin
- `/admin/locations`: CRUD de lugares + generador de QR (`qrcode.react`) + modal de impresión.
- `/admin/users`: tabs alumnas/tutores con asignación visible.

### 8. Detalles de UX
- Empty states con ilustraciones SVG inline minimalistas.
- Skeletons en cargas.
- Toasts con `sonner`.
- Cards con `rounded-2xl`, borde sutil, hover lift.
- Microinteracciones con `transition-all` y `data-[state]` de Radix.
- Accesibilidad: aria-labels en iconos solos, focus rings, navegación por teclado.

### 9. Deploy
- Push a un repo nuevo + import en Vercel. Sin env vars en esta fase.
- README con: cómo correrlo local, estructura de carpetas, qué es mock y qué se conectará en Fase 2.

### Entregables Fase 1
- App navegable como Estudiante, Docente y Admin.
- Todas las pantallas con datos creíbles.
- Listo en Vercel para mostrarle al docente.
- Tipos y schemas Zod ya definidos → Fase 2 (Supabase) será conectar, no rediseñar.

---

## Fase 2 — Supabase (Auth + DB + RLS)

- Schema SQL con RLS:
  - `users` (link a `auth.users`)
  - `locations`
  - `check_ins`
  - `clinical_cases`
  - `case_images`
  - `forum_threads`
  - `forum_messages`
  - `grades`
- Auth con email institucional UNC (magic link + dominio whitelist `*.unc.edu.ar`).
- Server actions reemplazando los helpers mock — los tipos en `lib/types.ts` ya mapean 1-a-1.
- Reemplazar `lib/session.ts` (cookie mock) por `createServerClient` de `@supabase/ssr`.
- Migrar todos los `getX` de `lib/mock/index.ts` a queries reales con misma firma.

## Fase 3 — Storage + Realtime

- Supabase Storage para imágenes del portafolio (bucket `case-images` privado, signed URLs).
- Realtime para el foro alumno↔tutor (suscripción a `forum_messages` filtrado por `thread_id`).
- QR estáticos por sector + QR dinámicos por fecha si se necesita validar asistencia diaria.

## Fase 4 — Nota IA

- Vercel AI SDK + Claude Haiku 4.5 (mejor relación costo/latencia para esta tarea).
- Prompt determinista con:
  - Portafolio (títulos + reflexiones).
  - Check-ins QR (cantidad y distribución por lugar).
  - Mensajes del foro (cantidad y profundidad).
  - Nota conceptual del docente.
- Output estructurado: `{ score: number (1–10), justification: string }` mostrado al docente para revisión antes de confirmar.
- Endpoint server action `/api/grade-ai` con tool calling para forzar el formato.
- Logging de cada generación para auditoría.

---

II Cátedra de Clínica Ginecológica · FCM UNC · 2026
