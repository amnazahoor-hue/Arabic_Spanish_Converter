"use client";

import { ArabesqueMotif } from "@/components/brand/ArabesqueMotif";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  Globe2,
  Handshake,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Users,
  Zap,
} from "lucide-react";

type FeatureAccent = "primary" | "secondary";

const features = [
  {
    title: "Bidirectional Arabic–Spanish translation",
    description:
      "Convert messages, emails, and posts in both directions instantly. Built for families and mixed-language teams who need clarity fast.",
    Icon: Zap,
    tag: "Instant both ways",
    accent: "primary" as FeatureAccent,
  },
  {
    title: "Free with no sign-up",
    description:
      "Open the site and translate — no account or app install. Use it as often as you need within fair usage limits on the free tier.",
    Icon: Globe2,
    tag: "Always free",
    accent: "secondary" as FeatureAccent,
  },
  {
    title: "Optimized for mobile",
    description:
      "Smooth on phones and tablets with RTL panels for Arabic and no horizontal scroll. Lightweight loading helps on slower networks.",
    Icon: Smartphone,
    tag: "RTL ready",
    accent: "secondary" as FeatureAccent,
  },
  {
    title: "For communities and businesses",
    description:
      "Designed for migrant communities in Spain and Latin America, and for businesses tied to the Arab world — trade, hospitality, education, and social services.",
    Icon: Users,
    tag: "Real-world use",
    accent: "primary" as FeatureAccent,
  },
] as const;

const trustPoints = [
  { label: "No sign-up", Icon: ShieldCheck },
  { label: "Privacy-first", Icon: Handshake },
  { label: "Built for daily life", Icon: Sparkles },
] as const;

const accentStyles: Record<
  FeatureAccent,
  { iconWrap: string; tag: string; hoverBorder: string; glow: string }
> = {
  primary: {
    iconWrap:
      "border-primary/25 bg-gradient-to-br from-primary/18 via-primary/8 to-surface text-primary",
    tag: "border-primary/25 bg-primary/10 text-primary",
    hoverBorder: "group-hover:border-primary/40",
    glow: "from-primary/20",
  },
  secondary: {
    iconWrap:
      "border-secondary/30 bg-gradient-to-br from-secondary/22 via-secondary/8 to-surface text-secondary",
    tag: "border-secondary/30 bg-secondary/12 text-secondary",
    hoverBorder: "group-hover:border-secondary/45",
    glow: "from-secondary/25",
  },
};

function FeatureCard({
  feature,
  index,
  featured,
  reduceMotion,
}: {
  feature: (typeof features)[number];
  index: number;
  featured?: boolean;
  reduceMotion: boolean;
}) {
  const { Icon, accent, tag, title, description } = feature;
  const styles = accentStyles[accent];

  return (
    <motion.article
      className={cn(
        index === features.length - 1 &&
          features.length % 2 === 1 &&
          "max-lg:col-span-2 max-lg:max-w-xl max-lg:justify-self-center",
      )}
      initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border p-6 sm:p-7",
          "border-border/80 bg-surface/95 shadow-card backdrop-blur-sm",
          "transition-[border-color,box-shadow,transform] duration-300",
          "motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_12px_40px_rgba(26,26,46,0.1)]",
          styles.hoverBorder,
          featured && "lg:min-h-[280px]",
        )}
      >
        <div
          className={cn(
            "pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100",
            styles.glow,
          )}
          aria-hidden
        />

        <div className="relative z-10 mb-5 flex flex-col items-center gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div
            className={cn(
              "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl border shadow-sm",
              styles.iconWrap,
            )}
          >
            <Icon className="h-7 w-7" strokeWidth={1.65} aria-hidden />
          </div>
          <span
            className={cn(
              "rounded-full border px-2.5 py-1 type-small font-semibold uppercase tracking-wide",
              styles.tag,
            )}
          >
            {tag}
          </span>
        </div>

        <h3 className="type-h3-card relative z-10 text-center text-heading transition-colors group-hover:text-primary md:text-start">
          {title}
        </h3>
        <p className="type-body relative z-10 mt-3 flex-1 text-center leading-relaxed text-body md:text-start">
          {description}
        </p>

        <div
          className="relative z-10 mt-6 h-0.5 w-10 rounded-full bg-gradient-to-r from-primary/50 to-secondary/50 opacity-60 transition-all duration-300 group-hover:w-16 group-hover:opacity-100"
          aria-hidden
        />
      </div>
    </motion.article>
  );
}

export function Features() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id={SECTION_IDS.features} tone="primary-mist" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-heading) 1px, transparent 0)`,
          backgroundSize: "24px 24px",
        }}
      />
      <ArabesqueMotif
        className="pointer-events-none absolute -right-10 top-8 h-36 w-36 text-primary/[0.06]"
        aria-hidden
      />
      <ArabesqueMotif
        className="pointer-events-none absolute -left-8 bottom-4 h-28 w-28 rotate-90 text-secondary/[0.07]"
        aria-hidden
      />

      <div className="relative">
        <motion.header
          className="mx-auto mb-8 max-w-3xl text-center lg:mb-10"
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/25 bg-surface/80 px-3 py-1 type-small font-semibold uppercase tracking-[0.18em] text-primary shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-secondary" aria-hidden />
            Why Al-Andalus
          </span>
          <h2 className="type-h2-section mt-4 text-heading">
            Why use this{" "}
            <span className="bg-gradient-to-r from-primary via-primary to-secondary bg-clip-text text-transparent">
              translator
            </span>
          </h2>
          <p className="type-body prose-width mx-auto mt-3 text-body">
            Tools for people who live between two languages and two cultures — fast, free, and
            respectful of Arabic typography.
          </p>
          <div
            className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-primary to-secondary"
            aria-hidden
          />

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {trustPoints.map(({ label, Icon }) => (
              <span
                key={label}
                className="inline-flex items-center gap-2 rounded-full border border-border/80 bg-surface/90 px-3.5 py-2 type-small font-medium text-body shadow-sm"
              >
                <Icon className="h-4 w-4 shrink-0 text-primary" strokeWidth={1.75} aria-hidden />
                {label}
              </span>
            ))}
          </div>
        </motion.header>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-2 lg:gap-6">
          {features.map((feature, index) => (
            <FeatureCard
              key={feature.title}
              feature={feature}
              index={index}
              featured={index === 0}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </div>

        <motion.div
          className="mt-12 flex flex-col items-center gap-4 text-center"
          initial={reduceMotion ? {} : { opacity: 0 }}
          whileInView={reduceMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.45 }}
        >
          <p className="type-body max-w-lg text-muted">
            Ready to translate? Paste your text and get results in seconds.
          </p>
          <Button href={`#${SECTION_IDS.translator}`} size="lg">
            Open translator
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
