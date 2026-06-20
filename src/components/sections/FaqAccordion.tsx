"use client";

import type { FaqCategory } from "@/content/faq";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  Languages,
  Mic,
  Sparkles,
  Type,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCallback, useLayoutEffect, useRef, useState } from "react";

export type FaqAccordionEntry = {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
};

const categoryIcons: Record<FaqCategory, LucideIcon> = {
  Uso: Sparkles,
  Límites: Type,
  Voz: Mic,
  Idiomas: Languages,
  Precisión: HelpCircle,
};

const ROW_GAP_PX = 12;

type FaqAccordionProps = {
  items: FaqAccordionEntry[];
  className?: string;
};

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const reduceMotion = useReducedMotion();
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);
  const measureRef = useRef<HTMLDivElement>(null);
  const [answerMinHeight, setAnswerMinHeight] = useState(0);
  const [listHeight, setListHeight] = useState(0);

  const toggle = useCallback((id: string) => {
    setOpenId((prev) => (prev === id ? null : id));
  }, []);

  const collapseAll = useCallback(() => setOpenId(null), []);

  useLayoutEffect(() => {
    const measureRoot = measureRef.current;
    if (!measureRoot) return;

    const measureHeights = () => {
      const headerEls = measureRoot.querySelectorAll<HTMLElement>("[data-faq-header-measure]");
      const answerEls = measureRoot.querySelectorAll<HTMLElement>("[data-faq-answer-measure]");

      let headersTotal = 0;
      headerEls.forEach((el) => {
        headersTotal += el.offsetHeight;
      });

      let maxAnswerHeight = 0;
      answerEls.forEach((el) => {
        maxAnswerHeight = Math.max(maxAnswerHeight, el.offsetHeight);
      });

      if (headersTotal > 0 && maxAnswerHeight > 0) {
        const gaps = Math.max(0, items.length - 1) * ROW_GAP_PX;
        const buffer = 8;
        setAnswerMinHeight(maxAnswerHeight);
        setListHeight(headersTotal + gaps + maxAnswerHeight + buffer);
      }
    };

    measureHeights();

    const observer = new ResizeObserver(measureHeights);
    observer.observe(measureRoot);

    void document.fonts?.ready?.then(measureHeights);
    window.addEventListener("resize", measureHeights);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measureHeights);
    };
  }, [items]);

  return (
    <div className={cn("relative w-full", className)}>
      <div
        ref={measureRef}
        className="pointer-events-none absolute left-0 top-0 -z-10 w-full opacity-0"
        aria-hidden
      >
        {items.map((item, index) => (
          <div key={item.id}>
            <div
              data-faq-header-measure
              className="flex w-full items-start gap-3 px-4 py-3.5 sm:px-5 sm:py-4"
            >
              <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-surface-alt" />
              <span className="min-w-0 flex-1">
                <span className="mb-2 block type-small font-medium tabular-nums text-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="block text-[0.9375rem] font-semibold leading-snug md:text-base">
                  {item.question}
                </span>
              </span>
              <span className="mt-2 h-5 w-5 shrink-0" />
            </div>

            <div
              data-faq-answer-measure
              className="border-t border-border/60 px-4 pb-4 pt-3 sm:px-5 sm:pb-5"
            >
              <p className="type-small leading-relaxed text-body md:text-[0.9375rem] md:leading-relaxed">
                {item.answer}
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={collapseAll}
          className="type-small rounded-full border border-border bg-surface px-3 py-1.5 font-medium text-body interactive-scale hover:border-primary/40 hover:text-primary"
        >
          Contraer todo
        </button>
      </div>

      <ul
        className="space-y-3"
        role="list"
        style={
          listHeight > 0
            ? { height: listHeight, minHeight: listHeight, maxHeight: listHeight }
            : undefined
        }
      >
        {items.map((item, index) => {
          const isOpen = openId === item.id;
          const panelId = `faq-panel-${item.id}`;
          const buttonId = `faq-button-${item.id}`;
          const CategoryIcon = categoryIcons[item.category];

          return (
            <motion.li
              key={item.id}
              initial={reduceMotion ? {} : { opacity: 0, y: 12 }}
              whileInView={reduceMotion ? {} : { opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-24px" }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className={cn(
                "overflow-hidden rounded-[var(--radius-lg)] border transition-[border-color,box-shadow] duration-300",
                isOpen
                  ? "border-primary/35 bg-surface shadow-card ring-1 ring-primary/10"
                  : "border-border/80 bg-surface/95 shadow-sm hover:border-primary/25 hover:shadow-card",
              )}
            >
              <h4 className="m-0">
                <button
                  id={buttonId}
                  type="button"
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-3.5 text-start sm:px-5 sm:py-4",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
                  )}
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => toggle(item.id)}
                >
                  <span
                    className={cn(
                      "mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border",
                      isOpen
                        ? "border-primary/30 bg-primary text-white shadow-sm"
                        : "border-border bg-surface-alt text-primary",
                    )}
                    aria-hidden
                  >
                    <CategoryIcon className="h-4 w-4" strokeWidth={1.75} />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="mb-2 block type-small font-medium tabular-nums text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={cn(
                        "block text-[0.9375rem] font-semibold leading-snug transition-colors md:text-base",
                        isOpen ? "text-primary" : "text-heading",
                      )}
                    >
                      {item.question}
                    </span>
                  </span>

                  <ChevronDown
                    className={cn(
                      "mt-2 h-5 w-5 shrink-0 text-primary transition-transform motion-safe:duration-300",
                      isOpen && "rotate-180",
                    )}
                    aria-hidden
                  />
                </button>
              </h4>

              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                aria-hidden={!isOpen}
                className={cn(
                  "overflow-hidden transition-[opacity] duration-300 motion-reduce:transition-none",
                  isOpen ? "opacity-100" : "pointer-events-none opacity-0",
                )}
                style={{
                  height: isOpen && answerMinHeight > 0 ? answerMinHeight : 0,
                }}
              >
                <div className="border-t border-border/60 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                  <p className="type-small leading-relaxed text-body md:text-[0.9375rem] md:leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              </div>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
