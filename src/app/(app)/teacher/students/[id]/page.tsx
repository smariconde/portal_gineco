import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, BookOpen, GraduationCap, MapPin, MessageCircle } from "lucide-react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CaseCard } from "@/components/case-card";
import { ForumChat } from "@/components/forum-chat";
import {
  getCasesByStudent,
  getCheckInsByStudent,
  getGradeByStudent,
  getLocationById,
  getMessagesByThread,
  getThreadByPair,
  getUserById,
} from "@/lib/mock";
import { getCurrentUser } from "@/lib/session";
import { formatDateTime, initials } from "@/lib/utils";
import { GradePanel } from "./grade-panel";

export default async function StudentDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const tutor = (await getCurrentUser())!;
  const student = getUserById(id);
  if (!student || student.role !== "student") notFound();

  const cases = getCasesByStudent(student.id);
  const checkIns = getCheckInsByStudent(student.id);
  const grade = getGradeByStudent(student.id);
  const thread = getThreadByPair(student.id, tutor.id);
  const messages = thread ? getMessagesByThread(thread.id) : [];

  return (
    <div className="space-y-6">
      <Button asChild variant="ghost" size="sm" className="-ml-2 w-fit">
        <Link href="/teacher">
          <ArrowLeft className="h-4 w-4" />
          Mis alumnas/os
        </Link>
      </Button>

      <header className="flex flex-col gap-4 rounded-2xl border bg-card p-5 sm:flex-row sm:items-center">
        <Avatar className="h-14 w-14">
          {student.avatarUrl && (
            <AvatarImage src={student.avatarUrl} alt={student.fullName} />
          )}
          <AvatarFallback>{initials(student.fullName)}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <h1 className="text-xl font-semibold">{student.fullName}</h1>
          <p className="text-sm text-muted-foreground">{student.email}</p>
          {student.studentId && (
            <p className="text-xs text-muted-foreground">
              Matrícula: {student.studentId}
            </p>
          )}
        </div>
        <div className="flex flex-wrap gap-2">
          <Badge variant="muted">
            <BookOpen className="h-3 w-3" /> {cases.length} casos
          </Badge>
          <Badge variant="muted">
            <MapPin className="h-3 w-3" /> {checkIns.length} rotaciones
          </Badge>
          <Badge variant="muted">
            <MessageCircle className="h-3 w-3" /> {messages.length} mensajes
          </Badge>
        </div>
      </header>

      <Tabs defaultValue="portfolio" className="w-full">
        <TabsList className="grid w-full grid-cols-2 sm:w-auto sm:grid-cols-4">
          <TabsTrigger value="portfolio">Portafolio</TabsTrigger>
          <TabsTrigger value="rotations">Rotaciones</TabsTrigger>
          <TabsTrigger value="forum">Foro</TabsTrigger>
          <TabsTrigger value="grade">Calificación</TabsTrigger>
        </TabsList>

        <TabsContent value="portfolio">
          {cases.length === 0 ? (
            <p className="rounded-xl border border-dashed p-10 text-center text-sm text-muted-foreground">
              Aún no cargó casos.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {cases.map((c) => (
                <CaseCard
                  key={c.id}
                  c={c}
                  href={`/student/portfolio/${c.id}`}
                />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="rotations">
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lugar</TableHead>
                  <TableHead>Fecha y hora</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {checkIns.map((c) => {
                  const loc = getLocationById(c.locationId);
                  return (
                    <TableRow key={c.id}>
                      <TableCell className="font-medium">
                        <span className="inline-flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-accent" />
                          {loc?.name}
                        </span>
                      </TableCell>
                      <TableCell className="font-mono text-xs">
                        {formatDateTime(c.scannedAt)}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </Card>
        </TabsContent>

        <TabsContent value="forum">
          <ForumChat
            currentUser={tutor}
            counterpart={student}
            initialMessages={messages}
            threadId={thread?.id ?? "new"}
          />
        </TabsContent>

        <TabsContent value="grade">
          <GradePanel
            studentId={student.id}
            studentName={student.fullName}
            initialGrade={grade}
            stats={{
              cases: cases.length,
              checkIns: checkIns.length,
              messages: messages.length,
            }}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
}
