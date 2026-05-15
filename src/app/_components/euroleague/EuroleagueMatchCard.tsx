"use client";

import { useState } from "react";

import { ButtonPrimary } from "@/components/Buttons/ButtonPrimary";
import type { EuroleagueMatch } from "@/lib/api/events/types";
import { getTeamLogo } from "@/helpers/teamLogos";

import TeamBetCard from "./TeamBetCard";
import WinProbabilityBar from "./WinProbabilityBar";

type SelectedTeam = "team1" | "team2" | null;

type EuroleagueMatchCardProps = {
  match: EuroleagueMatch;
};

function EuroleagueMatchCard({ match }: EuroleagueMatchCardProps) {
  const [selectedTeam, setSelectedTeam] = useState<SelectedTeam>(null);

  const team1Logo = getTeamLogo(match.team1);
  const team2Logo = getTeamLogo(match.team2);

  return (
    <article className="flex flex-col gap-4 rounded-2xl border border-secondary/10 bg-foreground/5 p-6 backdrop-blur-sm">
      <div className="border-b border-border-primary/20 pb-4 text-center">
        <p className="text-[10px] font-normal uppercase tracking-widest text-text-grey">
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

      <div className="flex flex-col gap-3 pt-2">
        <input
          type="text"
          readOnly
          disabled
          tabIndex={-1}
          placeholder="Statymo suma €"
          aria-hidden
          className="h-[46px] w-full rounded-lg border border-border-primary bg-background px-3 text-sm text-text-grey placeholder:text-text-grey/70"
        />
        <ButtonPrimary disabled extraButtonCss="max-w-none w-full">
          Statyti
        </ButtonPrimary>
      </div>
    </article>
  );
}

export default EuroleagueMatchCard;
