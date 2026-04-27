import { ScanLine } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { ScanClient } from "./scan-client";

export default function ScanPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Escanear QR de rotación"
        description="Apuntá tu cámara al código QR del aula, quirófano, consultorio, sala de partos o guardia."
      />
      <ScanClient />
    </div>
  );
}
