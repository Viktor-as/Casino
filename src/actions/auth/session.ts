"use server";

import { getSession as getCachedSession } from "@/lib/auth/getSession";
import type { PlayerAuthResponse } from "@/lib/api/auth/types";

export async function getSession(): Promise<PlayerAuthResponse | null> {
  return getCachedSession();
}
