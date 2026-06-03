"use client";

import { motion, useReducedMotion } from "framer-motion";

export function HowItWorksDecor() {
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      aria-hidden
    >
      <svg
        className="absolute left-1/2 top-0 h-full w-full max-w-full -translate-x-1/2 opacity-60 lg:opacity-100"
        viewBox="0 0 900 500"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
      >
        <motion.path
          d="M 60 260 C 180 120, 320 80, 450 240 S 620 400, 840 260"
          stroke="var(--color-primary)"
          strokeWidth="1.5"
          strokeOpacity="0.2"
          strokeDasharray="10 14"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={reduceMotion ? {} : { pathLength: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.6, ease: "easeInOut" }}
        />
        <motion.path
          d="M 450 240 C 560 160, 700 180, 820 270"
          stroke="var(--color-secondary)"
          strokeWidth="1.25"
          strokeOpacity="0.22"
          strokeDasharray="6 16"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          initial={reduceMotion ? { pathLength: 1 } : { pathLength: 0 }}
          whileInView={reduceMotion ? {} : { pathLength: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 1.3, delay: 0.15, ease: "easeInOut" }}
        />
        <circle cx="450" cy="240" r="4" fill="var(--color-secondary)" opacity="0.5" />
        <circle cx="180" cy="200" r="3" fill="var(--color-primary)" opacity="0.25" />
        <circle cx="720" cy="280" r="3" fill="var(--color-primary)" opacity="0.2" />
      </svg>
    </div>
  );
}
