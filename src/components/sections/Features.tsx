"use client";

import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeading";
import { MARROQUI_PAGE_PATH } from "@/content/marroqui-page";
import { PAGE_CONTAINER_CLASS, SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Globe2, Languages, Mic, RefreshCw, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

type FeatureAccent = "primary" | "hover" | "secondary" | "terracotta" | "accent";

type FeatureTheme = {
  accent: FeatureAccent;
  lightVisual?: boolean;
  title: string;
  description: ReactNode;
  bullets?: readonly string[];
  Icon: LucideIcon;
};

const contentLinkClass =
  "interactive-link font-semibold text-link no-underline hover:text-link-hover";

const featureThemes: readonly FeatureTheme[] = [
  {
    accent: "primary",
    title: "Detección De Contexto Mediante IA",
    description:
      "La inteligencia artificial comprueba el contexto antes de traducir al español. Una manzana es fruta; un MacBook es un ordenador.",
    Icon: Sparkles,
  },
  {
    accent: "hover",
    title: "Dialectos Árabes",
    description: (
      <>
        Dominamos el árabe estándar moderno y dialectos como{" "}
        <Link href={MARROQUI_PAGE_PATH} className={contentLinkClass}>
          Darija Marroquí
        </Link>
        , Árabe Del Golfo y Árabe Levantino.
      </>
    ),
    Icon: Globe2,
  },
  {
    accent: "secondary",
    lightVisual: true,
    title: "Proporcione Una Salida En Español Natural",
    description:
      "La salida en español maneja correctamente la diferenciación de género y la concordancia verbal.",
    Icon: Languages,
  },
  {
    accent: "terracotta",
    title: "Modo Inverso",
    description:
      "Con un clic en intercambiar, realiza la traducción inversa: traductor español a árabe al instante.",
    Icon: RefreshCw,
  },
  {
    accent: "accent",
    lightVisual: true,
    title: "Traducción De Texto Y Voz",
    description:
      "Dos modos que funcionan juntos: traductor árabe español escrito y traducción audio árabe español.",
    Icon: Mic,
  },
];

function FeatureInfographicCard({
  feature,
  index,
  reduceMotion,
}: {
  feature: FeatureTheme;
  index: number;
  reduceMotion: boolean;
}) {
  const { Icon, accent, lightVisual, title, description, bullets } = feature;

  return (
    <motion.article
      className={cn("features-card group h-full", `features-card--${accent}`)}
      initial={reduceMotion ? {} : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className={cn(
          "features-card__visual",
          `features-card__visual--${accent}`,
          lightVisual && "features-card__visual--light",
        )}
      >
        <div className="features-card__icon-wrap">
          <Icon className="h-9 w-9" strokeWidth={1.65} aria-hidden />
        </div>
      </div>

      <div className="features-card__body">
        <h3 className="features-card__title">{title}</h3>
        <p className="features-card__text">{description}</p>
        {bullets && bullets.length > 0 && (
          <ul className="features-card__bullets">
            {bullets.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        )}
      </div>
    </motion.article>
  );
}

export function Features() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={SECTION_IDS.features}
      className="scroll-mt-[calc(var(--header-height)+0.75rem)] overflow-visible"
    >
      <div data-features-infographic className="overflow-visible py-14 md:py-18 lg:py-20">
        <div className={PAGE_CONTAINER_CLASS}>
          <motion.header
            className="features-header mx-auto mb-10 max-w-3xl lg:mb-12"
            initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <SectionHeader
              title="¿Por Qué Nuestro Traductor Árabe Español Es"
              accent="Diferente?"
              description="Nuestra herramienta traduce los significados. Está conectada con una IA de traducción árabe y cuenta con formación en patrones de comunicación. Además, comprende el contexto del mismo modo que lo haría una persona bilingüe."
              className="max-w-3xl"
              lineVariant="default"
            />
          </motion.header>

          <motion.div
            className="features-connectors mx-auto mb-2 hidden max-w-6xl lg:block"
            initial={reduceMotion ? {} : { opacity: 0, y: -12 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="features-connectors__track" aria-hidden>
              <div className="features-hub-line" />
              <div
                className="features-connectors__grid"
                style={{ gridTemplateColumns: `repeat(${featureThemes.length}, minmax(0, 1fr))` }}
              >
                {featureThemes.map((feature, index) => (
                  <div key={feature.title} className="features-connector-col">
                    <span
                      className={cn("features-dot", `features-dot--${feature.accent}`)}
                      style={{ animationDelay: `${index * 0.15}s` }}
                      aria-hidden
                    />
                    <span
                      className={cn("features-stem", `features-stem--${feature.accent}`)}
                      aria-hidden
                    />
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <div
            className={cn(
              "features-grid mx-auto grid max-w-6xl gap-4",
              "sm:grid-cols-2 lg:grid-cols-5 lg:gap-3 xl:gap-4",
            )}
          >
            {featureThemes.map((feature, index) => (
              <FeatureInfographicCard
                key={feature.title}
                feature={feature}
                index={index}
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
            <p className="features-footer-note type-body max-w-lg">¡Empieza a traducir gratis!</p>
            <Button
              href={`#${SECTION_IDS.translator}`}
              size="lg"
              className="bg-secondary text-white shadow-[0_4px_16px_color-mix(in_srgb,var(--color-secondary)_45%,transparent)] hover:bg-accent"
            >
              Traducir aquí
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
