import { cn } from "@/lib/utils";

interface Props extends React.SVGAttributes<SVGSVGElement> {
  withText?: boolean;
}

/**
 * Marca placeholder Portal Gineco / Maternidad Nacional UNC.
 * SVG minimalista — bebé + estetoscopio estilizado.
 */
export function MaternidadLogo({
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
        className="h-9 w-9 text-primary"
        aria-hidden="true"
        {...props}
      >
        <rect
          x="0"
          y="0"
          width="40"
          height="40"
          rx="10"
          className="fill-primary"
        />
        {/* Anillo del estetoscopio */}
        <circle
          cx="13"
          cy="13"
          r="3.5"
          stroke="currentColor"
          strokeWidth="1.6"
          className="stroke-white"
        />
        <path
          d="M13 16.5 V21 a6 6 0 0 0 6 6 h0"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
          className="stroke-white"
        />
        {/* Bebé / silueta materna abstracta */}
        <circle cx="26" cy="20" r="3" className="fill-white/95" />
        <path
          d="M22 32 c0-3 1.8-5 4-5 s4 2 4 5"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          fill="none"
          className="stroke-white"
        />
        {/* Acento accent */}
        <circle cx="26" cy="20" r="1.1" className="fill-accent" />
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
