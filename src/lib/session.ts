import { cookies } from "next/headers";
import { mockUsers, currentStudent, currentTutor, currentAdmin } from "@/lib/mock";
import type { Role, User } from "@/lib/types";

const COOKIE = "pg_role";

/**
 * Sesión mock — Fase 1.
 * Lee una cookie con el rol simulado y devuelve el usuario "actual" de cada rol.
 * En Fase 2 se reemplaza por Supabase Auth.
 */
export async function getCurrentUser(): Promise<User | null> {
  const c = await cookies();
  const role = (c.get(COOKIE)?.value as Role | undefined) ?? null;
  if (!role) return null;
  if (role === "student") return currentStudent;
  if (role === "teacher") return currentTutor;
  if (role === "admin") return currentAdmin;
  return null;
}

export async function getCurrentRole(): Promise<Role | null> {
  const c = await cookies();
  return (c.get(COOKIE)?.value as Role | undefined) ?? null;
}

export const ROLE_COOKIE = COOKIE;

export function defaultLandingForRole(role: Role): string {
  if (role === "student") return "/student";
  if (role === "teacher") return "/teacher";
  return "/admin/locations";
}

/** Útil en server actions / server components al cambiar de rol. */
export async function setCurrentRole(role: Role) {
  const c = await cookies();
  c.set(COOKIE, role, {
    httpOnly: false,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

export async function clearCurrentRole() {
  const c = await cookies();
  c.delete(COOKIE);
}

export { mockUsers };
