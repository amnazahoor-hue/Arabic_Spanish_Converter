"use client";

import { NAV_HEADER_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinksProps = {
  onNavigate?: () => void;
  className?: string;
  variant?: "desktop" | "mobile";
  headerTheme?: "light" | "dark";
};

export function NavLinks({
  onNavigate,
  className,
  variant = "desktop",
  headerTheme = "dark",
}: NavLinksProps) {
  const pathname = usePathname();
  const isDark = headerTheme === "dark";

  const focusRing = isDark
    ? "focus-visible:ring-secondary focus-visible:ring-offset-footer-bg"
    : "focus-visible:ring-primary focus-visible:ring-offset-bg";

  const linkIdle = isDark
    ? "text-footer-text hover:text-secondary"
    : "text-body hover:text-link";

  const linkActive = isDark ? "text-secondary font-semibold" : "text-heading font-semibold";

  if (variant === "mobile") {
    return (
      <nav className={cn("flex flex-col gap-2", className)} aria-label="Navegación principal">
        <ul className="flex flex-col gap-1.5">
          {NAV_HEADER_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "interactive-link flex items-center rounded-[var(--radius)] border px-3 py-2.5 text-nav font-medium",
                    "transition-[border-color,background-color,transform,color] duration-200",
                    isActive
                      ? "border-primary/25 bg-primary/8 text-primary font-semibold"
                      : "border-transparent text-body hover:border-border hover:bg-surface-alt hover:text-link",
                  )}
                  onClick={onNavigate}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    );
  }

  return (
    <ul
      className={cn("flex flex-nowrap items-center justify-center gap-0.5", className)}
      role="list"
    >
      {NAV_HEADER_LINKS.map((item) => {
        const isActive = pathname === item.href;
        const isLongLabel = item.href === "/traductor-marroqui-espanol";

        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              data-active={isActive ? "true" : "false"}
              className={cn(
                "site-header-nav-link px-2 py-1.5 text-[0.8125rem] font-medium whitespace-nowrap xl:px-2.5 xl:text-nav",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                focusRing,
                isActive ? linkActive : linkIdle,
              )}
              onClick={onNavigate}
            >
              <span className={cn(isLongLabel && "site-header-nav-link__label--long")}>
                {item.label}
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export function HeaderCta({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const pathname = usePathname();
  const onHome = pathname === "/";

  return (
    <Link
      href={onHome ? "#translator" : "/#translator"}
      className={cn(
        "interactive-scale inline-flex items-center justify-center gap-2 rounded-full px-3.5 py-2 lg:px-4",
        "bg-secondary text-white hover:bg-accent hover:text-white visited:text-white",
        "text-[0.875rem] md:text-[0.9375rem] font-semibold no-underline",
        "transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-footer-bg",
        className,
      )}
      onClick={onNavigate}
    >
      Traducir aquí
      <ArrowRight className="h-4 w-4 shrink-0" strokeWidth={2.25} aria-hidden />
    </Link>
  );
}
