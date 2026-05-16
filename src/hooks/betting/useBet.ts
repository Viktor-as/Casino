import { useMutation, useQueryClient } from "@tanstack/react-query";

import { placeBet } from "@/actions/betting/placeBet";
import { BetError } from "@/lib/api/errors";
import type { PlaceBetSuccessResponse, PlayerAuthResponse } from "@/lib/api/auth/types";
import { queryKeys } from "@/lib/query/queryKeys";

export function useBet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.betting.placeBet,
    mutationFn: async (amount: number) => {
      const result = await placeBet(amount);
      if (!result.ok) {
        if (result.sessionExpired) {
          queryClient.setQueryData(queryKeys.auth.session, null);
        }
        throw new BetError(result.message);
      }
      return result.data;
    },
    onSuccess: async (data: PlaceBetSuccessResponse) => {
      queryClient.setQueryData<PlayerAuthResponse | null>(queryKeys.auth.session, (prev) =>
        prev ? { ...prev, balance: data.balance } : prev,
      );
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.betting.myBets.root }),
        queryClient.invalidateQueries({ queryKey: queryKeys.wallet.myTransactions.root }),
      ]);
    },
  });
}
