"use client";

import { useQuery } from "@tanstack/react-query";
import type { ReactNode } from "react";

import PulsingLoader from "@/components/Loaders/PulsingLoader";
import { fetchEurovisionEvents } from "@/lib/api/events/fetchOnClient";
import { queryKeys } from "@/lib/query/queryKeys";

import EurovisionEntryCard from "./eurovision/EurovisionEntryCard";

function EntryCardSkeleton() {
  return (
    <div className="flex min-h-[320px] flex-col gap-4 rounded-2xl border border-secondary/10 bg-foreground/5 p-6">
      <div className="flex flex-1 items-center justify-center">
        <PulsingLoader />
      </div>
    </div>
  );
}

type EurovisionBetsSectionProps = Readonly<{
  /** When set, only the first N predictions are shown. Omit to show the full list. */
  limit?: number;
}>;

function EurovisionBetsSection({ limit }: EurovisionBetsSectionProps) {
  const eurovision = useQuery({
    queryKey: queryKeys.events.eurovision,
    queryFn: fetchEurovisionEvents,
  });

  const title = eurovision.data?.category ?? (eurovision.isPending ? "Eurovizija…" : "Eurovizija");
  const description = eurovision.data?.description ?? "";

  const rawPredictions = eurovision.data?.predictions;
  let predictions = rawPredictions;
  if (rawPredictions != null && limit !== undefined) {
    predictions = rawPredictions.slice(0, limit);
  }

  const skeletonCount = limit ?? 4;

  let body: ReactNode;
  if (eurovision.isPending) {
    body = (
      <div className="grid grid-cols-1 gap-6 tab:grid-cols-4 mob:grid-cols-2">
        {Array.from({ length: skeletonCount }).map((_, index) => (
          <EntryCardSkeleton key={index} />
        ))}
      </div>
    );
  } else if (eurovision.isError) {
    body = <p className="text-text-grey">Nepavyko įkelti Eurovizijos prognozių. Bandykite vėliau.</p>;
  } else if (predictions === undefined) {
    body = null;
  } else {
    body = (
      <div className="grid grid-cols-1 gap-6 tab:grid-cols-4 mob:grid-cols-2">
        {predictions.map((prediction, index) => (
          <div
            key={`${prediction.country}-${prediction.song}-${index}`}
            className="animate-homepage-card-in"
            style={{ animationDelay: `${index * 70}ms` }}
          >
            <EurovisionEntryCard prediction={prediction} stakeFieldId={`eurovision-${index}`} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <section className="relative overflow-hidden bg-background py-16 max-mob:py-10">
      <div className="absolute -right-24 top-10 h-56 w-56 rounded-full bg-primary/10 blur-3xl" />
      <div className="content relative flex flex-col gap-10">
        <div className="flex flex-col gap-3">
          <span className="w-fit rounded-full border border-secondary/20 bg-secondary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.3em] text-text-tertiary">
            Fanų favoritas
          </span>
          <h2 className="h2 text-foreground">{title}</h2>
          {description ? <p className="text-base leading-6 text-text-grey">{description}</p> : null}
        </div>

        {body}
      </div>
    </section>
  );
}

export default EurovisionBetsSection;
