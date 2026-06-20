"use client";

import type { FaqCategory } from "@/content/faq";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ChevronDown,
  HelpCircle,
  Languages,
  Mic,
  Sparkles,
  Type,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

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

const categoryStyles: Record<FaqCategory, string> = {
  Uso: "border-secondary/30 bg-secondary/10 text-secondary",
  Límites: "border-primary/25 bg-primary/10 text-primary",
  Voz: "border-terracotta/25 bg-terracotta/10 text-terracotta",
  Idiomas: "border-primary/25 bg-primary/10 text-primary",
  Precisión: "border-secondary/30 bg-secondary/10 text-secondary",
};

type FaqAccordionProps = {
  items: FaqAccordionEntry[];
  className?: string;
};

export function FaqAccordion({ items, className }: FaqAccordionProps) {
  const reduceMotion = useReducedMotion();
  const initialOpen = useMemo(
    () => new Set(items[0] ? [items[0].id] : []),
    [items],
  );
  const [openIds, setOpenIds] = useState<Set<string>>(initialOpen);

  const toggle = useCallback((id: string) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setOpenIds(new Set(items.map((item) => item.id)));
  }, [items]);

  const collapseAll = useCallback(() => setOpenIds(new Set()), []);

  return (
    <div className={cn("w-full", className)}>
      <div className="mb-4 flex flex-wrap items-center justify-end gap-2">
        <button
          type="button"
          onClick={expandAll}
          className="type-small rounded-full border border-border bg-surface px-3 py-1.5 font-medium text-body transition-colors hover:border-primary/40 hover:text-primary"
        >
          Expandir todo
        </button>
        <button
          type="button"
          onClick={collapseAll}
          className="type-small rounded-full border border-border bg-surface px-3 py-1.5 font-medium text-body transition-colors hover:border-primary/40 hover:text-primary"
        >
          Contraer todo
        </button>
      </div>

      <ul className="space-y-3" role="list">
        {items.map((item, index) => {
          const isOpen = openIds.has(item.id);
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
                    <span className="mb-2 flex flex-wrap items-center gap-2">
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 type-small font-semibold uppercase tracking-wide",
                          categoryStyles[item.category],
                        )}
                      >
                        {item.category}
                      </span>
                      <span className="type-small font-medium tabular-nums text-muted">
                        {String(index + 1).padStart(2, "0")}
                      </span>
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

              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                    initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="border-t border-border/60 px-4 pb-4 pt-3 sm:px-5 sm:pb-5">
                      <p className="type-small leading-relaxed text-body md:text-[0.9375rem] md:leading-relaxed">
                        {item.answer}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.li>
          );
        })}
      </ul>
    </div>
  );
}
