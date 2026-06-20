"use client";

import { MarroquiFeaturesSection } from "@/components/sections/marroqui/MarroquiFeaturesSection";
import { MarroquiDarijaSection } from "@/components/sections/marroqui/MarroquiDarijaSection";
import { MarroquiPhrasesSection } from "@/components/sections/marroqui/MarroquiPhrasesSection";
import { MarroquiUsesSection } from "@/components/sections/marroqui/MarroquiUsesSection";
import "@/styles/marroqui-page.css";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { TranslatorPanel } from "@/components/sections/TranslatorPanel";
import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import {
  MARROQUI_FAQ_ITEMS,
  MARROQUI_SECTION_IDS,
} from "@/content/marroqui-page";
import { HERO_CONTAINER_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const fadeUp = (reduce: boolean, delay = 0) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
      };

export function MarroquiLanding() {
  const reduceMotion = useReducedMotion();
  const motionProps = (delay = 0) => fadeUp(!!reduceMotion, delay);

  return (
    <div data-marroqui-page>
      <section
        id={MARROQUI_SECTION_IDS.translator}
        className="marroqui-hero scroll-mt-[calc(var(--header-height)+0.75rem)] py-10 sm:py-12 lg:py-14"
      >
        <div className="marroqui-hero__glow" aria-hidden />
        <div className={cn(HERO_CONTAINER_CLASS, "marroqui-hero__inner")}>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-10">
            <motion.div {...motionProps()} className="marroqui-hero__copy">
              <h1 className="type-h1-hero text-balance text-white">
                Traductor Marroquí Español:{" "}
                <span className="heading-accent heading-accent--on-dark">
                  Llena La Brecha Lingüística Al Instante
                </span>
              </h1>
              <p className="marroqui-hero__lead type-body mx-auto mt-4 max-w-xl text-pretty lg:mx-0">
                Nuestro traductor descifra una conversación de mercado en Marrakech. Además, te
                conecta directamente con la rica cultura marroquí. ¡Solo escribe y traduce ahora!
              </p>
              <div className="mt-6 flex justify-center lg:justify-start">
                <Button href={`#${MARROQUI_SECTION_IDS.translator}-panel`} size="lg" className="bg-secondary hover:bg-accent">
                  Traducir aquí
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Button>
              </div>
            </motion.div>

            <motion.div
              {...motionProps(0.1)}
              id={`${MARROQUI_SECTION_IDS.translator}-panel`}
              className="marroqui-translator-card interactive-lift p-4 sm:p-5 lg:p-6"
            >
              <TranslatorPanel variant="hero" initialFrom="ar-ma" />
            </motion.div>
          </div>
        </div>
      </section>

      <MarroquiDarijaSection />

      <MarroquiPhrasesSection />

      <MarroquiFeaturesSection />

      <MarroquiUsesSection />

      <Section id={MARROQUI_SECTION_IDS.faq} tone="grey">
        <motion.div {...motionProps()}>
          <SectionHeader
            title="Preguntas"
            accent="Frecuentes"
            showLine={false}
            className="max-w-2xl"
          />
        </motion.div>

        <motion.div {...motionProps(0.08)} className="mx-auto mt-8 max-w-3xl">
          <div className="rounded-[var(--radius-lg)] border border-border/40 bg-surface/90 p-3 sm:p-5 lg:p-6">
            <FaqAccordion items={[...MARROQUI_FAQ_ITEMS]} />
          </div>
        </motion.div>
      </Section>
    </div>
  );
}
