import { SITE_CONFIG } from "@/lib/constants";
import { OG_IMAGE } from "@/lib/og-image";
import { absoluteSiteUrl, getSiteOrigin } from "@/lib/siteUrl";
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

export function buildMetadata({
  title,
  description,
  path = "",
  noIndex = false,
  index = true,
}: PageSeo): Metadata {
  const url = absoluteSiteUrl(path);
  const siteOrigin = getSiteOrigin();

  return {
    metadataBase: siteOrigin,
    title,
    description,
    alternates: {
      canonical: url,
      languages: {
        en: url,
        ar: url,
        es: url,
      },
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_CONFIG.name,
      locale: "es_ES",
      type: "website",
      images: [OG_IMAGE],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [{ url: OG_IMAGE.url, alt: OG_IMAGE.alt }],
    },
    icons: {
      icon: [
        { url: "/favicon.ico", sizes: "any" },
        { url: "/icon.svg", type: "image/svg+xml" },
      ],
      apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
      shortcut: ["/favicon.ico"],
    },
    robots: noIndex
      ? { index: false, follow: true }
      : { index, follow: true },
  };
}
