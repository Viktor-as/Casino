import { NextResponse } from "next/server";

import { fetchEventsJsonFromBackend } from "@/lib/api/events/upstream";

export async function GET() {
  try {
    const data = await fetchEventsJsonFromBackend("/events/euroleague");
    return NextResponse.json(data);
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error";
    const status = message === "Server configuration error" ? 500 : 502;
    return NextResponse.json({ error: message }, { status });
  }
}
