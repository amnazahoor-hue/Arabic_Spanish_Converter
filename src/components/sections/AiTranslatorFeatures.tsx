"use client";

import "@/styles/ai-features-stagger.css";
import { SectionHeader } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { BookOpen, Camera, FileText, Zap } from "lucide-react";
import Link from "next/link";

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
      className={cn("ai-features__card", `ai-features__card--${accent}`)}
      initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="ai-features__icon" aria-hidden>
        <Icon className="h-7 w-7" strokeWidth={1.75} />
      </span>

      <h3 className="ai-features__title">{title}</h3>
      <p className="ai-features__text">{description}</p>

      <Link
        href={`#${SECTION_IDS.translator}`}
        className="ai-features__link"
        aria-label="Ir al traductor para traducir aquí"
      >
        Traducir aquí
        <span className="ai-features__link-line" aria-hidden />
      </Link>
    </motion.article>
  );
}

export function AiTranslatorFeatures() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id={SECTION_IDS.aiFeatures} tone="surface" className="overflow-hidden">
      <div data-ai-features className="relative">
        <motion.header
          className="mx-auto max-w-3xl"
          initial={reduceMotion ? {} : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            title="Características Del Traductor De Árabe A Español Con"
            accent="Tecnología De IA"
            description="Nuestro traductor árabe automático es rápido gracias al motor de IA. No se pierde ni una sola palabra en español. Estas son las funciones adicionales que ofrecemos:"
            showLine={false}
          />
        </motion.header>

        <div className="ai-features__split" aria-hidden />

        <div className="ai-features__stage">
          <div className="ai-features__cards">
            {aiFeatures.map((feature, index) => (
              <AiFeatureCard
                key={feature.title}
                feature={feature}
                index={index}
                reduceMotion={!!reduceMotion}
              />
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
