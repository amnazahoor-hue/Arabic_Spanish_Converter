/** Public URL paths — Spanish slugs only. */
export const SITE_ROUTES = {
  home: "/",
  marroqui: "/traductor-marroqui-espanol",
  about: "/sobre-nosotros",
  contact: "/contacto",
  author: "/autor",
  privacy: "/politica-de-privacidad",
  terms: "/terminos-y-condiciones",
  disclaimer: "/aviso-legal",
} as const;

/** Permanent redirects from legacy English slugs. */
export const LEGACY_ROUTE_REDIRECTS: ReadonlyArray<{ source: string; destination: string }> = [
  { source: "/about", destination: SITE_ROUTES.about },
  { source: "/contact", destination: SITE_ROUTES.contact },
  { source: "/author", destination: SITE_ROUTES.author },
  { source: "/privacy-policy", destination: SITE_ROUTES.privacy },
  { source: "/terms-and-conditions", destination: SITE_ROUTES.terms },
  { source: "/disclaimer", destination: SITE_ROUTES.disclaimer },
];
