import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  hoverLift?: boolean;
  padded?: boolean;
};

export function Card({
  children,
  className,
  hoverLift = false,
  padded = true,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        "relative h-full rounded-[var(--radius-lg)] bg-surface border border-border shadow-card",
        padded && "p-6",
        hoverLift &&
          "interactive-lift motion-safe:hover:-translate-y-1 motion-safe:hover:shadow-[0_8px_32px_rgba(26,26,46,0.1)]",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardTitle({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <h3 className={cn("type-h3-card", className)}>{children}</h3>;
}

export function CardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return <p className={cn("type-body mt-2", className)}>{children}</p>;
}
