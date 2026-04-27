import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, MapPin, Pencil } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { getCaseById, getLocationById } from "@/lib/mock";

export default async function CaseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = getCaseById(id);
  if (!c) notFound();
  const location = getLocationById(c.locationId);

  return (
    <article className="space-y-6">
      <div className="flex items-center justify-between">
        <Button asChild variant="ghost" size="sm">
          <Link href="/student/portfolio">
            <ArrowLeft className="h-4 w-4" />
            Portafolio
          </Link>
        </Button>
        <Button asChild>
          <Link href={`/student/portfolio/${c.id}/edit`}>
            <Pencil className="h-4 w-4" />
            Editar
          </Link>
        </Button>
      </div>

      <header className="space-y-3">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          {c.title}
        </h1>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="muted">
            <Calendar className="h-3 w-3" />
            {formatDate(c.caseDate)}
          </Badge>
          {location && (
            <Badge variant="accent">
              <MapPin className="h-3 w-3" />
              {location.name}
            </Badge>
          )}
        </div>
      </header>

      {c.imageUrls.length > 0 && (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {c.imageUrls.map((src, i) => (
            <div
              key={i}
              className="relative aspect-[4/3] overflow-hidden rounded-2xl border bg-muted"
            >
              <Image
                src={src}
                alt={`${c.title} — ${i + 1}`}
                fill
                sizes="(min-width: 1024px) 33vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      )}

      <Card>
        <CardContent className="markdown-body max-w-none space-y-3 pt-6 text-sm leading-relaxed [&_h1]:text-lg [&_h1]:font-semibold [&_h2]:text-base [&_h2]:font-semibold [&_p]:my-2 [&_strong]:font-semibold [&_ul]:my-2 [&_ul]:list-disc [&_ul]:pl-5 [&_ol]:my-2 [&_ol]:list-decimal [&_ol]:pl-5">
          <ReactMarkdown>{c.description}</ReactMarkdown>
        </CardContent>
      </Card>
    </article>
  );
}
