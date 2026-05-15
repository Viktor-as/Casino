import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import HeroSection from "@/app/_components/HeroSection";
import BetsSection from "./_components/BetsSection";
import { fetchEuroleagueEventsOnServer, fetchEurovisionEventsOnServer } from "@/lib/api/events/fetchOnServer";
import { getQueryClient } from "@/lib/query/getQueryClient";
import { queryKeys } from "@/lib/query/queryKeys";

export default async function Home() {
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
        <HeroSection />
        <BetsSection />
      </main>
    </HydrationBoundary>
  );
}
