import { cn } from "@/lib/utils";

interface Props extends React.SVGAttributes<SVGSVGElement> {
  withText?: boolean;
}

/**
 * Logo Portal Gineco — "El Anillo".
 * Símbolo de Venus reinterpretado: tres cuartos del anillo en blanco
 * (institucional) más un cuarto en color acento (el arco de la formación).
 * Una sola metáfora, cinco trazos, legible desde 16 px hasta 256 px.
 */
export function PortalGinecoLogo({
  className,
  withText = true,
  ...props
}: Props) {
  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <svg
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-9 w-9"
        aria-hidden="true"
        {...props}
      >
        <rect width="40" height="40" rx="10" className="fill-primary" />

        {/* Tres cuartos del anillo: desde el costado derecho del círculo
            recorriendo en sentido horario hasta el vértice superior. */}
        <path
          d="M25.8 14.5 A5.8 5.8 0 1 1 20 8.7"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="stroke-white"
        />

        {/* Cuarto acento: del vértice superior al costado derecho —
            el arco de la formación, el cuadrante que crece. */}
        <path
          d="M20 8.7 A5.8 5.8 0 0 1 25.8 14.5"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="stroke-accent"
        />

        {/* Vástago de la cruz */}
        <path
          d="M20 20.3 V32"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="stroke-white"
        />

        {/* Travesaño — proporción tipográfica, no centrada */}
        <path
          d="M15 26.6 H25"
          strokeWidth="2.2"
          strokeLinecap="round"
          className="stroke-white"
        />
      </svg>
      {withText && (
        <div className="flex flex-col leading-tight">
          <span className="text-base font-semibold tracking-tight">
            Portal Gineco
          </span>
          <span className="text-[11px] text-muted-foreground">
            Maternidad Nacional · UNC
          </span>
        </div>
      )}
    </div>
  );
}
