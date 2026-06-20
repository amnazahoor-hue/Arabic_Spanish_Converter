"use client";

import { Section } from "@/components/ui/Section";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Quote } from "lucide-react";

const testimonials = [
  {
    name: "Samir El Fassi",
    quote:
      "Este es uno de los mejores traductores. Me da resultados precisos. Resuelve mis problemas de comunicación diarios. Lo recomiendo ampliamente.",
  },
  {
    name: "Mateo Torres",
    quote:
      "Este traductor me resulta muy útil para la comunicación en mi negocio. Aprecio especialmente cómo maneja las expresiones culturales y cotidianas. Es rápido y fácil de usar.",
  },
  {
    name: "Alejandro Gómez",
    quote:
      "Fue una salvación durante todo mi viaje. El traductor hizo que mi viaje fuera mucho más fácil gracias a sus traducciones precisas. Sentía como si tuviera un asistente lingüístico personal en el bolsillo.",
  },
] as const;

function TestimonialCard({
  testimonial,
  index,
  reduceMotion,
}: {
  testimonial: (typeof testimonials)[number];
  index: number;
  reduceMotion: boolean;
}) {
  const accent = index % 2 === 0 ? "primary" : "secondary";

  return (
    <motion.blockquote
      className={cn(
        "relative flex h-full flex-col rounded-[var(--radius-lg)] border border-border/80 bg-surface/95 p-5 shadow-card backdrop-blur-sm sm:p-6",
        "transition-[border-color,box-shadow,transform] duration-300",
        "motion-safe:hover:-translate-y-0.5 motion-safe:hover:shadow-[0_12px_40px_rgba(26,26,46,0.1)]",
        accent === "primary" ? "hover:border-primary/35" : "hover:border-secondary/40",
      )}
      initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <Quote
        className={cn(
          "mb-4 h-8 w-8",
          accent === "primary" ? "text-primary/70" : "text-secondary/80",
        )}
        strokeWidth={1.5}
        aria-hidden
      />
      <p className="type-body flex-1 leading-relaxed text-body">&ldquo;{testimonial.quote}&rdquo;</p>
      <footer className="mt-5 border-t border-border/60 pt-4">
        <cite className="type-h3-card not-italic text-heading">{testimonial.name}</cite>
      </footer>
    </motion.blockquote>
  );
}

export function UserTestimonials() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id={SECTION_IDS.testimonials} tone="sand" className="overflow-hidden">
      <div className="relative">
        <motion.header
          className="mx-auto mb-8 max-w-3xl text-center lg:mb-10"
          initial={reduceMotion ? {} : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="type-h2-section text-heading">Comentarios De Los Usuarios</h2>
          <div
            className="mx-auto mt-5 h-1 w-20 rounded-full bg-gradient-to-r from-primary via-secondary to-primary"
            aria-hidden
          />
        </motion.header>

        <div className="grid gap-5 lg:grid-cols-3 lg:gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </div>
      </div>
    </Section>
  );
}
