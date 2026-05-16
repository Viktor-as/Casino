import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

import HeroSection from "@/app/_components/HeroSection";
import EuroleagueBetsSection from "./_components/EuroleagueBetsSection";
import {
  fetchEuroleagueEventsOnServer,
  fetchEurovisionEventsOnServer,
} from "@/lib/api/events/fetchOnServer";
import { getQueryClient } from "@/lib/query/getQueryClient";
import { queryKeys } from "@/lib/query/queryKeys";
import EurovisionBetsSection from "./_components/EurovisionBetsSection";
import { ButtonPrimaryLink } from "@/components/Buttons/ButtonPrimary";
import { getSiteOrigin } from "@/lib/site";

export const metadata: Metadata = {
  title: { absolute: "GG Casino" },
  description:
    "Žaisk drąsiai, laimėk garsiai. GG Casino – naujos kartos platforma su greitais išmokėjimais, geriausiais koeficientais ir skaidria sistema.",
  openGraph: {
    title: "GG Casino",
    description:
      "Žaisk drąsiai, laimėk garsiai. GG Casino – naujos kartos platforma su greitais išmokėjimais, geriausiais koeficientais ir skaidria sistema.",
    url: getSiteOrigin(),
  },
  twitter: {
    title: "GG Casino",
    description:
      "Žaisk drąsiai, laimėk garsiai. GG Casino – naujos kartos platforma su greitais išmokėjimais, geriausiais koeficientais ir skaidria sistema.",
  },
};

export const dynamic = "force-static";

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
        <EuroleagueBetsSection />
        <EurovisionBetsSection limit={8} />
        <div className="content mb-32 mt-8 center">
          <div className="max-w-[300px] w-full">
            <ButtonPrimaryLink href="/lazybos">Daugiau lažybų</ButtonPrimaryLink>
          </div>
        </div>
      </main>
    </HydrationBoundary>
  );
}
