export type EventsBackendFetchMode = "live" | "static";

export async function fetchEventsJsonFromBackend(
  path: "/events/euroleague" | "/events/eurovision",
  mode: EventsBackendFetchMode = "live",
): Promise<unknown> {
  const baseUrl = process.env.SERVER_URL;
  if (!baseUrl) {
    throw new Error("Server configuration error");
  }
  const origin = baseUrl.replace(/\/$/, "");
  const init =
    mode === "static"
      ? { next: { revalidate: false as const } }
      : { cache: "no-store" as const };

  const res = await fetch(`${origin}${path}`, init);
  if (!res.ok) {
    throw new Error(`Backend returned ${res.status}`);
  }
  return res.json();
}
