"use client";

import { useState } from "react";

import { cn } from "@/helpers/classNameHelpers";

const featureCards = [
  {
    eyebrow: "01",
    title: "Greitas pasirinkimas",
    description: "Užveskite ant kortelių ir akimirksniu matykite, kas verta dėmesio.",
    metric: "0.8s",
    metricLabel: "iki statymo",
    progress: "86%",
    accent: "from-primary/30 to-secondary/10",
  },
  {
    eyebrow: "02",
    title: "Gyvas rinkos ritmas",
    description: "Animuoti signalai parodo karščiausius pasiūlymus be papildomų langų.",
    metric: "Live",
    metricLabel: "rinkos pulsas",
    progress: "72%",
    accent: "from-secondary/30 to-primary/10",
  },
  {
    eyebrow: "03",
    title: "Aiškus laimėjimo vaizdas",
    description: "Progresas, koeficientai ir būsimas balansas sudėti į vieną greitą apžvalgą.",
    metric: "100%",
    metricLabel: "skaidrumas",
    progress: "94%",
    accent: "from-primary/25 to-primary/5",
  },
];

function HomeInteractiveShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFeature = featureCards[activeIndex];

  return (
    <section className="relative overflow-hidden bg-background py-16 max-mob:py-10">
      <div className="absolute left-1/2 top-0 h-64 w-64 -translate-x-1/2 rounded-full bg-primary/10 blur-3xl" />
      <div className="content relative grid gap-8 tab:grid-cols-[0.95fr_1.05fr] tab:items-center">
        <div className="flex flex-col gap-4">
          <p className="text-sm font-semibold uppercase tracking-[0.35em] text-text-tertiary">
            Interaktyvus startas
          </p>
          <h2 className="h2 max-w-xl text-foreground">
            Pasirinkite greičiau, judėkite drąsiau, statykite įdomiau.
          </h2>
          <p className="max-w-xl text-base leading-7 text-text-grey">
            Homepage dabar kviečia tyrinėti: animuoti signalai, reaguojančios kortelės ir aiškus
            statymo kelias padeda greičiau pajausti platformos ritmą.
          </p>
        </div>

        <div className="grid gap-4">
          <div className="grid gap-3 mob:grid-cols-3">
            {featureCards.map((feature, index) => {
              const isActive = activeIndex === index;

              return (
                <button
                  key={feature.title}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onMouseEnter={() => setActiveIndex(index)}
                  aria-pressed={isActive}
                  className={cn(
                    "group relative overflow-hidden rounded-3xl border p-4 text-left transition-all duration-300 hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    isActive
                      ? "border-primary/50 bg-foreground/10 shadow-xl shadow-primary/10"
                      : "border-secondary/10 bg-foreground/5 hover:border-secondary/30"
                  )}
                >
                  <span
                    className={cn(
                      "absolute inset-0 bg-linear-to-br opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                      feature.accent,
                      isActive && "opacity-100"
                    )}
                  />
                  <span className="relative flex flex-col gap-3">
                    <span className="text-xs font-bold tracking-[0.3em] text-text-grey">
                      {feature.eyebrow}
                    </span>
                    <span className="text-sm font-bold text-foreground">{feature.title}</span>
                    <span className="text-xs leading-5 text-text-grey">{feature.description}</span>
                  </span>
                </button>
              );
            })}
          </div>

          <div className="homepage-glow-card rounded-[2rem] border border-primary/20 bg-foreground/5 p-6 backdrop-blur-xl">
            <div className="flex flex-col gap-5 mob:flex-row mob:items-center mob:justify-between">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-grey">
                  Aktyvus režimas
                </p>
                <h3 className="mt-2 text-2xl font-bold text-foreground">{activeFeature.title}</h3>
              </div>
              <div className="rounded-2xl border border-primary/20 bg-background/70 px-5 py-3 text-right">
                <p className="text-3xl font-bold text-primary">{activeFeature.metric}</p>
                <p className="text-xs font-semibold uppercase tracking-widest text-text-grey">
                  {activeFeature.metricLabel}
                </p>
              </div>
            </div>

            <p className="mt-5 text-sm leading-6 text-text-grey">{activeFeature.description}</p>

            <div className="mt-6 overflow-hidden rounded-full bg-foreground/10">
              <div
                className="h-3 rounded-full bg-linear-to-r from-primary via-secondary to-primary transition-[width] duration-500 ease-out"
                style={{ width: activeFeature.progress }}
              />
            </div>
            <div className="mt-4 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-widest text-text-grey">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-text-secondary">
                Hover
              </span>
              <span className="rounded-full bg-secondary/10 px-3 py-1 text-text-tertiary">
                Focus
              </span>
              <span className="rounded-full bg-foreground/10 px-3 py-1">Click</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeInteractiveShowcase;
