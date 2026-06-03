import { cn } from "@/lib/utils";
import Link from "next/link";

type LogoVariant = "full" | "icon";
type LogoTheme = "light" | "dark";
type LogoSize = "header-desktop" | "header-mobile" | "footer" | "favicon";

const sizeMap: Record<LogoSize, { box: string; icon: string }> = {
  "header-desktop": { box: "h-10 w-40", icon: "h-10 w-10" },
  "header-mobile": { box: "h-9 w-auto max-w-[10.5rem]", icon: "h-9 w-9" },
  footer: { box: "h-9 w-[140px]", icon: "h-9 w-9" },
  favicon: { box: "h-8 w-8", icon: "h-8 w-8" },
};

type LogoProps = {
  variant?: LogoVariant;
  theme?: LogoTheme;
  size?: LogoSize;
  className?: string;
  href?: string;
};

function LogoMark({
  primaryColor,
  secondaryColor,
  className,
}: {
  primaryColor: string;
  secondaryColor: string;
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      <path
        d="M6 32c6-12 12-18 20-24 3 5 5 10 5 15 0 3-2 6-5 8-7 3-14 1-20-1Z"
        fill={primaryColor}
        opacity="0.12"
      />
      <path
        d="M10 30c5-8 10-13 18-18M14 24c3-5 8-8 14-12"
        stroke={primaryColor}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      <path
        d="M26 10h7v7M29.5 7v14"
        stroke={secondaryColor}
        strokeWidth="1.8"
        strokeLinecap="round"
      />
      <text
        x="20"
        y="22"
        textAnchor="middle"
        fontSize="11"
        fontFamily="Georgia, serif"
        fill={primaryColor}
      >
        ع
      </text>
    </svg>
  );
}

export function Logo({
  variant = "full",
  theme = "light",
  size = "header-desktop",
  className,
  href = "/",
}: LogoProps) {
  const primaryColor =
    theme === "dark" ? "var(--color-footer-heading)" : "var(--color-primary)";
  const secondaryColor = "var(--color-secondary)";
  const wordmarkColor =
    theme === "dark" ? "var(--color-footer-heading)" : "var(--color-heading)";

  const dims = sizeMap[size];
  const padding = "p-[var(--logo-clear,0.25rem)]";

  const mark = (
    <LogoMark
      primaryColor={primaryColor}
      secondaryColor={secondaryColor}
      className={variant === "icon" ? dims.icon : dims.icon}
    />
  );

  const wrapperClass = cn(
    "inline-flex items-center",
    padding,
    variant === "full" ? dims.box : dims.icon,
    className,
  );

  if (variant === "icon") {
    return (
      <Link href={href} className={wrapperClass} aria-label="Al-Andalus Translate — inicio">
        {mark}
      </Link>
    );
  }

  return (
    <Link href={href} className={cn(wrapperClass, "gap-2.5 group")}>
      {mark}
      <span className="flex min-w-0 flex-col leading-tight text-start">
        <span
          className={cn(
            "truncate font-semibold tracking-tight transition-colors group-hover:text-link",
            size === "header-mobile" ? "text-[0.8125rem]" : "text-nav-mobile md:text-nav",
          )}
          style={{ color: wordmarkColor }}
        >
          Al-Andalus
        </span>
        <span
          className={cn(
            "truncate",
            size === "header-mobile" ? "text-[0.625rem] leading-tight" : "type-small",
          )}
          style={{ color: theme === "dark" ? "var(--color-footer-text)" : undefined }}
        >
          Arabic ↔ Spanish
        </span>
      </span>
    </Link>
  );
}

export function LogoSvgFile() {
  return (
    <svg viewBox="0 0 160 40" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Al-Andalus Translate">
      <g transform="translate(4,4) scale(0.8)">
        <path d="M6 32c6-12 12-18 20-24 3 5 5 10 5 15 0 3-2 6-5 8-7 3-14 1-20-1Z" fill="#1A6B6B" opacity="0.12" />
        <path d="M10 30c5-8 10-13 18-18M14 24c3-5 8-8 14-12" stroke="#1A6B6B" strokeWidth="2.2" strokeLinecap="round" fill="none" />
        <path d="M26 10h7v7M29.5 7v14" stroke="#C9943A" strokeWidth="1.8" strokeLinecap="round" />
        <text x="20" y="22" textAnchor="middle" fontSize="11" fontFamily="Georgia, serif" fill="#1A6B6B">ع</text>
      </g>
      <text x="52" y="26" fontFamily="Inter, system-ui, sans-serif" fontSize="18" fontWeight="600" fill="#1A1A2E">Al-Andalus</text>
    </svg>
  );
}
