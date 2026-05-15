export type Bet = Record<string, unknown>;
export type Transaction = Record<string, unknown>;

export type PlayerAuthResponse = {
  name: string;
  email: string;
  balance: number;
  currency: string;
  bets: Bet[];
  transactions: Transaction[];
};

export type RegisterPayload = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type RegisterResult =
  | { ok: true; data: PlayerAuthResponse }
  | { ok: false; message: string };

export type LoginPayload = {
  email: string;
  password: string;
};

export type LoginResult =
  | { ok: true; data: PlayerAuthResponse }
  | { ok: false; message: string };

export type PlaceBetPayload = {
  amount: number;
};

export type PlaceBetSuccessResponse = {
  transactionId: string;
  currency: string;
  balance: number;
  winAmount: number | null;
};

export type PlaceBetResult =
  | { ok: true; data: PlaceBetSuccessResponse }
  | { ok: false; message: string; sessionExpired?: boolean };
