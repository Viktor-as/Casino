import Image from "next/image";
import { ButtonPrimaryLink } from "@/components/Buttons/ButtonPrimary";
import heroImage from "@/assets/images/hero.jpg";
import PulsingLoader from "@/components/Loaders/PulsingLoader";

function HeroSection() {
  return (
    <section className="relative flex min-h-[700px] items-center">
      <Image
        src={heroImage}
        alt="Kazino"
        fill
        priority
        className="object-cover object-center"
        sizes="(max-width: 767px) 100vw, 1920px"
      />
      <div className="absolute inset-0 bg-linear-to-r from-background/90 via-background/50 to-transparent" />
      <div className="content relative z-10 flex flex-col items-start gap-6 py-16 md:py-24">
        <div className="flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/20 px-3 py-1 backdrop-blur-sm">
          <PulsingLoader />
          <span className="text-sm text-tertiary">Statymai realiu laiku</span>
        </div>
        <h1 className="h1 max-w-xl text-foreground md:text-[2.5rem]">
          Žaisk drąsiai. Laimėk garsiai. <span className="text-primary">su GG Casino</span>
        </h1>
        <p className="max-w-xl font-primary text-lg leading-relaxed text-text-grey font-semibold">
          Patirkite naujos kartos lošimų platformą. Greiti išmokėjimai, geriausi koeficientai ir
          skaidri sistema Jūsų pergalei.
        </p>
        <ButtonPrimaryLink href="/lazybos" extraButtonCss="w-auto max-w-none px-8">
          Pradedam!
        </ButtonPrimaryLink>
      </div>
    </section>
  );
}

export default HeroSection;
