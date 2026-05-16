import "server-only";

import { fetchEventsJsonFromBackend } from "./upstream";
import type { EuroleagueEventsResponse, EurovisionEventsResponse } from "./types";

export function fetchEuroleagueEventsOnServer(): Promise<EuroleagueEventsResponse> {
  return fetchEventsJsonFromBackend("/events/euroleague", "static") as Promise<EuroleagueEventsResponse>;
}

export function fetchEurovisionEventsOnServer(): Promise<EurovisionEventsResponse> {
  return fetchEventsJsonFromBackend("/events/eurovision", "static") as Promise<EurovisionEventsResponse>;
}
