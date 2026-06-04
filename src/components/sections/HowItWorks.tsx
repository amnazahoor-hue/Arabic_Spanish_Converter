"use client";

import { HowItWorksDecor } from "@/components/sections/HowItWorksDecor";
import { HowItWorksStepImage } from "@/components/sections/HowItWorksStepImage";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { HOW_IT_WORKS_HIGHLIGHTS, HOW_IT_WORKS_STEPS } from "@/content/howItWorks";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

function StepRow({
  step,
  index,
  isLast,
  reduceMotion,
}: {
  step: (typeof HOW_IT_WORKS_STEPS)[number];
  index: number;
  isLast: boolean;
  reduceMotion: boolean;
}) {
  const { Icon } = step;
  const accent = index % 2 === 0 ? "primary" : "secondary";

  return (
    <motion.li
      className={cn(
        "relative grid grid-cols-[2.75rem_1fr] items-stretch gap-x-4 gap-y-3 sm:grid-cols-[3rem_1fr] sm:gap-x-5",
        "lg:grid-cols-[3rem_minmax(0,1fr)_minmax(13.5rem,34%)] lg:gap-x-6 lg:gap-y-0",
        !isLast && "pb-7 sm:pb-8",
      )}
      initial={reduceMotion ? {} : { opacity: 0, y: 14 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-24px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          "relative z-10 flex flex-col items-center self-start pt-4 sm:pt-5",
          "lg:h-full lg:justify-center lg:self-stretch lg:pt-0",
          !isLast && "row-span-2 lg:row-span-1",
        )}
      >
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-full text-sm font-bold tabular-nums ring-4 ring-surface",
            isLast
              ? "bg-primary text-white shadow-[0_6px_18px_rgba(26,107,107,0.35)]"
              : accent === "primary"
                ? "border-2 border-primary/25 bg-primary/10 text-primary"
                : "border-2 border-secondary/30 bg-secondary/10 text-secondary",
          )}
        >
          {step.number}
        </span>
        {!isLast && (
          <span
            className="mt-2 hidden w-0.5 flex-1 min-h-[2rem] rounded-full bg-gradient-to-b from-primary/40 via-border/80 to-border/30 lg:block"
            aria-hidden
          />
        )}
      </div>

      <article
        className={cn(
          "group relative flex h-full flex-col rounded-[var(--radius)] border p-4 sm:p-5",
          "border-border/70 bg-surface shadow-sm",
          "transition-[border-color,box-shadow,transform] duration-300",
          "hover:border-primary/30 hover:shadow-card motion-safe:hover:-translate-y-0.5",
          isLast && "ring-1 ring-primary/12",
          accent === "primary" ? "border-l-4 border-l-primary" : "border-l-4 border-l-secondary",
          "col-start-2 row-start-1",
        )}
      >
        <div className="flex items-start gap-3 sm:gap-4">
          <div
            className={cn(
              "flex h-10 w-10 shrink-0 items-center justify-center rounded-xl",
              accent === "primary" ? "bg-primary/10 text-primary" : "bg-secondary/12 text-secondary",
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="type-h3-card text-heading transition-colors group-hover:text-primary">
              {step.title}
            </h3>
            <p className="type-small mt-1.5 leading-relaxed text-body">{step.description}</p>
            {step.hint && (
              <p
                className={cn(
                  "mt-2.5 inline-flex w-fit rounded-md px-2 py-1 type-small font-medium",
                  accent === "primary"
                    ? "bg-primary/8 text-primary"
                    : "bg-secondary/10 text-secondary",
                )}
              >
                {step.hint}
              </p>
            )}
          </div>
        </div>
      </article>

      <HowItWorksStepImage
        stepIndex={index}
        className="col-start-2 row-start-2 w-full lg:col-start-3 lg:row-start-1 lg:h-full lg:self-stretch"
      />
    </motion.li>
  );
}

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id={SECTION_IDS.howItWorks} tone="primary-mist" className="overflow-hidden">
      <HowItWorksDecor />

      <div className="relative">
        <motion.header
          className="mx-auto mb-10 max-w-3xl text-center lg:mb-12"
          initial={reduceMotion ? {} : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-secondary/35 bg-surface px-3 py-1.5 type-small font-semibold uppercase tracking-[0.16em] text-secondary shadow-sm">
            <Sparkles className="h-3.5 w-3.5" aria-hidden />
            Simple process
          </span>
          <h2 className="type-h2-section mt-4 text-heading">
            How it{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              works
            </span>
          </h2>
          <p className="type-body mx-auto mt-3 max-w-2xl text-body">
            Four quick steps from choosing languages to sharing your translation — on any device,
            no account needed.
          </p>
          <div
            className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-primary via-secondary to-primary"
            aria-hidden
          />
        </motion.header>

        <div className="mb-10 grid gap-3 sm:grid-cols-3 lg:mb-12">
          {HOW_IT_WORKS_HIGHLIGHTS.map(({ label, Icon }, index) => (
            <motion.div
              key={label}
              className="flex items-center justify-center gap-3 rounded-[var(--radius)] border border-border/60 bg-surface/90 px-4 py-3.5 shadow-sm"
              initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.06, duration: 0.4 }}
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              </span>
              <span className="type-small font-semibold text-heading">{label}</span>
            </motion.div>
          ))}
        </div>

        <div
          className={cn(
            "relative overflow-hidden rounded-[var(--radius-lg)] p-[1px]",
            "bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/12",
          )}
        >
          <div
            className={cn(
              "relative rounded-[calc(var(--radius-lg)-1px)] border border-border/40",
              "bg-surface/95 px-5 py-8 shadow-card backdrop-blur-sm sm:px-8 sm:py-10 lg:px-10 lg:py-12",
            )}
          >
            <ol className="relative space-y-0">
              <span
                className="pointer-events-none absolute bottom-6 left-[1.375rem] top-6 hidden w-px bg-gradient-to-b from-primary/25 via-border to-primary/15 sm:left-[1.5rem] lg:block"
                aria-hidden
              />

              {HOW_IT_WORKS_STEPS.map((step, index) => (
                <StepRow
                  key={step.number}
                  step={step}
                  index={index}
                  isLast={index === HOW_IT_WORKS_STEPS.length - 1}
                  reduceMotion={!!reduceMotion}
                />
              ))}
            </ol>

            <motion.div
              className={cn(
                "mt-8 flex flex-col gap-4 rounded-[var(--radius)] border border-primary/15",
                "bg-gradient-to-r from-primary/8 via-surface to-secondary/8 p-5 sm:flex-row sm:items-center sm:justify-between",
              )}
              initial={reduceMotion ? {} : { opacity: 0 }}
              whileInView={reduceMotion ? {} : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.45 }}
            >
              <div>
                <p className="type-h3-card text-heading">Ready to try it?</p>
                <p className="type-small mt-1 text-muted">
                  Jump to the translator — it takes under a minute.
                </p>
              </div>
              <Button href={`#${SECTION_IDS.translator}`} size="lg" className="shrink-0">
                Try the translator
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
}
