import { domainToUnicode } from "node:url";

export const CANONICAL_SITE_ORIGIN = "https://traductorarabeespañol.es";

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

/** Public site origin with Unicode hostname (never punycode/xn--). */
export function getSiteOrigin(raw?: string): string {
  const input = (raw ?? process.env.NEXT_PUBLIC_SITE_URL ?? CANONICAL_SITE_ORIGIN).trim();
  const withProtocol = /^https?:\/\//i.test(input) ? input : `https://${input}`;

  try {
    const parsed = new URL(withProtocol);

    if (isLocalOrPrivateHost(parsed.hostname)) {
      return `${parsed.protocol}//${parsed.host}`;
    }

    return CANONICAL_SITE_ORIGIN;
  } catch {
    return CANONICAL_SITE_ORIGIN;
  }
}

/** Decode punycode hostnames when building URLs from arbitrary input. */
export function toUnicodeOrigin(raw: string): string {
  const withProtocol = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;

  try {
    const parsed = new URL(withProtocol);
    const unicodeHost = domainToUnicode(parsed.hostname);
    return `${parsed.protocol}//${unicodeHost}`;
  } catch {
    return CANONICAL_SITE_ORIGIN;
  }
}

/** Absolute URL for SEO/schema output — preserves ñ in the hostname. */
export function absoluteSiteUrl(path = ""): string {
  const origin = getSiteOrigin();

  if (!path || path === "/") {
    return `${origin}/`;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalizedPath}`;
}
