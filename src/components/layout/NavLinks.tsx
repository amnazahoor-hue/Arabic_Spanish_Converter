"use client";

import { NAV_HEADER_LINKS } from "@/lib/constants";
import { cn } from "@/lib/utils";
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
      <nav className={cn("flex flex-col gap-2", className)} aria-label="Main">
        <ul className="flex flex-col gap-1">
          {NAV_HEADER_LINKS.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive ? "page" : undefined}
                  className={cn(
                    "flex items-center rounded-[var(--radius)] px-3 py-2.5 text-nav font-medium transition-colors",
                    isActive
                      ? "bg-surface-alt text-primary font-semibold"
                      : "text-body hover:bg-surface-alt hover:text-link",
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
    <ul className={cn("flex flex-wrap items-center justify-center gap-1 xl:gap-2", className)} role="list">
      {NAV_HEADER_LINKS.map((item) => {
        const isActive = pathname === item.href;
        return (
          <li key={item.href}>
            <Link
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={cn(
                "block rounded-full px-2.5 py-2 text-[0.8125rem] xl:text-nav font-medium transition-colors whitespace-nowrap",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                focusRing,
                isActive
                  ? cn(linkActive, isDark && "underline decoration-secondary decoration-2 underline-offset-4")
                  : linkIdle,
              )}
              onClick={onNavigate}
            >
              {item.label}
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
        "inline-flex items-center justify-center gap-2 rounded-full px-4 py-2",
        "bg-secondary text-white hover:bg-accent hover:text-white visited:text-white",
        "text-[0.875rem] md:text-[0.9375rem] font-semibold no-underline shadow-md",
        "transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-footer-bg",
        "motion-safe:hover:scale-[1.02] motion-reduce:hover:scale-100",
        className,
      )}
      onClick={onNavigate}
    >
      Traducir aquí
    </Link>
  );
}
