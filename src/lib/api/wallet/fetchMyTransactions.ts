import type { MyTransactionsPageResponse, MyTransactionsQueryParams } from "@/lib/api/wallet/types";

export class MyTransactionsFetchError extends Error {
  status: number;

  constructor(message: string, status: number) {
    super(message);
    this.name = "MyTransactionsFetchError";
    this.status = status;
  }
}

export async function fetchMyTransactions(
  params: MyTransactionsQueryParams,
): Promise<MyTransactionsPageResponse> {
  const search = new URLSearchParams();
  search.set("page", String(params.page));
  search.set("limit", String(params.limit));
  if (params.id?.trim()) search.set("id", params.id.trim());
  if (params.type?.trim()) search.set("type", params.type.trim());

  const res = await fetch(`/api/my-transactions?${search.toString()}`, {
    credentials: "include",
    cache: "no-store",
  });

  const body = (await res.json().catch(() => ({}))) as { message?: string };

  if (!res.ok) {
    const message =
      typeof body?.message === "string" ? body.message : "Nepavyko įkelti operacijų istorijos.";
    throw new MyTransactionsFetchError(message, res.status);
  }

  return body as MyTransactionsPageResponse;
}
