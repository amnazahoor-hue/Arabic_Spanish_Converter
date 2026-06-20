"use client";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, Camera, FileText, Zap } from "lucide-react";

const aiFeatures = [
  {
    title: "Traductor Árabe Instantáneo",
    description:
      "Resultados en segundos. No es necesario esperar. Funciona como un fiable traductor árabe español.",
    Icon: Zap,
  },
  {
    title: "Notas De Traducción Opcionales",
    description:
      "Aquí puedes ver la explicación de por qué se traduce de esa manera. Útil para estudiantes y profesionales.",
    Icon: FileText,
  },
  {
    title: "Diccionario Árabe Español Modo",
    description:
      "Puedes buscar palabras árabe-españolas con todo el contexto, incluyendo pronunciación árabe y guías para estudiantes.",
    Icon: BookOpen,
  },
  {
    title: "Traductor De Imágenes Árabe",
    description:
      "Apunta la cámara hacia el texto árabe impreso. Traductor árabe con cámara y OCR árabe-español se ocupa de letreros y documentos.",
    Icon: Camera,
  },
] as const;

function AiFeatureCard({
  feature,
  index,
  reduceMotion,
}: {
  feature: (typeof aiFeatures)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const { Icon, title, description } = feature;
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

export function AiTranslatorFeatures() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id={SECTION_IDS.aiFeatures} tone="primary-mist" className="overflow-hidden">
      <div className="relative">
        <motion.header
          className="mx-auto mb-8 max-w-3xl text-center lg:mb-10"
          initial={reduceMotion ? {} : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="type-h2-section text-heading">
            Características Del Traductor De Árabe A Español Con Tecnología De IA
          </h2>
          <p className="type-body mx-auto mt-4 max-w-2xl text-body text-pretty">
            Nuestro traductor árabe automático es rápido gracias al motor de IA. No se pierde ni
            una sola palabra en español. Estas son las funciones adicionales que ofrecemos:
          </p>
          <div
            className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-primary via-secondary to-primary"
            aria-hidden
          />
        </motion.header>

        <div className="grid gap-5 sm:grid-cols-2 lg:gap-6">
          {aiFeatures.map((feature, index) => (
            <AiFeatureCard
              key={feature.title}
              feature={feature}
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
          <Button href={`#${SECTION_IDS.translator}`} size="lg">
            Traducir aquí
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </motion.div>
      </div>
    </Section>
  );
}
