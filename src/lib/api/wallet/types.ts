export type WalletTransaction = {
  id: string | number;
  createdAt: string | number;
  type: string;
  amount: number;
};

export type MyTransactionsPageResponse = {
  data: WalletTransaction[];
  total: number;
  page: number;
  limit: number;
};

export type MyTransactionsQueryParams = {
  page: number;
  limit: number;
  id?: string;
  type?: string;
};
