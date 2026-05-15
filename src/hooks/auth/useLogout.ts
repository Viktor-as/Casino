import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

import { logoutUser } from "@/actions/auth/logout";
import { queryKeys } from "@/lib/query/queryKeys";

export function useLogout() {
  const queryClient = useQueryClient();
  const router = useRouter();

  return useMutation({
    mutationFn: logoutUser,
    onSuccess: () => {
      queryClient.setQueryData(queryKeys.auth.session, null);
      router.push("/");
    },
  });
}
