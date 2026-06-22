export const CANONICAL_SITE_ORIGIN = "https://traductorarabeespañol.es";
const CANONICAL_HOST = "traductorarabeespañol.es";
const CANONICAL_HOST_PUNYCODE = "xn--traductorarabeespaol-l7b.es";

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

/** Public site origin — always Unicode hostname on production (never xn-- punycode). */
export function getSiteOrigin(): string {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  if (env) {
    try {
      const withProtocol = /^https?:\/\//i.test(env) ? env : `https://${env}`;
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

/** Absolute URL for SEO/schema — string concat only (never URL.href). */
export function absoluteSiteUrl(path = ""): string {
  const origin = getSiteOrigin();

  if (!path || path === "/") {
    return `${origin}/`;
  }

  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  return `${origin}${normalizedPath}`;
}

/** Force Unicode marketing domain in serialized JSON-LD / HTML output. */
export function ensureUnicodeSiteUrls(value: string): string {
  return value
    .replaceAll(`https://${CANONICAL_HOST_PUNYCODE}`, `https://${CANONICAL_HOST}`)
    .replaceAll(`http://${CANONICAL_HOST_PUNYCODE}`, `http://${CANONICAL_HOST}`);
}
