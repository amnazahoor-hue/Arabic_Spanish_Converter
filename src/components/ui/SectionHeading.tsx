import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type SectionHeadingProps = {
  title: string;
  accent?: string;
  onDark?: boolean;
  as?: "h1" | "h2" | "h3";
  className?: string;
};

export function SectionHeading({
  title,
  accent,
  onDark = false,
  as: Tag = "h2",
  className,
}: SectionHeadingProps) {
  return (
    <Tag
      className={cn(
        "section-heading type-h2-section text-balance",
        onDark && "section-heading--on-dark",
        className,
      )}
    >
      {title}
      {accent ? (
        <>
          {" "}
          <span
            className={cn(
              "heading-accent motion-safe:animate-[hero-shimmer_8s_ease-in-out_infinite] motion-reduce:animate-none",
              onDark && "heading-accent--on-dark",
            )}
          >
            {accent}
          </span>
        </>
      ) : null}
    </Tag>
  );
}

type SectionHeaderProps = {
  title: string;
  accent?: string;
  description?: ReactNode;
  onDark?: boolean;
  className?: string;
  headingClassName?: string;
  lineVariant?: "default" | "wide";
  showLine?: boolean;
};

export function SectionHeader({
  title,
  accent,
  description,
  onDark = false,
  className,
  headingClassName,
  lineVariant = "wide",
  showLine = true,
}: SectionHeaderProps) {
  return (
    <header className={cn("mx-auto max-w-3xl text-center", className)}>
      <SectionHeading title={title} accent={accent} onDark={onDark} className={headingClassName} />
      {description ? (
        <p
          className={cn(
            "type-body mx-auto mt-4 max-w-2xl text-pretty",
            onDark ? "section-header__description--on-dark" : "section-header__description",
          )}
        >
          {description}
        </p>
      ) : null}
      {showLine ? (
        <div
          className={cn(
            "section-heading-line mx-auto mt-5",
            lineVariant === "wide" && "section-heading-line--wide",
          )}
          aria-hidden
        />
      ) : null}
    </header>
  );
}
