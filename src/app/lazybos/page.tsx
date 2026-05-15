import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import EuroleagueBetsSection from "@/app/_components/EuroleagueBetsSection";
import EurovisionBetsSection from "@/app/_components/EurovisionBetsSection";
import {
  fetchEuroleagueEventsOnServer,
  fetchEurovisionEventsOnServer,
} from "@/lib/api/events/fetchOnServer";
import { getQueryClient } from "@/lib/query/getQueryClient";
import { queryKeys } from "@/lib/query/queryKeys";

import LazybosHero from "./_components/LazybosHero";

export default async function BetsPage() {
  const queryClient = getQueryClient();

  await Promise.all([
    queryClient.prefetchQuery({
      queryKey: queryKeys.events.euroleague,
      queryFn: fetchEuroleagueEventsOnServer,
    }),
    queryClient.prefetchQuery({
      queryKey: queryKeys.events.eurovision,
      queryFn: fetchEurovisionEventsOnServer,
    }),
  ]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main>
        <LazybosHero />
        <EuroleagueBetsSection />
        <EurovisionBetsSection />
      </main>
    </HydrationBoundary>
  );
}
