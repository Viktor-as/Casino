import { cache } from "react";

import { buildCookieHeader, authFetch } from "@/helpers/authFetch";
import type { PlayerAuthResponse } from "@/lib/api/auth/types";

export const getSession = cache(async (): Promise<PlayerAuthResponse | null> => {
  const cookieHeader = await buildCookieHeader();
  if (!cookieHeader) {
    return null;
  }

  let res: Response;
  try {
    res = await authFetch("/me", { method: "GET" }, { forwardCookies: true });
  } catch {
    throw new Error("Nepavyko gauti sesijos");
  }

  if (res.status === 401 || res.status === 403) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Nepavyko gauti sesijos");
  }

  return (await res.json()) as PlayerAuthResponse;
});
