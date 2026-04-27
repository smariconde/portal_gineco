"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { ImagePlus, Save, Sparkles, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { ClinicalCase, Location } from "@/lib/types";

interface Props {
  locations: Location[];
  defaultLocationId?: string;
  initial?: Partial<ClinicalCase>;
}

export function CaseForm({ locations, defaultLocationId, initial }: Props) {
  const router = useRouter();
  const [title, setTitle] = React.useState(initial?.title ?? "");
  const [description, setDescription] = React.useState(initial?.description ?? "");
  const [caseDate, setCaseDate] = React.useState(
    initial?.caseDate ?? new Date().toISOString().slice(0, 10)
  );
  const [locationId, setLocationId] = React.useState(
    initial?.locationId ?? defaultLocationId ?? ""
  );
  const [images, setImages] = React.useState<string[]>(initial?.imageUrls ?? []);
  const [saving, setSaving] = React.useState(false);
  const fileRef = React.useRef<HTMLInputElement>(null);

  function onPickImages(files: FileList | null) {
    if (!files) return;
    const arr = Array.from(files).slice(0, 5);
    Promise.all(
      arr.map(
        (f) =>
          new Promise<string>((res, rej) => {
            const r = new FileReader();
            r.onload = () => res(r.result as string);
            r.onerror = rej;
            r.readAsDataURL(f);
          })
      )
    ).then((urls) => setImages((prev) => [...prev, ...urls].slice(0, 6)));
  }

  function removeImage(idx: number) {
    setImages((prev) => prev.filter((_, i) => i !== idx));
  }

  function submit() {
    if (!title.trim() || !description.trim()) {
      toast.error("Completá título y descripción.");
      return;
    }
    setSaving(true);
    setTimeout(() => {
      toast.success("Caso guardado", {
        description: "Tu portafolio se actualizó con el nuevo caso.",
      });
      setSaving(false);
      router.push("/student/portfolio");
    }, 600);
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <Card className="lg:col-span-2">
        <CardContent className="space-y-5 pt-6">
          <div className="space-y-2">
            <Label htmlFor="title">Título del caso</Label>
            <Input
              id="title"
              placeholder="Ej: Cesárea programada por presentación podálica"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="caseDate">Fecha del caso</Label>
              <Input
                id="caseDate"
                type="date"
                value={caseDate}
                onChange={(e) => setCaseDate(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label>Lugar de rotación</Label>
              <Select value={locationId} onValueChange={setLocationId}>
                <SelectTrigger>
                  <SelectValue placeholder="Seleccionar lugar…" />
                </SelectTrigger>
                <SelectContent>
                  {locations.map((l) => (
                    <SelectItem key={l.id} value={l.id}>
                      {l.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="description">Descripción y reflexión</Label>
              <span className="inline-flex items-center gap-1 text-xs text-muted-foreground">
                <Sparkles className="h-3 w-3 text-accent" />
                Soporta markdown
              </span>
            </div>
            <Textarea
              id="description"
              rows={12}
              placeholder={`**Hallazgos:**\n…\n\n**Conducta:**\n…\n\n**Reflexión:**\n¿Qué aprendiste?`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        </CardContent>
      </Card>

      <div className="space-y-6">
        <Card>
          <CardContent className="space-y-3 pt-6">
            <Label>Imágenes</Label>
            <p className="text-xs text-muted-foreground">
              Procedimientos, ecografías o esquemas. Hasta 6 imágenes.
            </p>

            {images.length > 0 ? (
              <div className="grid grid-cols-3 gap-2">
                {images.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <div
                    key={i}
                    className="group relative aspect-square overflow-hidden rounded-lg border"
                  >
                    <img
                      src={src}
                      alt={`Imagen ${i + 1}`}
                      className="h-full w-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(i)}
                      className="absolute right-1 top-1 rounded-md bg-black/60 p-1 text-white opacity-0 transition-opacity group-hover:opacity-100"
                      aria-label="Quitar imagen"
                    >
                      <Trash2 className="h-3 w-3" />
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex aspect-video items-center justify-center rounded-lg border border-dashed bg-muted/30 text-sm text-muted-foreground">
                Sin imágenes aún
              </div>
            )}

            <input
              ref={fileRef}
              type="file"
              multiple
              accept="image/*"
              className="hidden"
              onChange={(e) => onPickImages(e.target.files)}
            />
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={() => fileRef.current?.click()}
            >
              <ImagePlus className="h-4 w-4" />
              Agregar imágenes
            </Button>
          </CardContent>
        </Card>

        <div className="flex flex-col gap-2">
          <Button onClick={submit} disabled={saving} size="lg">
            <Save className="h-4 w-4" />
            {saving ? "Guardando…" : "Guardar caso"}
          </Button>
          <Button variant="ghost" onClick={() => router.back()} type="button">
            Cancelar
          </Button>
        </div>
      </div>
    </div>
  );
}
