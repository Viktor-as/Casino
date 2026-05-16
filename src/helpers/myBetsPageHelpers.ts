import { MY_BET_STATUS_FILTER_OPTIONS } from "@/constants/myBetsStatusFilter";
import type { MyBet } from "@/lib/api/betting/types";
import { formatBalance } from "./formatBalance";
import { MyBetsFetchError } from "@/lib/api/betting/fetchMyBets";

const MY_BET_STATUS_LABEL_LT = new Map<string, string>(
  MY_BET_STATUS_FILTER_OPTIONS.filter((o) => o.value !== "").map((o) => [
    o.value.toLowerCase(),
    o.label,
  ]),
);

export function myBetStatusLabelLt(status: string): string {
  const key = status.trim().toLowerCase();
  return MY_BET_STATUS_LABEL_LT.get(key) ?? status;
}

export const dateTimeFormatter = new Intl.DateTimeFormat("lt-LT", {
  dateStyle: "short",
  timeStyle: "short",
});

export function formatBetCreatedAt(createdAt: string | number): string {
  if (typeof createdAt === "string" && createdAt.trim()) {
    const ms = Date.parse(createdAt);
    if (!Number.isNaN(ms)) return dateTimeFormatter.format(new Date(ms));
  }
  if (typeof createdAt === "number" && Number.isFinite(createdAt)) {
    return dateTimeFormatter.format(new Date(createdAt));
  }
  return "—";
}

export function betPrize(bet: MyBet): number | null {
  const w = bet.winAmount;
  if (typeof w === "number" && Number.isFinite(w)) return w;
  const p = bet.prize;
  if (typeof p === "number" && Number.isFinite(p)) return p;
  return null;
}

export function formatPrizeCell(prize: number | null, currency: string) {
  if (prize === null) {
    return "—";
  }
  return formatBalance(prize, currency);
}

export function myBetsErrorMessage(error: unknown) {
  if (error instanceof MyBetsFetchError) {
    return error.message;
  }
  return "Nepavyko įkelti statymų istorijos. Bandykite vėliau.";
}
