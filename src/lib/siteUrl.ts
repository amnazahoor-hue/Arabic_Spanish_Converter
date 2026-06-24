export const CANONICAL_SITE_ORIGIN = "http://traductorarabeespanol.es";
export const CANONICAL_HOST = "traductorarabeespanol.es";
const UNICODE_HOST_WITH_N = "traductorarabeespañol.es";
const CANONICAL_HOST_PUNYCODE = "xn--traductorarabeespaol-l7b.es";
const VERCEL_DEPLOYMENT_HOST = "arabic-spanish-converter.vercel.app";

function isLocalOrPrivateHost(hostname: string): boolean {
  const host = hostname.toLowerCase();
  if (host === "localhost" || host === "127.0.0.1" || host === "[::1]" || host.endsWith(".local")) {
    return true;
  }
  if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(host)) return true;
  if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(host)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}$/.test(host)) return true;
  return false;
}

/** Public site origin — always the marketing domain on production (never punycode or vercel.app). */
export function getSiteOrigin(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (env) {
    try {
      const withProtocol = /^https?:\/\//i.test(env) ? env : `http://${env}`;
      const { hostname, protocol, host } = new URL(withProtocol);
      if (isLocalOrPrivateHost(hostname)) {
        return `${protocol}//${host}`;
      }
    } catch {
      // fall through to canonical
    }
  }

  return CANONICAL_SITE_ORIGIN;
}

/** Absolute URL for JSON-LD schema. */
export function schemaSiteUrl(path = ""): string {
  return absoluteSiteUrl(path);
}

/** Absolute URL for SEO/schema — string concat only (never URL.href). */
export function absoluteSiteUrl(path = ""): string {
  const origin = getSiteOrigin();

  if (!path || path === "/") {
    return `${origin}/`;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalizedPath}`;
}

/** Force canonical marketing domain in serialized JSON-LD / HTML output. */
export function ensureUnicodeSiteUrls(value: string): string {
  const aliases = [
    UNICODE_HOST_WITH_N,
    CANONICAL_HOST_PUNYCODE,
    `www.${CANONICAL_HOST}`,
    `www.${UNICODE_HOST_WITH_N}`,
    VERCEL_DEPLOYMENT_HOST,
  ];

  let out = value;
  for (const host of aliases) {
    out = out
      .replaceAll(`https://${host}`, CANONICAL_SITE_ORIGIN)
      .replaceAll(`http://${host}`, CANONICAL_SITE_ORIGIN);
  }
  return out;
}
