"use client";

import { Button } from "@/components/ui/Button";
import { MARROQUI_SECTION_IDS, MARROQUI_USES } from "@/content/marroqui-page";
import { PAGE_CONTAINER_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BriefcaseBusiness,
  Hand,
  Plane,
  ShoppingBag,
  type LucideIcon,
} from "lucide-react";

const USE_ICONS: LucideIcon[] = [Plane, ShoppingBag, Hand, BriefcaseBusiness];
const USE_ACCENTS = ["teal", "gold", "terracotta", "deep"] as const;

const fadeUp = (reduce: boolean, delay = 0) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] as const },
      };

const cardMotion = (reduce: boolean, index: number) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 28, scale: 0.97 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, margin: "-32px" },
        transition: {
          duration: 0.5,
          delay: 0.08 + index * 0.08,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };

export function MarroquiUsesSection() {
  const reduceMotion = useReducedMotion();
  const motionProps = (delay = 0) => fadeUp(!!reduceMotion, delay);

  return (
    <section
      id={MARROQUI_SECTION_IDS.uses}
      className="marroqui-uses scroll-mt-[calc(var(--header-height)+0.75rem)] py-10 md:py-14 lg:py-16"
    >
      <div className="marroqui-uses__mesh" aria-hidden />
      <div className="marroqui-uses__orb marroqui-uses__orb--1" aria-hidden />
      <div className="marroqui-uses__orb marroqui-uses__orb--2" aria-hidden />

      <div className={cn(PAGE_CONTAINER_CLASS, "marroqui-uses__inner")}>
        <div className="marroqui-uses__layout">
          <motion.header {...motionProps()} className="marroqui-uses__header">
            <h2 className="marroqui-uses__title">
              Usos Comunes De Un{" "}
              <span className="heading-accent motion-safe:animate-[hero-shimmer_8s_ease-in-out_infinite] motion-reduce:animate-none">
                Marroquí Traductor
              </span>
            </h2>
            <p className="marroqui-uses__description">
              En España hay comunidades marroquíes en gran cantidad. Cualquiera puede usar esta
              herramienta, sea marroquí o no. Aquí se muestran varios usos:
            </p>
            <Button
              href={`#${MARROQUI_SECTION_IDS.translator}`}
              size="lg"
              className="marroqui-uses__cta bg-primary hover:bg-hover"
            >
              Traducir aquí
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </motion.header>

          <div className="marroqui-uses__grid">
            {MARROQUI_USES.map((use, index) => {
              const Icon = USE_ICONS[index] ?? Plane;
              const accent = USE_ACCENTS[index] ?? "teal";

              return (
                <motion.article
                  key={use.title}
                  {...cardMotion(!!reduceMotion, index)}
                  className={cn("marroqui-uses-card", `marroqui-uses-card--${accent}`)}
                >
                  <span className="marroqui-uses-card__index" aria-hidden>
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  <div className="marroqui-uses-card__head">
                    <span className="marroqui-uses-card__icon-wrap">
                      <Icon className="marroqui-uses-card__icon" strokeWidth={1.65} aria-hidden />
                    </span>
                    <h3 className="marroqui-uses-card__title">{use.title}</h3>
                  </div>

                  <p className="marroqui-uses-card__text">{use.text}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
