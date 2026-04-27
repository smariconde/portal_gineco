import Link from "next/link";
import { MapPin, ScanLine } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { EmptyState } from "@/components/empty-state";
import { PageHeader } from "@/components/page-header";
import { formatDateTime } from "@/lib/utils";
import { getCheckInsByStudent, getLocationById } from "@/lib/mock";
import { getCurrentUser } from "@/lib/session";

export default async function RotationsPage() {
  const user = (await getCurrentUser())!;
  const checkIns = getCheckInsByStudent(user.id);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Mis rotaciones"
        description="Historial de check-ins por código QR durante el cuatrimestre."
        actions={
          <Button asChild>
            <Link href="/student/scan">
              <ScanLine className="h-4 w-4" />
              Escanear QR
            </Link>
          </Button>
        }
      />

      {checkIns.length === 0 ? (
        <EmptyState
          icon={<MapPin className="h-7 w-7" />}
          title="Aún no registraste rotaciones"
          description="Cuando llegues a un lugar de cursada, escaneá el QR para registrar tu presencia."
          action={
            <Button asChild>
              <Link href="/student/scan">
                <ScanLine className="h-4 w-4" />
                Escanear primer QR
              </Link>
            </Button>
          }
        />
      ) : (
        <Card>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Lugar</TableHead>
                <TableHead>Fecha y hora</TableHead>
                <TableHead className="text-right">Estado</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {checkIns.map((c) => {
                const loc = getLocationById(c.locationId);
                return (
                  <TableRow key={c.id}>
                    <TableCell>
                      <div className="flex items-center gap-2 font-medium">
                        <MapPin className="h-4 w-4 text-accent" />
                        {loc?.name ?? "—"}
                      </div>
                      {loc?.description && (
                        <p className="text-xs text-muted-foreground">
                          {loc.description}
                        </p>
                      )}
                    </TableCell>
                    <TableCell className="font-mono text-xs">
                      {formatDateTime(c.scannedAt)}
                    </TableCell>
                    <TableCell className="text-right">
                      <Badge variant="success">Registrada</Badge>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Card>
      )}
    </div>
  );
}
