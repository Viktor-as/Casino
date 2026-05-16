import { WALLET_TRANSACTION_TYPE_FILTER_OPTIONS } from "@/constants/walletTransactionTypeFilter";

export type WalletTransactionsUrlState = {
  page: number;
  id: string;
  type: string;
};

const ALLOWED_TYPES = new Set<string>(
  WALLET_TRANSACTION_TYPE_FILTER_OPTIONS.filter((o) => o.value !== "").map((o) => o.value),
);

export type ParseWalletTransactionsUrlResult = WalletTransactionsUrlState & {
  invalidTypeInUrl: boolean;
};

function toUrlSearchParams(
  input: URLSearchParams | Record<string, string | string[] | undefined>,
): URLSearchParams {
  if (input instanceof URLSearchParams) {
    return new URLSearchParams(input);
  }
  const u = new URLSearchParams();
  for (const [key, value] of Object.entries(input)) {
    if (value === undefined) continue;
    if (Array.isArray(value)) {
      const first = value[0];
      if (first !== undefined) u.set(key, first);
    } else {
      u.set(key, value);
    }
  }
  return u;
}

export function parseWalletTransactionsSearchParams(
  input: URLSearchParams | Record<string, string | string[] | undefined>,
): ParseWalletTransactionsUrlResult {
  const params = toUrlSearchParams(input);
  const pageRaw = params.get("page") ?? "";
  const id = (params.get("id") ?? "").trim();
  const typeRaw = (params.get("type") ?? "").trim();

  let page = Number.parseInt(pageRaw, 10);
  if (!Number.isFinite(page) || page < 1) {
    page = 1;
  }

  let type = "";
  let invalidTypeInUrl = false;
  if (typeRaw !== "") {
    if (ALLOWED_TYPES.has(typeRaw)) {
      type = typeRaw;
    } else {
      invalidTypeInUrl = true;
    }
  }

  return { page, id, type, invalidTypeInUrl };
}

export function serializeWalletTransactionsSearchParams(state: WalletTransactionsUrlState): string {
  const u = new URLSearchParams();
  if (state.page > 1) {
    u.set("page", String(state.page));
  }
  const id = state.id.trim();
  if (id) {
    u.set("id", id);
  }
  const t = state.type.trim();
  if (t) {
    u.set("type", t);
  }
  return u.toString();
}

export function buildWalletTransactionsHref(pathname: string, state: WalletTransactionsUrlState): string {
  const q = serializeWalletTransactionsSearchParams(state);
  return q ? `${pathname}?${q}` : pathname;
}
