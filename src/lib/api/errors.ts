import type { LoginResult, PlaceBetResult, RegisterResult } from "@/lib/api/auth/types";

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

export class BetError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "BetError";
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

const betErrorMessageLt: Record<string, string> = {
  "Insufficient balance": "Nepakanka lėšų",
  "Minimum bet amount is 1": "Minimali statymo suma yra 1",
};

export function parseBetFailure(_status: number, body: unknown): Extract<PlaceBetResult, { ok: false }> {
  const raw =
    typeof body === "object" && body && "message" in body
      ? String((body as { message: unknown }).message)
      : "";

  if (!raw) {
    return { ok: false, message: "Statymas nepavyko" };
  }

  const message = betErrorMessageLt[raw] ?? raw;

  return { ok: false, message };
}
