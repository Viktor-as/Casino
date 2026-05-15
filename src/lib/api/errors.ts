import type { LoginResult, RegisterResult } from "@/lib/api/auth/types";

export class RegisterError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "RegisterError";
  }
}

export class LoginError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "LoginError";
  }
}

export function parseRegisterFailure(_status: number, body: unknown): RegisterResult {
  const message =
    typeof body === "object" && body && "message" in body
      ? String((body as { message: unknown }).message)
      : "Registracija nepavyko";

  return { ok: false, message };
}

export function parseLoginFailure(_status: number, body: unknown): LoginResult {
  const message =
    typeof body === "object" && body && "message" in body
      ? String((body as { message: unknown }).message)
      : "Prisijungimas nepavyko";

  return { ok: false, message };
}
