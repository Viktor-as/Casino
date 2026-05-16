"use client";

import { useState } from "react";

import type { EuroleagueMatch } from "@/lib/api/events/types";
import { getTeamLogo } from "@/helpers/teamLogos";

import BettingForm from "@/components/Form/BettingForm";
import TeamBetCard from "./TeamBetCard";
import WinProbabilityBar from "./WinProbabilityBar";

type SelectedTeam = "team1" | "team2" | null;

type EuroleagueMatchCardProps = {
  match: EuroleagueMatch;
  stakeFieldId: string;
};

function EuroleagueMatchCard({ match, stakeFieldId }: EuroleagueMatchCardProps) {
  const [selectedTeam, setSelectedTeam] = useState<SelectedTeam>(null);

  const team1Logo = getTeamLogo(match.team1);
  const team2Logo = getTeamLogo(match.team2);

  return (
    <article className="group flex h-full flex-col gap-4 rounded-2xl border border-secondary/10 bg-foreground/5 p-6 backdrop-blur-sm transition-all duration-300 hover:-translate-y-2 hover:border-primary/35 hover:bg-foreground/10 hover:shadow-2xl hover:shadow-primary/10">
      <div className="border-b border-border-primary/20 pb-4 text-center">
        <p className="text-[0.625rem] font-normal uppercase tracking-widest text-text-grey">
          {match.eventDate}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <TeamBetCard
          teamName={match.team1}
          multiplier={match.team1BetMultiplier}
          logo={team1Logo}
          selected={selectedTeam === "team1"}
          onSelect={() => setSelectedTeam("team1")}
        />
        <TeamBetCard
          teamName={match.team2}
          multiplier={match.team2BetMultiplier}
          logo={team2Logo}
          selected={selectedTeam === "team2"}
          onSelect={() => setSelectedTeam("team2")}
        />
      </div>

      <WinProbabilityBar team1WinRate={match.team1WinRate} team2WinRate={match.team2WinRate} />

      <BettingForm selectedTeam={selectedTeam} stakeFieldId={stakeFieldId} />
    </article>
  );
}

export default EuroleagueMatchCard;
