"use client";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, Building2, MapPin, MessagesSquare } from "lucide-react";

const dialects = [
  {
    title: "Árabe Estándar Moderno",
    description:
      "Utilizado en noticias y documentos oficiales. También conocido como árabe estándar (Fusha). Sigue las reglas de árabe clásico, como el alfabeto árabe o las letras.",
    Icon: BookOpen,
  },
  {
    title: "Darija Marroquí",
    description:
      "Un dialecto de Marruecos influenciado por bereber o francés. Es diferente de la MSA y suena más rápido.",
    Icon: MapPin,
  },
  {
    title: "Árabe Del Golfo",
    description:
      "Este árabe se utiliza en Arabia Saudita y los Emiratos Árabes Unidos. Resulta útil en el ámbito empresarial.",
    Icon: Building2,
  },
  {
    title: "Árabe Levantino",
    description:
      "De uso frecuente en Siria y Líbano. Nuestro traductor árabe levantino maneja con naturalidad las frases coloquiales.",
    Icon: MessagesSquare,
  },
] as const;

function DialectCard({
  dialect,
  index,
  reduceMotion,
}: {
  dialect: (typeof dialects)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const { Icon, title, description } = dialect;
  const accent = index % 2 === 0 ? "primary" : "secondary";

  return (
    <motion.article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-[var(--radius-lg)] border border-border/80 bg-surface/95 p-5 shadow-card backdrop-blur-sm sm:p-6",
        "transition-[border-color,box-shadow,transform] duration-300",
        "motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_12px_40px_rgba(26,26,46,0.1)]",
        accent === "primary" ? "hover:border-primary/35" : "hover:border-secondary/40",
      )}
      initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="mb-4 flex items-center gap-3">
        <span
          className={cn(
            "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border shadow-sm",
            accent === "primary"
              ? "border-primary/25 bg-primary/10 text-primary"
              : "border-secondary/30 bg-secondary/12 text-secondary",
          )}
        >
          <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
        </span>
        <h3 className="type-h3-card text-heading">{title}</h3>
      </div>
      <p className="type-body flex-1 leading-relaxed text-body">{description}</p>
    </motion.article>
  );
}

export function ArabicDialects() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id={SECTION_IDS.dialects} tone="sand" className="overflow-hidden">
      <div className="relative">
        <motion.header
          className="mx-auto mb-8 max-w-3xl text-center lg:mb-10"
          initial={reduceMotion ? {} : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="type-h2-section text-heading">Comprensión De Los Dialectos Árabes</h2>
          <p className="type-body mx-auto mt-4 max-w-2xl text-body text-pretty">
            En traducciones árabe español, el desafío radica en que el árabe tiene múltiples
            dialectos. Nuestro traductor sigue estos:
          </p>
          <div
            className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-primary via-secondary to-primary"
            aria-hidden
          />
        </motion.header>

        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {dialects.map((dialect, index) => (
            <DialectCard
              key={dialect.title}
              dialect={dialect}
              index={index}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </div>

        <motion.div
          className="mt-10 flex flex-col items-center gap-4 text-center"
          initial={reduceMotion ? {} : { opacity: 0 }}
          whileInView={reduceMotion ? {} : { opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15, duration: 0.45 }}
        >
          <p className="type-body max-w-lg text-muted">
            Pruebe el traductor gratis; no es necesario registrarse.
          </p>
          <Button href={`#${SECTION_IDS.translator}`} size="lg">
            Traducir aquí
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
