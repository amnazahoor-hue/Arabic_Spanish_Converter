"use client";

import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowLeftRight, Keyboard } from "lucide-react";

const floatTransition = {
  duration: 3.2,
  repeat: Infinity,
  ease: "easeInOut" as const,
};

export function HowItWorksIllustration() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="relative mx-auto w-full max-w-[320px] sm:max-w-[360px] lg:max-w-[400px]"
      initial={reduceMotion ? {} : { opacity: 0, scale: 0.94 }}
      whileInView={reduceMotion ? {} : { opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="absolute inset-[4%] rounded-full border border-primary/20 bg-surface/60 shadow-card"
        aria-hidden
      />
      <div
        className={cn(
          "absolute inset-[10%] rounded-full border border-primary/15",
          !reduceMotion && "motion-safe:animate-[hero-pulse_4s_ease-in-out_infinite]",
        )}
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-primary) 8%, var(--color-surface)) 0%, var(--color-surface-alt) 70%)",
        }}
        aria-hidden
      />
      <div
        className="absolute inset-[16%] rounded-full border border-secondary/20 bg-surface-alt/50"
        aria-hidden
      />

      {!reduceMotion && (
        <>
          <motion.div
            className="absolute -right-1 top-[12%] z-20 flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 shadow-card type-small font-semibold text-primary"
            animate={{ y: [0, -6, 0] }}
            transition={{ ...floatTransition, delay: 0 }}
          >
            <ArrowLeftRight className="h-3.5 w-3.5 text-secondary" aria-hidden />
            AR ↔ ES
          </motion.div>
          <motion.div
            className="absolute -left-2 bottom-[18%] z-20 flex items-center gap-1.5 rounded-full border border-border bg-surface px-3 py-1.5 shadow-card type-small font-medium text-body"
            animate={{ y: [0, 5, 0] }}
            transition={{ ...floatTransition, delay: 0.6 }}
          >
            <Keyboard className="h-3.5 w-3.5 text-primary" aria-hidden />
            Ctrl+Enter
          </motion.div>
        </>
      )}

      <div className="relative aspect-square w-full p-[14%]">
        <svg viewBox="0 0 200 200" className="h-full w-full drop-shadow-sm" aria-hidden>
          <defs>
            <linearGradient id="hiw-device" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--color-surface)" />
              <stop offset="100%" stopColor="var(--color-bg)" />
            </linearGradient>
            <filter id="hiw-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="4" stdDeviation="6" floodOpacity="0.12" />
            </filter>
          </defs>

          <circle
            cx="100"
            cy="100"
            r="90"
            fill="none"
            stroke="var(--color-primary)"
            strokeWidth="1"
            strokeOpacity="0.15"
            strokeDasharray="4 8"
          />

          <g filter="url(#hiw-shadow)">
            <rect x="48" y="54" width="104" height="92" rx="16" fill="url(#hiw-device)" stroke="var(--color-primary)" strokeWidth="1.5" />
            <rect x="48" y="54" width="104" height="26" rx="16" fill="var(--color-primary)" opacity="0.14" />
            <circle cx="66" cy="67" r="3.5" fill="var(--color-error)" opacity="0.85" />
            <circle cx="78" cy="67" r="3.5" fill="var(--color-secondary)" opacity="0.9" />
            <circle cx="90" cy="67" r="3.5" fill="var(--color-primary)" opacity="0.35" />

            <rect x="58" y="88" width="84" height="8" rx="4" fill="var(--color-primary)" opacity="0.12" />
            <rect x="58" y="102" width="64" height="6" rx="3" fill="var(--color-border)" />
            <rect x="58" y="114" width="72" height="6" rx="3" fill="var(--color-border)" opacity="0.7" />

            <text
              x="100"
              y="138"
              textAnchor="middle"
              fontSize="28"
              className="font-arabic"
              fill="var(--color-primary)"
            >
              مرحبا
            </text>
            <text x="100" y="152" textAnchor="middle" fontSize="11" fill="var(--color-muted)">
              translating…
            </text>
          </g>

          <circle cx="100" cy="22" r="6" fill="var(--color-secondary)" opacity="0.85" />
          <circle cx="178" cy="100" r="5" fill="var(--color-primary)" opacity="0.3" />
          <circle cx="22" cy="100" r="5" fill="var(--color-primary)" opacity="0.3" />
          <circle cx="100" cy="178" r="5" fill="var(--color-secondary)" opacity="0.45" />
        </svg>

        {!reduceMotion && (
          <motion.div
            className="pointer-events-none absolute inset-[8%] rounded-full border border-dashed border-primary/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 56, repeat: Infinity, ease: "linear" }}
            aria-hidden
          />
        )}
      </div>

      <p className="mt-4 text-center type-small font-medium text-muted">
        Live preview of the translation flow
      </p>
    </motion.div>
  );
}
