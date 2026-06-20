"use client";

import { HeaderCta, NavLinks } from "@/components/layout/NavLinks";
import { Logo } from "@/components/brand/Logo";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";

type MobileMenuProps = {
  headerTheme?: "light" | "dark";
};

export function MobileMenu({ headerTheme = "light" }: MobileMenuProps) {
  const [open, setOpen] = useState(false);
  const panelId = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const isDark = headerTheme === "dark";

  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);

    const focusable = panelRef.current?.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), textarea, input, select',
    );
    focusable?.[0]?.focus();

    const menuTrigger = buttonRef.current;

    return () => {
      document.body.style.overflow = prev;
      document.removeEventListener("keydown", onKey);
      menuTrigger?.focus();
    };
  }, [open]);

  return (
    <div className="lg:hidden flex items-center">
      <button
        ref={buttonRef}
        type="button"
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full border interactive-scale sm:h-10 sm:w-10",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-footer-bg",
          isDark
            ? "border-footer-text/30 bg-footer-text/10 text-footer-heading hover:border-secondary hover:text-secondary"
            : "border-border bg-surface text-heading hover:border-primary hover:bg-surface-alt",
          open && (isDark ? "border-secondary text-secondary" : "border-primary bg-surface-alt"),
        )}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? "Cerrar menú" : "Abrir menú"}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
      </button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-heading/50 backdrop-blur-[2px] mobile-menu-backdrop"
            aria-label="Cerrar menú"
            onClick={close}
          />
          <div
            ref={panelRef}
            id={panelId}
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className={cn(
              "mobile-menu-panel fixed inset-y-0 right-0 z-50 flex w-[min(100%,22rem)] flex-col",
              "border-l border-border bg-surface shadow-[0_0_40px_rgba(26,26,46,0.2)]",
            )}
          >
            <div className="h-[3px] bg-gradient-to-r from-primary via-secondary to-primary" aria-hidden />

            <div className="flex items-center justify-between border-b border-border px-5 py-4">
              <Logo variant="full" theme="light" size="header-mobile" />
              <button
                type="button"
                onClick={close}
                className="interactive-scale inline-flex h-9 w-9 items-center justify-center rounded-full hover:bg-surface-alt text-heading"
                aria-label="Cerrar"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-6">
              <NavLinks onNavigate={close} variant="mobile" />
            </div>

            <div className="border-t border-border p-5 bg-surface-alt/50">
              <HeaderCta className="w-full justify-center" onNavigate={close} />
              <p className="type-small text-center text-muted mt-3">
                Los enlaces legales y de privacidad están en el pie de página.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
