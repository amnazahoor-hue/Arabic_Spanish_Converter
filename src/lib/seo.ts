import { SITE_CONFIG } from "@/lib/constants";
import type { Metadata } from "next";

type PageSeo = {
  title: string;
  description: string;
  path?: string;
};

function resolveMetadataBase(): URL {
  try {
    return new URL(SITE_CONFIG.url);
  } catch {
    return new URL("https://example.com");
  }
}

export function buildMetadata({ title, description, path = "" }: PageSeo): Metadata {
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
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export function breadcrumbSchema(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}${item.path}`,
    })),
  };
}

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    logo: `${SITE_CONFIG.url}/logo.svg`,
  };
}

export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
    inLanguage: "en",
  };
}

export function articleSchema({
  title,
  description,
  path,
}: {
  title: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: `${SITE_CONFIG.url}${path}`,
    author: { "@type": "Organization", name: SITE_CONFIG.name },
    publisher: { "@type": "Organization", name: SITE_CONFIG.name },
  };
}
