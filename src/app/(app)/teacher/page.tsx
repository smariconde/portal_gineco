import Link from "next/link";
import { ArrowRight, BookOpen, MapPin, MessageCircle, Users } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { StatCard } from "@/components/stat-card";
import { initials } from "@/lib/utils";
import {
  computeAverage,
  getCasesByStudent,
  getCheckInsByStudent,
  getGradeByStudent,
  getStudentsByTutor,
  getThreadByPair,
} from "@/lib/mock";
import { getCurrentUser } from "@/lib/session";

export default async function TeacherDashboard() {
  const tutor = (await getCurrentUser())!;
  const students = getStudentsByTutor(tutor.id);

  const totalCases = students.reduce(
    (acc, s) => acc + getCasesByStudent(s.id).length,
    0
  );
  const totalUnread = students.reduce((acc, s) => {
    const t = getThreadByPair(s.id, tutor.id);
    return acc + (t?.unreadForTutor ?? 0);
  }, 0);
  const pending = students.filter(
    (s) => getGradeByStudent(s.id)?.ai == null
  ).length;

  return (
    <div className="space-y-8">
      <PageHeader
        title={`Hola, ${tutor.fullName.split(" ").slice(1, 3).join(" ")}`}
        description="Seguimiento de tus alumnas/os a cargo durante el cuatrimestre."
      />

      <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          label="Alumnas/os a cargo"
          value={students.length}
          icon={<Users />}
          tone="primary"
        />
        <StatCard
          label="Casos del portafolio"
          value={totalCases}
          icon={<BookOpen />}
          tone="success"
        />
        <StatCard
          label="Mensajes sin leer"
          value={totalUnread}
          icon={<MessageCircle />}
          tone="accent"
          hint={totalUnread > 0 ? "Revisar foros pendientes" : "Todo al día"}
        />
        <StatCard
          label="Notas IA pendientes"
          value={pending}
          icon={<MapPin />}
          tone="muted"
          hint="Generar al cierre del cuatrimestre"
        />
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold tracking-tight">Mis alumnas/os</h2>
        {students.length === 0 ? (
          <EmptyState
            icon={<Users className="h-7 w-7" />}
            title="Sin alumnas/os asignadas/os"
            description="La cátedra todavía no te asignó tutorandos para este cuatrimestre."
          />
        ) : (
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alumna/o</TableHead>
                  <TableHead className="text-center">Casos</TableHead>
                  <TableHead className="text-center">Rotaciones</TableHead>
                  <TableHead className="text-center">Promedio</TableHead>
                  <TableHead className="text-center">Estado</TableHead>
                  <TableHead className="text-right" />
                </TableRow>
              </TableHeader>
              <TableBody>
                {students.map((s) => {
                  const cases = getCasesByStudent(s.id);
                  const checkIns = getCheckInsByStudent(s.id);
                  const grade = getGradeByStudent(s.id);
                  const avg = computeAverage(grade);
                  const thread = getThreadByPair(s.id, tutor.id);
                  return (
                    <TableRow key={s.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar className="h-9 w-9">
                            {s.avatarUrl && (
                              <AvatarImage src={s.avatarUrl} alt={s.fullName} />
                            )}
                            <AvatarFallback>{initials(s.fullName)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-medium">{s.fullName}</p>
                            <p className="text-xs text-muted-foreground">
                              {s.email}
                            </p>
                          </div>
                          {thread && thread.unreadForTutor > 0 && (
                            <Badge variant="accent" className="ml-2">
                              {thread.unreadForTutor} nuevos
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-center font-mono">
                        {cases.length}
                      </TableCell>
                      <TableCell className="text-center font-mono">
                        {checkIns.length}
                      </TableCell>
                      <TableCell className="text-center font-mono">
                        {avg ?? "—"}
                      </TableCell>
                      <TableCell className="text-center">
                        {grade?.ai == null ? (
                          <Badge variant="muted">Pendiente IA</Badge>
                        ) : grade.status === "promoted" ? (
                          <Badge variant="success">Promociona</Badge>
                        ) : (
                          <Badge variant="accent">Regular</Badge>
                        )}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button asChild variant="ghost" size="sm">
                          <Link href={`/teacher/students/${s.id}`}>
                            Abrir
                            <ArrowRight className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        )}
      </section>
    </div>
  );
}
