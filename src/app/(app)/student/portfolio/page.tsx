import Link from "next/link";
import { BookOpen, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CaseCard } from "@/components/case-card";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { getCasesByStudent } from "@/lib/mock";
import { getCurrentUser } from "@/lib/session";

export default async function PortfolioPage() {
  const user = (await getCurrentUser())!;
  const cases = getCasesByStudent(user.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mi portafolio"
        description={`${cases.length} caso${cases.length === 1 ? "" : "s"} documentado${cases.length === 1 ? "" : "s"} este cuatrimestre.`}
        actions={
          <Button asChild>
            <Link href="/student/portfolio/new">
              <Plus className="h-4 w-4" />
              Nuevo caso
            </Link>
          </Button>
        }
      />

      {cases.length === 0 ? (
        <EmptyState
          icon={<BookOpen className="h-7 w-7" />}
          title="Empezá tu portafolio"
          description="Cargá tu primer caso clínico con imágenes y reflexiones. Vas a poder editarlo cuantas veces quieras."
          action={
            <Button asChild>
              <Link href="/student/portfolio/new">Crear caso</Link>
            </Button>
          }
        />
      ) : (
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {cases.map((c) => (
            <CaseCard
              key={c.id}
              c={c}
              href={`/student/portfolio/${c.id}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
