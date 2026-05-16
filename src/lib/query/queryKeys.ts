export const queryKeys = {
  auth: {
    session: ["auth", "session"] as const,
    register: ["auth", "register"] as const,
    login: ["auth", "login"] as const,
  },
  events: {
    euroleague: ["events", "euroleague"] as const,
    eurovision: ["events", "eurovision"] as const,
  },
  betting: {
    placeBet: ["betting", "placeBet"] as const,
    cancelMyBet: ["betting", "cancelMyBet"] as const,
    myBets: {
      root: ["betting", "myBets"] as const,
      list: (params: { page: number; limit: number; id: string; status: string }) =>
        [...queryKeys.betting.myBets.root, params] as const,
    },
  },
  wallet: {
    myTransactions: {
      root: ["wallet", "myTransactions"] as const,
      list: (params: { page: number; limit: number; id: string; type: string }) =>
        [...queryKeys.wallet.myTransactions.root, params] as const,
    },
  },
};
