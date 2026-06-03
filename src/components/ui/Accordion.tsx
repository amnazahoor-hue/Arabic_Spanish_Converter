"use client";

import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { useState, type ReactNode } from "react";

export type AccordionItem = {
  id: string;
  title: ReactNode;
  content: ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
};

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className={cn("w-full divide-y divide-border rounded-[var(--radius-lg)] border border-border bg-surface", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;
        const panelId = `accordion-panel-${item.id}`;
        const buttonId = `accordion-button-${item.id}`;

        return (
          <div key={item.id} className="w-full">
            <h3 className="m-0">
              <button
                id={buttonId}
                type="button"
                className={cn(
                  "flex w-full items-center justify-between gap-4 px-5 py-4 text-start",
                  "text-nav-mobile md:text-nav font-semibold text-heading",
                  "hover:bg-surface-alt transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
                )}
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <span className="flex-1">{item.title}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-primary transition-transform motion-safe:duration-300",
                    isOpen && "rotate-180",
                  )}
                  aria-hidden
                />
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!isOpen}
              className={cn(
                "overflow-hidden px-5 motion-safe:transition-[height,opacity] motion-safe:duration-300",
                isOpen ? "pb-5 opacity-100" : "h-0 opacity-0",
              )}
            >
              {isOpen && <div className="type-body prose-width max-w-none">{item.content}</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
}
