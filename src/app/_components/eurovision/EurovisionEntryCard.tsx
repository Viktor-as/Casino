"use client";

import type { EurovisionPrediction } from "@/lib/api/events/types";
import BettingForm from "@/components/Form/BettingForm";
import EurovisionWinRateBar from "./EurovisionWinRateBar";

type EurovisionEntryCardProps = {
  prediction: EurovisionPrediction;
  stakeFieldId: string;
};

function EurovisionEntryCard({ prediction, stakeFieldId }: EurovisionEntryCardProps) {
  return (
    <article className="group flex h-full flex-col gap-4 rounded-2xl border border-secondary/10 bg-foreground/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-secondary/35 hover:bg-foreground/10 hover:shadow-2xl hover:shadow-secondary/10">
      <div className="flex flex-col gap-1">
        <h3 className="text-base font-semibold leading-6 text-foreground">{prediction.country}</h3>
        <p className="text-sm leading-5 text-foreground">{prediction.artists}</p>
        <p className="line-clamp-2 text-xs leading-[1.125rem] text-text-grey">{prediction.song}</p>
        <p className="pt-1 text-lg font-bold leading-7 text-primary">
          {prediction.betMultiplier.toFixed(2)}
        </p>
      </div>

      <EurovisionWinRateBar winRatePercentage={prediction.winRatePercentage} />

      <BettingForm selectedTeam={null} stakeFieldId={stakeFieldId} requireTeamSelection={false} />
    </article>
  );
}

export default EurovisionEntryCard;
