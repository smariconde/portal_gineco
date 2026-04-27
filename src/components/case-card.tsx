import Link from "next/link";
import Image from "next/image";
import { Calendar, ImageIcon, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/utils";
import { getLocationById } from "@/lib/mock";
import type { ClinicalCase } from "@/lib/types";

export function CaseCard({
  c,
  href,
}: {
  c: ClinicalCase;
  href: string;
}) {
  const location = getLocationById(c.locationId);
  const cover = c.imageUrls[0];

  return (
    <Link href={href} className="group block">
      <Card className="overflow-hidden transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-accent/10 via-muted to-success/10">
          {cover ? (
            <Image
              src={cover}
              alt={c.title}
              fill
              sizes="(min-width: 768px) 33vw, 100vw"
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground/60">
              <ImageIcon className="h-10 w-10" />
            </div>
          )}
          {c.imageUrls.length > 1 && (
            <Badge variant="secondary" className="absolute right-3 top-3">
              <ImageIcon className="h-3 w-3" />
              {c.imageUrls.length}
            </Badge>
          )}
        </div>
        <div className="space-y-2 p-5">
          <h3 className="line-clamp-2 text-base font-semibold leading-snug">
            {c.title}
          </h3>
          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <span className="inline-flex items-center gap-1">
              <Calendar className="h-3.5 w-3.5" />
              {formatDate(c.caseDate)}
            </span>
            {location && (
              <span className="inline-flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5" />
                {location.name}
              </span>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}
