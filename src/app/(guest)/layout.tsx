import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/getSession";

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
