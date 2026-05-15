import { useMutation, useQueryClient } from "@tanstack/react-query";

import { loginUser } from "@/actions/auth/login";
import { LoginError } from "@/lib/api/errors";
import type { LoginPayload } from "@/lib/api/auth/types";
import { queryKeys } from "@/lib/query/queryKeys";

export function useLogin() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationKey: queryKeys.auth.login,
    mutationFn: async (payload: LoginPayload) => {
      const result = await loginUser(payload);
      if (!result.ok) {
        throw new LoginError(result.message);
      }
      return result.data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(queryKeys.auth.session, data);
    },
  });
}
