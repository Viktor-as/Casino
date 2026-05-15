"use server";

import { authFetch } from "@/helpers/authFetch";

export async function logoutUser(): Promise<void> {
  const res = await authFetch(
    "/logout",
    { method: "POST" },
    { applySetCookie: true, forwardCookies: true },
  );

  if (!res.ok) {
    throw new Error("Nepavyko atsijungti");
  }
}
