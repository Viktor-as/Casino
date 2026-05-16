import { useMutation, useQueryClient } from "@tanstack/react-query";

import { cancelMyBet } from "@/actions/betting/cancelMyBet";
import type { PlayerAuthResponse } from "@/lib/api/auth/types";
import type { CancelMyBetSuccessResponse } from "@/lib/api/betting/types";
import { BetError } from "@/lib/api/errors";
import { queryKeys } from "@/lib/query/queryKeys";

export function useCancelMyBet() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.betting.cancelMyBet,
    mutationFn: async (id: string | number) => {
      const result = await cancelMyBet(id);
      if (!result.ok) {
        if (result.sessionExpired) {
          queryClient.setQueryData(queryKeys.auth.session, null);
        }
        throw new BetError(result.message);
      }
      return result.data;
    },
    onSuccess: async (data: CancelMyBetSuccessResponse) => {
      queryClient.setQueryData<PlayerAuthResponse | null>(queryKeys.auth.session, (prev) =>
        prev ? { ...prev, balance: data.balance, currency: data.currency } : prev,
      );
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: queryKeys.betting.myBets.root }),
        queryClient.invalidateQueries({ queryKey: queryKeys.wallet.myTransactions.root }),
      ]);
    },
  });
}
