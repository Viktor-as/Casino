import { cookies } from "next/headers";

type ParsedCookie = {
  name: string;
  value: string;
  httpOnly?: boolean;
  secure?: boolean;
  sameSite?: "lax" | "strict" | "none";
  path?: string;
  maxAge?: number;
  expires?: Date;
};

function parseSetCookiePair(pair: string): ParsedCookie | null {
  const parts = pair.split(";").map((part) => part.trim());
  const [nameValue, ...attributes] = parts;
  const separatorIndex = nameValue.indexOf("=");

  if (separatorIndex === -1) return null;

  const name = nameValue.slice(0, separatorIndex).trim();
  const value = nameValue.slice(separatorIndex + 1).trim();

  if (!name) return null;

  const parsed: ParsedCookie = { name, value };

  for (const attribute of attributes) {
    const [rawKey, rawVal] = attribute.split("=");
    const key = rawKey.toLowerCase();

    if (key === "httponly") parsed.httpOnly = true;
    else if (key === "secure") parsed.secure = true;
    else if (key === "path" && rawVal) parsed.path = rawVal.trim();
    else if (key === "max-age" && rawVal) parsed.maxAge = Number.parseInt(rawVal, 10);
    else if (key === "expires" && rawVal) {
      const expires = new Date(rawVal);
      if (!Number.isNaN(expires.getTime())) parsed.expires = expires;
    } else if (key === "samesite" && rawVal) {
      const sameSite = rawVal.trim().toLowerCase();
      if (sameSite === "lax" || sameSite === "strict" || sameSite === "none") {
        parsed.sameSite = sameSite;
      }
    }
  }

  return parsed;
}

function splitSetCookieHeader(setCookieHeader: string): string[] {
  return setCookieHeader
    .split(/,(?=\s*[^;,]+=)/)
    .map((cookie) => cookie.trim())
    .filter(Boolean);
}

export async function applySetCookieHeader(setCookieHeader: string): Promise<void> {
  const cookieStore = await cookies();
  const cookieStrings = splitSetCookieHeader(setCookieHeader);

  for (const cookieString of cookieStrings) {
    const parsed = parseSetCookiePair(cookieString);
    if (!parsed) continue;

    cookieStore.set(parsed.name, parsed.value, {
      httpOnly: parsed.httpOnly,
      secure: parsed.secure,
      sameSite: parsed.sameSite,
      path: parsed.path ?? "/",
      maxAge: parsed.maxAge,
      expires: parsed.expires,
    });
  }
}
