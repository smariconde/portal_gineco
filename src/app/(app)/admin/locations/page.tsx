import { PageHeader } from "@/components/page-header";
import { mockLocations } from "@/lib/mock";
import { LocationsClient } from "./locations-client";

export default function AdminLocationsPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Lugares de rotación"
        description="Generá los códigos QR que las alumnas/os van a escanear al llegar a cada sector."
      />
      <LocationsClient initial={mockLocations} />
    </div>
  );
}
