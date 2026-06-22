import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost" | "outline";
type ButtonSize = "sm" | "md" | "lg";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
  href?: string;
};

const primaryCta =
  "bg-primary text-white hover:bg-hover hover:text-white visited:text-white no-underline [&_svg]:text-white";

const variantClasses: Record<ButtonVariant, string> = {
  primary: cn("border-transparent shadow-sm", primaryCta),
  secondary: "bg-secondary text-heading hover:bg-accent hover:text-heading border-transparent",
  outline: cn(
    "bg-surface text-heading border-primary/50 shadow-sm",
    "hover:border-primary hover:bg-surface-alt hover:text-heading",
    "visited:text-heading no-underline",
  ),
  ghost:
    "bg-transparent text-link hover:text-link-hover hover:bg-surface-alt border-transparent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "px-3 py-1.5 text-small rounded-[calc(var(--radius)-4px)]",
  md: "px-5 py-2.5 text-[0.875rem] md:text-[0.9375rem] rounded-[var(--radius)]",
  lg: "px-6 py-3 text-[0.875rem] md:text-[0.9375rem] rounded-[var(--radius)]",
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  children,
  href,
  type = "button",
  ...props
}: ButtonProps) {
  const classes = cn(
    "interactive-scale inline-flex items-center justify-center gap-2 font-medium border",
    (variant === "primary" || variant === "secondary") && "interactive-shine interactive-glow",
    "disabled:opacity-50 disabled:pointer-events-none",
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg",
    variantClasses[variant],
    sizeClasses[size],
    className,
  );

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  );
}
