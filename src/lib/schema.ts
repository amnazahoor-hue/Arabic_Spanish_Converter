import { AUTHOR_PROFILE } from "@/content/legal/author";
import { FAQ_ITEMS } from "@/content/faq";
import { MARROQUI_FAQ_ITEMS, MARROQUI_PAGE_PATH } from "@/content/marroqui-page";
import { SITE_CONFIG, organizationSameAs } from "@/lib/constants";
import { absoluteSiteUrl, getSiteOrigin } from "@/lib/siteUrl";

type FaqItem = {
  question: string;
  answer: string;
};

type WebPageSchemaInput = {
  name: string;
  description: string;
  path: string;
  pageType?: "WebPage" | "AboutPage" | "ContactPage" | "ProfilePage";
};

type TranslatorApplicationInput = {
  name: string;
  description: string;
  path: string;
  languages?: string[];
};

function publisherReference() {
  const siteOrigin = getSiteOrigin();
  return {
    "@type": "Organization" as const,
    name: SITE_CONFIG.name,
    url: siteOrigin,
    logo: {
      "@type": "ImageObject" as const,
      url: absoluteSiteUrl("/images/logo.webp"),
    },
  };
}

function websiteReference() {
  return {
    "@type": "WebSite" as const,
    name: SITE_CONFIG.name,
    url: getSiteOrigin(),
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
      item: absoluteSiteUrl(item.path),
    })),
  };
}

export function organizationSchema() {
  const sameAs = organizationSameAs();

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: getSiteOrigin(),
    description: SITE_CONFIG.description,
    logo: {
      "@type": "ImageObject",
      url: absoluteSiteUrl("/images/logo.webp"),
    },
    ...(sameAs.length > 0 ? { sameAs } : {}),
  };
}

export function webPageSchema({
  name,
  description,
  path,
  pageType = "WebPage",
}: WebPageSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": pageType,
    name,
    description,
    url: absoluteSiteUrl(path),
    inLanguage: "es",
    isPartOf: websiteReference(),
    publisher: publisherReference(),
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
    url: absoluteSiteUrl(path),
    inLanguage: "es",
    author: publisherReference(),
    publisher: publisherReference(),
    isPartOf: websiteReference(),
  };
}

export function faqPageSchema(items: readonly FaqItem[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function translatorWebApplicationSchema({
  name,
  description,
  path,
  languages = ["ar", "es"],
}: TranslatorApplicationInput) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    url: absoluteSiteUrl(path),
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "EUR",
    },
    inLanguage: languages,
    isPartOf: websiteReference(),
    provider: publisherReference(),
  };
}

export function authorPageSchemas() {
  const { name, role, bio, imageSrc, expertise, details } = AUTHOR_PROFILE;
  const location = details.find((detail) => detail.label === "Ubicación")?.value;
  const education = details.find((detail) => detail.label === "Formación")?.value;

  return [
    breadcrumbSchema([
      { name: "Inicio", path: "/" },
      { name: "Autora", path: "/author" },
    ]),
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      name: `${name} — Autora`,
      description: bio,
      url: absoluteSiteUrl("/author"),
      inLanguage: "es",
      mainEntity: {
        "@type": "Person",
        name,
        jobTitle: role,
        description: bio,
        image: absoluteSiteUrl(imageSrc),
        knowsAbout: [...expertise],
        ...(location
          ? {
              homeLocation: {
                "@type": "Place",
                name: location,
              },
            }
          : {}),
        ...(education
          ? {
              alumniOf: {
                "@type": "EducationalOrganization",
                name: education,
              },
            }
          : {}),
      },
    },
  ];
}

export function homePageSchemas() {
  return [
    breadcrumbSchema([{ name: "Inicio", path: "/" }]),
    organizationSchema(),
    webPageSchema({
      name: "Traductor Árabe Español",
      description: SITE_CONFIG.description,
      path: "/",
    }),
    translatorWebApplicationSchema({
      name: SITE_CONFIG.name,
      description: SITE_CONFIG.tagline,
      path: "/",
      languages: ["ar", "es"],
    }),
    faqPageSchema(FAQ_ITEMS),
  ];
}

export function marroquiPageSchemas() {
  const title = "Traductor Marroquí Español";
  const description =
    "Obtenga una traducción precisa de nuestro traductor marroquí español. Le ayuda a conectar y a comunicarte eficazmente.";

  return [
    breadcrumbSchema([
      { name: "Inicio", path: "/" },
      { name: title, path: MARROQUI_PAGE_PATH },
    ]),
    webPageSchema({
      name: title,
      description,
      path: MARROQUI_PAGE_PATH,
    }),
    translatorWebApplicationSchema({
      name: title,
      description,
      path: MARROQUI_PAGE_PATH,
      languages: ["ar-MA", "es"],
    }),
    faqPageSchema(MARROQUI_FAQ_ITEMS),
  ];
}

export function legalPageSchemas({
  title,
  description,
  path,
  pageType = "WebPage",
}: {
  title: string;
  description: string;
  path: string;
  pageType?: "WebPage" | "AboutPage" | "ContactPage";
}) {
  return [
    breadcrumbSchema([
      { name: "Inicio", path: "/" },
      { name: title, path },
    ]),
    webPageSchema({ name: title, description, path, pageType }),
    articleSchema({ title, description, path }),
  ];
}
