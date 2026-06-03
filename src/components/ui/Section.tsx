import { PAGE_CONTAINER_CLASS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import type { HTMLAttributes, ReactNode } from "react";

export type SectionTone =
  | "default"
  | "sand"
  | "surface"
  | "primary-mist"
  | "gold-mist";

type SectionProps = HTMLAttributes<HTMLElement> & {
  children: ReactNode;
  id?: string;
  tone?: SectionTone;
  tight?: boolean;
};

const toneClasses: Record<SectionTone, string> = {
  default: "bg-bg",
  sand: "bg-section-sand",
  surface: "bg-section-surface",
  "primary-mist": "bg-section-primary-mist",
  "gold-mist": "bg-section-gold-mist",
};

export function Section({
  children,
  className,
  id,
  tone = "default",
  tight = false,
  ...props
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        toneClasses[tone],
        tight ? "pt-8 pb-10 md:pt-10 md:pb-12" : "pt-10 pb-12 md:pt-14 md:pb-18",
        className,
      )}
      {...props}
    >
      <div className={PAGE_CONTAINER_CLASS}>{children}</div>
    </section>
  );
}
