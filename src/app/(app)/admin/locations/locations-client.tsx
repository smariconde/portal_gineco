"use client";

import * as React from "react";
import { QRCodeSVG } from "qrcode.react";
import { Plus, Printer, QrCode } from "lucide-react";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { Location } from "@/lib/types";

export function LocationsClient({ initial }: { initial: Location[] }) {
  const [items, setItems] = React.useState<Location[]>(initial);
  const [open, setOpen] = React.useState(false);
  const [draft, setDraft] = React.useState({
    name: "",
    description: "",
    qrCode: "",
  });
  const [printing, setPrinting] = React.useState<Location | null>(null);

  function addLocation() {
    if (!draft.name || !draft.qrCode) {
      toast.error("Nombre y código QR son obligatorios.");
      return;
    }
    const id = `loc-${Date.now()}`;
    setItems((prev) => [
      ...prev,
      {
        id,
        name: draft.name,
        description: draft.description,
        qrCode: draft.qrCode.toUpperCase(),
        active: true,
        createdAt: new Date().toISOString(),
      },
    ]);
    setDraft({ name: "", description: "", qrCode: "" });
    setOpen(false);
    toast.success("Lugar creado");
  }

  function toggleActive(id: string) {
    setItems((prev) =>
      prev.map((l) => (l.id === id ? { ...l, active: !l.active } : l))
    );
  }

  return (
    <>
      <div className="flex justify-end">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4" />
              Nuevo lugar
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nuevo lugar de rotación</DialogTitle>
              <DialogDescription>
                Definí el sector físico y el código que va a codificar el QR.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="loc-name">Nombre</Label>
                <Input
                  id="loc-name"
                  value={draft.name}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, name: e.target.value }))
                  }
                  placeholder="Ej: Quirófano"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loc-desc">Descripción</Label>
                <Textarea
                  id="loc-desc"
                  rows={2}
                  value={draft.description}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, description: e.target.value }))
                  }
                  placeholder="Ubicación, piso, referencias…"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="loc-qr">Código QR</Label>
                <Input
                  id="loc-qr"
                  value={draft.qrCode}
                  onChange={(e) =>
                    setDraft((d) => ({ ...d, qrCode: e.target.value }))
                  }
                  placeholder="GINECO-QX-2026"
                />
                <p className="text-xs text-muted-foreground">
                  Slug único — recomendado: PROYECTO-LUGAR-AÑO.
                </p>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={addLocation}>Crear</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((l) => (
          <Card key={l.id} className="flex flex-col">
            <CardHeader className="flex-row items-start justify-between gap-3 space-y-0">
              <div>
                <CardTitle className="text-base">{l.name}</CardTitle>
                {l.description && (
                  <p className="mt-1 text-xs text-muted-foreground">
                    {l.description}
                  </p>
                )}
              </div>
              <Badge variant={l.active ? "success" : "muted"}>
                {l.active ? "Activo" : "Inactivo"}
              </Badge>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-3">
              <div className="rounded-xl border bg-white p-3">
                <QRCodeSVG
                  value={l.qrCode}
                  size={140}
                  level="M"
                  includeMargin={false}
                />
              </div>
              <p className="font-mono text-xs text-muted-foreground">
                {l.qrCode}
              </p>
              <div className="flex w-full gap-2 pt-1">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1"
                  onClick={() => toggleActive(l.id)}
                >
                  {l.active ? "Desactivar" : "Activar"}
                </Button>
                <Button
                  variant="accent"
                  size="sm"
                  className="flex-1"
                  onClick={() => setPrinting(l)}
                >
                  <Printer className="h-4 w-4" />
                  Imprimir
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={!!printing} onOpenChange={(o) => !o && setPrinting(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <QrCode className="h-5 w-5 text-accent" />
              QR para imprimir — {printing?.name}
            </DialogTitle>
            <DialogDescription>
              Pegalo en la entrada del sector. Las alumnas/os lo escanean para
              registrar su rotación.
            </DialogDescription>
          </DialogHeader>
          {printing && (
            <div className="flex flex-col items-center gap-4 py-4">
              <div className="rounded-2xl border bg-white p-6">
                <QRCodeSVG value={printing.qrCode} size={240} level="M" />
              </div>
              <div className="text-center">
                <p className="text-lg font-semibold">{printing.name}</p>
                <p className="font-mono text-xs text-muted-foreground">
                  {printing.qrCode}
                </p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => window.print()}>
              <Printer className="h-4 w-4" />
              Imprimir
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
