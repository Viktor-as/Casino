import { MY_BET_STATUS_FILTER_OPTIONS } from "@/constants/myBetsStatusFilter";

export type MyBetsUrlState = {
  page: number;
  id: string;
  status: string;
};

const ALLOWED_STATUSES = new Set<string>(
  MY_BET_STATUS_FILTER_OPTIONS.filter((o) => o.value !== "").map((o) => o.value),
);

export type ParseMyBetsUrlResult = MyBetsUrlState & {
  invalidStatusInUrl: boolean;
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

export function parseMyBetsSearchParams(
  input: URLSearchParams | Record<string, string | string[] | undefined>,
): ParseMyBetsUrlResult {
  const params = toUrlSearchParams(input);
  const pageRaw = params.get("page") ?? "";
  const id = (params.get("id") ?? "").trim();
  const statusRaw = (params.get("status") ?? "").trim();

  let page = Number.parseInt(pageRaw, 10);
  if (!Number.isFinite(page) || page < 1) {
    page = 1;
  }

  let status = "";
  let invalidStatusInUrl = false;
  if (statusRaw !== "") {
    if (ALLOWED_STATUSES.has(statusRaw)) {
      status = statusRaw;
    } else {
      invalidStatusInUrl = true;
    }
  }

  return { page, id, status, invalidStatusInUrl };
}

export function serializeMyBetsSearchParams(state: MyBetsUrlState): string {
  const u = new URLSearchParams();
  if (state.page > 1) {
    u.set("page", String(state.page));
  }
  const id = state.id.trim();
  if (id) {
    u.set("id", id);
  }
  const st = state.status.trim();
  if (st) {
    u.set("status", st);
  }
  return u.toString();
}

export function buildMyBetsHref(pathname: string, state: MyBetsUrlState): string {
  const q = serializeMyBetsSearchParams(state);
  return q ? `${pathname}?${q}` : pathname;
}
