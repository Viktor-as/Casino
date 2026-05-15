"use server";

import { authFetch } from "@/helpers/authFetch";
import { parseLoginFailure } from "@/lib/api/errors";
import type { LoginPayload, LoginResult, PlayerAuthResponse } from "@/lib/api/auth/types";

export async function loginUser(payload: LoginPayload): Promise<LoginResult> {
  let res: Response;
  try {
    res = await authFetch(
      "/login",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      },
      { applySetCookie: true },
    );
  } catch {
    return { ok: false, message: "Nepavyko prisijungti prie serverio" };
  }

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    return parseLoginFailure(res.status, body);
  }

  return { ok: true, data: body as PlayerAuthResponse };
}
