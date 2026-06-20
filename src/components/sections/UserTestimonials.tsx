"use client";

import "@/styles/testimonials-carousel.css";
import { SectionHeader } from "@/components/ui/SectionHeading";
import { Section } from "@/components/ui/Section";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import { Quote, Star } from "lucide-react";

type TestimonialAccent = "primary" | "secondary";

type TestimonialShape = "a" | "b" | "c";

type Testimonial = {
  name: string;
  role: string;
  quote: string;
  accent: TestimonialAccent;
  shape: TestimonialShape;
};

const testimonials: readonly Testimonial[] = [
  {
    name: "Samir El Fassi",
    role: "Usuario Frecuente",
    quote:
      "Este es uno de los mejores traductores. Me da resultados precisos. Resuelve mis problemas de comunicación diarios. Lo recomiendo ampliamente.",
    accent: "primary",
    shape: "a",
  },
  {
    name: "Mateo Torres",
    role: "Empresario",
    quote:
      "Este traductor me resulta muy útil para la comunicación en mi negocio. Aprecio especialmente cómo maneja las expresiones culturales y cotidianas. Es rápido y fácil de usar.",
    accent: "secondary",
    shape: "b",
  },
  {
    name: "Alejandro Gómez",
    role: "Viajero",
    quote:
      "Fue una salvación durante todo mi viaje. El traductor hizo que mi viaje fuera mucho más fácil gracias a sus traducciones precisas. Sentía como si tuviera un asistente lingüístico personal en el bolsillo.",
    accent: "primary",
    shape: "c",
  },
];

function TestimonialCard({
  testimonial,
  index,
  reduceMotion,
}: {
  testimonial: Testimonial;
  index: number;
  reduceMotion: boolean;
}) {
  const { name, role, quote, accent, shape } = testimonial;

  return (
    <motion.li
      initial={reduceMotion ? {} : { opacity: 0, y: 20 }}
      whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-32px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
    >
      <blockquote className={cn("testimonial-card", `testimonial-card--shape-${shape}`)}>
        <div className="testimonial-card__header">
          <div
            className={cn("testimonial-card__badge", `testimonial-card__badge--${accent}`)}
            aria-hidden
          >
            <Quote className="h-[1.125rem] w-[1.125rem]" strokeWidth={2.75} />
          </div>

          <div className="testimonial-card__head">
            <cite className="testimonial-card__name not-italic">{name}</cite>
            <span className="testimonial-card__role">{role}</span>
            <div className="testimonial-card__stars" aria-label="5 de 5 estrellas">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-3.5 w-3.5 fill-current" strokeWidth={0} aria-hidden />
              ))}
            </div>
          </div>
        </div>

        <p className="testimonial-card__quote">{quote}</p>

        <Quote className="testimonial-card__watermark" strokeWidth={1.15} aria-hidden />
      </blockquote>
    </motion.li>
  );
}

export function UserTestimonials() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id={SECTION_IDS.testimonials} tone="sand" className="overflow-hidden">
      <div data-testimonials-section className="relative">
        <motion.header
          className="mx-auto mb-10 max-w-2xl lg:mb-12"
          initial={reduceMotion ? {} : { opacity: 0, y: 18 }}
          whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <SectionHeader
            title="Comentarios De Los"
            accent="Usuarios"
            description="Opiniones reales de personas que confían en nuestro traductor árabe español para comunicarse cada día."
            className="max-w-2xl"
            showLine={false}
          />
        </motion.header>

        <ul className="testimonials-grid mx-auto max-w-6xl">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard
              key={testimonial.name}
              testimonial={testimonial}
              index={index}
              reduceMotion={!!reduceMotion}
            />
          ))}
        </ul>
      </div>
    </Section>
  );
}
