import type { Metadata } from "next";
import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/getSession";

export const metadata: Metadata = {
  robots: { index: false, follow: true },
};

export default async function GuestLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (session) {
    redirect("/");
  }

  return children;
}
