import type { Metadata } from "next";
import { Suspense } from "react";

import { getSession } from "@/lib/auth/getSession";

import WalletTransactionsClient from "./_components/WalletTransactionsClient";
import { parseWalletTransactionsSearchParams } from "./_lib/walletTransactionsUrlState";

export const metadata: Metadata = {
  title: "Piniginė",
  description: "Jūsų GG Casino balansas ir piniginių operacijų istorija su filtrais.",
};

type WalletPageProps = {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function WalletPage({ searchParams }: WalletPageProps) {
  const sp = await searchParams;
  const parsed = parseWalletTransactionsSearchParams(sp);
  const initialUrlState = {
    page: parsed.page,
    id: parsed.id,
    type: parsed.type,
  };

  const session = await getSession();
  const initialBalance =
    session == null ? null : { balance: session.balance, currency: session.currency };

  return (
    <main>
      <section className="bg-background py-16 max-mob:py-10">
        <div className="content flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="h2 text-foreground">Piniginė</h2>
            <p className="text-base leading-6 text-text-grey">Balansas ir operacijų istorija su filtrais.</p>
          </div>
          <Suspense fallback={<div className="min-h-[200px]" aria-hidden />}>
            <WalletTransactionsClient initialBalance={initialBalance} initialUrlState={initialUrlState} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
