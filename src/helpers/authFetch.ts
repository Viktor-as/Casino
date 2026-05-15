import { cookies } from "next/headers";

import { applySetCookieHeader } from "@/helpers/cookieHelpers";

export async function buildCookieHeader(): Promise<string> {
  const cookieStore = await cookies();
  return cookieStore
    .getAll()
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");
}

type AuthFetchOptions = {
  applySetCookie?: boolean;
  forwardCookies?: boolean;
};

export async function authFetch(
  path: string,
  init?: RequestInit,
  options: AuthFetchOptions = {},
): Promise<Response> {
  const { applySetCookie = false, forwardCookies = false } = options;
  const baseUrl = process.env.SERVER_URL;
  if (!baseUrl) {
    throw new Error("Server configuration error");
  }

  const headers = new Headers(init?.headers);

  if (forwardCookies) {
    const cookieHeader = await buildCookieHeader();
    if (cookieHeader) {
      headers.set("Cookie", cookieHeader);
    }
  }

  const res = await fetch(`${baseUrl}${path}`, {
    ...init,
    headers,
    cache: "no-store",
  });

  if (applySetCookie) {
    const setCookieHeader = res.headers.get("set-cookie");
    if (setCookieHeader) {
      await applySetCookieHeader(setCookieHeader);
    }
  }

  return res;
}
