export async function fetchEventsJsonFromBackend(
  path: "/events/euroleague" | "/events/eurovision",
): Promise<unknown> {
  const baseUrl = process.env.SERVER_URL;
  if (!baseUrl) {
    throw new Error("Server configuration error");
  }
  const origin = baseUrl.replace(/\/$/, "");
  const res = await fetch(`${origin}${path}`, { cache: "no-store" });
  if (!res.ok) {
    throw new Error(`Backend returned ${res.status}`);
  }
  return res.json();
}
