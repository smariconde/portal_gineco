import Link from "next/link";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { formatDateTime, initials } from "@/lib/utils";
import {
  getMessagesByThread,
  getStudentsByTutor,
  getThreadByPair,
} from "@/lib/mock";
import { getCurrentUser } from "@/lib/session";

export default async function TeacherForumIndex() {
  const tutor = (await getCurrentUser())!;
  const students = getStudentsByTutor(tutor.id);

  if (students.length === 0) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Foros con alumnas/os"
          description="Mensajería privada uno-a-uno."
        />
        <EmptyState
          icon={<MessageCircle className="h-7 w-7" />}
          title="Sin alumnas/os a cargo"
        />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <PageHeader
        title="Foros con alumnas/os"
        description="Hilos privados con cada alumna/o asignado/a."
      />
      <div className="grid gap-4 md:grid-cols-2">
        {students.map((s) => {
          const thread = getThreadByPair(s.id, tutor.id);
          const messages = thread ? getMessagesByThread(thread.id) : [];
          const last = messages[messages.length - 1];
          return (
            <Link key={s.id} href={`/teacher/students/${s.id}?tab=forum`}>
              <Card className="flex items-start gap-4 p-5 transition-all hover:-translate-y-0.5 hover:shadow-md">
                <Avatar className="h-11 w-11">
                  {s.avatarUrl && (
                    <AvatarImage src={s.avatarUrl} alt={s.fullName} />
                  )}
                  <AvatarFallback>{initials(s.fullName)}</AvatarFallback>
                </Avatar>
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="flex items-center justify-between gap-2">
                    <p className="truncate font-semibold">{s.fullName}</p>
                    {thread && thread.unreadForTutor > 0 && (
                      <Badge variant="accent">{thread.unreadForTutor}</Badge>
                    )}
                  </div>
                  {last ? (
                    <>
                      <p className="line-clamp-2 text-sm text-muted-foreground">
                        {last.body}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {formatDateTime(last.createdAt)}
                      </p>
                    </>
                  ) : (
                    <p className="text-sm italic text-muted-foreground">
                      Sin mensajes aún.
                    </p>
                  )}
                </div>
                <ArrowRight className="mt-1 h-4 w-4 shrink-0 text-muted-foreground" />
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
