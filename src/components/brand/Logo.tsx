import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

const LOGO_SRC = "/images/logo.webp";
const LOGO_WIDTH = 580;
const LOGO_HEIGHT = 324;

type LogoVariant = "full" | "icon";
type LogoTheme = "light" | "dark";
type LogoSize = "header-desktop" | "header-mobile" | "footer" | "favicon";

const iconHeightMap: Record<LogoSize, string> = {
  "header-desktop": "h-10",
  "header-mobile": "h-9",
  footer: "h-9",
  favicon: "h-8",
};

type LogoProps = {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: LogoSize;
  className?: string;
  href?: string;
};

function LogoMark({ size, className }: { size: LogoSize; className?: string }) {
  return (
    <Image
      src={LOGO_SRC}
      alt=""
      width={LOGO_WIDTH}
      height={LOGO_HEIGHT}
      priority={size === "header-desktop" || size === "header-mobile"}
      className={cn("w-auto shrink-0 object-contain", iconHeightMap[size], className)}
      aria-hidden
    />
  );
}

export function Logo({
  variant = "full",
  theme = "light",
  size = "header-desktop",
  className,
  href = "/",
}: LogoProps) {
  const wordmarkColor =
    theme === "dark" ? "var(--color-footer-heading)" : "var(--color-heading)";

  const padding = "p-[var(--logo-clear,0.25rem)]";

  const wrapperClass = cn(
    "inline-flex items-center",
    padding,
    variant === "full" ? "h-auto w-auto max-w-none" : iconHeightMap[size],
    className,
  );

  if (variant === "icon") {
    return (
      <Link href={href} className={wrapperClass} aria-label="Traductor Árabe Español — inicio">
        <LogoMark size={size} />
      </Link>
    );
  }

  return (
    <Link
      href={href}
      className={cn(wrapperClass, "gap-2.5 group")}
      aria-label="Traductor Árabe Español — inicio"
    >
      <LogoMark size={size} />
      <span
        className={cn(
          "min-w-0 font-semibold tracking-tight transition-colors group-hover:text-link",
          size === "header-mobile" ? "text-[0.8125rem] leading-tight" : "text-nav-mobile md:text-nav",
        )}
        style={{ color: wordmarkColor }}
      >
        Traductor Árabe Español
      </span>
    </Link>
  );
}
