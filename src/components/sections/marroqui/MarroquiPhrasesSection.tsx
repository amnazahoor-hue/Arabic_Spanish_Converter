"use client";

import { Button } from "@/components/ui/Button";
import { MARROQUI_PHRASES, MARROQUI_SECTION_IDS } from "@/content/marroqui-page";
import { PAGE_CONTAINER_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Coffee, Hand, MapPin, Tag, type LucideIcon } from "lucide-react";

const PHRASE_ICONS: LucideIcon[] = [Hand, Tag, MapPin, Coffee];

const fadeUp = (reduce: boolean, delay = 0) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
      };

const cardMotion = (reduce: boolean, index: number) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 24, scale: 0.97 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, margin: "-32px" },
        transition: {
          duration: 0.48,
          delay: 0.1 + index * 0.08,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };

export function MarroquiPhrasesSection() {
  const reduceMotion = useReducedMotion();
  const motionProps = (delay = 0) => fadeUp(!!reduceMotion, delay);

  return (
    <section
      id={MARROQUI_SECTION_IDS.phrases}
      className="marroqui-phrases scroll-mt-[calc(var(--header-height)+0.75rem)] py-10 md:py-14 lg:py-16"
    >
      <div className={cn(PAGE_CONTAINER_CLASS, "marroqui-phrases__inner")}>
        <motion.header {...motionProps()} className="marroqui-phrases__header">
          <h2 className="marroqui-phrases__title">
            Traductor Marroquí Español:{" "}
            <span className="heading-accent heading-accent--on-dark">Frases Comunes</span>
          </h2>
          <p className="marroqui-phrases__description">
            Un traductor español árabe marroquí traduce cualquier oración, incluidas las frases que
            escuchas en un puesto o cafetería. A continuación se muestran las frases útiles darija
            habla.
          </p>
        </motion.header>

        <div className="marroqui-phrases__grid">
          {MARROQUI_PHRASES.map((phrase, index) => {
            const Icon = PHRASE_ICONS[index] ?? Hand;

            return (
              <motion.article
                key={phrase.darija}
                {...cardMotion(!!reduceMotion, index)}
                className="marroqui-phrase-card"
              >
                <span className="marroqui-phrase-card__icon-wrap">
                  <Icon className="marroqui-phrase-card__icon" strokeWidth={1.75} aria-hidden />
                </span>
                <p className="marroqui-phrase-card__darija" lang="ar" dir="ltr">
                  {phrase.darija}
                </p>
                <p className="marroqui-phrase-card__spanish" lang="es">
                  {phrase.spanish}
                </p>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          {...motionProps(0.2)}
          className="marroqui-phrases__cta"
        >
          <p className="marroqui-phrases__cta-text">
            ¿Traducir árabe marroquí al español? ¡Abre el traductor ahora!
          </p>
          <Button
            href={`#${MARROQUI_SECTION_IDS.translator}-panel`}
            size="lg"
            className="marroqui-phrases__cta-btn bg-secondary hover:bg-accent"
          >
            Traducir aquí
            <ArrowRight className="h-4 w-4" aria-hidden />
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
