"use server";

import { authFetch } from "@/helpers/authFetch";
import { parseCancelMyBetFailure } from "@/lib/api/errors";
import type { CancelMyBetResult, CancelMyBetSuccessResponse } from "@/lib/api/betting/types";

export async function cancelMyBet(id: string | number): Promise<CancelMyBetResult> {
  const path = `/my-bet/${encodeURIComponent(String(id))}`;
  let res: Response;
  try {
    res = await authFetch(path, { method: "DELETE" }, { forwardCookies: true });
  } catch {
    return { ok: false, message: "Nepavyko prisijungti prie serverio" };
  }

  const body = await res.json().catch(() => ({}));

  if (res.status === 401 || res.status === 403) {
    return { ok: false, message: "Sesija pasibaigė. Prisijunkite iš naujo.", sessionExpired: true };
  }

  if (!res.ok) {
    return parseCancelMyBetFailure(res.status, body);
  }

  return { ok: true, data: body as CancelMyBetSuccessResponse };
}
