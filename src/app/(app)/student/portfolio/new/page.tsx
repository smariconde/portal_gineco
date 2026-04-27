import { PageHeader } from "@/components/page-header";
import { CaseForm } from "../case-form";
import { mockLocations } from "@/lib/mock";

export default async function NewCasePage({
  searchParams,
}: {
  searchParams: Promise<{ locationId?: string }>;
}) {
  const { locationId } = await searchParams;
  return (
    <div className="space-y-6">
      <PageHeader
        title="Nuevo caso clínico"
        description="Documentá lo que viste hoy: paciente, hallazgos, conducta y tu reflexión."
      />
      <CaseForm
        locations={mockLocations.filter((l) => l.active)}
        defaultLocationId={locationId}
      />
    </div>
  );
}
