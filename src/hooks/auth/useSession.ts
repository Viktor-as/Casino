import { useQuery } from "@tanstack/react-query";

import { getSession } from "@/actions/auth/session";
import { queryKeys } from "@/lib/query/queryKeys";

export function useSession() {
  const query = useQuery({
    queryKey: queryKeys.auth.session,
    queryFn: getSession,
    retry: false,
  });

  return {
    ...query,
    user: query.data ?? null,
    isAuthenticated: !!query.data,
  };
}
