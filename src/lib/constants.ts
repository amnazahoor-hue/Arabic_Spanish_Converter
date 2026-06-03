export const SITE_CONFIG = {
  name: "Al-Andalus Translate",
  tagline: "Free instant Arabic ↔ Spanish translator",
  description:
    "Translate between Arabic and Spanish instantly. Free, bidirectional, and mobile-friendly — for communities in Spain, Latin America, and the Arab world.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://example.com",
  locale: "en",
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
  faq: "faq",
} as const;

export const NAV_SECTIONS = [
  { href: `#${SECTION_IDS.translator}`, label: "Translator", id: SECTION_IDS.translator },
  { href: `#${SECTION_IDS.howItWorks}`, label: "How it works", id: SECTION_IDS.howItWorks },
  { href: `#${SECTION_IDS.features}`, label: "Features", id: SECTION_IDS.features },
  { href: `#${SECTION_IDS.faq}`, label: "FAQ", id: SECTION_IDS.faq },
] as const;

export const NAV_HEADER_ABOUT = { href: "/about", label: "About" } as const;

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
];

export const FOOTER_LEGAL = [
  { href: "/disclaimer", label: "Disclaimer" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-and-conditions", label: "Terms & Conditions" },
  { href: "/contact", label: "Contact" },
] as const;

export const MAX_TRANSLATE_CHARS = 5000;

export const MYMEMORY_MAX_BYTES_PER_REQUEST = 500;
export const MYMEMORY_MAX_CHARS_PER_DAY = 5000;
