import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  MapPin,
  MessageCircle,
  ScanLine,
  Sparkles,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CaseCard } from "@/components/case-card";
import { EmptyState } from "@/components/empty-state";
import { StatCard } from "@/components/stat-card";
import { formatDateTime } from "@/lib/utils";
import {
  computeAverage,
  getCasesByStudent,
  getCheckInsByStudent,
  getGradeByStudent,
  getLocationById,
  getMessagesByThread,
  getThreadByPair,
  getUserById,
} from "@/lib/mock";
import { getCurrentUser } from "@/lib/session";

export default async function StudentDashboardPage() {
  const user = (await getCurrentUser())!;
  const cases = getCasesByStudent(user.id);
  const checkIns = getCheckInsByStudent(user.id);
  const grade = getGradeByStudent(user.id);
  const tutor = user.tutorId ? getUserById(user.tutorId) : undefined;
  const thread = tutor ? getThreadByPair(user.id, tutor.id) : undefined;
  const messages = thread ? getMessagesByThread(thread.id) : [];
  const lastMessage = messages[messages.length - 1];

  const recentCases = cases.slice(0, 3);
  const lastCheckIn = checkIns[0];
  const lastLocation = getLocationById(lastCheckIn?.locationId);

  return (
    <div className="space-y-8">
      {/* Hero */}
      <section className="relative overflow-hidden rounded-3xl border bg-gradient-to-br from-primary via-primary to-primary/85 p-6 text-primary-foreground md:p-10">
        <div className="absolute inset-0 gradient-hero opacity-40" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div className="space-y-2 max-w-xl">
            <Badge variant="accent" className="bg-white/15 text-white">
              <Sparkles className="h-3 w-3" />
              Cuatrimestre 2026 · Cursando
            </Badge>
            <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
              Hola, {user.fullName.split(" ")[0]} 👋
            </h1>
            <p className="text-sm text-primary-foreground/80 md:text-base">
              Listas para tu próxima rotación. Recordá escanear el QR del lugar
              al llegar.
            </p>
          </div>

          <Button asChild size="xl" variant="accent" className="shadow-xl">
            <Link href="/student/scan">
              <ScanLine className="h-6 w-6" />
              Escanear QR
            </Link>
          </Button>
        </div>
      </section>

      {/* KPIs */}
      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Rotaciones"
          value={checkIns.length}
          hint={
            lastLocation
              ? `Última: ${lastLocation.name}`
              : "Aún sin check-ins"
          }
          icon={<MapPin />}
          tone="accent"
        />
        <StatCard
          label="Casos del portafolio"
          value={cases.length}
          hint={cases.length === 0 ? "Empezá tu primer caso" : "Buen ritmo"}
          icon={<BookOpen />}
          tone="success"
        />
        <StatCard
          label="Mensajes con tutor"
          value={messages.length}
          hint={tutor?.fullName ?? "Sin tutor asignado"}
          icon={<MessageCircle />}
          tone="primary"
        />
        <StatCard
          label="Promedio actual"
          value={computeAverage(grade) ?? "—"}
          hint={
            grade?.ai == null
              ? "Falta nota IA"
              : grade.exam == null
              ? "Falta parcial"
              : "Parcial + IA"
          }
          icon={<GraduationCap />}
          tone="muted"
        />
      </section>

      {/* Casos recientes */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold tracking-tight">
              Últimos casos
            </h2>
            <p className="text-sm text-muted-foreground">
              Lo más reciente que cargaste en tu portafolio.
            </p>
          </div>
          <Button asChild variant="ghost" size="sm">
            <Link href="/student/portfolio">
              Ver todos
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>

        {recentCases.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {recentCases.map((c) => (
              <CaseCard
                key={c.id}
                c={c}
                href={`/student/portfolio/${c.id}`}
              />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={<BookOpen className="h-7 w-7" />}
            title="Tu portafolio está vacío"
            description="Documentá tu primer caso clínico para empezar a construir tu portafolio del cuatrimestre."
            action={
              <Button asChild>
                <Link href="/student/portfolio/new">Crear caso</Link>
              </Button>
            }
          />
        )}
      </section>

      {/* Foro + Notas (cards laterales) */}
      <section className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Mi tutor</CardTitle>
              <CardDescription>
                {tutor ? tutor.fullName : "Sin tutor asignado"}
              </CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/student/forum">
                Abrir foro
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            {lastMessage ? (
              <div className="rounded-xl border bg-muted/30 p-4">
                <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
                  Último mensaje · {formatDateTime(lastMessage.createdAt)}
                </p>
                <p className="mt-2 line-clamp-3 text-sm">{lastMessage.body}</p>
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">
                Todavía no hay mensajes en este foro.
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex-row items-center justify-between space-y-0">
            <div>
              <CardTitle className="text-base">Estado de promoción</CardTitle>
              <CardDescription>
                Parcial, nota IA y promedio ponderado.
              </CardDescription>
            </div>
            <Button asChild variant="ghost" size="sm">
              <Link href="/student/grades">
                Detalle
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="grid grid-cols-3 gap-3 text-center">
            <ScoreTile label="Parcial" value={grade?.exam ?? null} />
            <ScoreTile label="Nota IA" value={grade?.ai ?? null} />
            <ScoreTile label="Promedio" value={computeAverage(grade)} highlight />
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

function ScoreTile({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number | null;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-xl border p-4 ${
        highlight ? "bg-accent/10 border-accent/30" : "bg-muted/30"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-2xl font-semibold tracking-tight">
        {value ?? "—"}
      </p>
    </div>
  );
}
