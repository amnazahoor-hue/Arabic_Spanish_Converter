"use client";

import { Button } from "@/components/ui/Button";
import { SectionHeader } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { LazyMotionDiv, LazyMotionHeader } from "@/components/motion/LazyMotion";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { FAQ_ITEMS } from "@/content/faq";
import { SITE_CONFIG, SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
import { ArrowRight } from "lucide-react";

const FaqAccordion = dynamic(
  () => import("@/components/sections/FaqAccordion").then((mod) => mod.FaqAccordion),
  { ssr: false, loading: () => null },
);

export function Faq() {
  const reduceMotion = usePrefersReducedMotion();

  return (
    <Section id={SECTION_IDS.faq} tone="grey" className="relative overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-heading) 1px, transparent 0)`,
          backgroundSize: "26px 26px",
        }}
      />

      <div className="relative">
        <LazyMotionHeader
          className="mx-auto mb-8 max-w-2xl lg:mb-10"
          reduceMotion={reduceMotion}
          motion={{
            initial: reduceMotion ? {} : { opacity: 0, y: 18 },
            whileInView: reduceMotion ? {} : { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5 },
          }}
        >
          <SectionHeader
            title="Respuestas Rápidas Sobre Nuestro"
            accent="Traductor Árabe Online Gratis"
            className="max-w-2xl"
            lineVariant="default"
          />
        </LazyMotionHeader>

        <LazyMotionDiv
          className="mx-auto max-w-3xl min-w-0"
          reduceMotion={reduceMotion}
          motion={{
            initial: reduceMotion ? {} : { opacity: 0, y: 20 },
            whileInView: reduceMotion ? {} : { opacity: 1, y: 0 },
            viewport: { once: true },
            transition: { duration: 0.5, delay: 0.1 },
          }}
        >
          <div
            className={cn(
              "rounded-[var(--radius-lg)] p-[1px] faq-frame",
              "bg-gradient-to-br from-secondary/30 via-primary/20 to-secondary/15",
            )}
          >
            <div className="rounded-[calc(var(--radius-lg)-1px)] border border-border/40 bg-surface/90 p-3 sm:p-5 lg:p-6">
              <FaqAccordion items={[...FAQ_ITEMS]} />
            </div>
          </div>

          <LazyMotionDiv
            className="mt-8 flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-start"
            reduceMotion={reduceMotion}
            motion={{
              initial: reduceMotion ? {} : { opacity: 0 },
              whileInView: reduceMotion ? {} : { opacity: 1 },
              viewport: { once: true },
              transition: { delay: 0.15, duration: 0.4 },
            }}
          >
            <p className="type-small text-muted">
              Traducción automática para uso cotidiano — no sustituye asesoramiento legal certificado.
            </p>
            <Button href={`#${SECTION_IDS.translator}`} variant="ghost" size="sm">
              Volver al traductor
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </LazyMotionDiv>
        </LazyMotionDiv>
      </div>

      <p className="sr-only">{SITE_CONFIG.name} FAQ</p>
    </Section>
  );
}
