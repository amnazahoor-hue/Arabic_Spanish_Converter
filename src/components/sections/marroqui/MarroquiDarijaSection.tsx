"use client";

import { Section } from "@/components/ui/Section";
import {
  MARROQUI_DARIJA_INFLUENCES,
  MARROQUI_DARIJA_INTRO,
  MARROQUI_SECTION_IDS,
} from "@/content/marroqui-page";
import { motion, useReducedMotion } from "framer-motion";
import { Globe2, Landmark, Languages, Mountain, type LucideIcon } from "lucide-react";

const CARD_ICONS: LucideIcon[] = [Languages, Globe2, Landmark, Mountain];

const fadeUp = (reduce: boolean, delay = 0) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 22 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-48px" },
        transition: { duration: 0.52, delay, ease: [0.22, 1, 0.36, 1] as const },
      };

const cardMotion = (reduce: boolean, index: number) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 28, scale: 0.96 },
        whileInView: { opacity: 1, y: 0, scale: 1 },
        viewport: { once: true, margin: "-32px" },
        transition: {
          duration: 0.5,
          delay: 0.12 + index * 0.08,
          ease: [0.22, 1, 0.36, 1] as const,
        },
      };

export function MarroquiDarijaSection() {
  const reduceMotion = useReducedMotion();
  const motionProps = (delay = 0) => fadeUp(!!reduceMotion, delay);

  return (
    <Section
      id={MARROQUI_SECTION_IDS.darija}
      tone="grey"
      className="marroqui-darija-section relative overflow-hidden"
      data-marroqui-darija-section
    >
      <div className="marroqui-darija">
        <div className="marroqui-darija__layout">
          <motion.div {...motionProps()} className="marroqui-darija__intro">
            <div className="marroqui-darija__intro-content">
              <h2 className="marroqui-darija__title">
                {MARROQUI_DARIJA_INTRO.title}{" "}
                <span className="heading-accent motion-safe:animate-[hero-shimmer_8s_ease-in-out_infinite] motion-reduce:animate-none">
                  {MARROQUI_DARIJA_INTRO.accent}
                </span>
              </h2>

              <p className="marroqui-darija__lead">{MARROQUI_DARIJA_INTRO.lead}</p>
              <p className="marroqui-darija__body">{MARROQUI_DARIJA_INTRO.body}</p>
            </div>
          </motion.div>

          <div className="marroqui-darija__cards-panel">
            <div className="marroqui-darija__dot-grid" aria-hidden />
            <div className="marroqui-darija__cards">
              {MARROQUI_DARIJA_INFLUENCES.map((item, index) => {
                const Icon = CARD_ICONS[index] ?? Languages;

                return (
                  <motion.article
                    key={item.title}
                    {...cardMotion(!!reduceMotion, index)}
                    className="marroqui-darija-card"
                  >
                    <span className="marroqui-darija-card__icon-wrap">
                      <Icon className="marroqui-darija-card__icon" strokeWidth={1.65} aria-hidden />
                    </span>
                    <h3 className="marroqui-darija-card__title">{item.title}</h3>
                    <p className="marroqui-darija-card__text">{item.text}</p>
                  </motion.article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
