import Image from "next/image";

import heroImage from "@/assets/images/hero.jpg";
import PulsingLoader from "@/components/Loaders/PulsingLoader";

function LazybosHero() {
  return (
    <section className="relative flex min-h-[360px] items-center sm:min-h-[400px] md:min-h-[440px]">
      <Image
        src={heroImage}
        alt="Kazino"
        fill
        priority
        className="object-cover object-center"
        sizes="(max-width: 767px) 100vw, 1920px"
      />
      <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/50 to-transparent" />
      <div className="content relative z-10 flex flex-col items-start gap-4 py-10 md:gap-5 md:py-14">
        <div className="flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/20 px-3 py-1 backdrop-blur-sm">
          <PulsingLoader />
          <span className="text-sm text-tertiary">Statymai realiu laiku</span>
        </div>
        <h1 className="h2 max-w-xl text-foreground md:text-[2.125rem]">
          Visos lažybos vienoje vietoje{" "}
          <span className="text-primary">su GG Casino</span>
        </h1>
        <p className="max-w-xl font-primary text-base font-semibold leading-relaxed text-text-grey">
          EuroLeague, Eurovizija ir kitos rinkos – rinkitės rungtynes ir statykite žemiau.
        </p>
      </div>
    </section>
  );
}

export default LazybosHero;
