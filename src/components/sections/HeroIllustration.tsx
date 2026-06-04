"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowLeftRight,
  Check,
  Globe2,
  Languages,
  Lock,
  Sparkles,
  Zap,
} from "lucide-react";
import { useId } from "react";

type HeroIllustrationProps = {
  className?: string;
};

const HERO_DEMO_PHRASE = {
  arabic: "عرض تجاري",
  spanish: "Oferta comercial",
} as const;

const FLOAT_CHIPS = [
  { label: "Bidirectional", Icon: Languages, side: "left" as const },
  { label: "Neural AI", Icon: Sparkles, side: "right" as const },
] as const;

function LangPane({
  role,
  locale,
  nativeLabel,
  englishLabel,
  sample,
  dir,
  delay,
  reduceMotion,
  showCheck,
}: {
  role: "source" | "target";
  locale: string;
  nativeLabel: string;
  englishLabel: string;
  sample: string;
  dir?: "rtl" | "ltr";
  delay: number;
  reduceMotion: boolean;
  showCheck?: boolean;
}) {
  const isSource = role === "source";

  return (
    <motion.article
      className={cn(
        "hero-illustration__pane relative flex flex-col overflow-hidden rounded-[calc(var(--radius)-2px)]",
        "border shadow-[0_14px_36px_-14px_rgba(26,26,46,0.2),inset_0_1px_0_rgba(255,255,255,0.98)]",
        isSource
          ? "border-primary/25 bg-gradient-to-br from-white via-white to-primary/[0.07]"
          : "border-secondary/30 bg-gradient-to-br from-white via-white to-secondary/[0.09]",
      )}
      dir={dir}
      initial={reduceMotion ? {} : { opacity: 0, y: 10, scale: 0.98 }}
      animate={reduceMotion ? {} : { opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          "pointer-events-none absolute inset-x-0 top-0 h-[3px]",
          isSource
            ? "bg-gradient-to-r from-transparent via-primary/60 to-transparent"
            : "bg-gradient-to-r from-transparent via-secondary/65 to-transparent",
        )}
        aria-hidden
      />

      <div className="flex items-start justify-between gap-2 p-3 pb-2 sm:p-3.5 sm:pb-2.5">
        <div className="flex items-center gap-2.5">
          <span
            className={cn(
              "flex h-9 w-9 items-center justify-center rounded-xl text-sm font-bold shadow-md",
              isSource
                ? "bg-gradient-to-br from-primary/20 to-primary/5 text-primary ring-1 ring-primary/20"
                : "bg-gradient-to-br from-secondary/22 to-secondary/6 text-secondary ring-1 ring-secondary/25",
            )}
          >
            {locale}
          </span>
          <div className={dir === "rtl" ? "text-end" : ""}>
            <span
              className={cn(
                "mb-0.5 inline-flex rounded-full px-2 py-0.5 text-[0.5625rem] font-bold uppercase tracking-[0.14em]",
                isSource ? "bg-primary/12 text-primary" : "bg-secondary/14 text-secondary",
              )}
            >
              {isSource ? "Source" : "Result"}
            </span>
            <p
              className={cn(
                "text-[0.6875rem] font-semibold leading-tight",
                isSource ? "text-primary/90" : "text-secondary",
              )}
            >
              {nativeLabel}
            </p>
            <p className="type-small text-muted">{englishLabel}</p>
          </div>
        </div>
        {showCheck && (
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-success/14 text-success ring-1 ring-success/30 shadow-sm">
            <Check className="h-4 w-4" strokeWidth={2.5} aria-hidden />
          </span>
        )}
      </div>

      <div
        className={cn(
          "mx-3 mb-3 rounded-[calc(var(--radius)-4px)] border px-3 py-2.5 sm:mx-3.5 sm:mb-3.5 sm:px-3.5 sm:py-3",
          isSource
            ? "border-primary/12 bg-primary/[0.05]"
            : "border-secondary/14 bg-secondary/[0.06]",
        )}
      >
        <p
          className={cn(
            "font-semibold leading-snug text-balance",
            isSource
              ? "font-arabic text-[1.15rem] text-primary sm:text-[1.3rem]"
              : "text-[1.0625rem] text-secondary sm:text-[1.2rem]",
          )}
        >
          {sample}
        </p>
      </div>
    </motion.article>
  );
}

