import { SITE_IMAGES } from "@/content/site-images";

export const OG_IMAGE_PATH = "/images/og-image.webp";

export const OG_IMAGE = {
  url: OG_IMAGE_PATH,
  width: 1200,
  height: 630,
  alt: SITE_IMAGES.openGraph.alt,
  type: "image/webp",
} as const;
