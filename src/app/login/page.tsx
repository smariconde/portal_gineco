import Link from "next/link";
import { redirect } from "next/navigation";
import { Baby, Mail, Stethoscope, UserRound, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { MaternidadLogo } from "@/components/maternidad-logo";
import { ThemeToggle } from "@/components/theme-toggle";
import { loginAsRole } from "@/app/actions/auth";
import { defaultLandingForRole, getCurrentRole } from "@/lib/session";

export default async function LoginPage() {
  const existing = await getCurrentRole();
  if (existing) redirect(defaultLandingForRole(existing));

  return (
    <div className="relative flex min-h-dvh flex-col gradient-hero">
      <header className="container flex h-16 items-center justify-between">
        <MaternidadLogo />
        <ThemeToggle />
      </header>

      <main className="container grid flex-1 items-center gap-12 py-10 lg:grid-cols-2 lg:py-20">
        <section className="space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full border bg-card/80 px-3 py-1 text-xs font-medium text-accent-foreground backdrop-blur">
            <Baby className="h-3.5 w-3.5 text-accent" />
            II Cátedra de Clínica Ginecológica · FCM UNC
          </span>
          <h1 className="text-balance text-4xl font-semibold tracking-tight md:text-5xl">
            Tu portafolio clínico,{" "}
            <span className="text-accent">en un solo lugar.</span>
          </h1>
          <p className="max-w-xl text-pretty text-base text-muted-foreground md:text-lg">
            Registrá tus rotaciones con QR, documentá los casos que viste y
            mantené un foro privado con tu tutor a lo largo del cuatrimestre.
            Una IA acompaña al docente al momento de calificar tu participación.
          </p>
          <ul className="grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Check-in por QR en cada lugar de cursada
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Casos clínicos con imágenes y reflexiones
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Foro privado alumno↔tutor
            </li>
            <li className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Nota de participación asistida por IA
            </li>
          </ul>
        </section>

        <Card className="mx-auto w-full max-w-md shadow-lg">
          <CardHeader className="space-y-1.5 text-center">
            <CardTitle className="text-2xl">Ingresá al portal</CardTitle>
            <CardDescription>
              Acceso con tu correo institucional UNC.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-2">
              <label
                htmlFor="email-disabled"
                className="text-sm font-medium text-muted-foreground"
              >
                Correo institucional
              </label>
              <div className="flex items-center gap-2 rounded-lg border bg-muted/50 px-3 py-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>tu.usuario@mi.unc.edu.ar</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Login real con Supabase Auth — disponible en Fase 2.
              </p>
            </div>

            <Separator />

            <div className="space-y-3">
              <p className="text-center text-xs font-medium uppercase tracking-wide text-muted-foreground">
                Demo · ingresá con un rol
              </p>

              <RoleButton
                role="student"
                icon={<UserRound className="h-5 w-5" />}
                title="Estudiante"
                description="María Belén Romero · 5° año"
              />
              <RoleButton
                role="teacher"
                icon={<Stethoscope className="h-5 w-5" />}
                title="Docente / Tutor"
                description="Dra. Verónica Aguirre"
              />
              <RoleButton
                role="admin"
                icon={<Users className="h-5 w-5" />}
                title="Administración"
                description="Prof. Dra. Mariana Cabral"
              />
            </div>

            <p className="text-center text-xs text-muted-foreground">
              ¿Necesitás ayuda?{" "}
              <Link href="#" className="text-accent underline-offset-4 hover:underline">
                Contactar a la cátedra
              </Link>
            </p>
          </CardContent>
        </Card>
      </main>

      <footer className="container border-t py-6 text-center text-xs text-muted-foreground">
        Hospital Universitario de Maternidad y Neonatología · Facultad de
        Ciencias Médicas · Universidad Nacional de Córdoba
      </footer>
    </div>
  );
}

function RoleButton({
  role,
  icon,
  title,
  description,
}: {
  role: "student" | "teacher" | "admin";
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <form action={loginAsRole}>
      <input type="hidden" name="role" value={role} />
      <Button
        type="submit"
        variant="outline"
        className="group h-auto w-full justify-start gap-3 px-4 py-3 text-left"
      >
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 text-accent transition-colors group-hover:bg-accent group-hover:text-accent-foreground">
          {icon}
        </span>
        <span className="flex flex-col leading-tight">
          <span className="text-sm font-semibold">{title}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {description}
          </span>
        </span>
      </Button>
    </form>
  );
}
