"use server";

import { redirect } from "next/navigation";
import {
  clearCurrentRole,
  defaultLandingForRole,
  setCurrentRole,
} from "@/lib/session";
import type { Role } from "@/lib/types";

export async function loginAsRole(formData: FormData) {
  const role = formData.get("role") as Role;
  if (!role) return;
  await setCurrentRole(role);
  redirect(defaultLandingForRole(role));
}

export async function logout() {
  await clearCurrentRole();
  redirect("/login");
}

export async function switchRole(role: Role, _formData?: FormData) {
  await setCurrentRole(role);
  redirect(defaultLandingForRole(role));
}
