"use client";

import { ArabesqueMotif } from "@/components/brand/ArabesqueMotif";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeftRight, Sparkles } from "lucide-react";

type HeroIllustrationProps = {
  className?: string;
};

export function HeroIllustration({ className }: HeroIllustrationProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className={cn(
        "hero-illustration relative mx-auto w-full",
        "min-h-[16rem] sm:min-h-[18rem]",
        "[@media(min-width:1024px)_and_(min-height:701px)]:min-h-[min(42vh,22rem)]",
        "[@media(min-width:1280px)_and_(min-height:701px)]:min-h-[24rem]",
        className,
      )}
    >
      <div
        className={cn(
          "hero-illustration__ring hero-illustration__ring--1 pointer-events-none absolute -inset-3 rounded-[calc(var(--radius-lg)+12px)] border border-secondary/20 bg-transparent motion-safe:animate-[hero-pulse_6s_ease-in-out_infinite] motion-reduce:animate-none sm:-inset-4",
          "[@media(min-width:1024px)_and_(min-height:701px)]:-inset-5",
        )}
        aria-hidden
      />
      <div
        className={cn(
          "hero-illustration__ring hero-illustration__ring--2 pointer-events-none absolute -inset-6 rounded-[calc(var(--radius-lg)+20px)] border border-primary/12 bg-transparent sm:-inset-7",
          "[@media(min-width:1024px)_and_(min-height:701px)]:-inset-8",
        )}
        aria-hidden
      />
      <div
        className={cn(
          "hero-illustration__ring hero-illustration__ring--3 pointer-events-none absolute -inset-9 rounded-[calc(var(--radius-lg)+28px)] border border-dashed border-primary/10 opacity-70 sm:-inset-10",
          "[@media(min-width:1024px)_and_(min-height:701px)]:-inset-12",
        )}
        aria-hidden
      />

      <div
        className={cn(
          "absolute inset-0 rounded-[var(--radius-lg)] p-[1px]",
          "bg-gradient-to-br from-primary/30 via-secondary/20 to-primary/10",
        )}
      >
        <div
          className={cn(
            "relative h-full min-h-[inherit] overflow-hidden rounded-[calc(var(--radius-lg)-1px)]",
            "border border-border/50 bg-surface/85 shadow-card backdrop-blur-md",
          )}
          style={{
            backgroundImage: [
              "radial-gradient(ellipse 70% 55% at 30% 20%, color-mix(in srgb, var(--color-primary) 12%, transparent), transparent 60%)",
              "radial-gradient(ellipse 50% 45% at 90% 80%, color-mix(in srgb, var(--color-secondary) 14%, transparent), transparent 55%)",
              "linear-gradient(180deg, var(--color-surface) 0%, color-mix(in srgb, var(--color-bg) 35%, var(--color-surface)) 100%)",
            ].join(", "),
          }}
        >
          <ArabesqueMotif className="pointer-events-none absolute -bottom-6 -right-4 h-32 w-32 text-primary/[0.06] sm:h-40 sm:w-40" />

          <div
            className={cn(
              "hero-illustration__stage relative flex h-full min-h-[inherit] flex-col items-center justify-center p-6 sm:p-8",
              "[@media(min-width:1024px)_and_(min-height:701px)]:p-10",
            )}
          >
            <div
              className="absolute inset-[8%] rounded-full border border-primary/15 bg-surface-alt/40"
              aria-hidden
            />
            <div
              className={cn(
                "absolute inset-[14%] rounded-full border border-primary/10",
                !reduceMotion && "motion-safe:animate-[hero-pulse_4s_ease-in-out_infinite]",
              )}
              style={{
                background:
                  "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 6%, var(--color-surface)) 0%, transparent 72%)",
              }}
              aria-hidden
            />

            {!reduceMotion && (
              <motion.div
                className="pointer-events-none absolute inset-[10%] rounded-full border border-dashed border-secondary/25"
                animate={{ rotate: 360 }}
                transition={{ duration: 52, repeat: Infinity, ease: "linear" }}
                aria-hidden
              />
            )}

            <div
              className={cn(
                "hero-illustration__device relative aspect-square w-full max-w-[min(100%,14rem)] sm:max-w-[16rem]",
                "[@media(min-width:1024px)_and_(min-height:701px)]:max-w-[18rem]",
                "[@media(min-width:1280px)_and_(min-height:701px)]:max-w-[20rem]",
              )}
            >
              <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-sm" aria-hidden>
                <defs>
                  <linearGradient id="hero-device" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="var(--color-surface)" />
                    <stop offset="100%" stopColor="var(--color-bg)" />
                  </linearGradient>
                </defs>

                <circle
                  cx="100"
                  cy="100"
                  r="92"
                  fill="none"
                  stroke="var(--color-primary)"
                  strokeWidth="1"
                  strokeOpacity="0.18"
                  strokeDasharray="5 9"
                />

                <rect
                  x="44"
                  y="48"
                  width="112"
                  height="104"
                  rx="16"
                  fill="url(#hero-device)"
                  stroke="var(--color-primary)"
                  strokeWidth="1.75"
                />
                <rect x="44" y="48" width="112" height="28" rx="16" fill="var(--color-primary)" opacity="0.12" />
                <circle cx="62" cy="62" r="3.5" fill="var(--color-error)" opacity="0.85" />
                <circle cx="74" cy="62" r="3.5" fill="var(--color-secondary)" opacity="0.9" />
                <circle cx="86" cy="62" r="3.5" fill="var(--color-primary)" opacity="0.35" />

                <rect x="56" y="84" width="88" height="7" rx="3.5" fill="var(--color-primary)" opacity="0.14" />
                <rect x="56" y="98" width="72" height="5" rx="2.5" fill="var(--color-border)" />
                <rect x="56" y="108" width="80" height="5" rx="2.5" fill="var(--color-border)" opacity="0.75" />

                <text
                  x="100"
                  y="132"
                  textAnchor="middle"
                  fontSize="30"
                  className="font-arabic"
                  fill="var(--color-primary)"
                >
                  مرحبا
                </text>
                <text x="100" y="148" textAnchor="middle" fontSize="12" fill="var(--color-muted)">
                  ⇄ translating
                </text>
                <text
                  x="100"
                  y="168"
                  textAnchor="middle"
                  fontSize="24"
                  fontStyle="italic"
                  fill="var(--color-secondary)"
                >
                  Hola
                </text>

                <circle cx="100" cy="24" r="5.5" fill="var(--color-secondary)" opacity="0.8" />
                <circle cx="176" cy="100" r="4.5" fill="var(--color-primary)" opacity="0.28" />
                <circle cx="24" cy="100" r="4.5" fill="var(--color-primary)" opacity="0.28" />
                <circle cx="100" cy="176" r="4.5" fill="var(--color-secondary)" opacity="0.45" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {!reduceMotion && (
        <motion.div
          className="hero-illustration__chip hero-illustration__chip--ar absolute -left-1 top-[10%] z-20 flex items-center gap-1.5 rounded-full border border-border/80 bg-surface/95 px-3 py-1.5 shadow-card backdrop-blur-sm sm:left-0 [@media(min-width:1024px)_and_(min-height:701px)]:-left-2"
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowLeftRight className="h-3.5 w-3.5 text-secondary" aria-hidden />
          <span className="type-small font-semibold text-primary">AR ↔ ES</span>
        </motion.div>
      )}

      <motion.div
        className="hero-illustration__chip hero-illustration__chip--instant absolute right-0 top-[22%] z-20 flex items-center gap-1 rounded-full border border-secondary/30 bg-secondary/10 px-2.5 py-1 shadow-sm sm:right-1 [@media(min-width:1024px)_and_(min-height:701px)]:-right-1"
        animate={reduceMotion ? {} : { y: [0, 5, 0] }}
        transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 }}
      >
        <Sparkles className="h-3 w-3 text-secondary" aria-hidden />
        <span className="type-small font-medium text-secondary">Instant</span>
      </motion.div>

      <motion.div
        className="hero-illustration__chip hero-illustration__chip--arabic absolute left-2 bottom-[28%] z-20 rounded-[var(--radius)] border border-border/80 bg-surface/95 px-2.5 py-1.5 shadow-card sm:left-4"
        animate={reduceMotion ? {} : { y: [0, 4, 0] }}
        transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }}
      >
        <span className="font-arabic text-lg font-semibold text-primary leading-none">ع</span>
        <span className="mt-0.5 block type-small text-muted">Arabic</span>
      </motion.div>

      <motion.div
        className="hero-illustration__chip hero-illustration__chip--spanish absolute right-2 bottom-[32%] z-20 rounded-[var(--radius)] border border-border/80 bg-surface/95 px-2.5 py-1.5 shadow-card sm:right-4"
        animate={reduceMotion ? {} : { y: [0, -5, 0] }}
        transition={{ duration: 4.6, repeat: Infinity, ease: "easeInOut", delay: 0.55 }}
      >
        <span className="text-lg font-semibold italic text-secondary leading-none">ñ</span>
        <span className="mt-0.5 block type-small text-muted">Spanish</span>
      </motion.div>

      <div
        className={cn(
          "hero-illustration__live absolute bottom-2 left-1/2 z-20 -translate-x-1/2",
          "rounded-full bg-primary px-4 py-1.5 type-small font-medium text-white shadow-md",
          "ring-2 ring-primary/20 ring-offset-2 ring-offset-surface/80 sm:bottom-3",
        )}
      >
        Live translation
      </div>
    </div>
  );
}
