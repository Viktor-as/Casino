import type { Metadata } from "next";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/getSession";
import { getQueryClient } from "@/lib/query/getQueryClient";
import { queryKeys } from "@/lib/query/queryKeys";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (!session) {
    redirect("/prisijungti");
  }

  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: queryKeys.auth.session,
    queryFn: getSession,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>{children}</HydrationBoundary>
  );
}
