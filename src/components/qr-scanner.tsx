"use client";

import * as React from "react";
import { Html5Qrcode } from "html5-qrcode";
import { Camera, CameraOff, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props {
  onDecode: (text: string) => void;
}

/**
 * Wrapper para html5-qrcode con diseño full-screen mobile.
 * Si no hay cámara o se rechazan permisos, ofrece un input manual de fallback.
 */
export function QrScanner({ onDecode }: Props) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const scannerRef = React.useRef<Html5Qrcode | null>(null);
  const [status, setStatus] = React.useState<
    "idle" | "starting" | "running" | "error"
  >("idle");
  const [error, setError] = React.useState<string | null>(null);
  const [manual, setManual] = React.useState("");
  const decodedRef = React.useRef(false);

  const start = React.useCallback(async () => {
    if (!containerRef.current) return;
    setError(null);
    setStatus("starting");
    decodedRef.current = false;

    const elementId = "qr-reader-region";
    containerRef.current.id = elementId;

    try {
      const scanner = new Html5Qrcode(elementId, { verbose: false });
      scannerRef.current = scanner;

      await scanner.start(
        { facingMode: "environment" },
        { fps: 12, qrbox: { width: 240, height: 240 } },
        (text) => {
          if (decodedRef.current) return;
          decodedRef.current = true;
          onDecode(text);
          scanner.stop().catch(() => {});
        },
        () => {
          /* error de frame, ignorar */
        }
      );
      setStatus("running");
    } catch (e: unknown) {
      console.error(e);
      setError(
        "No pudimos acceder a la cámara. Verificá los permisos del navegador o usá el código manual."
      );
      setStatus("error");
    }
  }, [onDecode]);

  React.useEffect(() => {
    return () => {
      scannerRef.current?.stop().catch(() => {});
      scannerRef.current?.clear();
    };
  }, []);

  return (
    <div className="space-y-4">
      <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-2xl border bg-black/90 mx-auto">
        <div ref={containerRef} className="absolute inset-0" />
        {status !== "running" && (
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-primary/80 to-primary/95 text-primary-foreground">
            {status === "starting" ? (
              <>
                <Loader2 className="h-10 w-10 animate-spin" />
                <p className="text-sm opacity-80">Iniciando cámara…</p>
              </>
            ) : status === "error" ? (
              <>
                <CameraOff className="h-10 w-10" />
                <p className="max-w-xs px-4 text-center text-sm opacity-80">
                  {error}
                </p>
                <Button variant="accent" onClick={start} className="mt-2">
                  <Camera className="h-4 w-4" />
                  Reintentar
                </Button>
              </>
            ) : (
              <>
                <Camera className="h-12 w-12" />
                <p className="px-6 text-center text-sm opacity-90">
                  Apuntá tu cámara al código QR del lugar de rotación.
                </p>
                <Button size="lg" variant="accent" onClick={start}>
                  <Camera className="h-5 w-5" />
                  Iniciar cámara
                </Button>
              </>
            )}
          </div>
        )}
        {status === "running" && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="h-60 w-60 rounded-2xl border-2 border-accent/80 shadow-[0_0_0_9999px_rgba(0,0,0,0.45)]" />
          </div>
        )}
      </div>

      <div className="mx-auto max-w-md rounded-xl border bg-card p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          ¿Sin cámara? Ingresá el código manualmente
        </p>
        <div className="mt-2 flex gap-2">
          <input
            value={manual}
            onChange={(e) => setManual(e.target.value)}
            placeholder="Ej: GINECO-AULA-2026"
            className="flex h-10 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          />
          <Button
            variant="outline"
            disabled={!manual}
            onClick={() => {
              if (!manual) return;
              onDecode(manual.trim());
            }}
          >
            Validar
          </Button>
        </div>
      </div>
    </div>
  );
}
