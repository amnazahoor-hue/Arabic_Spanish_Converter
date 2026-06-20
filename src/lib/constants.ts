export const SITE_CONFIG = {
  name: "Traductor Árabe Español",
  tagline: "Traducción Instantánea De Texto Y Voz",
  description:
    "Necesitas un preciso traductor árabe español¿ Nuestro servicio de traducción ofrece traducciones rápidas y fiables para superar las barreras lingüísticas.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://traductorarabeespañol.es",
  locale: "es",
  lastUpdated: "May 2026",
} as const;

export type LanguageCode = "ar" | "es";

export const LANGUAGES: Record<
  LanguageCode,
  { code: LanguageCode; label: string; nativeLabel: string; dir: "rtl" | "ltr" }
> = {
  ar: { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl" },
  es: { code: "es", label: "Spanish", nativeLabel: "Español", dir: "ltr" },
};

export const PAGE_CONTAINER_CLASS = "mx-auto w-full max-w-6xl px-4 sm:px-6";

export const SECTION_IDS = {
  translator: "translator",
  howItWorks: "how-it-works",
  features: "features",
  commonPhrases: "common-phrases",
  dialects: "dialects",
  aiFeatures: "ai-features",
  testimonials: "testimonials",
  faq: "faq",
} as const;

export const NAV_SECTIONS = [
  { href: `#${SECTION_IDS.translator}`, label: "Traductor", id: SECTION_IDS.translator },
  { href: `#${SECTION_IDS.features}`, label: "Ventajas", id: SECTION_IDS.features },
  { href: `#${SECTION_IDS.howItWorks}`, label: "Conversación", id: SECTION_IDS.howItWorks },
  { href: `#${SECTION_IDS.commonPhrases}`, label: "Frases", id: SECTION_IDS.commonPhrases },
  { href: `#${SECTION_IDS.dialects}`, label: "Dialectos", id: SECTION_IDS.dialects },
  { href: `#${SECTION_IDS.aiFeatures}`, label: "IA", id: SECTION_IDS.aiFeatures },
  { href: `#${SECTION_IDS.testimonials}`, label: "Opiniones", id: SECTION_IDS.testimonials },
  { href: `#${SECTION_IDS.faq}`, label: "FAQ", id: SECTION_IDS.faq },
] as const;

export const NAV_HEADER_LINKS = [
  { href: "/traductor-marroqui-espanol", label: "Traductor Marroquí Español" },
  { href: "/about", label: "About Us" },
  { href: "/contact", label: "Contact Us" },
  { href: "/privacy-policy", label: "Privacy Policy" },
] as const;

export const NAV_HEADER_ABOUT = { href: "/about", label: "About Us" } as const;

function socialHref(envValue: string | undefined): string {
  const url = envValue?.trim();
  return url && url !== "#" ? url : "#";
}

export const FOOTER_SOCIAL = [
  { id: "x" as const, href: socialHref(process.env.NEXT_PUBLIC_SOCIAL_X) },
  { id: "facebook" as const, href: socialHref(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK) },
  { id: "instagram" as const, href: socialHref(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM) },
  { id: "linkedin" as const, href: socialHref(process.env.NEXT_PUBLIC_SOCIAL_LINKEDIN) },
  { id: "youtube" as const, href: socialHref(process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE) },
  { id: "quora" as const, href: socialHref(process.env.NEXT_PUBLIC_SOCIAL_QUORA) },
  { id: "reddit" as const, href: socialHref(process.env.NEXT_PUBLIC_SOCIAL_REDDIT) },
];

export const FOOTER_PAGES = [
  { href: "/", label: "Traductor Árabe Español" },
  { href: "/traductor-marroqui-espanol", label: "Traductor Marroquí Español" },
] as const;

export const FOOTER_LEGAL = [
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms And Conditions" },
  { href: "/disclaimer", label: "Disclaimer" },
] as const;

export const FOOTER_INFO = [
  { href: "/contact", label: "Contact Us" },
  { href: "/about", label: "About Us" },
  { href: "/author", label: "Author" },
] as const;

export const MAX_TRANSLATE_CHARS = 5000;

export const MYMEMORY_MAX_BYTES_PER_REQUEST = 500;
export const MYMEMORY_MAX_CHARS_PER_DAY = 5000;
