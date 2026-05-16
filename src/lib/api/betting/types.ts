export type MyBet = {
  id: string | number;
  createdAt: string | number;
  amount: number;
  status: string;
  winAmount?: number | null;
  prize?: number | null;
};

export type MyBetsPageResponse = {
  data: MyBet[];
  total: number;
  page: number;
  limit: number;
};

export type MyBetsQueryParams = {
  page: number;
  limit: number;
  id?: string;
  status?: string;
};

export type CancelMyBetSuccessResponse = {
  transactionId: string;
  balance: number;
  currency: string;
};

export type CancelMyBetResult =
  | { ok: true; data: CancelMyBetSuccessResponse }
  | { ok: false; message: string; sessionExpired?: boolean };
