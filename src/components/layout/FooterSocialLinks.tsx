"use client";

import "@/styles/footer-social.css";
import { SOCIAL_BRAND_ICONS } from "@/components/icons/SocialBrandIcons";
import { FOOTER_SOCIAL } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { CSSProperties, MouseEvent } from "react";

function preventPlaceholderNavigation(event: MouseEvent<HTMLAnchorElement>) {
  event.preventDefault();
}

export function FooterSocialLinks() {
  return (
    <div className="footer-social-row">
      {FOOTER_SOCIAL.map(({ id, href }) => {
        const brand = SOCIAL_BRAND_ICONS[id];
        const { Icon, label, brandColor } = brand;
        const isPlaceholder = href === "#";

        return (
          <a
            key={id}
            href={href}
            data-social={id}
            aria-label={label}
            title={isPlaceholder ? `${label} — add URL in .env` : undefined}
            onClick={isPlaceholder ? preventPlaceholderNavigation : undefined}
            {...(!isPlaceholder
              ? { target: "_blank" as const, rel: "noopener noreferrer" }
              : {})}
            className={cn(
              "footer-social-link group inline-flex shrink-0 items-center justify-center rounded-full",
              "border border-footer-text/20 bg-footer-text/6",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-footer-bg",
              isPlaceholder && "footer-social-link--placeholder",
            )}
            style={{ "--social-brand": brandColor } as CSSProperties}
          >
            <Icon className="footer-social-link__icon shrink-0" aria-hidden />
          </a>
        );
      })}
    </div>
  );
}
