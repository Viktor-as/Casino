export type EuroleagueMatch = {
  team1: string;
  team1WinRate: number;
  team1BetMultiplier: number;
  team2: string;
  team2WinRate: number;
  team2BetMultiplier: number;
  eventDate: string;
};

export type EuroleagueEventsResponse = {
  category: string;
  description: string;
  matches: EuroleagueMatch[];
};

export type EurovisionPrediction = {
  country: string;
  artists: string;
  song: string;
  winRatePercentage: number;
  betMultiplier: number;
};

export type EurovisionEventsResponse = {
  category: string;
  description?: string;
  predictions: EurovisionPrediction[];
};
