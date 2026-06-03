"use client";

import { NAV_HEADER_ABOUT, NAV_SECTIONS, SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";

type NavLinksProps = {
  activeSectionId: string | null;
  onNavigate?: () => void;
  className?: string;
  variant?: "desktop" | "mobile";
  headerTheme?: "light" | "dark";
};

function sectionHref(hash: string, onHome: boolean) {
  return onHome ? hash : `/${hash}`;
}

export function NavLinks({
  activeSectionId,
  onNavigate,
  className,
  variant = "desktop",
  headerTheme = "light",
}: NavLinksProps) {
  const pathname = usePathname();
  const onHome = pathname === "/";
  const reduceMotion = useReducedMotion();
  const aboutActive = pathname === NAV_HEADER_ABOUT.href;
  const isDark = headerTheme === "dark";

  if (variant === "mobile") {
    return (
      <nav className={cn("flex flex-col gap-6", className)} aria-label="Main">
        <div>
          <p className="type-small font-semibold uppercase tracking-wider text-muted mb-3">
            Sections
          </p>
          <ul className="flex flex-col gap-1">
            {NAV_SECTIONS.map((item) => {
              const isActive = onHome && activeSectionId === item.id;
              return (
                <li key={item.href}>
                  <a
                    href={sectionHref(item.href, onHome)}
                    className={cn(
                      "flex items-center rounded-[var(--radius)] px-3 py-2.5 text-nav font-medium transition-colors",
                      isActive
                        ? "bg-surface-alt text-primary font-semibold"
                        : "text-body hover:bg-surface-alt hover:text-link",
                    )}
                    onClick={onNavigate}
                  >
                    {item.label}
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p className="type-small font-semibold uppercase tracking-wider text-muted mb-3">
            Site
          </p>
          <ul>
            <li>
              <Link
                href={NAV_HEADER_ABOUT.href}
                className={cn(
                  "flex items-center rounded-[var(--radius)] px-3 py-2.5 text-nav font-medium transition-colors",
                  aboutActive
                    ? "bg-surface-alt text-primary font-semibold"
                    : "text-body hover:bg-surface-alt hover:text-link",
                )}
                onClick={onNavigate}
              >
                {NAV_HEADER_ABOUT.label}
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    );
  }

  const pillShell = isDark
    ? "border-footer-text/20 bg-footer-text/5"
    : "border-border bg-surface-alt/80";

  const activePill = isDark
    ? "bg-secondary/20 border-secondary/40 shadow-none"
    : "bg-surface shadow-card border-border";

  const linkIdle = isDark
    ? "text-footer-text hover:text-secondary"
    : "text-body hover:text-link";

  const linkActive = isDark ? "text-secondary font-semibold" : "text-heading";

  const focusRing = isDark
    ? "focus-visible:ring-secondary focus-visible:ring-offset-footer-bg"
    : "focus-visible:ring-primary focus-visible:ring-offset-bg";

  return (
    <div className={cn("flex items-center gap-1", className)}>
      <ul
        className={cn(
          "flex items-center gap-0.5 rounded-full border p-1",
          pillShell,
        )}
        role="list"
      >
        {NAV_SECTIONS.map((item) => {
          const isActive = onHome && activeSectionId === item.id;
          return (
            <li key={item.href} className="relative">
              {isActive && !reduceMotion && (
                <motion.span
                  layoutId="header-nav-pill"
                  className={cn(
                    "absolute inset-0 z-0 rounded-full border",
                    activePill,
                  )}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  aria-hidden
                />
              )}
              {isActive && reduceMotion && (
                <span
                  className={cn("absolute inset-0 z-0 rounded-full border", activePill)}
                  aria-hidden
                />
              )}
              <a
                href={sectionHref(item.href, onHome)}
                className={cn(
                  "relative z-10 block rounded-full px-3.5 py-2 text-nav-mobile xl:text-nav font-medium transition-colors",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
                  focusRing,
                  isActive ? linkActive : linkIdle,
                )}
                onClick={onNavigate}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>

      <span
        className={cn(
          "mx-2 hidden h-5 w-px md:block",
          isDark ? "bg-footer-text/25" : "bg-border",
        )}
        aria-hidden
      />

      <Link
        href={NAV_HEADER_ABOUT.href}
        className={cn(
          "hidden md:inline-flex text-nav-mobile xl:text-nav font-medium px-2 py-2 rounded-full transition-colors",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          focusRing,
          aboutActive
            ? "text-secondary font-semibold underline decoration-secondary decoration-2 underline-offset-4"
            : isDark
              ? "text-footer-text hover:text-secondary"
              : "text-body hover:text-link",
        )}
        onClick={onNavigate}
      >
        {NAV_HEADER_ABOUT.label}
      </Link>
    </div>
  );
}

export function HeaderCta({ onNavigate, className }: { onNavigate?: () => void; className?: string }) {
  const onHome = usePathname() === "/";
  return (
    <a
      href={onHome ? `#${SECTION_IDS.translator}` : `/#${SECTION_IDS.translator}`}
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
      Translate now
    </a>
  );
}
