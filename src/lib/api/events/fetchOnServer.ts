import "server-only";

import { headers } from "next/headers";

import type { EuroleagueEventsResponse, EurovisionEventsResponse } from "./types";
import { EVENTS_API_PATHS } from "./paths";

async function resolveAbsoluteUrl(path: string): Promise<string> {
  const h = await headers();
  const host = h.get("x-forwarded-host") ?? h.get("host");
  if (!host) {
    throw new Error("Missing Host header");
  }

  const proto =
    h.get("x-forwarded-proto") ?? (process.env.NODE_ENV === "production" ? "https" : "http");

  return `${proto}://${host}${path}`;
}

async function fetchEventsJson<T>(path: string): Promise<T> {
  const url = await resolveAbsoluteUrl(path);
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status}`);
  }
  return res.json();
}

export function fetchEuroleagueEventsOnServer(): Promise<EuroleagueEventsResponse> {
  return fetchEventsJson<EuroleagueEventsResponse>(EVENTS_API_PATHS.euroleague);
}

export function fetchEurovisionEventsOnServer(): Promise<EurovisionEventsResponse> {
  return fetchEventsJson<EurovisionEventsResponse>(EVENTS_API_PATHS.eurovision);
}
