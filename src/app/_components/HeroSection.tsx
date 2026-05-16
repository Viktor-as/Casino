import Image from "next/image";
import { ButtonPrimaryLink } from "@/components/Buttons/ButtonPrimary";
import heroImage from "@/assets/images/hero.jpg";
import PulsingLoader from "@/components/Loaders/PulsingLoader";

function HeroSection() {
  return (
    <section className="relative isolate flex min-h-[720px] items-center overflow-hidden">
      <Image
        src={heroImage}
        alt="Kazino"
        fill
        priority
        className="animate-hero-zoom object-cover object-center"
        sizes="(max-width: 767px) 100vw, 1920px"
      />
      <div className="absolute inset-0 bg-linear-to-r from-background via-background/70 to-background/10" />
      <div className="animate-homepage-glow absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,var(--primary)_0,transparent_28%),radial-gradient(circle_at_80%_20%,var(--secondary)_0,transparent_24%)] opacity-20 blur-3xl" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-t from-background to-transparent" />

      <div className="pointer-events-none absolute inset-0 z-10 hidden lap:block">
        <div className="animate-homepage-float absolute right-[8%] top-[18%] rounded-3xl border border-primary/25 bg-background/65 px-5 py-4 shadow-2xl shadow-primary/10 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text-grey">Gyvai</p>
          <p className="mt-1 text-3xl font-bold text-primary">24/7</p>
          <p className="text-sm text-text-grey">statymų pulsas</p>
        </div>
        <div className="animate-homepage-float-delayed absolute right-[18%] top-[54%] rounded-3xl border border-secondary/25 bg-background/70 px-5 py-4 shadow-2xl shadow-secondary/10 backdrop-blur-xl">
          <p className="text-xs font-semibold uppercase tracking-[0.3em] text-text-grey">Išmokėjimai</p>
          <p className="mt-1 text-3xl font-bold text-secondary">Greiti</p>
          <p className="text-sm text-text-grey">be papildomo triukšmo</p>
        </div>
        <div className="animate-homepage-float-slow absolute right-[36%] top-[30%] h-24 w-24 rounded-full border border-primary/20 bg-primary/20 blur-[1px]" />
      </div>

      <div className="content relative z-20 flex flex-col items-start gap-7 py-16 md:py-24">
        <div className="animate-homepage-slide-up flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/20 px-3 py-1 backdrop-blur-sm">
          <PulsingLoader />
          <span className="text-sm text-tertiary">Statymai realiu laiku</span>
        </div>
        <h1 className="h1 animate-homepage-slide-up max-w-2xl text-foreground md:text-[3.5rem]">
          Žaisk drąsiai. Laimėk garsiai.{" "}
          <span className="animate-homepage-shimmer bg-linear-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-clip-text text-transparent">
            su GG Casino
          </span>
        </h1>
        <p className="animate-homepage-slide-up max-w-xl font-primary text-lg font-semibold leading-relaxed text-text-grey">
          Patirkite naujos kartos lošimų platformą. Greiti išmokėjimai, geriausi koeficientai ir
          skaidri sistema Jūsų pergalei.
        </p>
        <div className="animate-homepage-slide-up flex flex-wrap items-center gap-4">
          <ButtonPrimaryLink
            href="/lazybos"
            extraButtonCss="w-auto max-w-none px-8 shadow-lg shadow-primary/25 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/35 transition-all"
          >
            Pradedam!
          </ButtonPrimaryLink>
          <div className="flex items-center gap-2 text-sm font-semibold text-text-grey">
            <span className="h-px w-10 bg-linear-to-r from-primary to-transparent" />
            Nauji įvykiai kasdien
          </div>
        </div>
        <div className="grid w-full max-w-2xl grid-cols-1 gap-3 pt-4 mob:grid-cols-3">
          <div className="homepage-stat-card">
            <span className="text-2xl font-bold text-primary">2x</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-text-grey">
              aiškesni koeficientai
            </span>
          </div>
          <div className="homepage-stat-card [animation-delay:120ms]">
            <span className="text-2xl font-bold text-secondary">Live</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-text-grey">
              reakcijos
            </span>
          </div>
          <div className="homepage-stat-card [animation-delay:240ms]">
            <span className="text-2xl font-bold text-primary">100%</span>
            <span className="text-xs font-semibold uppercase tracking-widest text-text-grey">
              skaidrus balansas
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
