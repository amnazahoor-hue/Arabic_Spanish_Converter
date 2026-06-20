"use client";

import { Logo } from "@/components/brand/Logo";
import { SOCIAL_BRAND_ICONS } from "@/components/icons/SocialBrandIcons";
import {
  FOOTER_INFO,
  FOOTER_LEGAL,
  FOOTER_PAGES,
  FOOTER_SOCIAL,
  PAGE_CONTAINER_CLASS,
  SECTION_IDS,
  SITE_CONFIG,
} from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ArrowRight, FileText, Sparkles } from "lucide-react";
import Link from "next/link";

const footerLinkClass =
  "inline-flex items-center justify-center gap-2 text-footer-text transition-colors hover:text-secondary motion-safe:hover:translate-x-0.5 motion-reduce:hover:translate-x-0 sm:justify-start";

function FooterColumn({
  title,
  children,
  className,
}: {
  title: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("text-center sm:text-start", className)}>
      <h2 className="mb-4 flex items-center justify-center gap-2 text-footer-heading font-semibold text-nav sm:justify-start">
        <span className="h-1 w-6 rounded-full bg-secondary" aria-hidden />
        {title}
      </h2>
      {children}
    </div>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-footer-bg text-footer-text">
      <div
        className="h-[3px] w-full bg-gradient-to-r from-primary via-secondary to-primary"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -top-32 right-0 h-64 w-64 rounded-full opacity-20 blur-3xl"
        style={{ background: "color-mix(in srgb, var(--color-secondary) 50%, transparent)" }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-48 w-48 rounded-full opacity-15 blur-3xl"
        style={{ background: "color-mix(in srgb, var(--color-primary) 45%, transparent)" }}
        aria-hidden
      />

      <div className={cn(PAGE_CONTAINER_CLASS, "relative py-14 lg:py-16")}>
        <div
          className={cn(
            "mb-12 flex flex-col gap-6 rounded-[var(--radius-lg)] border border-footer-text/20",
            "bg-footer-text/5 p-6 text-center sm:p-8 sm:text-start md:flex-row md:items-center md:justify-between",
          )}
        >
          <div className="mx-auto space-y-2 max-w-lg sm:mx-0">
            <p className="inline-flex items-center gap-2 type-small font-semibold uppercase tracking-wider text-secondary">
              <Sparkles className="h-4 w-4" strokeWidth={1.75} aria-hidden />
              Free · Instant · Bidirectional
            </p>
            <h2 className="type-h3-card text-footer-heading">¿Listo Para Traducir?</h2>
            <p className="type-small text-footer-text/90">
              Open the translator and switch between Arabic and Spanish in one click — no account
              required.
            </p>
          </div>
          <a
            href={`/#${SECTION_IDS.translator}`}
            className={cn(
              "inline-flex shrink-0 items-center justify-center gap-2 rounded-full px-6 py-3",
              "bg-secondary font-semibold text-white shadow-md",
              "hover:bg-accent hover:text-white transition-colors",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-footer-bg",
              "[&_svg]:text-white",
            )}
          >
            Start translating
            <ArrowRight className="h-4 w-4" strokeWidth={2} aria-hidden />
          </a>
        </div>

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="space-y-5 text-center sm:col-span-2 sm:text-start lg:col-span-5">
            <Logo variant="full" theme="dark" size="footer" className="mx-auto sm:mx-0" />
            <p className="type-small mx-auto max-w-sm leading-relaxed text-footer-text sm:mx-0">
              {SITE_CONFIG.description}
            </p>
            <p className="type-small text-footer-text/70">{SITE_CONFIG.tagline}</p>
            <div className="pt-2">
              <p className="type-small mb-3 font-medium text-footer-text/80">Follow us</p>
              <div className="flex flex-wrap justify-center gap-2.5 sm:justify-start">
                {FOOTER_SOCIAL.map(({ id, href }) => {
                  const brand = SOCIAL_BRAND_ICONS[id];
                  const { Icon, label, hoverClass, iconClass, iconHoverClass } = brand;
                  const isPlaceholder = href === "#";
                  const iconButtonClass = cn(
                    "group inline-flex h-10 w-10 items-center justify-center rounded-full",
                    "border border-footer-text/25 bg-footer-text/8",
                    "transition-[background-color,border-color,transform] duration-200",
                    "motion-safe:hover:scale-105",
                    hoverClass,
                  );
                  const iconClasses = cn(
                    "h-[1.125rem] w-[1.125rem] shrink-0 transition-colors duration-200",
                    iconClass,
                    iconHoverClass,
                  );

                  if (isPlaceholder) {
                    return (
                      <span
                        key={id}
                        title={`${label} — add URL in .env`}
                        className={cn(iconButtonClass, "cursor-default")}
                      >
                        <Icon className={iconClasses} />
                        <span className="sr-only">{label}</span>
                      </span>
                    );
                  }

                  return (
                    <a
                      key={id}
                      href={href}
                      aria-label={label}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={iconButtonClass}
                    >
                      <Icon className={iconClasses} />
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          <FooterColumn title="Pages" className="lg:col-span-2">
            <ul className="space-y-2.5 type-small">
              {FOOTER_PAGES.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Legal" className="lg:col-span-2">
            <ul className="space-y-2.5 type-small">
              {FOOTER_LEGAL.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClass}>
                    <FileText className="h-3.5 w-3.5 opacity-60" strokeWidth={1.75} aria-hidden />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>

          <FooterColumn title="Company" className="lg:col-span-3">
            <ul className="space-y-2.5 type-small">
              {FOOTER_INFO.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={footerLinkClass}>
                    <FileText className="h-3.5 w-3.5 opacity-60" strokeWidth={1.75} aria-hidden />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </FooterColumn>
        </div>

        <div className="mt-12 border-t border-footer-text/20 pt-8 text-center">
          <p className="type-small text-footer-text/80">
            © {year} {SITE_CONFIG.name}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
