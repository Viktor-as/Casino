import { cache } from "react";

import { QueryClient, environmentManager } from "@tanstack/react-query";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { staleTime: 300_000, gcTime: 300_000 },
      mutations: { retry: false },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

const getServerQueryClient = cache(makeQueryClient);

export function getQueryClient() {
  if (environmentManager.isServer()) {
    return getServerQueryClient();
  }

  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }

  return browserQueryClient;
}
