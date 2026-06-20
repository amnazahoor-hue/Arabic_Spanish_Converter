"use client";

import "@/styles/features-infographic.css";
import { Button } from "@/components/ui/Button";import { PAGE_CONTAINER_CLASS, SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Globe2, Languages, Mic, RefreshCw, Sparkles } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type FeatureTheme = {
  color: string;
  ctaTextDark?: boolean;
  title: string;
  description: string;
  bullets?: readonly string[];
  Icon: LucideIcon;
};

const featureThemes: readonly FeatureTheme[] = [
  {
    color: "#4dbce9",
    title: "Detección De Contexto Mediante IA",
    description:
      "La inteligencia artificial comprueba el contexto antes de traducir al español. Una manzana es fruta; un MacBook es un ordenador.",
    Icon: Sparkles,
  },
  {
    color: "#f38a2e",
    title: "Dialectos Árabes",
    description:
      "Dominamos el árabe estándar moderno y dialectos como Darija Marroquí, Árabe Del Golfo y Árabe Levantino.",
    Icon: Globe2,
  },
  {
    color: "#e94d6a",
    title: "Proporcione Una Salida En Español Natural",
    description:
      "La salida en español maneja correctamente la diferenciación de género y la concordancia verbal.",
    Icon: Languages,
  },
  {
    color: "#5a3e98",
    title: "Modo Inverso",
    description:
      "Con un clic en intercambiar, realiza la traducción inversa: traductor español a árabe al instante.",
    Icon: RefreshCw,
  },
  {
    color: "#f9d448",
    ctaTextDark: true,
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
  const { Icon, color, ctaTextDark, title, description, bullets } = feature;

  return (
    <motion.article
      className="features-card h-full"
      initial={reduceMotion ? {} : { opacity: 0, y: 28 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="features-card__visual" style={{ backgroundColor: color }}>
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
        <a
          href={`#${SECTION_IDS.translator}`}
          className="features-card__cta"
          style={{
            backgroundColor: color,
            color: ctaTextDark ? "#1a1a2e" : "#ffffff",
          }}
        >
          Traducir aquí
        </a>
      </div>
    </motion.article>
  );
}

export function Features() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id={SECTION_IDS.features}
      className="scroll-mt-[calc(var(--header-height)+0.75rem)]"
    >
      <div data-features-infographic className="py-12 md:py-16 lg:py-20">
        <div className={PAGE_CONTAINER_CLASS}>
        <motion.header
          className="mx-auto mb-10 max-w-3xl text-center lg:mb-12"
          initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="type-h2-section text-white text-balance">
            ¿Por Qué Nuestro Traductor Árabe Español Es Diferente?
          </h2>
          <p className="features-intro type-body mx-auto mt-4 max-w-2xl text-pretty">
            Nuestra herramienta traduce los significados. Está conectada con una IA de traducción
            árabe y cuenta con formación en patrones de comunicación. Además, comprende el contexto
            del mismo modo que lo haría una persona bilingüe.
          </p>
        </motion.header>

        <div className="features-connectors mx-auto mb-2 hidden max-w-6xl lg:block">
          <div className="features-hub-line mb-5" aria-hidden />
          <div
            className="grid gap-4"
            style={{ gridTemplateColumns: `repeat(${featureThemes.length}, minmax(0, 1fr))` }}
          >
            {featureThemes.map((feature) => (
              <div key={feature.title} className="features-connector-col">
                <span
                  className="features-dot"
                  style={{ backgroundColor: feature.color, color: feature.color }}
                  aria-hidden
                />
                <span
                  className="features-stem"
                  style={{ backgroundColor: feature.color }}
                  aria-hidden
                />
              </div>
            ))}
          </div>
        </div>

        <div
          className={cn(
            "mx-auto grid max-w-6xl gap-4",
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
          <p className="type-body max-w-lg text-white/75">¡Empieza a traducir gratis!</p>
          <Button
            href={`#${SECTION_IDS.translator}`}
            size="lg"
            className="bg-secondary hover:bg-accent"
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
