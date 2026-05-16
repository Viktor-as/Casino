import type { MyBetsPageResponse, MyBetsQueryParams } from "@/lib/api/betting/types";

export class MyBetsFetchError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "MyBetsFetchError";
    this.status = status;
  }
}

export async function fetchMyBets(params: MyBetsQueryParams): Promise<MyBetsPageResponse> {
  const search = new URLSearchParams();
  search.set("page", String(params.page));
  search.set("limit", String(params.limit));
  if (params.id?.trim()) search.set("id", params.id.trim());
  if (params.status?.trim()) search.set("status", params.status.trim());

  const res = await fetch(`/api/my-bets?${search.toString()}`, {
    credentials: "include",
    cache: "no-store",
  });

  const body = (await res.json().catch(() => ({}))) as { message?: string };

  if (!res.ok) {
    const message =
      typeof body?.message === "string" ? body.message : "Nepavyko įkelti statymų istorijos.";
    throw new MyBetsFetchError(message, res.status);
  }

  return body as MyBetsPageResponse;
}
