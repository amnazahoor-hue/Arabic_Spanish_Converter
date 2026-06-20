"use client";

import { ArabesqueMotif } from "@/components/brand/ArabesqueMotif";
import { FaqAccordion } from "@/components/sections/FaqAccordion";
import { JsonLd } from "@/components/seo/JsonLd";
import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import { FAQ_ITEMS } from "@/content/faq";
import { SITE_CONFIG, SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BookOpen,
  HelpCircle,
  Mail,
  Scale,
} from "lucide-react";

const sidebarLinks = [
  { href: "/disclaimer", label: "Aviso Legal", Icon: Scale },
  { href: "/privacy-policy", label: "Privacidad", Icon: BookOpen },
  { href: "/contact", label: "Contacto", Icon: Mail },
] as const;

export function Faq() {
  const reduceMotion = useReducedMotion();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <Section id={SECTION_IDS.faq} tone="gold-mist" className="relative overflow-hidden">
      <JsonLd data={faqSchema} />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        aria-hidden
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, var(--color-heading) 1px, transparent 0)`,
          backgroundSize: "26px 26px",
        }}
      />
      <ArabesqueMotif
        className="pointer-events-none absolute -left-6 top-12 h-32 w-32 text-secondary/[0.08]"
        aria-hidden
      />
      <ArabesqueMotif
        className="pointer-events-none absolute -right-8 bottom-8 h-40 w-40 rotate-180 text-primary/[0.06]"
        aria-hidden
      />

      <div className="relative">
        <motion.header
          className="mx-auto mb-8 max-w-2xl text-center lg:mb-10"
          initial={reduceMotion ? {} : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="type-h2-section text-heading">
            Respuestas Rápidas Sobre Nuestro Traductor Árabe Online Gratis
          </h2>
          <div
            className="mx-auto mt-5 h-1 w-16 rounded-full bg-gradient-to-r from-secondary to-primary"
            aria-hidden
          />
        </motion.header>

        <div className="grid gap-8 md:grid-cols-12 md:gap-10 lg:gap-12 xl:gap-14">
          <motion.aside
            className="md:col-span-4 lg:col-span-4 xl:col-span-3"
            initial={reduceMotion ? {} : { opacity: 0, x: -16 }}
            whileInView={reduceMotion ? {} : { opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.05 }}
          >
            <div
              className={cn(
                "overflow-hidden rounded-[var(--radius-lg)] border p-5 text-center sm:p-6 md:sticky md:top-24 md:text-start",
                "border-secondary/25 bg-surface/95 shadow-card backdrop-blur-sm",
              )}
              style={{
                backgroundImage: [
                  "radial-gradient(ellipse 90% 60% at 100% 0%, color-mix(in srgb, var(--color-secondary) 16%, transparent), transparent 55%)",
                  "linear-gradient(165deg, var(--color-surface) 0%, color-mix(in srgb, var(--color-bg) 50%, var(--color-surface)) 100%)",
                ].join(", "),
              }}
            >
              <div className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-primary/20 bg-primary/10 text-primary md:mx-0">
                <HelpCircle className="h-6 w-6" strokeWidth={1.75} aria-hidden />
              </div>

              <p className="type-small font-semibold uppercase tracking-wider text-secondary">
                Guía Rápida
              </p>
              <h3 className="mt-1 text-base font-semibold text-heading md:text-lg">
                {FAQ_ITEMS.length} Respuestas Útiles
              </h3>
              <p className="type-small mt-3 leading-relaxed text-body">
                Pulsa una pregunta para ver la respuesta. Cubre uso, límites, voz, idiomas y
                precisión.
              </p>

              <ul className="mt-6 space-y-2 border-t border-border/70 pt-6 md:text-start" role="list">
                {sidebarLinks.map(({ href, label, Icon }) => (
                  <li key={href}>
                    <a
                      href={href}
                      className="group flex items-center justify-center gap-3 rounded-[var(--radius)] px-2 py-2 type-small font-medium text-link transition-colors hover:bg-surface-alt hover:text-link-hover md:justify-start"
                    >
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-surface text-primary transition-colors group-hover:border-primary/30">
                        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                      </span>
                      {label}
                      <ArrowRight
                        className="ms-auto h-3.5 w-3.5 opacity-0 transition-opacity group-hover:opacity-100"
                        aria-hidden
                      />
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-6 rounded-[var(--radius)] border border-primary/20 bg-primary/5 p-4">
                <p className="type-small font-medium text-heading">¿Necesitas Más Ayuda?</p>
                <p className="type-small mt-1 text-muted">
                  Usa el formulario de contacto para casos no cubiertos aquí.
                </p>
                <Button href="/contact" variant="outline" size="sm" className="mt-3 w-full">
                  Contactar
                </Button>
              </div>
            </div>
          </motion.aside>

          <motion.div
            className="min-w-0 md:col-span-8 lg:col-span-8 xl:col-span-9"
            initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
            whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div
              className={cn(
                "rounded-[var(--radius-lg)] p-[1px]",
                "bg-gradient-to-br from-secondary/30 via-primary/20 to-secondary/15",
              )}
            >
              <div className="rounded-[calc(var(--radius-lg)-1px)] border border-border/40 bg-surface/90 p-3 sm:p-5 lg:p-6">
                <FaqAccordion items={[...FAQ_ITEMS]} />
              </div>
            </div>

            <motion.div
              className="mt-8 flex flex-col items-center gap-3 text-center md:flex-row md:justify-between md:text-start"
              initial={reduceMotion ? {} : { opacity: 0 }}
              whileInView={reduceMotion ? {} : { opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15, duration: 0.4 }}
            >
              <p className="type-small text-muted">
                Traducción automática para uso cotidiano — no sustituye asesoramiento legal certificado.
              </p>
              <Button href={`#${SECTION_IDS.translator}`} variant="ghost" size="sm">
                Volver al traductor
                <ArrowRight className="h-4 w-4" aria-hidden />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <p className="sr-only">{SITE_CONFIG.name} FAQ</p>
    </Section>
  );
}
