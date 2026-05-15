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
  },
};
