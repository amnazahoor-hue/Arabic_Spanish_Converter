"use client";

import { AccessibleImageMeta } from "@/components/media/AccessibleImageMeta";
import { LazyBackgroundLayer } from "@/components/media/LazyBackgroundLayer";
import { LazyMotionDiv, LazyMotionUl } from "@/components/motion/LazyMotion";
import { TranslatorPanel } from "@/components/sections/TranslatorPanel";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SITE_IMAGES } from "@/content/site-images";
import { HERO_CONTAINER_CLASS, SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { Globe2, Languages, ShieldCheck, Sparkles } from "lucide-react";

const ArabesqueMotif = dynamic(
  () => import("@/components/brand/ArabesqueMotif").then((mod) => mod.ArabesqueMotif),
  { ssr: false, loading: () => null },
);

const trustItems = [
  { label: "100% gratis", Icon: Sparkles },
  { label: "Sin registro", Icon: ShieldCheck },
  { label: "Bidireccional", Icon: Languages },
  { label: "RTL para árabe", Icon: Globe2 },
] as const;

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.04 },
  },
};

const item = (reduce: boolean) => ({
  hidden: reduce ? {} : { opacity: 0, y: 16 },
  show: reduce ? {} : { opacity: 1, y: 0, transition: { duration: 0.48, ease: "easeOut" as const } },
});

export function Hero() {
  const reduceMotion = usePrefersReducedMotion();
  const motionItem = item(!!reduceMotion);

  return (
    <section
      id={SECTION_IDS.hero}
      data-hero
      className={cn(
        "relative isolate flex w-full max-w-[100vw] flex-col overflow-hidden scroll-mt-[var(--header-height)]",
      )}
      aria-labelledby="hero-heading"
    >
      <AccessibleImageMeta
        src="/hero-mobile-bg.webp"
        meta={SITE_IMAGES.heroPeopleMobile}
        visuallyHidden
      />
      <AccessibleImageMeta
        src="/hero-people-bg.webp"
        meta={SITE_IMAGES.heroPeopleDesktop}
        visuallyHidden
      />
      <LazyBackgroundLayer
        src="/hero-mobile-bg.webp"
        priority
        className="hero-people-bg hero-people-bg--mobile pointer-events-none absolute inset-0 xl:hidden"
      />
      <LazyBackgroundLayer
        src="/hero-people-bg.webp"
        priority
        className="hero-people-bg hero-people-bg--desktop pointer-events-none absolute inset-0 hidden xl:block"
      />
      <div className="hero-people-overlay pointer-events-none absolute inset-0" aria-hidden />
      <div className="hero-mesh pointer-events-none absolute inset-0" aria-hidden />

      <div
        className="hero-orb hero-orb--1 pointer-events-none absolute -top-8 right-[5%] h-56 w-56 max-w-[40vw] motion-reduce:animate-none"
        style={{ background: "color-mix(in srgb, var(--color-primary) 28%, transparent)" }}
        aria-hidden
      />
      <div
        className="hero-orb hero-orb--2 pointer-events-none absolute bottom-[8%] left-[2%] h-44 w-44 max-w-[35vw] motion-reduce:animate-none"
        style={{ background: "color-mix(in srgb, var(--color-secondary) 32%, transparent)" }}
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-heading) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />

      <ArabesqueMotif
        className="hero-deco-motif pointer-events-none absolute -right-16 top-1/2 hidden w-[min(28rem,45vw)] -translate-y-1/2 lg:block xl:-right-8"
        aria-hidden
      />

      <div
        className={cn(
          HERO_CONTAINER_CLASS,
          "hero-shell site-hero-shell relative z-10 w-full py-10 sm:py-12 lg:py-16 xl:py-[4.5rem]",
        )}
      >
        <div
          className={cn(
            "hero-grid grid w-full min-w-0 max-w-none justify-items-center gap-8 sm:gap-10",
            "lg:grid-cols-[minmax(0,0.88fr)_minmax(0,1.12fr)] lg:items-center lg:justify-items-stretch lg:gap-8",
            "xl:grid-cols-[minmax(0,0.84fr)_minmax(0,1.16fr)] xl:gap-10",
          )}
        >
          <LazyMotionDiv
            className={cn(
              "hero-copy order-1 flex min-w-0 max-w-full flex-col items-center gap-4 text-center sm:gap-5",
              "lg:items-start lg:justify-center lg:gap-5 lg:text-start 2xl:sticky 2xl:top-[calc(var(--header-height)+1.5rem)]",
            )}
            reduceMotion={reduceMotion}
            motion={{
              variants: stagger,
              initial: "hidden",
              animate: "show",
            }}
          >
            <LazyMotionDiv
              reduceMotion={reduceMotion}
              motion={{
                variants: motionItem,
              }}
              className="hero-copy-main flex min-h-0 w-full flex-col items-center lg:items-start"
            >
              <div className="hero-title-block flex w-full min-w-0 flex-col items-center gap-2.5 sm:gap-3 lg:items-start">
                <h1
                  id="hero-heading"
                  className={cn(
                    "type-h1-hero w-full max-w-xl text-balance text-center lg:max-w-none lg:text-start",
                    "lg:leading-[1.08]",
                  )}
                >
                  Traductor Árabe Español:{" "}
                  <span className="heading-accent motion-safe:animate-[hero-shimmer_8s_ease-in-out_infinite] motion-reduce:animate-none">
                    Traducción Mediante IA Precisa Y Sensible Al Contexto
                  </span>
                </h1>
                <p
                  className={cn(
                    "hero-lead type-h3-card w-full max-w-lg text-center font-normal text-body text-pretty lg:max-w-xl lg:text-start",
                  )}
                >
                  Nuestro traductor árabe español comprende los significados y los dialectos. No
                  solo proporcionamos traducción palabra por palabra. Luego, ofrece traducciones
                  naturales al español. ¡Empieza a traducir gratis!
                </p>
              </div>
            </LazyMotionDiv>

            <LazyMotionUl
              reduceMotion={reduceMotion}
              motion={{
                variants: motionItem,
              }}
              className="hero-trust flex min-w-0 w-full flex-wrap justify-center gap-2 pt-0.5 lg:justify-start"
              aria-label="Beneficios principales"
            >
              {trustItems.map(({ label, Icon }) => (
                <li key={label}>
                  <span className="hero-trust-pill inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 type-small font-semibold text-body sm:px-3 sm:py-1.5">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={1.75} aria-hidden />
                    {label}
                  </span>
                </li>
              ))}
            </LazyMotionUl>
          </LazyMotionDiv>

          <LazyMotionDiv
            className={cn(
              "hero-translator order-2 relative mx-auto flex min-h-0 min-w-0 w-full max-w-[26rem] interactive-lift",
              "sm:max-w-[30rem] md:max-w-[34rem] lg:mx-0 lg:max-w-[36rem] lg:justify-self-end xl:max-w-[38rem]",
              "rounded-[calc(var(--radius)+4px)] border border-border/80 bg-surface/95 p-4 shadow-lg backdrop-blur-sm",
              "sm:p-5 lg:p-6",
            )}
            reduceMotion={reduceMotion}
            motion={{
              initial: reduceMotion ? {} : { opacity: 0, scale: 0.98, y: 14 },
              animate: reduceMotion ? {} : { opacity: 1, scale: 1, y: 0 },
              transition: { duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <div className="hero-visual-glow pointer-events-none absolute inset-0 rounded-[inherit]" aria-hidden />
            <TranslatorPanel variant="hero" id={SECTION_IDS.translator} />
          </LazyMotionDiv>
        </div>
      </div>
    </section>
  );
}
