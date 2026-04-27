"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CheckCircle2, MapPin } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { mockLocations } from "@/lib/mock";
import { formatDateTime } from "@/lib/utils";

const QrScanner = dynamic(
  () => import("@/components/qr-scanner").then((m) => m.QrScanner),
  { ssr: false }
);

export function ScanClient() {
  const router = useRouter();
  const [decoded, setDecoded] = React.useState<{
    locationName: string;
    locationId: string;
    when: string;
  } | null>(null);

  function handle(text: string) {
    const loc = mockLocations.find((l) => l.qrCode === text);
    if (!loc) {
      toast.error("Código QR no reconocido", {
        description: `"${text}" no corresponde a ningún lugar de rotación activo.`,
      });
      return;
    }
    if (!loc.active) {
      toast.error(`${loc.name} está inactivo`, {
        description: "Pedile al docente que reactive el QR.",
      });
      return;
    }
    const when = new Date().toISOString();
    setDecoded({ locationName: loc.name, locationId: loc.id, when });
    toast.success(`Check-in registrado: ${loc.name}`, {
      description: formatDateTime(when),
    });
  }

  if (decoded) {
    return (
      <Card className="mx-auto max-w-md text-center">
        <CardContent className="space-y-4 pt-8">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-success">
            <CheckCircle2 className="h-8 w-8" />
          </div>
          <div>
            <h2 className="text-xl font-semibold">¡Rotación registrada!</h2>
            <p className="mt-1 inline-flex items-center gap-1 text-sm text-muted-foreground">
              <MapPin className="h-3.5 w-3.5" />
              {decoded.locationName} · {formatDateTime(decoded.when)}
            </p>
          </div>
          <div className="flex flex-col gap-2 pt-2 sm:flex-row sm:justify-center">
            <Button asChild>
              <Link
                href={`/student/portfolio/new?locationId=${decoded.locationId}`}
              >
                Documentar caso ahora
              </Link>
            </Button>
            <Button variant="outline" onClick={() => setDecoded(null)}>
              Escanear otro QR
            </Button>
            <Button variant="ghost" onClick={() => router.push("/student")}>
              Volver al inicio
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return <QrScanner onDecode={handle} />;
}
