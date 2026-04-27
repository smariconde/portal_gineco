"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BookOpen,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  MapPin,
  MessageCircle,
  Menu,
  QrCode,
  ScanLine,
  Stethoscope,
  Users,
} from "lucide-react";
import { cn, initials } from "@/lib/utils";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ThemeToggle } from "@/components/theme-toggle";
import { MaternidadLogo } from "@/components/maternidad-logo";
import { logout, switchRole } from "@/app/actions/auth";
import type { Role, User } from "@/lib/types";

interface NavItem {
  href: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

const NAV: Record<Role, NavItem[]> = {
  student: [
    { href: "/student", label: "Inicio", icon: LayoutDashboard },
    { href: "/student/scan", label: "Escanear QR", icon: ScanLine },
    { href: "/student/rotations", label: "Mis rotaciones", icon: MapPin },
    { href: "/student/portfolio", label: "Portafolio", icon: BookOpen },
    { href: "/student/forum", label: "Foro con tutor", icon: MessageCircle },
    { href: "/student/grades", label: "Mis notas", icon: GraduationCap },
  ],
  teacher: [
    { href: "/teacher", label: "Mis alumnos", icon: Users },
    { href: "/teacher/forum", label: "Foros", icon: MessageCircle },
  ],
  admin: [
    { href: "/admin/locations", label: "Lugares y QR", icon: QrCode },
    { href: "/admin/users", label: "Usuarios", icon: Users },
  ],
};

export function AppShell({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const items = NAV[user.role];

  return (
    <div className="flex min-h-dvh flex-col bg-background">
      <Header user={user} items={items} pathname={pathname} />

      <div className="container flex flex-1 gap-8 py-6 lg:py-10">
        {/* Sidebar desktop */}
        <aside className="hidden w-60 shrink-0 lg:block">
          <SidebarNav items={items} pathname={pathname} />
        </aside>

        <main className="min-w-0 flex-1 animate-fade-in pb-24 lg:pb-0">
          {children}
        </main>
      </div>
    </div>
  );
}

function Header({
  user,
  items,
  pathname,
}: {
  user: User;
  items: NavItem[];
  pathname: string;
}) {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="container flex h-16 items-center gap-3">
        {/* Sidebar trigger en mobile */}
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              aria-label="Abrir menú"
            >
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0">
            <SheetHeader className="border-b p-4">
              <SheetTitle asChild>
                <Link href="/" className="flex items-center">
                  <MaternidadLogo />
                </Link>
              </SheetTitle>
            </SheetHeader>
            <div className="p-3">
              <SidebarNav items={items} pathname={pathname} />
            </div>
          </SheetContent>
        </Sheet>

        <Link href="/" className="flex items-center">
          <MaternidadLogo />
        </Link>

        <div className="ml-auto flex items-center gap-1.5">
          <ThemeToggle />
          <UserMenu user={user} />
        </div>
      </div>
    </header>
  );
}

function SidebarNav({
  items,
  pathname,
}: {
  items: NavItem[];
  pathname: string;
}) {
  return (
    <nav className="flex flex-col gap-1">
      {items.map((it) => {
        const active =
          pathname === it.href ||
          (it.href !== "/student" &&
            it.href !== "/teacher" &&
            pathname.startsWith(it.href));
        const Icon = it.icon;
        return (
          <Link
            key={it.href}
            href={it.href}
            className={cn(
              "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground shadow-sm"
                : "text-foreground/70 hover:bg-accent/10 hover:text-accent-foreground"
            )}
          >
            <Icon className="h-4 w-4" />
            {it.label}
          </Link>
        );
      })}
    </nav>
  );
}

function UserMenu({ user }: { user: User }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className="flex items-center gap-2 rounded-full p-1 pr-3 outline-none ring-offset-background transition-colors hover:bg-accent/10 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
          aria-label="Menú de usuario"
        >
          <Avatar className="h-8 w-8">
            {user.avatarUrl && <AvatarImage src={user.avatarUrl} alt={user.fullName} />}
            <AvatarFallback>{initials(user.fullName)}</AvatarFallback>
          </Avatar>
          <span className="hidden text-sm font-medium md:inline-block">
            {user.fullName.split(" ")[0]}
          </span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel className="flex flex-col">
          <span>{user.fullName}</span>
          <span className="text-xs font-normal text-muted-foreground">
            {user.email}
          </span>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
          Cambiar de rol (demo)
        </DropdownMenuLabel>
        <RoleItem role="student" current={user.role} label="Estudiante" />
        <RoleItem role="teacher" current={user.role} label="Docente / Tutor" />
        <RoleItem role="admin" current={user.role} label="Administración" />
        <DropdownMenuSeparator />
        <form action={logout}>
          <button
            type="submit"
            className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors hover:bg-destructive/10 hover:text-destructive"
          >
            <LogOut className="h-4 w-4" />
            Cerrar sesión
          </button>
        </form>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

function RoleItem({
  role,
  current,
  label,
}: {
  role: Role;
  current: Role;
  label: string;
}) {
  const isCurrent = role === current;
  return (
    <form action={switchRole.bind(null, role)}>
      <button
        type="submit"
        disabled={isCurrent}
        className={cn(
          "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm outline-none transition-colors",
          isCurrent
            ? "bg-accent/15 text-accent-foreground"
            : "hover:bg-accent/10"
        )}
      >
        <Stethoscope className="h-4 w-4 opacity-70" />
        {label}
        {isCurrent && (
          <span className="ml-auto text-[10px] uppercase tracking-wide text-muted-foreground">
            actual
          </span>
        )}
      </button>
    </form>
  );
}