function SwapHub({ reduceMotion }: { reduceMotion: boolean }) {
  return (
    <motion.div
      className="relative z-20 flex flex-col items-center"
      initial={reduceMotion ? {} : { scale: 0.85, opacity: 0 }}
      animate={reduceMotion ? {} : { scale: 1, opacity: 1 }}
      transition={{ delay: 0.38, duration: 0.45, type: "spring", stiffness: 300, damping: 22 }}
      aria-hidden
    >
      <span
        className={cn(
          "absolute h-14 w-14 rounded-full sm:h-16 sm:w-16",
          "bg-gradient-to-br from-primary/30 via-secondary/22 to-primary/12",
          "motion-safe:animate-[hero-pulse_4s_ease-in-out_infinite] motion-reduce:animate-none",
        )}
      />
      <span
        className={cn(
          "hero-illustration__orbit absolute h-[4.25rem] w-[4.25rem] rounded-full border border-dashed border-primary/30 sm:h-[4.75rem] sm:w-[4.75rem]",
          "motion-safe:animate-spin motion-reduce:animate-none",
          "[animation-duration:20s]",
        )}
      />
      <div
        className={cn(
          "hero-illustration__swap-btn relative flex h-11 w-11 items-center justify-center rounded-full sm:h-12 sm:w-12",
          "bg-gradient-to-br from-primary via-[#1f7a7a] to-hover text-white",
          "shadow-[0_10px_28px_rgba(26,107,107,0.5),0_0_0_8px_rgba(26,107,107,0.06)]",
          "ring-2 ring-white/90",
        )}
      >
        <ArrowLeftRight className="h-[1.15rem] w-[1.15rem] sm:h-5 sm:w-5" strokeWidth={2.25} />
      </div>
    </motion.div>
  );
}

function FloatChip({
  label,
  Icon,
  side,
  delay,
  reduceMotion,
}: {
  label: string;
  Icon: typeof Languages;
  side: "left" | "right";
  delay: number;
  reduceMotion: boolean;
}) {
  return (
    <motion.div
      className={cn(
        "hero-float-chip pointer-events-none absolute z-30 hidden items-center gap-1.5 rounded-full border border-white/80 px-2.5 py-1.5 shadow-lg backdrop-blur-md sm:flex",
        "bg-gradient-to-br from-white/95 to-surface-alt/90",
        side === "left" ? "left-0 top-[22%] -translate-x-[18%]" : "right-0 bottom-[28%] translate-x-[14%]",
      )}
      initial={reduceMotion ? {} : { opacity: 0, scale: 0.9, y: side === "left" ? -8 : 8 }}
      animate={reduceMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.45 }}
      aria-hidden
    >
      <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
        <Icon className="h-3.5 w-3.5 text-primary" strokeWidth={2} />
      </span>
      <span className="text-[0.6875rem] font-bold text-heading">{label}</span>
    </motion.div>
  );
}

