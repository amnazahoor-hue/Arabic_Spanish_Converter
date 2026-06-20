"use client";

import "@/styles/common-phrases.css";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { AlertTriangle, ArrowRight, Hand, HeartPulse, ShoppingCart } from "lucide-react";
import type { LucideIcon } from "lucide-react";

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

const toneClass = ["phrase-card--teal", "phrase-card--gold", "phrase-card--teal", "phrase-card--gold"] as const;

function PhraseCard({
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
    <motion.article
      className={cn("phrase-card", toneClass[index])}
      initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.48, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="phrase-card__head">
        <span className="phrase-card__icon-wrap" aria-hidden>
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
        <h3 className="phrase-card__label">{label}</h3>
      </div>

      <div className="phrase-card__arabic-wrap">
        <p className="phrase-card__arabic" dir="rtl" lang="ar">
          {arabic}
        </p>
      </div>

      <p className="phrase-card__spanish" lang="es">
        {spanish}
      </p>

      <Button href={`#${SECTION_IDS.translator}`} size="sm" className="phrase-card__cta">
        Traducir aquí
        <ArrowRight className="h-3.5 w-3.5" aria-hidden />
      </Button>
    </motion.article>
  );
}

export function CommonPhrases() {
  const reduceMotion = useReducedMotion();

  return (
    <Section
      id={SECTION_IDS.commonPhrases}
      tone="surface"
      className="overflow-hidden"
      data-common-phrases-section
    >
      <div className="relative">
        <motion.header
          className="mx-auto mb-8 max-w-3xl lg:mb-10"
          initial={reduceMotion ? {} : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            title="Común Frases En Árabe Al"
            accent="Español"
            description="Algunas frases comunes que usamos en nuestra vida diaria sin darnos cuenta. Según la situación, aquí hay algunas frases mencionadas a través de traductor árabe gratis:"
            showLine={false}
          />
        </motion.header>

        <div data-common-phrases className="phrase-grid">
          {phrases.map((phrase, index) => (
            <PhraseCard
              key={phrase.label}
              phrase={phrase}
              index={index}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </div>

        <motion.div
          className="mt-10 flex justify-center lg:mt-12"
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
