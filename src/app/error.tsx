"use client";

import { useEffect } from "react";

import { ButtonPrimary, ButtonPrimaryLink } from "@/components/Buttons/ButtonPrimary";

type AppErrorProps = Readonly<{
  error: Error & { digest?: string };
  reset: () => void;
}>;

export default function AppError({ error, reset }: AppErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="content center-col flex flex-1 gap-6 py-16 text-center">
      <p className="text-sm font-semibold text-foreground/70">Klaida</p>
      <h1 className="h2 max-w-md">Įvyko nenumatyta klaida</h1>
      <p className="max-w-md text-sm text-foreground/80">
        Pabandykite dar kartą. Jei problema kartosis, grįžkite į pradžią.
      </p>
      <div className="flex w-full max-w-[370px] flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
        <ButtonPrimary onClick={() => reset()} extraButtonCss="sm:max-w-none sm:flex-1">
          Bandyti dar kartą
        </ButtonPrimary>
        <ButtonPrimaryLink href="/" extraButtonCss="sm:max-w-none sm:flex-1">
          Grįžti į pradžią
        </ButtonPrimaryLink>
      </div>
    </main>
  );
}
