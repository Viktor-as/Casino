import type { LoginResult, PlaceBetResult, RegisterResult } from "@/lib/api/auth/types";
import type { CancelMyBetResult } from "@/lib/api/betting/types";

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

const cancelMyBetMessageLt: Record<string, string> = {
  "Bet already canceled": "Statymas jau atšauktas",
  "Bet not found": "Statymas nerastas",
  "Bet already completed": "Statymas jau užbaigtas",
};

export function parseCancelMyBetFailure(
  _status: number,
  body: unknown,
): Extract<CancelMyBetResult, { ok: false }> {
  const raw =
    typeof body === "object" && body && "message" in body
      ? String((body as { message: unknown }).message)
      : "";

  if (!raw) {
    return { ok: false, message: "Statymo atšaukti nepavyko" };
  }

  const message = cancelMyBetMessageLt[raw] ?? raw;

  return { ok: false, message };
}
