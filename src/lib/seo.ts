import { SITE_CONFIG } from "@/lib/constants";
import { SITE_IMAGES } from "@/content/site-images";
import type { Metadata } from "next";

export {
  articleSchema,
  authorPageSchemas,
  breadcrumbSchema,
  faqPageSchema,
  homePageSchemas,
  legalPageSchemas,
  marroquiPageSchemas,
  organizationSchema,
  translatorWebApplicationSchema,
  webPageSchema,
  webSiteSchema,
} from "@/lib/schema";

type PageSeo = {
  title: string;
  description: string;
  path?: string;
  /** When true, emits `noindex, follow`. */
  noIndex?: boolean;
  /** When true, emits `index, follow` explicitly (default unless noIndex). */
  index?: boolean;
};

function resolveMetadataBase(): URL {
  try {
    return new URL(SITE_CONFIG.url);
  } catch {
    return new URL("https://example.com");
  }
}

export function buildMetadata({
  title,
  description,
  path = "",
  noIndex = false,
  index = true,
}: PageSeo): Metadata {
  const metadataBase = resolveMetadataBase();
  const url = new URL(path, metadataBase).toString();

  return {
    metadataBase,
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        ar: `${url}?lang=ar`,
        es: `${url}?lang=es`,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: "es_ES",
      type: "website",
      images: [{ url: "/images/logo.webp", alt: SITE_IMAGES.logo.alt }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: "/images/logo.webp", alt: SITE_IMAGES.logo.alt }],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.png", type: "image/png", sizes: "512x512" },
      ],
      apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
      shortcut: ["/favicon.ico"],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index, follow: true },
  };
}
