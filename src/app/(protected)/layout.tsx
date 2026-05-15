import { redirect } from "next/navigation";

import { getSession } from "@/lib/auth/getSession";

export default async function ProtectedLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getSession();
  if (!session) {
    redirect("/prisijungti");
  }

  return children;
}
