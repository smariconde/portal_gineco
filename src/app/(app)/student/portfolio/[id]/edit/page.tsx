import { notFound } from "next/navigation";
import { PageHeader } from "@/components/page-header";
import { CaseForm } from "../../case-form";
import { getCaseById, mockLocations } from "@/lib/mock";

export default async function EditCasePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const c = getCaseById(id);
  if (!c) notFound();

  return (
    <div className="space-y-6">
      <PageHeader
        title="Editar caso"
        description="Actualizá la descripción, las imágenes o el lugar de rotación."
      />
      <CaseForm
        locations={mockLocations.filter((l) => l.active)}
        initial={c}
      />
    </div>
  );
}
