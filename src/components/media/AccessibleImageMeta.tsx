import type { ImageAccessibility } from "@/content/site-images";
import { useId } from "react";

type AccessibleImageMetaProps = {
  src: string;
  meta: ImageAccessibility;
  /** When true, exposes alt text without downloading a duplicate decorative image. */
  visuallyHidden?: boolean;
  priority?: boolean;
};

export function AccessibleImageMeta({
  src,
  meta,
  visuallyHidden = false,
  priority = false,
}: AccessibleImageMetaProps) {
  const descriptionId = useId();

  if (visuallyHidden) {
    return (
      <>
        <span role="img" aria-label={meta.alt} aria-describedby={descriptionId} className="sr-only" />
        <span id={descriptionId} className="sr-only">
          {meta.description}
        </span>
      </>
    );
  }

  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={meta.alt}
        aria-describedby={descriptionId}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
      />
      <span id={descriptionId} className="sr-only">
        {meta.description}
      </span>
    </>
  );
}
