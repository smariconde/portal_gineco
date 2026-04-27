import { redirect } from "next/navigation";
import { defaultLandingForRole, getCurrentRole } from "@/lib/session";

export default async function Home() {
  const role = await getCurrentRole();
  if (!role) redirect("/login");
  redirect(defaultLandingForRole(role));
}
