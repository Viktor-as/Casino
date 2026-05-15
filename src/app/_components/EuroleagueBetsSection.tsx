"use client";

import { useQuery } from "@tanstack/react-query";

import PulsingLoader from "@/components/Loaders/PulsingLoader";
import { fetchEuroleagueEvents } from "@/lib/api/events/fetchOnClient";
import { queryKeys } from "@/lib/query/queryKeys";

import EuroleagueMatchCard from "./euroleague/EuroleagueMatchCard";

function MatchCardSkeleton() {
  return (
    <div className="flex min-h-[416px] flex-col gap-4 rounded-2xl border border-secondary/10 bg-foreground/5 p-6">
      <div className="flex flex-1 items-center justify-center">
        <PulsingLoader />
      </div>
    </div>
  );
}

function EuroleagueBetsSection() {
  const euroleague = useQuery({
    queryKey: queryKeys.events.euroleague,
    queryFn: fetchEuroleagueEvents,
  });

  const title = euroleague.data?.category ?? (euroleague.isPending ? "EuroLeague…" : "EuroLeague");
  const description = euroleague.data?.description ?? "";

  return (
    <section className="bg-background py-16 max-mob:py-10">
      <div className="content flex flex-col gap-10">
        <div className="flex flex-col gap-2">
          <h2 className="h2 text-foreground">{title}</h2>
          {description ? <p className="text-base leading-6 text-text-grey">{description}</p> : null}
        </div>

        {euroleague.isPending ? (
          <div className="grid grid-cols-1 gap-6 tab:grid-cols-4 mob:grid-cols-2">
            {Array.from({ length: 4 }).map((_, index) => (
              <MatchCardSkeleton key={index} />
            ))}
          </div>
        ) : euroleague.isError ? (
          <p className="text-text-grey">Nepavyko įkelti Eurolygos rungtynių. Bandykite vėliau.</p>
        ) : (
          <div className="grid grid-cols-1 gap-6 tab:grid-cols-4 mob:grid-cols-2">
            {euroleague.data.matches.map((match, index) => (
              <div key={`${match.team1}-${match.team2}-${index}`}>
                <EuroleagueMatchCard match={match} stakeFieldId={`${index}`} />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default EuroleagueBetsSection;
