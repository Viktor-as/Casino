import { useMutation, useQueryClient } from "@tanstack/react-query";

import { registerUser } from "@/actions/auth/register";
import { RegisterError } from "@/lib/api/errors";
import type { RegisterPayload } from "@/lib/api/auth/types";
import { queryKeys } from "@/lib/query/queryKeys";

export function useRegister() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.auth.register,
    mutationFn: async (payload: RegisterPayload) => {
      const result = await registerUser(payload);
      if (!result.ok) {
        throw new RegisterError(result.message);
      }
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.session, data);
    },
  });
}
