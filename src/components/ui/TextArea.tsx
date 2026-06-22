"use client";

import { cn } from "@/lib/utils";
import { useId, type ReactNode, type TextareaHTMLAttributes } from "react";

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string;
  error?: string;
  hint?: string;
  dir?: "ltr" | "rtl";
  action?: ReactNode;
};

export function TextArea({
  label,
  error,
  hint,
  dir = "ltr",
  action,
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
      <div className="relative">
        <textarea
          id={id}
          dir={dir}
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId ?? (hint ? `${id}-hint` : undefined)}
          className={cn(
            "w-full min-w-0 resize-y rounded-[var(--radius)] border border-border bg-surface px-4 py-3 form-field",
            "text-body-mobile md:text-body text-body placeholder:text-muted",
            "transition-[border-color,box-shadow] duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
            "focus-visible:border-primary/40 focus-visible:shadow-[0_4px_18px_color-mix(in_srgb,var(--color-primary)_12%,transparent)]",
            dir === "rtl" && "font-arabic text-start",
            error && "border-error",
            action && "pb-14",
            className,
          )}
          {...props}
        />
        {action && (
          <div className="absolute end-3 bottom-3 flex items-end" aria-hidden={false}>
            {action}
          </div>
        )}
      </div>
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
