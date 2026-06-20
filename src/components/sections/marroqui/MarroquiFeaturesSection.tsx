"use client";

import { Button } from "@/components/ui/Button";
import { Section } from "@/components/ui/Section";
import {
  MARROQUI_FEATURES,
  MARROQUI_FEATURES_INTRO,
  MARROQUI_SECTION_IDS,
} from "@/content/marroqui-page";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowRight,
  BrainCircuit,
  Languages,
  Mic,
  Zap,
  type LucideIcon,
} from "lucide-react";
import Image from "next/image";
import { useCallback, useState } from "react";

const FEATURE_ICONS: LucideIcon[] = [BrainCircuit, Mic, Zap, Languages];

const fadeUp = (reduce: boolean, delay = 0) =>
  reduce
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-40px" },
        transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] as const },
      };

export function MarroquiFeaturesSection() {
  const reduceMotion = useReducedMotion();
  const motionProps = (delay = 0) => fadeUp(!!reduceMotion, delay);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleActivate = useCallback((index: number) => {
    setActiveIndex(index);
  }, []);

  const activeFeature = MARROQUI_FEATURES[activeIndex] ?? MARROQUI_FEATURES[0];

  return (
    <Section id={MARROQUI_SECTION_IDS.features} tone="surface" className="overflow-hidden">
      <div className="marroqui-features">
        <motion.div {...motionProps()} className="marroqui-features__visual">
          <h2 className="marroqui-features__title">
            Características De Nuestro Traductor Árabe Marroquí{" "}
            <span className="heading-accent motion-safe:animate-[hero-shimmer_8s_ease-in-out_infinite] motion-reduce:animate-none">
              A Español
            </span>
          </h2>

          <p className="marroqui-features__intro">{MARROQUI_FEATURES_INTRO}</p>

          <div className="marroqui-features__image-panel" aria-live="polite">
            {MARROQUI_FEATURES.map((feature, index) => (
              <div
                key={feature.id}
                className={cn(
                  "marroqui-features__image-slide",
                  index === activeIndex && "marroqui-features__image-slide--active",
                )}
                aria-hidden={index !== activeIndex}
              >
                <Image
                  src={feature.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="marroqui-features__image object-contain object-center p-4 sm:p-6"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>
        </motion.div>

        <div className="marroqui-features__list">
          {MARROQUI_FEATURES.map((feature, index) => {
            const Icon = FEATURE_ICONS[index] ?? BrainCircuit;
            const isActive = index === activeIndex;

            return (
              <motion.article
                key={feature.id}
                {...motionProps(index * 0.06)}
                className={cn("marroqui-features-card", isActive && "marroqui-features-card--active")}
                onMouseEnter={() => handleActivate(index)}
                onFocus={() => handleActivate(index)}
                tabIndex={0}
              >
                <span
                  className={cn(
                    "marroqui-features-card__icon-wrap",
                    `marroqui-features-card__icon-wrap--${index + 1}`,
                  )}
                  aria-hidden
                >
                  <Icon className="marroqui-features-card__icon" strokeWidth={1.75} />
                </span>
                <div className="marroqui-features-card__body">
                  <h3 className="marroqui-features-card__title">{feature.title}</h3>
                  <p className="marroqui-features-card__text">{feature.text}</p>
                </div>
              </motion.article>
            );
          })}

          <motion.div {...motionProps(0.28)} className="marroqui-features__cta-wrap">
            <Button href={`#${MARROQUI_SECTION_IDS.translator}-panel`} size="lg">
              Traducir aquí
              <ArrowRight className="h-4 w-4" aria-hidden />
            </Button>
          </motion.div>
        </div>
      </div>
    </Section>
  );
}
