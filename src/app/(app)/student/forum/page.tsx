import { MessageCircle } from "lucide-react";
import { EmptyState } from "@/components/empty-state";
import { ForumChat } from "@/components/forum-chat";
import { PageHeader } from "@/components/page-header";
import {
  getMessagesByThread,
  getThreadByPair,
  getUserById,
} from "@/lib/mock";
import { getCurrentUser } from "@/lib/session";

export default async function StudentForumPage() {
  const user = (await getCurrentUser())!;
  if (!user.tutorId) {
    return (
      <div className="space-y-6">
        <PageHeader
          title="Foro con tutor"
          description="Espacio privado para resolver dudas con tu tutor/a."
        />
        <EmptyState
          icon={<MessageCircle className="h-7 w-7" />}
          title="Aún no tenés tutor asignado"
          description="Una vez que la cátedra te asigne un tutor, vas a poder iniciar el hilo desde acá."
        />
      </div>
    );
  }

  const tutor = getUserById(user.tutorId)!;
  const thread = getThreadByPair(user.id, tutor.id);
  const messages = thread ? getMessagesByThread(thread.id) : [];

  return (
    <div className="space-y-4">
      <PageHeader
        title="Foro con tu tutor/a"
        description="Mensajes privados con tu tutor/a durante la rotación."
      />
      <ForumChat
        currentUser={user}
        counterpart={tutor}
        initialMessages={messages}
        threadId={thread?.id ?? "new-thread"}
      />
    </div>
  );
}
