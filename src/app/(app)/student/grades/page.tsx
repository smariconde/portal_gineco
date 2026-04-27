import { Brain, GraduationCap, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { PageHeader } from "@/components/page-header";
import {
  computeAverage,
  getCasesByStudent,
  getCheckInsByStudent,
  getGradeByStudent,
  getMessagesByThread,
  getThreadByPair,
  getUserById,
} from "@/lib/mock";
import { getCurrentUser } from "@/lib/session";
import type { Grade } from "@/lib/types";

const STATUS_LABEL: Record<Grade["status"], { label: string; tone: "success" | "muted" | "destructive" | "accent" }> = {
  promoted: { label: "Promociona", tone: "success" },
  regular: { label: "Regular", tone: "accent" },
  failed: { label: "No aprueba", tone: "destructive" },
  pending: { label: "En curso", tone: "muted" },
};

export default async function GradesPage() {
  const user = (await getCurrentUser())!;
  const grade = getGradeByStudent(user.id);
  const cases = getCasesByStudent(user.id);
  const checkIns = getCheckInsByStudent(user.id);
  const tutor = user.tutorId ? getUserById(user.tutorId) : undefined;
  const thread = tutor ? getThreadByPair(user.id, tutor.id) : undefined;
  const messages = thread ? getMessagesByThread(thread.id) : [];
  const status = grade ? STATUS_LABEL[grade.status] : STATUS_LABEL.pending;

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mis notas"
        description="Detalle del cálculo de tu nota final del cuatrimestre."
      />

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Promoción</CardTitle>
              <CardDescription>
                Promedio entre tu parcial y la nota IA de participación.
              </CardDescription>
            </div>
            <Badge variant={status.tone}>{status.label}</Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <ScoreBlock
              label="Parcial escrito"
              value={grade?.exam ?? null}
              hint="Cargado por la cátedra"
            />
            <ScoreBlock
              label="Nota IA · participación"
              value={grade?.ai ?? null}
              hint={grade?.ai == null ? "Pendiente al final del cuatrimestre" : "Generada por IA"}
              accent
            />
            <ScoreBlock
              label="Promedio final"
              value={computeAverage(grade)}
              hint="Decide la promoción"
              highlight
            />
          </div>

          <Separator />

          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="bg-muted/30 shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Brain className="h-4 w-4 text-accent" />
                  ¿Cómo se calcula la nota IA?
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-muted-foreground">
                <p>
                  Al final del cuatrimestre, una IA analiza tu participación
                  combinando:
                </p>
                <ul className="space-y-1.5">
                  <li className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    Cantidad y calidad de casos del portafolio.
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    Asistencia registrada por QR en cada lugar de rotación.
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    Profundidad de tus mensajes en el foro con tutor/a.
                  </li>
                  <li className="flex items-start gap-2">
                    <Sparkles className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent" />
                    Nota conceptual ingresada por tu tutor/a.
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card className="shadow-none">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <GraduationCap className="h-4 w-4 text-accent" />
                  Tu actividad este cuatrimestre
                </CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-3 gap-2 text-center">
                <ActivityTile label="Casos" value={cases.length} />
                <ActivityTile label="Rotaciones" value={checkIns.length} />
                <ActivityTile label="Mensajes" value={messages.length} />
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function ScoreBlock({
  label,
  value,
  hint,
  accent,
  highlight,
}: {
  label: string;
  value: number | null;
  hint?: string;
  accent?: boolean;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-2xl border p-5 ${
        highlight
          ? "border-accent/40 bg-accent/10"
          : accent
          ? "border-dashed bg-muted/30"
          : "bg-muted/30"
      }`}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-3xl font-semibold tracking-tight">
        {value ?? "—"}
      </p>
      {hint && <p className="mt-1 text-xs text-muted-foreground">{hint}</p>}
    </div>
  );
}

function ActivityTile({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border bg-muted/30 p-3">
      <p className="text-2xl font-semibold tracking-tight">{value}</p>
      <p className="text-[11px] uppercase tracking-wide text-muted-foreground">
        {label}
      </p>
    </div>
  );
}
