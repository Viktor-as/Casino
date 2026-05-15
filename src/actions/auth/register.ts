"use server";

import { parseRegisterFailure } from "@/lib/api/errors";
import type { RegisterPayload, RegisterResult, RegisterSuccess } from "@/lib/api/auth/types";
import { applySetCookieHeader } from "@/helpers/cookieHelpers";

export async function registerUser(payload: RegisterPayload): Promise<RegisterResult> {
  const baseUrl = process.env.SERVER_URL;
  if (!baseUrl) {
    return { ok: false, message: "Server configuration error" };
  }

  let res: Response;
  try {
    res = await fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      cache: "no-store",
    });
  } catch {
    return { ok: false, message: "Nepavyko prisijungti prie serverio" };
  }

  const body = await res.json().catch(() => ({}));

  if (!res.ok) {
    return parseRegisterFailure(res.status, body);
  }

  const setCookieHeader = res.headers.get("set-cookie");
  if (setCookieHeader) {
    await applySetCookieHeader(setCookieHeader);
  }

  return { ok: true, data: body as RegisterSuccess };
}
