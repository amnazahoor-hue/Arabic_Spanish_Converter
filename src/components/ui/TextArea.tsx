"use client";

import { cn } from "@/lib/utils";
import { useId, type TextareaHTMLAttributes } from "react";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
  dir?: "ltr" | "rtl";
};

export function TextArea({
  label,
  error,
  hint,
  dir = "ltr",
  className,
  id: externalId,
  ...props
}: TextAreaProps) {
  const generatedId = useId();
  const id = externalId ?? generatedId;
  const errorId = error ? `${id}-error` : undefined;

  return (
    <div className="w-full min-w-0">
      <label htmlFor={id} className="mb-2 block text-nav-mobile md:text-nav font-medium text-heading">
        {label}
      </label>
      <textarea
        id={id}
        dir={dir}
        aria-invalid={error ? true : undefined}
        aria-describedby={errorId ?? (hint ? `${id}-hint` : undefined)}
        className={cn(
          "w-full min-w-0 resize-y rounded-[var(--radius)] border border-border bg-surface px-4 py-3",
          "text-body-mobile md:text-body text-body placeholder:text-muted",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
          dir === "rtl" && "font-arabic text-start",
          error && "border-error",
          className,
        )}
        {...props}
      />
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 type-small">
          {hint}
        </p>
      )}
      {error && (
        <p id={errorId} role="alert" className="mt-1.5 type-small text-error">
          {error}
        </p>
      )}
    </div>
  );
}
