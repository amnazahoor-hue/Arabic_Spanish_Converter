"use client";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ArrowRight, Hand, HeartPulse, ShoppingCart } from "lucide-react";

const phrases = [
  {
    label: "Saludo",
    Icon: Hand,
    arabic: "مرحبا، كيف حالك؟",
    spanish: "Hola, ¿cómo estás?",
  },
  {
    label: "Emergencia",
    Icon: AlertTriangle,
    arabic: "اتصل بالشرطة!",
    spanish: "¡Llama a la policía!",
  },
  {
    label: "Emergencia Médica",
    Icon: HeartPulse,
    arabic: "أحتاج طبيباً",
    spanish: "Necesito un médico",
  },
  {
    label: "Comparación De Precios De Compras",
    Icon: ShoppingCart,
    arabic: "كم سعره؟",
    spanish: "¿Cuánto cuesta esto?",
  },
] as const;

function PhraseRow({
  phrase,
  index,
  reduceMotion,
}: {
  phrase: (typeof phrases)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const { Icon, label, arabic, spanish } = phrase;

  return (
    <motion.li
      className={cn(
        "rounded-[var(--radius-lg)] border border-border/80 bg-surface/95 p-4 shadow-sm sm:p-5",
        "transition-[border-color,box-shadow] duration-300 hover:border-primary/30 hover:shadow-card",
      )}
      initial={reduceMotion ? {} : { opacity: 0, y: 16 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ duration: 0.45, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-primary/20 bg-primary/10 text-primary">
          <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
        </span>
        <h3 className="type-h3-card text-heading">{label}</h3>
      </div>

      <div className="grid gap-3 md:grid-cols-[1fr_auto_1fr] md:items-center">
        <p
          className="rounded-[var(--radius)] border border-border/70 bg-surface-alt/60 px-3 py-2.5 font-arabic text-start text-base leading-relaxed text-heading sm:text-lg"
          dir="rtl"
          lang="ar"
        >
          {arabic}
        </p>

        <span
          className="hidden text-secondary md:flex md:items-center md:justify-center"
          aria-hidden
        >
          →
        </span>

        <p
          className="rounded-[var(--radius)] border border-primary/15 bg-primary/5 px-3 py-2.5 type-body leading-relaxed text-body"
          lang="es"
        >
          {spanish}
        </p>
      </div>
    </motion.li>
  );
}

export function CommonPhrases() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id={SECTION_IDS.commonPhrases} tone="primary-mist" className="overflow-hidden">
      <div className="relative">
        <motion.header
          className="mx-auto mb-8 max-w-3xl text-center lg:mb-10"
          initial={reduceMotion ? {} : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="type-h2-section text-heading">Común Frases En Árabe Al Español</h2>
          <p className="type-body mx-auto mt-4 max-w-2xl text-body text-pretty">
            Algunas frases comunes que usamos en nuestra vida diaria sin darnos cuenta. Según la
            situación, aquí hay algunas frases mencionadas a través de traductor árabe gratis:
          </p>
          <div
            className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-primary via-secondary to-primary"
            aria-hidden
          />
        </motion.header>

        <ul className="mx-auto max-w-4xl space-y-4">
          {phrases.map((phrase, index) => (
            <PhraseRow
              key={phrase.label}
              phrase={phrase}
              index={index}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </ul>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 text-center"
          initial={reduceMotion ? {} : { opacity: 0 }}
          whileInView={reduceMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          <Button href={`#${SECTION_IDS.translator}`} size="lg">
            Traducir aquí
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
