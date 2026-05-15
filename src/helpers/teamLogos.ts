import type { StaticImageData } from "next/image";

import fenerbahceLogo from "@/assets/images/euroleague/fenerbahce.png";
import hapoelLogo from "@/assets/images/euroleague/hapoel.png";
import monacoLogo from "@/assets/images/euroleague/monaco.png";
import olympiacosLogo from "@/assets/images/euroleague/olympiacos.png";
import panathinaikosLogo from "@/assets/images/euroleague/panathinaikos.png";
import realMadridLogo from "@/assets/images/euroleague/real-madrid.png";
import valenciaLogo from "@/assets/images/euroleague/valencia.png";
import zalgirisLogo from "@/assets/images/euroleague/zalgiris.png";

const TEAM_LOGO_MAP: Partial<Record<string, StaticImageData>> = {
  Olympiacos: olympiacosLogo,
  Monaco: monacoLogo,
  "Valencia Basket": valenciaLogo,
  Panathinaikos: panathinaikosLogo,
  "Real Madrid": realMadridLogo,
  "Hapoel Tel Aviv": hapoelLogo,
  Fenerbahce: fenerbahceLogo,
  Žalgiris: zalgirisLogo,
};

export function getTeamLogo(teamName: string): StaticImageData | null {
  return TEAM_LOGO_MAP[teamName] ?? null;
}

export function getTeamInitials(teamName: string): string {
  const words = teamName.trim().split(/\s+/).filter(Boolean);
  const first = words[0];
  if (!first) return "?";
  if (words.length === 1) return first.slice(0, 2).toUpperCase();
  const second = words[1];
  if (!second) return first.slice(0, 2).toUpperCase();
  return `${first[0]}${second[0]}`.toUpperCase();
}
