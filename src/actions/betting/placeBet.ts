"use server";

import { authFetch } from "@/helpers/authFetch";
import { parseBetFailure } from "@/lib/api/errors";
import type { PlaceBetResult, PlaceBetSuccessResponse } from "@/lib/api/auth/types";

export async function placeBet(amount: number): Promise<PlaceBetResult> {
  let res: Response;
  try {
    res = await authFetch(
      "/bet",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount }),
      },
      { forwardCookies: true },
    );
  } catch {
    return { ok: false, message: "Nepavyko prisijungti prie serverio" };
  }

  const body = await res.json().catch(() => ({}));

  if (res.status === 401 || res.status === 403) {
    return { ok: false, message: "Sesija pasibaigė. Prisijunkite iš naujo.", sessionExpired: true };
  }

  if (!res.ok) {
    return parseBetFailure(res.status, body);
  }

  return { ok: true, data: body as PlaceBetSuccessResponse };
}
