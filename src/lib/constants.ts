import { CANONICAL_SITE_ORIGIN } from "@/lib/siteUrl";
import { SITE_ROUTES } from "@/lib/routes";

export const SITE_CONFIG = {
  name: "Traductor Árabe Español",
  tagline: "Traducción Instantánea de Texto y Voz",
  description:
    "¿Necesitas un traductor árabe español preciso? Nuestro servicio de traducción ofrece traducciones rápidas y fiables para superar las barreras lingüísticas.",
  url: CANONICAL_SITE_ORIGIN,
  locale: "es",
  lastUpdated: "Mayo 2026",
} as const;

export type LanguageCode = "ar" | "ar-ma" | "es";

export const LANGUAGES: Record<
  LanguageCode,
  { code: LanguageCode; label: string; nativeLabel: string; dir: "rtl" | "ltr" }
> = {
  ar: { code: "ar", label: "Arabic", nativeLabel: "العربية", dir: "rtl" },
  "ar-ma": {
    code: "ar-ma",
    label: "Darija Marroquí",
    nativeLabel: "الدارجة",
    dir: "rtl",
  },
  es: { code: "es", label: "Spanish", nativeLabel: "Español", dir: "ltr" },
};

export function isArabicLang(code: LanguageCode): boolean {
  return code === "ar" || code === "ar-ma";
}

/** Maps app language codes to MyMemory / RFC 3066 provider codes. */
export function providerLangCode(code: LanguageCode): string {
  if (code === "ar-ma") return "ar-MA";
  return code;
}

export function defaultArabicFor(initialFrom: LanguageCode): "ar" | "ar-ma" {
  return initialFrom === "ar-ma" ? "ar-ma" : "ar";
}

export const PAGE_CONTAINER_CLASS = "mx-auto w-full max-w-6xl px-4 sm:px-6";
export const HERO_CONTAINER_CLASS =
  "mx-auto w-full max-w-7xl px-4 sm:px-6 xl:max-w-[90rem] xl:px-8";
export const HEADER_CONTAINER_CLASS = HERO_CONTAINER_CLASS;

export const SECTION_IDS = {
  hero: "hero",
  translator: "translator",
  howItWorks: "how-it-works",
  features: "features",
  commonPhrases: "common-phrases",
  dialects: "dialects",
  aiFeatures: "ai-features",
  testimonials: "testimonials",
  faq: "faq",
} as const;

export const NAV_HEADER_LINKS = [
  { href: SITE_ROUTES.marroqui, label: "Traductor Marroquí Español" },
  { href: SITE_ROUTES.about, label: "Sobre nosotros" },
  { href: SITE_ROUTES.contact, label: "Contáctanos" },
  { href: SITE_ROUTES.privacy, label: "Política de privacidad" },
] as const;

function socialHref(envValue: string | undefined): string {
  const url = envValue?.trim();
  return url && url !== "#" ? url : "#";
}

function isRealSocialUrl(href: string): boolean {
  return href !== "#" && /^https?:\/\//i.test(href);
}

export const FOOTER_SOCIAL = [
  { id: "x" as const, href: socialHref(process.env.NEXT_PUBLIC_SOCIAL_X) },
  { id: "facebook" as const, href: socialHref(process.env.NEXT_PUBLIC_SOCIAL_FACEBOOK) },
  { id: "instagram" as const, href: socialHref(process.env.NEXT_PUBLIC_SOCIAL_INSTAGRAM) },
  { id: "youtube" as const, href: socialHref(process.env.NEXT_PUBLIC_SOCIAL_YOUTUBE) },
  { id: "pinterest" as const, href: socialHref(process.env.NEXT_PUBLIC_SOCIAL_PINTEREST) },
  { id: "quora" as const, href: socialHref(process.env.NEXT_PUBLIC_SOCIAL_QUORA) },
  { id: "reddit" as const, href: socialHref(process.env.NEXT_PUBLIC_SOCIAL_REDDIT) },
];

/** Profile URLs for Organization `sameAs` JSON-LD (only configured links, never `#`). */
export function organizationSameAs(): string[] {
  return FOOTER_SOCIAL.map(({ href }) => href).filter(isRealSocialUrl);
}

export const FOOTER_PAGES = [
  { href: SITE_ROUTES.home, label: "Traductor Árabe Español" },
  { href: SITE_ROUTES.marroqui, label: "Traductor Marroquí Español" },
] as const;

export const FOOTER_LEGAL = [
  { href: SITE_ROUTES.privacy, label: "Política de privacidad" },
  { href: SITE_ROUTES.terms, label: "Términos y condiciones" },
  { href: SITE_ROUTES.disclaimer, label: "Aviso legal" },
] as const;

export const FOOTER_INFO = [
  { href: SITE_ROUTES.contact, label: "Contáctanos" },
  { href: SITE_ROUTES.about, label: "Sobre nosotros" },
  { href: SITE_ROUTES.author, label: "Autor" },
] as const;

/** Single official external resource (government / public institution). */
export const GOVERNMENT_EXTERNAL_LINK = {
  href: "https://www.cervantes.es",
  label: "Instituto Cervantes",
} as const;

export const MAX_TRANSLATE_CHARS = 5000;

export const MYMEMORY_MAX_BYTES_PER_REQUEST = 500;
export const MYMEMORY_MAX_CHARS_PER_DAY = 5000;
