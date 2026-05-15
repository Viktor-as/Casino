"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";

import { cn } from "@/helpers/classNameHelpers";
import { getTeamInitials } from "@/helpers/teamLogos";

type TeamBetCardProps = {
  teamName: string;
  multiplier: number;
  logo: StaticImageData | null;
  selected: boolean;
  onSelect: () => void;
};

function TeamBetCard({ teamName, multiplier, logo, selected, onSelect }: TeamBetCardProps) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        "flex min-w-0 w-full flex-col items-start gap-1 rounded-xl border-2 border-border-primary p-[13px] text-left transition-colors",
        "bg-foreground/5 hover:bg-foreground/8",
        selected &&
          "border-primary shadow-[0_0_7.5px_color-mix(in_srgb,var(--primary)_30%,transparent)]",
      )}
    >
      <div className="relative h-8 w-8 shrink-0 overflow-hidden rounded-full bg-background/50">
        {logo ? (
          <Image src={logo} alt={teamName} fill className="object-contain p-0.5" sizes="32px" />
        ) : (
          <span className="flex h-full w-full items-center justify-center text-[10px] font-bold text-text-grey">
            {getTeamInitials(teamName)}
          </span>
        )}
      </div>
      <span className="w-full truncate text-xs font-semibold text-foreground">{teamName}</span>
      <span className="text-lg font-bold leading-7 text-primary">{multiplier.toFixed(2)}</span>
    </button>
  );
}

export default TeamBetCard;
