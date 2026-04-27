import Image from "next/image";
import { cn } from "@/lib/utils";

interface Props {
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function InstitutionalLogos({ className, size = "md" }: Props) {
  const height = size === "sm" ? 36 : size === "md" ? 44 : 56;
  const width = Math.round(height * (350 / 83));

  return (
    <div className={cn("flex items-center", className)}>
      <Image
        src="/logos/logo-fcm-unc.png"
        alt="Facultad de Ciencias Médicas · Universidad Nacional de Córdoba"
        width={width}
        height={height}
        className="h-auto opacity-90"
      />
    </div>
  );
}
