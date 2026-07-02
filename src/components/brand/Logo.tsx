"use client";

import { SITE_IMAGES } from "@/content/site-images";
import { SECTION_IDS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, type MouseEvent } from "react";

const LOGO_SRC = "/images/logo.webp";
const LOGO_WIDTH = 580;
const LOGO_HEIGHT = 324;
const HOME_HREF = "/";

type LogoVariant = "full" | "icon";
type LogoTheme = "light" | "dark";
type LogoSize = "header-desktop" | "header-mobile" | "footer" | "favicon";

const iconHeightMap: Record<LogoSize, string> = {
  "header-desktop": "h-9",
  "header-mobile": "h-8",
  footer: "h-8",
  favicon: "h-8",
};

type LogoProps = {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: LogoSize;
  className?: string;
  href?: string;
  onNavigate?: () => void;
};

function LogoMark({ size, className }: { size: LogoSize; className?: string }) {
  const isHeaderLogo = size === "header-desktop" || size === "header-mobile";

  return (
    <Image
      src={LOGO_SRC}
      alt={SITE_IMAGES.logo.alt}
      title={SITE_IMAGES.logo.description}
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={isHeaderLogo}
      loading={isHeaderLogo ? "eager" : "lazy"}
      className={cn("w-auto shrink-0 object-contain logo-interactive", iconHeightMap[size], className)}
    />
  );
}

export function Logo({
  variant = "full",
  theme = "light",
  size = "header-desktop",
  className,
  href,
  onNavigate,
}: LogoProps) {
  const pathname = usePathname();
  const targetHref = href ?? HOME_HREF;
  const scrollToHero = href === undefined;

  useEffect(() => {
    if (pathname !== "/") return;
    if (window.location.hash === `#${SECTION_IDS.hero}`) {
      window.history.replaceState(null, "", "/");
    }
  }, [pathname]);

  const wordmarkColor =
    theme === "dark" ? "var(--color-footer-heading)" : "var(--color-heading)";

  const padding = "p-[var(--logo-clear,0.25rem)]";

  const wrapperClass = cn(
    "inline-flex items-center",
    padding,
    variant === "full" ? "h-auto w-auto max-w-none" : iconHeightMap[size],
    className,
  );

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onNavigate?.();

    if (!scrollToHero) return;

    if (pathname === "/") {
      event.preventDefault();
      const hero = document.getElementById(SECTION_IDS.hero);
      hero?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  if (variant === "icon") {
    return (
      <Link
        href={targetHref}
        onClick={handleClick}
        className={cn(wrapperClass, "logo-interactive-wrap")}
        aria-label="Traductor Árabe Español — inicio"
      >
        <LogoMark size={size} />
      </Link>
    );
  }

  return (
    <Link
      href={targetHref}
      onClick={handleClick}
      className={cn(wrapperClass, "gap-2.5 group logo-interactive-wrap")}
    >
      <LogoMark size={size} />
      <span
        className={cn(
          "min-w-0 font-semibold tracking-tight transition-colors group-hover:text-link",
          size === "header-mobile"
            ? "text-[0.875rem] leading-tight sm:text-[0.9375rem]"
            : "text-[0.9375rem] leading-tight md:text-[1.0625rem]",
        )}
        style={{ color: wordmarkColor }}
      >
        Traductor Árabe Español
      </span>
    </Link>
  );
}
