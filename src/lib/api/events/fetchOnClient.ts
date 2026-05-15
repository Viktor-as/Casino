import type { EuroleagueEventsResponse, EurovisionEventsResponse } from "./types";
import { EVENTS_API_PATHS } from "./paths";

async function fetchEventsJson<T>(path: string): Promise<T> {
  const res = await fetch(path, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status}`);
  }
  return res.json();
}

export function fetchEuroleagueEvents(): Promise<EuroleagueEventsResponse> {
  return fetchEventsJson<EuroleagueEventsResponse>(EVENTS_API_PATHS.euroleague);
}

export function fetchEurovisionEvents(): Promise<EurovisionEventsResponse> {
  return fetchEventsJson<EurovisionEventsResponse>(EVENTS_API_PATHS.eurovision);
}
