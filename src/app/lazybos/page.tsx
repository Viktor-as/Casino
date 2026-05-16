import type { Metadata } from "next";
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
import { getSiteOrigin } from "@/lib/site";

export const metadata: Metadata = {
  title: "Lažybos",
  description:
    "Eurolygos, Eurovizijos ir kiti įvykiai – statykite tiesiogiai GG Casino. Peržiūrėkite koeficientus ir rinkitės savo statymus.",
  openGraph: {
    title: "Lažybos | GG Casino",
    description:
      "Eurolygos, Eurovizijos ir kiti įvykiai – statykite tiesiogiai GG Casino. Peržiūrėkite koeficientus ir rinkitės savo statymus.",
    url: `${getSiteOrigin()}/lazybos`,
  },
  twitter: {
    title: "Lažybos | GG Casino",
    description:
      "Eurolygos, Eurovizijos ir kiti įvykiai – statykite tiesiogiai GG Casino. Peržiūrėkite koeficientus ir rinkitės savo statymus.",
  },
};

export const dynamic = "force-static";

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
