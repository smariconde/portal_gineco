"use client";

import * as React from "react";
import { Brain, GraduationCap, Loader2, Save, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import type { Grade } from "@/lib/types";

interface Props {
  studentId: string;
  studentName: string;
  initialGrade?: Grade;
  stats: { cases: number; checkIns: number; messages: number };
}

export function GradePanel({ studentName, initialGrade, stats }: Props) {
  const [conceptual, setConceptual] = React.useState<string>(
    initialGrade?.conceptual?.toString() ?? ""
  );
  const [exam, setExam] = React.useState<string>(
    initialGrade?.exam?.toString() ?? ""
  );
  const [ai, setAi] = React.useState<number | null>(initialGrade?.ai ?? null);
  const [aiJustification, setAiJustification] = React.useState<string | null>(
    initialGrade?.aiJustification ?? null
  );
  const [generating, setGenerating] = React.useState(false);

  function generateAi() {
    if (!conceptual) {
      toast.error("Ingresá primero la nota conceptual.");
      return;
    }
    setGenerating(true);
    // simulación del módulo IA — en Fase 4 se reemplaza por Vercel AI SDK
    setTimeout(() => {
      const conc = Number(conceptual);
      const activity = stats.cases * 0.4 + stats.checkIns * 0.2 + stats.messages * 0.15;
      const score = Math.min(10, Math.max(4, conc * 0.55 + activity * 0.4));
      const rounded = Math.round(score * 10) / 10;
      setAi(rounded);
      setAiJustification(
        `${studentName} documentó ${stats.cases} casos clínicos con descripciones detalladas y reflexiones personales coherentes. Asistencia regular a las rotaciones en los distintos sectores del servicio. Participación activa en las discusiones tutor-alumno. Combinado con la evaluación conceptual de ${conc}/10, se sugiere una nota de participación de ${rounded}/10.`
      );
      setGenerating(false);
      toast.success("Nota IA generada", {
        description: "Revisá la justificación antes de confirmar.",
      });
    }, 1300);
  }

  function save() {
    toast.success("Calificación guardada", {
      description: "Las notas quedaron registradas para esta alumna/o.",
    });
  }

  const numericConc = Number(conceptual);
  const numericExam = Number(exam);
  const avg =
    !isNaN(numericExam) && exam !== "" && ai != null
      ? Math.round(((numericExam + ai) / 2) * 10) / 10
      : null;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <GraduationCap className="h-5 w-5 text-accent" />
            Calificación del cuatrimestre
          </CardTitle>
          <CardDescription>
            Ingresá la nota conceptual y generá la nota IA de participación.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="conceptual">Nota conceptual (1–10)</Label>
              <Input
                id="conceptual"
                type="number"
                min={1}
                max={10}
                step="0.1"
                value={conceptual}
                onChange={(e) => setConceptual(e.target.value)}
                placeholder="Ej: 8"
              />
              <p className="text-xs text-muted-foreground">
                Tu apreciación cualitativa del desempeño.
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="exam">Nota del parcial (1–10)</Label>
              <Input
                id="exam"
                type="number"
                min={1}
                max={10}
                step="0.1"
                value={exam}
                onChange={(e) => setExam(e.target.value)}
                placeholder="Ej: 8"
              />
              <p className="text-xs text-muted-foreground">
                Resultado del examen escrito.
              </p>
            </div>
          </div>

          <Separator />

          <div className="rounded-2xl border bg-gradient-to-br from-accent/10 via-card to-success/10 p-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h3 className="flex items-center gap-2 font-semibold">
                  <Brain className="h-4 w-4 text-accent" />
                  Nota IA de participación
                </h3>
                <p className="text-xs text-muted-foreground">
                  Analiza documentación clínica + rotaciones + participación + evaluación conceptual.
                </p>
              </div>
              <Button onClick={generateAi} disabled={generating} variant="accent">
                {generating ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analizando…
                  </>
                ) : (
                  <>
                    <Sparkles className="h-4 w-4" />
                    {ai == null ? "Generar nota IA" : "Regenerar"}
                  </>
                )}
              </Button>
            </div>

            {ai != null && (
              <div className="mt-4 space-y-3">
                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-semibold tracking-tight">
                    {ai}
                  </span>
                  <span className="text-sm text-muted-foreground">/ 10</span>
                  <Badge variant="accent" className="ml-auto">
                    Sugerencia IA
                  </Badge>
                </div>
                {aiJustification && (
                  <p className="rounded-lg border bg-background/70 p-3 text-sm leading-relaxed">
                    {aiJustification}
                  </p>
                )}
              </div>
            )}
          </div>

          <div className="flex flex-col items-stretch gap-2 sm:flex-row sm:justify-end">
            <Button onClick={save} size="lg">
              <Save className="h-4 w-4" />
              Guardar calificación
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Promedio final</CardTitle>
            <CardDescription>(Parcial + Nota IA) / 2</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border-2 border-dashed bg-muted/30 p-6 text-center">
              <p className="text-5xl font-semibold tracking-tight">
                {avg ?? "—"}
              </p>
              <p className="mt-2 text-xs uppercase tracking-wide text-muted-foreground">
                {avg == null ? "Faltan datos" : avg >= 7 ? "Promociona" : "Regular"}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Datos para la IA</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm">
            <Row label="Casos del portafolio" value={stats.cases} />
            <Row label="Rotaciones (QR)" value={stats.checkIns} />
            <Row label="Mensajes en el foro" value={stats.messages} />
            <Row
              label="Nota conceptual"
              value={isNaN(numericConc) || conceptual === "" ? "—" : numericConc}
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b py-1.5 last:border-b-0">
      <span className="text-muted-foreground">{label}</span>
      <span className="font-mono font-medium">{value}</span>
    </div>
  );
}
