"use client";

import * as React from "react";
import { Paperclip, Send } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn, formatDateTime, initials } from "@/lib/utils";
import type { ForumMessage, User } from "@/lib/types";

interface Props {
  currentUser: User;
  counterpart: User;
  initialMessages: ForumMessage[];
  threadId: string;
}

export function ForumChat({
  currentUser,
  counterpart,
  initialMessages,
  threadId,
}: Props) {
  const [messages, setMessages] = React.useState(initialMessages);
  const [draft, setDraft] = React.useState("");
  const scrollerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    scrollerRef.current?.scrollTo({
      top: scrollerRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages.length]);

  function send() {
    if (!draft.trim()) return;
    setMessages((m) => [
      ...m,
      {
        id: `local-${Date.now()}`,
        threadId,
        authorId: currentUser.id,
        body: draft.trim(),
        createdAt: new Date().toISOString(),
      },
    ]);
    setDraft("");
  }

  return (
    <div className="flex h-[calc(100dvh-12rem)] min-h-[480px] flex-col rounded-2xl border bg-card overflow-hidden">
      <header className="flex items-center gap-3 border-b bg-background/40 px-5 py-3">
        <Avatar>
          {counterpart.avatarUrl && (
            <AvatarImage src={counterpart.avatarUrl} alt={counterpart.fullName} />
          )}
          <AvatarFallback>{initials(counterpart.fullName)}</AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold">{counterpart.fullName}</p>
          <p className="truncate text-xs text-muted-foreground">
            {counterpart.role === "teacher" ? "Tutor/a" : "Estudiante"} · {counterpart.email}
          </p>
        </div>
      </header>

      <div ref={scrollerRef} className="flex-1 overflow-y-auto bg-muted/30 px-4 py-5 scrollbar-thin">
        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          {messages.map((m) => {
            const mine = m.authorId === currentUser.id;
            const author = mine ? currentUser : counterpart;
            return (
              <div
                key={m.id}
                className={cn(
                  "flex items-end gap-2",
                  mine && "flex-row-reverse"
                )}
              >
                <Avatar className="h-7 w-7 shrink-0">
                  {author.avatarUrl && (
                    <AvatarImage src={author.avatarUrl} alt={author.fullName} />
                  )}
                  <AvatarFallback className="text-[10px]">
                    {initials(author.fullName)}
                  </AvatarFallback>
                </Avatar>
                <div
                  className={cn(
                    "max-w-[75%] rounded-2xl px-4 py-2.5 text-sm shadow-sm",
                    mine
                      ? "rounded-br-md bg-primary text-primary-foreground"
                      : "rounded-bl-md bg-background"
                  )}
                >
                  <p className="whitespace-pre-wrap">{m.body}</p>
                  <p
                    className={cn(
                      "mt-1 text-[10px]",
                      mine
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground"
                    )}
                  >
                    {formatDateTime(m.createdAt)}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <footer className="border-t bg-background/40 p-3">
        <div className="mx-auto flex max-w-2xl items-end gap-2">
          <Button
            variant="ghost"
            size="icon"
            type="button"
            aria-label="Adjuntar archivo"
          >
            <Paperclip className="h-5 w-5" />
          </Button>
          <Textarea
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                send();
              }
            }}
            placeholder="Escribí tu mensaje…"
            rows={1}
            className="min-h-[42px] resize-none"
          />
          <Button onClick={send} disabled={!draft.trim()}>
            <Send className="h-4 w-4" />
            <span className="hidden sm:inline">Enviar</span>
          </Button>
        </div>
      </footer>
    </div>
  );
}
