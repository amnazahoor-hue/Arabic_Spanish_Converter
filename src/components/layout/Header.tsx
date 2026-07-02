"use client";

import { HeaderCta, NavLinks } from "@/components/layout/NavLinks";
import { MobileMenu } from "@/components/layout/MobileMenu";
import { Logo } from "@/components/brand/Logo";
import { HEADER_CONTAINER_CLASS } from "@/lib/constants";
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
    <header
      data-site-header
      data-scrolled={scrolled ? "true" : "false"}
      className="sticky top-0 z-50 w-full max-w-[100vw] overflow-x-clip"
    >
      <div className="site-header__accent" aria-hidden />

      <div className="site-header__bar">
        <div className="site-header__glow" aria-hidden />

        <div
          className={cn(
            HEADER_CONTAINER_CLASS,
            "site-header__container relative transition-[padding] duration-300",
            scrolled ? "min-h-[56px] py-1.5 sm:min-h-[60px] sm:py-2" : "min-h-[3.25rem] py-2 sm:min-h-16 sm:py-2.5",
          )}
        >
          <div className="site-header__inner">
            <div className="site-header__brand">
              <div className="site-header__brand-ring">
                <Logo variant="full" theme="dark" size="header-desktop" className="hidden xl:flex" />
                <Logo
                  variant="full"
                  theme="dark"
                  size="header-mobile"
                  className="site-header__logo-mobile flex min-w-0 max-w-[calc(100vw-3.75rem)] xl:hidden"
                />
              </div>
            </div>

            <nav aria-label="Navegación principal" className="site-header__nav">
              <div className="site-header__nav-track">
                <NavLinks variant="desktop" headerTheme="dark" />
              </div>
            </nav>

            <div className="site-header__actions">
              <HeaderCta className="site-header__cta hidden xl:inline-flex" />
              <MobileMenu headerTheme="dark" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
