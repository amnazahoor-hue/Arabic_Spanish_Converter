"use client";

import { LANGUAGES, type LanguageCode } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowLeftRight } from "lucide-react";

type LanguageSwapProps = {
  source: LanguageCode;
  target: LanguageCode;
  onSwap: () => void;
  className?: string;
};

export function LanguageSwap({ source, target, onSwap, className }: LanguageSwapProps) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-3 rounded-[var(--radius)] border border-border bg-surface-alt px-4 py-3 language-swap-bar",
        className,
      )}
    >
      <span className="type-body font-medium text-heading">
        {LANGUAGES[source].nativeLabel} ({LANGUAGES[source].label})
      </span>
      <button
        type="button"
        onClick={onSwap}
        className={cn(
          "language-swap-btn inline-flex h-10 w-10 items-center justify-center rounded-full",
          "bg-primary text-white hover:bg-hover hover:text-white [&_svg]:text-white",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
        )}
        aria-label={`Swap languages: ${LANGUAGES[source].label} and ${LANGUAGES[target].label}`}
      >
        <ArrowLeftRight className="h-5 w-5" strokeWidth={1.75} aria-hidden />
      </button>
      <span className="type-body font-medium text-heading">
        {LANGUAGES[target].nativeLabel} ({LANGUAGES[target].label})
      </span>
    </div>
  );
}
