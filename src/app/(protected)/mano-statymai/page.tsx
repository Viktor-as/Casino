import type { Metadata } from "next";
import { Suspense } from "react";

import MyBetsHistoryClient from "./_components/MyBetsHistoryClient";
import { parseMyBetsSearchParams } from "./_lib/myBetsUrlState";

export const metadata: Metadata = {
  title: "Mano statymai",
  description: "Peržiūrėkite savo statymų istoriją GG Casino ir filtruokite pagal būseną.",
};

type MyBetsPageProps = {
  readonly searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function MyBetsPage({ searchParams }: MyBetsPageProps) {
  const sp = await searchParams;
  const parsed = parseMyBetsSearchParams(sp);
  const initialUrlState = {
    page: parsed.page,
    id: parsed.id,
    status: parsed.status,
  };

  return (
    <main>
      <section className="bg-background py-16 max-mob:py-10">
        <div className="content flex flex-col gap-10">
          <div className="flex flex-col gap-2">
            <h2 className="h2 text-foreground">Mano statymai</h2>
            <p className="text-base leading-6 text-text-grey">Statymų istorija ir filtrai.</p>
          </div>
          <Suspense fallback={<div className="min-h-[200px]" aria-hidden />}>
            <MyBetsHistoryClient initialUrlState={initialUrlState} />
          </Suspense>
        </div>
      </section>
    </main>
  );
}
