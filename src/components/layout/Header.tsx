"use client";

import { HeaderCta, NavLinks } from "@/components/layout/NavLinks";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Logo } from "@/components/brand/Logo";
import { PAGE_CONTAINER_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";

export function Header() {
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
          </div>

          <nav
            aria-label="Main"
            className="hidden min-w-0 flex-1 items-center justify-center overflow-hidden px-2 lg:flex xl:px-4"
          >
            <NavLinks variant="desktop" headerTheme="dark" />
          </nav>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            <HeaderCta className="hidden sm:inline-flex" />
            <MobileMenu headerTheme="dark" />
          </div>
        </div>
      </div>
    </header>
  );
}