export function HeroIllustration({ className }: HeroIllustrationProps) {
  const reduceMotion = useReducedMotion();
  const gradientId = useId().replace(/:/g, "");

  return (
    <div
      className={cn(
        "hero-illustration relative mx-auto w-full max-w-md",
        "min-h-[15rem] sm:min-h-[17rem]",
        "lg:mx-0 lg:flex lg:h-auto lg:min-h-0 lg:max-w-none lg:items-center lg:justify-center",
        "lg:[perspective:1400px]",
        className,
      )}
    >
      <div
        className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-primary/12 via-transparent to-secondary/14 blur-2xl sm:-inset-8 lg:-inset-5"
        aria-hidden
      />

      {FLOAT_CHIPS.map((chip, i) => (
        <FloatChip key={chip.label} {...chip} delay={0.85 + i * 0.12} reduceMotion={!!reduceMotion} />
      ))}

      <div
        className={cn(
          "hero-illustration__ring hero-illustration__ring--1 pointer-events-none absolute -inset-2 rounded-[calc(var(--radius-lg)+12px)] sm:-inset-2.5",
          "border border-primary/15 bg-gradient-to-br from-primary/[0.05] to-secondary/[0.08]",
          "shadow-[0_0_40px_-8px_rgba(26,107,107,0.25)]",
          "motion-safe:animate-[hero-pulse_9s_ease-in-out_infinite] motion-reduce:animate-none",
        )}
        aria-hidden
      />

      <motion.div
        className={cn(
          "hero-illustration__frame relative flex w-full max-w-md flex-col rounded-[var(--radius-lg)] p-[2px]",
          "lg:h-auto lg:max-w-full",
          "bg-gradient-to-br from-primary/55 via-secondary/40 to-primary/30",
          "shadow-[0_4px_8px_rgba(26,107,107,0.08),0_28px_64px_-10px_rgba(26,107,107,0.38),0_56px_96px_-28px_rgba(201,148,58,0.18)]",
          "lg:[transform:rotateY(-4deg)_rotateX(2.5deg)]",
        )}
        animate={reduceMotion ? {} : { y: [0, -5, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      >
        <div
          className={cn(
            "hero-illustration__panel relative flex flex-col overflow-hidden rounded-[calc(var(--radius-lg)-2px)]",
            "border border-white/80 bg-surface/92 backdrop-blur-2xl",
          )}
        >
          <div
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-16 bg-gradient-to-b from-white/70 to-transparent"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.3]"
            aria-hidden
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, color-mix(in srgb, var(--color-primary) 10%, transparent) 1px, transparent 0)`,
              backgroundSize: "18px 18px",
            }}
          />
          <div
            className="pointer-events-none absolute inset-0"
            aria-hidden
            style={{
              background: [
                "radial-gradient(ellipse 85% 60% at 0% 0%, color-mix(in srgb, var(--color-primary) 18%, transparent), transparent 58%)",
                "radial-gradient(ellipse 75% 55% at 100% 100%, color-mix(in srgb, var(--color-secondary) 20%, transparent), transparent 52%)",
              ].join(", "),
            }}
          />

          <div className="hero-illustration__stage relative z-10 flex flex-col overflow-hidden">
            <div className="hero-illustration__chrome flex shrink-0 items-center gap-2.5 border-b border-border/35 bg-gradient-to-b from-white/95 to-surface/70 px-3 py-2 backdrop-blur-xl sm:px-3.5 sm:py-2.5">
              <div className="flex items-center gap-1.5" aria-hidden>
                <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57] shadow-sm sm:h-3 sm:w-3" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e] shadow-sm sm:h-3 sm:w-3" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#28c840] shadow-sm sm:h-3 sm:w-3" />
              </div>
              <div className="flex min-w-0 flex-1 items-center gap-2 rounded-lg border border-border/45 bg-white/80 px-2.5 py-1.5 shadow-[inset_0_1px_3px_rgba(26,26,46,0.05)]">
                <Lock className="h-3 w-3 shrink-0 text-success/85" strokeWidth={2.25} aria-hidden />
                <span className="truncate type-small font-medium text-muted">
                  <span className="text-success/90">https://</span>al-andalus.translate
                </span>
              </div>
              <span className="hero-illustration__live inline-flex shrink-0 items-center gap-1.5 rounded-full border border-success/35 bg-success/12 px-2 py-0.5 text-[0.625rem] font-bold uppercase tracking-wide text-success shadow-sm sm:px-2.5 sm:py-1 sm:text-[0.6875rem]">
                <span className="relative flex h-1.5 w-1.5 sm:h-2 sm:w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-success opacity-55 motion-reduce:animate-none" />
                  <span className="relative inline-flex h-full w-full rounded-full bg-success" />
                </span>
                Live
              </span>
            </div>

            <div
              className={cn(
                "hero-illustration__device hero-illustration__exchange relative flex flex-col justify-center overflow-hidden p-3 sm:p-3.5",
                "min-h-[10.5rem] sm:min-h-[11.5rem]",
              )}
            >
              {!reduceMotion && (
                <motion.div
                  className="pointer-events-none absolute right-3 top-2.5 z-20 flex items-center gap-1 rounded-full border border-secondary/35 bg-white/95 px-2 py-0.5 shadow-md backdrop-blur-sm sm:right-4 sm:top-3"
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7, duration: 0.4 }}
                >
                  <Zap className="h-3 w-3 text-secondary" aria-hidden />
                  <span className="text-[0.625rem] font-bold uppercase tracking-wider text-secondary">
                    Instant
                  </span>
                </motion.div>
              )}

              <svg
                className="pointer-events-none absolute inset-x-[16%] top-[40%] z-0 h-9 w-auto opacity-90 sm:h-10"
                viewBox="0 0 140 32"
                preserveAspectRatio="none"
                aria-hidden
              >
                <defs>
                  <linearGradient id={`beam-${gradientId}`} x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="var(--color-primary)" stopOpacity="0.4" />
                    <stop offset="50%" stopColor="var(--color-secondary)" stopOpacity="0.9" />
                    <stop offset="100%" stopColor="var(--color-secondary)" stopOpacity="0.45" />
                  </linearGradient>
                </defs>
                <path
                  d="M0 16 C35 6, 70 4, 105 12 S140 22, 140 16"
                  fill="none"
                  stroke={`url(#beam-${gradientId})`}
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                {!reduceMotion && (
                  <>
                    <circle r="3.5" fill="var(--color-secondary)" opacity="0.95">
                      <animateMotion dur="2.2s" repeatCount="indefinite" path="M0 16 C35 6, 70 4, 105 12 S140 22, 140 16" />
                    </circle>
                    <circle r="2" fill="var(--color-primary)" opacity="0.75">
                      <animateMotion dur="2.2s" begin="0.35s" repeatCount="indefinite" path="M0 16 C35 6, 70 4, 105 12 S140 22, 140 16" />
                    </circle>
                  </>
                )}
              </svg>

              <div className="relative z-10 grid grid-cols-[1fr_auto_1fr] items-center gap-2 sm:gap-2.5">
                <LangPane
                  role="source"
                  locale="ع"
                  nativeLabel="العربية"
                  englishLabel="Arabic"
                  sample={HERO_DEMO_PHRASE.arabic}
                  dir="rtl"
                  delay={0.1}
                  reduceMotion={!!reduceMotion}
                />
                <SwapHub reduceMotion={!!reduceMotion} />
                <LangPane
                  role="target"
                  locale="ES"
                  nativeLabel="Español"
                  englishLabel="Spanish"
                  sample={HERO_DEMO_PHRASE.spanish}
                  delay={0.42}
                  reduceMotion={!!reduceMotion}
                  showCheck
                />
              </div>

              <motion.div
                className="hero-illustration__progress relative z-10 mt-2.5 shrink-0 overflow-hidden rounded-[var(--radius)] border border-border/45 bg-gradient-to-b from-white to-surface-alt/90 p-2 shadow-[inset_0_1px_0_rgba(255,255,255,0.9)] sm:mt-3 sm:p-2.5"
                initial={reduceMotion ? {} : { opacity: 0, y: 8 }}
                animate={reduceMotion ? {} : { opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.45 }}
              >
                <div className="mb-1.5 flex items-center justify-between gap-2 sm:mb-2">
                  <div className="flex items-center gap-1.5">
                    <Globe2 className="h-3 w-3 text-primary sm:h-3.5 sm:w-3.5" strokeWidth={2} aria-hidden />
                    <span className="text-[0.625rem] font-bold uppercase tracking-wider text-primary sm:text-[0.6875rem]">
                      Arabic
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full bg-primary/10 px-2 py-0.5 text-[0.5625rem] font-bold text-primary sm:text-[0.625rem]">
                    <Sparkles className="h-2.5 w-2.5 text-secondary sm:h-3 sm:w-3" aria-hidden />
                    Neural
                  </span>
                  <span className="text-[0.625rem] font-bold uppercase tracking-wider text-secondary sm:text-[0.6875rem]">
                    Spanish
                  </span>
                </div>
                <div className="relative h-1.5 overflow-hidden rounded-full bg-border/60 shadow-inner sm:h-2">
                  <motion.div
                    className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary via-[#2a8a8a] to-secondary"
                    initial={reduceMotion ? { width: "82%" } : { width: "0%" }}
                    animate={{ width: "82%" }}
                    transition={{ delay: 0.85, duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  />
                  {!reduceMotion && (
                    <div className="absolute inset-y-0 w-1/5 animate-[hero-flow_2s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/65 to-transparent motion-reduce:animate-none" />
                  )}
                </div>
                <p className="hero-illustration__progress-tag mt-1.5 flex items-center justify-center gap-2 text-center text-[0.625rem] font-medium text-muted sm:mt-2 sm:text-[0.6875rem]">
                  <span className="h-1 w-1 rounded-full bg-success" aria-hidden />
                  Business &amp; everyday phrases
                  <span className="text-border/80">·</span>
                  Al-Andalus
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
