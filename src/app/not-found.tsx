import type { Metadata } from "next";

import { ButtonPrimaryLink } from "@/components/Buttons/ButtonPrimary";

export const metadata: Metadata = {
  title: "Puslapis nerastas | GG Casino",
};

export default function NotFound() {
  return (
    <main className="content center-col flex flex-1 gap-6 py-16 text-center">
      <p className="text-sm font-semibold text-foreground/70">404</p>
      <h1 className="h2 max-w-md">Puslapis nerastas</h1>
      <p className="max-w-md text-sm text-foreground/80">
        Atrodo, kad šio adreso čia nėra. Patikrinkite nuorodą arba grįžkite į pradžią.
      </p>
      <div className="flex w-full max-w-[300px] flex-col items-center gap-3">
        <ButtonPrimaryLink href="/">Grįžti į pradžią</ButtonPrimaryLink>
      </div>
    </main>
  );
}
