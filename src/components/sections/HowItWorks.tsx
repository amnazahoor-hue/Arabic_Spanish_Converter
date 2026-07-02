"use client";

import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase, Plane } from "lucide-react";
import type { LucideIcon } from "lucide-react";

type ConversationExample = {
  title: string;
  description: string;
  Icon: LucideIcon;
  arabic: string;
  spanish: string;
  graphicPosition: "left" | "right";
  align: "start" | "center";
};

const examples: readonly ConversationExample[] = [
  {
    title: "Viajar",
    description: "Preguntas cotidianas al explorar una ciudad en el mundo árabe.",
    Icon: Plane,
    arabic: "أين أقرب محطة مترو؟",
    spanish: "¿Dónde está la estación de metro más cercana?",
    graphicPosition: "left",
    align: "start",
  },
  {
    title: "Negocio",
    description: "Frases formales para reuniones y propuestas comerciales.",
    Icon: Briefcase,
    arabic: "نريد الاطلاع على العرض التجاري قبل الاجتماع.",
    spanish: "Quisiéramos revisar la propuesta comercial antes de la reunión.",
    graphicPosition: "right",
    align: "center",
  },
];

function ConversationGraphic({ Icon }: { Icon: LucideIcon }) {
  return (
    <div className="conversation-banner__graphic" aria-hidden>
      <span className="conversation-banner__strip conversation-banner__strip--1" />
      <span className="conversation-banner__strip conversation-banner__strip--2" />
      <span className="conversation-banner__strip conversation-banner__strip--3" />
      <span className="conversation-banner__strip conversation-banner__strip--4" />
      <span className="conversation-banner__strip conversation-banner__strip--line" />
      <span className="conversation-banner__strip conversation-banner__strip--line-2" />
      <div className="conversation-banner__icon">
        <Icon className="h-7 w-7" strokeWidth={1.65} />
      </div>
    </div>
  );
}

function ConversationBanner({
  example,
  index,
  reduceMotion,
}: {
  example: ConversationExample;
  index: number;
  reduceMotion: boolean;
}) {
  const { Icon, title, description, arabic, spanish, graphicPosition, align } = example;
  const graphicFirst = graphicPosition === "left";

  return (
    <motion.article
      className={cn(
        "conversation-banner",
        graphicPosition === "right" && "conversation-banner--flip",
        align === "center" && "conversation-banner--center",
      )}
      initial={reduceMotion ? {} : { opacity: 0, y: 24 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {graphicFirst && <ConversationGraphic Icon={Icon} />}

      <div className="conversation-banner__content">
        <h3 className="conversation-banner__title">{title}</h3>
        <p className="conversation-banner__lead">{description}</p>

        <blockquote className="conversation-banner__quote" dir="rtl" lang="ar">
          {arabic}
        </blockquote>

        <p className="conversation-banner__translation" lang="es">
          {spanish}
        </p>

        <div className="conversation-banner__actions">
          <a
            href={`#${SECTION_IDS.translator}`}
            className="conversation-banner__btn conversation-banner__btn--primary"
          >
            Traducir aquí
          </a>
          <a
            href={`#${SECTION_IDS.commonPhrases}`}
            className="conversation-banner__btn conversation-banner__btn--secondary"
          >
            Más frases
          </a>
        </div>
      </div>

      {!graphicFirst && <ConversationGraphic Icon={Icon} />}
    </motion.article>
  );
}

export function HowItWorks() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id={SECTION_IDS.howItWorks} tone="grey" className="overflow-hidden">
      <div data-conversation-section className="relative">
        <motion.header
          className="mx-auto mb-8 max-w-3xl lg:mb-10"
          initial={reduceMotion ? {} : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            title="Traducir El Árabe Al Español"
            accent="Conversación"
            description="El traductor toma el español como un idioma, no como una fórmula. Aquí hay algunos diálogos de viajes y negocios que te ayudarán a entender cómo traducir árabe a español."
          />
        </motion.header>

        <div className="mx-auto flex max-w-5xl flex-col gap-6 sm:gap-8">
          {examples.map((example, index) => (
            <ConversationBanner
              key={example.title}
              example={example}
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
