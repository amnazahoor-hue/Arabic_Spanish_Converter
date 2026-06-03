"use client";

import { HeaderCta, NavLinks } from "@/components/layout/NavLinks";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Logo } from "@/components/brand/Logo";
import { NAV_SECTIONS, PAGE_CONTAINER_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { Languages } from "lucide-react";
import { useEffect, useState } from "react";

const sectionIds = NAV_SECTIONS.map((s) => s.id);

export function Header() {
  const activeSectionId = useScrollSpy(sectionIds);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full max-w-[100vw] overflow-x-clip">
      <div
        className="h-[3px] w-full bg-gradient-to-r from-primary via-secondary to-primary"
        aria-hidden
      />

      <div
        className={cn(
          "border-b border-footer-text/15 bg-footer-bg text-footer-text transition-shadow duration-300",
          scrolled && "shadow-[0_8px_32px_rgba(0,0,0,0.25)]",
        )}
      >
        <div
          className={cn(
            PAGE_CONTAINER_CLASS,
            "flex items-center justify-between gap-3",
            scrolled ? "h-[60px]" : "h-16",
          )}
        >
          <div className="flex min-w-0 shrink-0 items-center gap-2 sm:gap-3">
            <Logo variant="full" theme="dark" size="header-desktop" className="hidden lg:flex" />
            <Logo variant="full" theme="dark" size="header-mobile" className="lg:hidden" />
            <span
              className={cn(
                "hidden lg:inline-flex items-center gap-1.5 rounded-full border border-footer-text/25",
                "bg-footer-text/10 px-2.5 py-1 type-small text-footer-text",
              )}
            >
              <Languages className="h-3.5 w-3.5 text-secondary" strokeWidth={1.75} aria-hidden />
              AR ↔ ES
            </span>
          </div>

          <nav
            aria-label="Main"
            className="hidden min-w-0 flex-1 items-center justify-center overflow-hidden px-2 lg:flex xl:px-4"
          >
            <NavLinks activeSectionId={activeSectionId} variant="desktop" headerTheme="dark" />
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <HeaderCta className="hidden sm:inline-flex" />
            <MobileMenu activeSectionId={activeSectionId} headerTheme="dark" />
          </div>
        </div>
      </div>
    </header>
  );
}
