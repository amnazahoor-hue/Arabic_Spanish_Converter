"use client";

import { ArabesqueMotif } from "@/components/brand/ArabesqueMotif";
import { HeroIllustration } from "@/components/sections/HeroIllustration";
import { Button } from "@/components/ui/Button";
import { PAGE_CONTAINER_CLASS, SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Globe2,
  Languages,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react";

const trustItems = [
  { label: "100% free", Icon: Sparkles },
  { label: "No sign-up", Icon: ShieldCheck },
  { label: "Bidirectional", Icon: Languages },
  { label: "RTL for Arabic", Icon: Globe2 },
] as const;

const heroMetrics = [
  { label: "Real-time", highlight: "translation" },
  { label: "Under", highlight: "1 second" },
  { label: "Neural", highlight: "quality" },
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
  const reduceMotion = useReducedMotion();
  const motionItem = item(!!reduceMotion);

  return (
    <section
      data-hero
      className={cn(
        "relative isolate flex w-full max-w-[100vw] flex-col overflow-x-clip",
        "min-h-[calc(100dvh-var(--header-height))] min-h-[calc(100svh-var(--header-height))]",
      )}
      aria-labelledby="hero-heading"
    >
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
          PAGE_CONTAINER_CLASS,
          "hero-shell relative flex min-h-0 w-full flex-1 flex-col justify-center py-8 sm:py-9 lg:py-5 xl:py-8",
        )}
      >
        <div
          className={cn(
            "hero-grid grid w-full min-w-0 max-w-none gap-8 sm:gap-8",
            "lg:grid-cols-[minmax(0,1.02fr)_minmax(0,0.98fr)] lg:items-center lg:gap-8",
            "xl:gap-10",
          )}
        >
          <motion.div
            className={cn(
              "hero-copy order-1 flex min-w-0 max-w-full flex-col items-center gap-4 text-center sm:gap-5",
              "lg:items-start lg:gap-4 lg:text-start",
            )}
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={motionItem} className="hero-copy-top w-full max-w-full">
              <span className="hero-badge inline-flex max-w-full items-center gap-2 rounded-full border px-2.5 py-1.5 backdrop-blur-md sm:px-3.5 sm:py-2">
                <span className="hero-badge-icon flex h-7 w-7 shrink-0 items-center justify-center rounded-full sm:h-8 sm:w-8">
                  <Zap className="h-3.5 w-3.5 text-secondary sm:h-4 sm:w-4" strokeWidth={2} aria-hidden />
                </span>
                <span className="hero-badge-label type-small max-w-[calc(100%-2.25rem)] truncate font-bold uppercase tracking-wide text-primary sm:max-w-none sm:overflow-visible sm:whitespace-normal sm:tracking-[0.12em]">
                  Al-Andalus · Arabic ↔ Spanish
                </span>
              </span>
            </motion.div>

            <motion.div variants={motionItem} className="hero-copy-main flex min-h-0 w-full flex-col">
              <div className="hero-title-block flex w-full min-w-0 flex-col gap-2.5 sm:gap-3">
                <h1
                  id="hero-heading"
                  className={cn(
                    "type-h1-hero mx-auto max-w-xl text-balance md:mx-0 md:max-w-none",
                    "lg:leading-[1.08]",
                  )}
                >
                  Arabic ⇄ Spanish{" "}
                  <span className="hero-instantly motion-safe:animate-[hero-shimmer_8s_ease-in-out_infinite] motion-reduce:animate-none">
                    instantly
                  </span>
                </h1>
                <div className="hero-grid-line mx-auto w-full max-w-[12rem] md:mx-0 lg:max-w-[14rem]" aria-hidden />
                <p
                  className={cn(
                    "hero-lead type-h3-card mx-auto max-w-lg font-normal text-body text-pretty md:mx-0 lg:max-w-xl",
                  )}
                >
                  Free, bidirectional translation for families, businesses, and students
                  bridging Spain, Latin America, and the Arab world.
                </p>
              </div>
            </motion.div>

            <motion.ul
              variants={motionItem}
              className="hero-metrics mx-auto w-full max-w-lg justify-center lg:mx-0 lg:justify-start"
              aria-label="Performance highlights"
            >
              {heroMetrics.map(({ label, highlight }) => (
                <li key={label}>
                  <span className="hero-metric">
                    <span className="hero-metric-dot" aria-hidden />
                    {label} <strong>{highlight}</strong>
                  </span>
                </li>
              ))}
            </motion.ul>

            <motion.p
              variants={motionItem}
              className="hero-extra type-body prose-width mx-auto max-w-lg text-pretty text-muted md:mx-0 lg:max-w-none"
            >
              Paste text in Arabic or Spanish — results in seconds. Mobile-ready, no account,
              with proper RTL layout for Arabic script.
            </motion.p>

            <motion.div variants={motionItem} className="hero-copy-actions w-full max-w-full">
              <div className="hero-ctas flex w-full min-w-0 flex-row items-center justify-center gap-2.5 lg:justify-start">
                <Button
                  href={`#${SECTION_IDS.translator}`}
                  size="md"
                  className={cn(
                    "hero-cta-primary group min-w-0 flex-1 justify-center px-3 py-2.5 text-[0.8125rem]",
                    "sm:flex-none sm:px-6 sm:py-3 sm:text-[0.9375rem]",
                  )}
                >
                  Translate now
                  <ArrowRight
                    className="h-3.5 w-3.5 shrink-0 sm:h-4 sm:w-4 transition-transform motion-safe:group-hover:translate-x-0.5"
                    strokeWidth={2}
                    aria-hidden
                  />
                </Button>
                <Button
                  href={`#${SECTION_IDS.howItWorks}`}
                  variant="outline"
                  size="md"
                  className={cn(
                    "hero-cta-secondary min-w-0 flex-1 justify-center border-2 border-primary/60 px-2.5 py-2.5 text-heading",
                    "text-[0.75rem] leading-tight sm:flex-none sm:px-5 sm:py-3 sm:text-[0.9375rem]",
                  )}
                >
                  See how it works
                </Button>
              </div>
            </motion.div>

            <motion.ul
              variants={motionItem}
              className="hero-trust flex min-w-0 w-full flex-wrap justify-center gap-2 pt-0.5 lg:justify-start"
              aria-label="Key benefits"
            >
              {trustItems.map(({ label, Icon }) => (
                <li key={label}>
                  <span className="hero-trust-pill inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 type-small font-semibold text-body sm:px-3 sm:py-1.5">
                    <Icon className="h-3.5 w-3.5 shrink-0 text-primary" strokeWidth={1.75} aria-hidden />
                    {label}
                  </span>
                </li>
              ))}
            </motion.ul>
          </motion.div>

          <motion.div
            className={cn(
              "hero-visual order-2 relative flex min-h-0 min-w-0 w-full justify-center",
              "px-3 py-4 sm:px-4 sm:py-5 lg:items-center lg:justify-center lg:px-0 lg:py-0",
            )}
            initial={reduceMotion ? {} : { opacity: 0, scale: 0.96, y: 14 }}
            animate={reduceMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="hero-visual-glow" aria-hidden />
            <HeroIllustration className="relative z-10 w-full lg:max-w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
