import type { RegisterResult } from "@/lib/api/auth/types";

export class RegisterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RegisterError";
  }
}

export function parseRegisterFailure(_status: number, body: unknown): RegisterResult {
  const message =
    typeof body === "object" && body && "message" in body
      ? String((body as { message: unknown }).message)
      : "Registracija nepavyko";

  return { ok: false, message };
}
