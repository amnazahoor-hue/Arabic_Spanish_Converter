"use client";

import { ArabesqueMotif } from "@/components/brand/ArabesqueMotif";
import { HowItWorksDecor } from "@/components/sections/HowItWorksDecor";
import { HowItWorksIllustration } from "@/components/sections/HowItWorksIllustration";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Clock3,
  Languages,
  PenLine,
  Share2,
  Sparkles,
  Zap,
} from "lucide-react";

const steps = [
  {
    number: 1,
    title: "Choose your languages",
    description:
      "Arabic → Spanish or Spanish → Arabic — swap direction anytime with one tap.",
    Icon: Languages,
  },
  {
    number: 2,
    title: "Type or paste your text",
    description: "Up to 5,000 characters per request in the input area.",
    Icon: PenLine,
  },
  {
    number: 3,
    title: "Press translate",
    description: "Instant results. Shortcut: Ctrl+Enter (Cmd+Enter on Mac).",
    Icon: Zap,
  },
  {
    number: 4,
    title: "Share your translation",
    description: "Copy, WhatsApp, PDF, or email from the result panel.",
    Icon: Share2,
  },
] as const;

const highlights = [
  { label: "4 simple steps", Icon: Sparkles },
  { label: "Under a minute", Icon: Clock3 },
  { label: "100% free", Icon: Zap },
] as const;

function StepCard({
  step,
  index,
  isLast,
  reduceMotion,
}: {
  step: (typeof steps)[number];
  index: number;
  isLast: boolean;
  reduceMotion: boolean;
}) {
  const { Icon } = step;

  return (
    <motion.li
      className="relative"
      initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ duration: 0.45, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {!isLast && (
        <span
          className="absolute left-7 top-[4.25rem] bottom-0 w-0.5 rounded-full bg-gradient-to-b from-primary/40 via-primary/15 to-transparent"
          aria-hidden
        />
      )}

      <div
        className={cn(
          "group relative flex gap-4 overflow-hidden rounded-[var(--radius)] border p-4 sm:p-5",
          "border-border/70 bg-surface/95 shadow-sm backdrop-blur-sm",
          "transition-[border-color,box-shadow,transform] duration-300",
          "hover:border-primary/35 hover:shadow-card motion-safe:hover:-translate-y-0.5",
          isLast && "ring-1 ring-primary/15",
          !isLast && "mb-4",
        )}
      >
        <span
          className="pointer-events-none absolute -right-1 -top-2 select-none font-bold tabular-nums text-primary/[0.07]"
          style={{ fontSize: "3.5rem" }}
          aria-hidden
        >
          {String(step.number).padStart(2, "0")}
        </span>

        <div
          className={cn(
            "relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-xl",
            isLast
              ? "bg-primary text-white shadow-[0_6px_20px_rgba(26,107,107,0.35)]"
              : "border border-primary/20 bg-gradient-to-br from-primary/12 to-surface text-primary",
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </div>

        <div className="relative z-10 min-w-0 flex-1 pt-0.5">
          <p className="type-small mb-1 font-semibold uppercase tracking-wider text-secondary">
            Step {step.number}
          </p>
          <h3 className="type-h3-card mb-1.5 text-heading group-hover:text-primary transition-colors">
            {step.title}
          </h3>
          <p className="type-small leading-relaxed text-body">{step.description}</p>
        </div>
      </div>
    </motion.li>
  );
}

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id={SECTION_IDS.howItWorks} tone="surface" className="overflow-hidden">
      <div className="relative">
        <HowItWorksDecor />

        <div
          className={cn(
            "relative overflow-hidden rounded-[var(--radius-lg)] p-[1px]",
            "bg-gradient-to-br from-primary/35 via-secondary/25 to-primary/15",
          )}
        >
          <div
            className={cn(
              "relative overflow-hidden rounded-[calc(var(--radius-lg)-1px)]",
              "border border-border/40 bg-surface/80 px-6 py-8 shadow-card backdrop-blur-md",
              "sm:px-10 sm:py-10 lg:px-12 lg:py-12",
            )}
            style={{
              backgroundImage: [
                "radial-gradient(ellipse 80% 50% at 0% 0%, color-mix(in srgb, var(--color-primary) 14%, transparent), transparent 55%)",
                "radial-gradient(ellipse 60% 40% at 100% 100%, color-mix(in srgb, var(--color-secondary) 12%, transparent), transparent 50%)",
                "linear-gradient(180deg, var(--color-surface) 0%, color-mix(in srgb, var(--color-bg) 40%, var(--color-surface)) 100%)",
              ].join(", "),
            }}
          >
            <ArabesqueMotif
              className="pointer-events-none absolute -bottom-8 -left-6 h-40 w-40 text-primary/[0.07] motion-reduce:opacity-50"
              aria-hidden
            />
            <ArabesqueMotif
              className="pointer-events-none absolute -right-4 -top-4 h-28 w-28 rotate-180 text-secondary/[0.08] motion-reduce:opacity-50"
              aria-hidden
            />

            <div
              className="pointer-events-none absolute -right-24 top-0 h-64 w-64 rounded-full opacity-30 blur-3xl"
              style={{
                background: "color-mix(in srgb, var(--color-primary) 35%, transparent)",
              }}
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -left-16 bottom-0 h-48 w-48 rounded-full opacity-25 blur-3xl"
              style={{
                background: "color-mix(in srgb, var(--color-secondary) 40%, transparent)",
              }}
              aria-hidden
            />

            <motion.div
              className="relative z-10 mb-10 lg:mb-12"
              initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex flex-col gap-6 text-center md:flex-row md:items-end md:justify-between md:gap-8 md:text-start">
                <div className="max-w-xl text-center md:mx-0 md:text-start">
                  <span className="inline-flex items-center gap-2 rounded-full border border-secondary/30 bg-secondary/10 px-3 py-1 type-small font-semibold uppercase tracking-[0.18em] text-secondary">
                    <Sparkles className="h-3.5 w-3.5" aria-hidden />
                    Simple process
                  </span>
                  <h2 className="type-h2-section mt-4 text-heading">
                    How it{" "}
                    <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
                      works
                    </span>
                  </h2>
                  <p className="type-body mt-3 text-body">
                    From choosing languages to sharing results — four clear steps on any device.
                  </p>
                  <div
                    className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary md:mx-0"
                    aria-hidden
                  />
                </div>

                <div className="flex flex-wrap items-center justify-center gap-2 md:justify-end">
                  {highlights.map(({ label, Icon }) => (
                    <span
                      key={label}
                      className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/90 px-3.5 py-2 type-small font-medium text-body shadow-sm"
                    >
                      <Icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} aria-hidden />
                      {label}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>

            <div className="relative z-10 grid items-center gap-8 md:grid-cols-2 md:items-start md:gap-8 lg:gap-14 xl:gap-16">
              <div className="flex min-w-0 justify-center md:justify-start">
                <HowItWorksIllustration />
              </div>

              <div className="min-w-0">
                <ol className="mx-auto max-w-lg md:mx-0 md:max-w-none">
                  {steps.map((step, index) => (
                    <StepCard
                      key={step.number}
                      step={step}
                      index={index}
                      isLast={index === steps.length - 1}
                      reduceMotion={!!reduceMotion}
                    />
                  ))}
                </ol>

                <motion.div
                  className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start"
                  initial={reduceMotion ? {} : { opacity: 0 }}
                  whileInView={reduceMotion ? {} : { opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.35, duration: 0.4 }}
                >
                  <Button href={`#${SECTION_IDS.translator}`} size="lg">
                    Try the translator
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </Button>
                  <p className="type-small text-muted">No account required</p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
