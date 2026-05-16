import { NextResponse } from "next/server";

import { authFetch } from "@/helpers/authFetch";

function parsePositiveInt(value: string | null): number | null {
  if (value == null || value === "") return null;
  const n = Number(value);
  if (!Number.isFinite(n) || n < 1 || !Number.isInteger(n)) return null;
  return n;
}

function buildUpstreamSearchParams(incoming: URLSearchParams): URLSearchParams | NextResponse {
  const page = parsePositiveInt(incoming.get("page"));
  const limit = parsePositiveInt(incoming.get("limit"));

  if (page == null || limit == null) {
    return NextResponse.json({ message: "Invalid parameters" }, { status: 400 });
  }

  const upstream = new URLSearchParams();
  upstream.set("page", String(page));
  upstream.set("limit", String(limit));

  const id = incoming.get("id")?.trim();
  if (id) upstream.set("id", id);

  const status = incoming.get("status")?.trim();
  if (status) upstream.set("status", status);

  return upstream;
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const upstreamOrError = buildUpstreamSearchParams(searchParams);
  if (upstreamOrError instanceof NextResponse) {
    return upstreamOrError;
  }

  let res: Response;
  try {
    res = await authFetch(
      `/my-bets?${upstreamOrError.toString()}`,
      { method: "GET" },
      { forwardCookies: true },
    );
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    const statusCode = message === "Server configuration error" ? 500 : 502;
    return NextResponse.json({ message: "Nepavyko prisijungti prie serverio" }, { status: statusCode });
  }

  const body = await res.json().catch(() => ({}));

  if (res.status === 401 || res.status === 403) {
    return NextResponse.json(body, { status: res.status });
  }

  if (!res.ok) {
    const payload =
      typeof body === "object" && body !== null && "message" in body
        ? body
        : { message: "Nepavyko įkelti statymų" };
    const status = res.status >= 400 && res.status < 600 ? res.status : 502;
    return NextResponse.json(payload, { status });
  }

  return NextResponse.json(body);
}
