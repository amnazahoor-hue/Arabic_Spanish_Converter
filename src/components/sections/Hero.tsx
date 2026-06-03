"use client";

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

const stagger = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const item = (reduce: boolean) => ({
  hidden: reduce ? {} : { opacity: 0, y: 18 },
  show: reduce ? {} : { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" as const } },
});

export function Hero() {
  const reduceMotion = useReducedMotion();
  const motionItem = item(!!reduceMotion);

  return (
    <section
      data-hero
      className={cn(
        "relative isolate flex w-full max-w-[100vw] flex-col overflow-x-clip bg-bg",
        "min-h-[calc(100dvh-var(--header-height))] min-h-[calc(100svh-var(--header-height))]",
      )}
      aria-labelledby="hero-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background: [
            "linear-gradient(145deg,",
            "color-mix(in srgb, var(--color-primary) 18%, transparent) 0%,",
            "color-mix(in srgb, var(--color-heading) 12%, transparent) 45%,",
            "color-mix(in srgb, var(--color-bg) 100%, transparent) 100%)",
          ].join(" "),
        }}
      />
      <div
        className="pointer-events-none absolute top-0 right-0 h-48 w-48 max-w-[50vw] rounded-full opacity-40 blur-3xl motion-reduce:opacity-20"
        style={{ background: "color-mix(in srgb, var(--color-primary) 35%, transparent)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 max-w-[45vw] rounded-full opacity-35 blur-3xl motion-reduce:opacity-15"
        style={{ background: "color-mix(in srgb, var(--color-secondary) 40%, transparent)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-heading) 1px, transparent 0)`,
          backgroundSize: "28px 28px",
        }}
      />

      <div
        className={cn(
          PAGE_CONTAINER_CLASS,
          "hero-shell relative flex min-h-0 flex-1 flex-col justify-center py-8 sm:py-10 lg:py-8",
        )}
      >
        <div
          className={cn(
            "hero-grid grid w-full min-w-0 gap-8 sm:gap-9",
            "lg:grid-cols-2 lg:items-center lg:gap-10",
            "xl:gap-12",
          )}
        >
          <motion.div
            className={cn(
              "hero-copy order-1 flex min-w-0 max-w-full flex-col items-center gap-4 text-center sm:gap-5",
              "lg:items-start lg:gap-5 lg:text-start",
            )}
            variants={stagger}
            initial="hidden"
            animate="show"
          >
            <motion.div variants={motionItem} className="hero-copy-top w-full max-w-full">
              <span className="hero-badge inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-surface/90 px-2.5 py-1.5 shadow-card backdrop-blur-sm sm:px-3">
                <span className="hero-badge-icon flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-surface-alt">
                  <Zap className="h-3.5 w-3.5 text-secondary" strokeWidth={2} aria-hidden />
                </span>
                <span className="hero-badge-label type-small max-w-[calc(100%-2rem)] truncate font-semibold uppercase tracking-wide text-secondary sm:max-w-none sm:overflow-visible sm:whitespace-normal sm:tracking-widest">
                  Al-Andalus · Arabic ↔ Spanish
                </span>
              </span>
            </motion.div>

            <motion.div variants={motionItem} className="hero-copy-main flex min-h-0 w-full flex-1 flex-col">
              <div className="hero-title-block flex w-full min-w-0 flex-col gap-3 sm:gap-4">
              <h1
                id="hero-heading"
                className={cn(
                  "type-h1-hero mx-auto max-w-xl text-balance md:mx-0 md:max-w-none",
                  "md:text-[2.25rem] lg:text-[2.125rem] xl:text-[3rem]",
                )}
              >
                Arabic ⇄ Spanish{" "}
                <span
                  className="bg-gradient-to-r from-primary via-secondary to-primary bg-[length:200%_auto] bg-clip-text text-transparent motion-safe:animate-[hero-shimmer_8s_ease-in-out_infinite] motion-reduce:animate-none"
                >
                  instantly
                </span>
              </h1>
              <p
                className={cn(
                  "hero-lead type-h3-card mx-auto max-w-lg font-normal text-body text-pretty md:mx-0",
                  "md:text-[1.125rem] lg:text-[1.0625rem] xl:text-[1.5rem]",
                )}
              >
                Free, bidirectional translation for families, businesses, and students
                bridging Spain, Latin America, and the Arab world.
              </p>
              </div>
            </motion.div>

            <motion.p
              variants={motionItem}
              className="hero-extra type-body prose-width mx-auto max-w-lg text-pretty md:mx-0 lg:max-w-none"
            >
              Paste text in Arabic or Spanish — results in seconds. Mobile-ready, no account,
              with proper RTL layout for Arabic script.
            </motion.p>

            <motion.div
              variants={motionItem}
              className="hero-copy-actions w-full max-w-full"
            >
              <div className="hero-ctas flex w-full min-w-0 flex-row items-center justify-center gap-2 lg:justify-start">
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
                  "hero-cta-secondary min-w-0 flex-1 justify-center border-2 border-primary px-2.5 py-2.5 text-heading",
                  "text-[0.75rem] leading-tight sm:flex-none sm:px-5 sm:py-3 sm:text-[0.9375rem]",
                )}
              >
                See how it works
              </Button>
              </div>
            </motion.div>

            <motion.ul
              variants={motionItem}
              className="hero-trust flex min-w-0 w-full flex-wrap justify-center gap-1.5 pt-0.5 sm:gap-2 lg:justify-start"
              aria-label="Key benefits"
            >
              {trustItems.map(({ label, Icon }) => (
                <li key={label}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-surface/80 px-2.5 py-1 type-small font-medium text-body shadow-sm sm:px-3 sm:py-1.5">
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
              "px-3 py-4 sm:px-4 sm:py-6 lg:items-center lg:justify-end lg:px-2 lg:py-4",
            )}
            initial={reduceMotion ? {} : { opacity: 0, scale: 0.94, y: 12 }}
            animate={reduceMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.2, ease: "easeOut" }}
          >
            <HeroIllustration className="w-full lg:max-w-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
