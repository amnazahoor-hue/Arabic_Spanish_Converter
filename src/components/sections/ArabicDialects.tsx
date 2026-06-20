"use client";

import "@/styles/arabic-dialects.css";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS } from "@/lib/constants";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, BookOpen, Building2, MapPin, MessagesSquare } from "lucide-react";

const dialects = [
  {
    title: "Árabe Estándar Moderno",
    description:
      "Utilizado en noticias y documentos oficiales. También conocido como árabe estándar (Fusha). Sigue las reglas de árabe clásico, como el alfabeto árabe o las letras.",
    Icon: BookOpen,
    tag: "MSA",
    arabic: "الفصحى",
  },
  {
    title: "Darija Marroquí",
    description:
      "Un dialecto de Marruecos influenciado por bereber o francés. Es diferente de la MSA y suena más rápido.",
    Icon: MapPin,
    tag: "Magreb",
    arabic: "الدارجة",
  },
  {
    title: "Árabe Del Golfo",
    description:
      "Este árabe se utiliza en Arabia Saudita y los Emiratos Árabes Unidos. Resulta útil en el ámbito empresarial.",
    Icon: Building2,
    tag: "Golfo",
    arabic: "الخليج",
  },
  {
    title: "Árabe Levantino",
    description:
      "De uso frecuente en Siria y Líbano. Nuestro traductor árabe levantino maneja con naturalidad las frases coloquiales.",
    Icon: MessagesSquare,
    tag: "Levante",
    arabic: "الشام",
  },
] as const;

function DialectCollage({ reduceMotion }: { reduceMotion: boolean }) {
  const [msa, darija, gulf, levant] = dialects;

  const tileMotion = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, x: 24, scale: 0.96 },
          whileInView: { opacity: 1, x: 0, scale: 1 },
          viewport: { once: true, margin: "-32px" },
          transition: { duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] as const },
        };

  return (
    <div className="dialects-collage" aria-hidden>
      <motion.div
        {...tileMotion(0)}
        className="dialects-collage__tile dialects-collage__tile--a"
      >
        <div className="dialects-collage__bg" />
        <div className="dialects-collage__content">
          <span className="dialects-collage__icon">
            <msa.Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div>
            <p className="dialects-collage__label">{msa.title}</p>
            <p className="dialects-collage__arabic" dir="rtl" lang="ar">
              {msa.arabic}
            </p>
          </div>
        </div>
      </motion.div>

      <motion.div
        {...tileMotion(0.1)}
        className="dialects-collage__tile dialects-collage__tile--b"
      >
        <div className="dialects-collage__bg" />
        <div className="dialects-collage__content">
          <span className="dialects-collage__tag">{darija.tag}</span>
          <div>
            <p className="dialects-collage__label">{darija.title}</p>
            <p className="dialects-collage__arabic" dir="rtl" lang="ar">
              {darija.arabic}
            </p>
          </div>
          <span className="dialects-collage__icon">
            <darija.Icon className="h-5 w-5" strokeWidth={1.75} />
          </span>
        </div>
      </motion.div>

      <motion.div
        {...tileMotion(0.18)}
        className="dialects-collage__tile dialects-collage__tile--c"
      >
        <div className="dialects-collage__bg" />
        <div className="dialects-collage__content">
          <span className="dialects-collage__tag">{gulf.tag}</span>
          <div>
            <p className="dialects-collage__label">{gulf.title}</p>
            <p className="dialects-collage__arabic" dir="rtl" lang="ar">
              {gulf.arabic}
            </p>
          </div>
          <div className="space-y-3">
            <p className="dialects-collage__label">{levant.title}</p>
            <p className="dialects-collage__arabic !mt-0" dir="rtl" lang="ar">
              {levant.arabic}
            </p>
            <span className="dialects-collage__icon">
              <levant.Icon className="h-5 w-5" strokeWidth={1.75} />
            </span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export function ArabicDialects() {
  const reduceMotion = useReducedMotion();

  const itemMotion = (index: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-32px" },
          transition: {
            duration: 0.48,
            delay: index * 0.08,
            ease: [0.22, 1, 0.36, 1] as const,
          },
        };

  return (
    <Section id={SECTION_IDS.dialects} tone="grey" className="overflow-hidden">
      <div data-dialects-section className="relative">
        <div className="dialects-about">
          <div className="dialects-about__top">
            <motion.div
              className="dialects-about__intro"
              initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            >
              <h2 className="dialects-about__title">
                Comprensión De Los{" "}
                <span className="heading-accent motion-safe:animate-[hero-shimmer_8s_ease-in-out_infinite] motion-reduce:animate-none">
                  Dialectos Árabes
                </span>
              </h2>
              <p className="dialects-about__lead">
                En traducciones árabe español, el desafío radica en que el árabe tiene múltiples
                dialectos. Nuestro traductor sigue estos:
              </p>
            </motion.div>

            <motion.div
              className="dialects-about__cta-wrap"
              initial={reduceMotion ? {} : { opacity: 0, scale: 0.96 }}
              whileInView={reduceMotion ? {} : { opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            >
              <Button
                href={`#${SECTION_IDS.translator}`}
                size="md"
                className="dialects-about__cta"
              >
                Traducir aquí
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </motion.div>
          </div>

          <div className="dialects-about__body">
            <div className="dialects-about__grid">
              {dialects.map((dialect, index) => (
                <motion.article
                  key={dialect.title}
                  {...itemMotion(index)}
                  className="dialects-about__item"
                >
                  <span className="dialects-about__num" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="dialects-about__item-body">
                    <h3 className="dialects-about__item-title">{dialect.title}</h3>
                    <p className="dialects-about__item-text">{dialect.description}</p>
                  </div>
                </motion.article>
              ))}
            </div>

            <DialectCollage reduceMotion={!!reduceMotion} />
          </div>
        </div>
      </div>
    </Section>
  );
}
