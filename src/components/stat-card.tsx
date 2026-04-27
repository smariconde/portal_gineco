import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Props {
  label: string;
  value: React.ReactNode;
  hint?: string;
  icon: React.ReactNode;
  tone?: "primary" | "accent" | "success" | "muted";
  className?: string;
}

const TONE: Record<NonNullable<Props["tone"]>, string> = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/15 text-accent",
  success: "bg-success/15 text-success",
  muted: "bg-muted text-muted-foreground",
};

export function StatCard({
  label,
  value,
  hint,
  icon,
  tone = "accent",
  className,
}: Props) {
  return (
    <Card className={cn("flex items-center gap-4 p-5", className)}>
      <div
        className={cn(
          "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl [&_svg]:h-6 [&_svg]:w-6",
          TONE[tone]
        )}
      >
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
          {label}
        </p>
        <p className="text-2xl font-semibold tracking-tight">{value}</p>
        {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      </div>
    </Card>
  );
}
