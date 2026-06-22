import { SITE_CONFIG } from "@/lib/constants";
import { absoluteSiteUrl, getSiteOrigin } from "@/lib/siteUrl";

function isLocalOrPrivateHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  if (h === "localhost" || h === "127.0.0.1" || h === "[::1]" || h.endsWith(".local")) {
    return true;
  }
  if (/^192\.168\.\d{1,3}\.\d{1,3}$/.test(h)) return true;
  if (/^10\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(h)) return true;
  if (/^172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3}$/.test(h)) return true;
  return false;
}

function isPlaceholderHost(hostname: string): boolean {
  const h = hostname.toLowerCase();
  return h === "example.com" || h === "www.example.com";
}

function originFromUrlString(raw: string): string | null {
  try {
    const normalized = raw.startsWith("http") ? raw : `https://${raw}`;
    const { hostname } = new URL(normalized);
    if (isLocalOrPrivateHost(hostname) || isPlaceholderHost(hostname)) return null;
    return getSiteOrigin();
  } catch {
    return null;
  }
}

export function getPublicSiteUrl(): string | null {
  const env = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (env) {
    const fromEnv = originFromUrlString(env);
    if (fromEnv) return fromEnv;
  }

  if (typeof window !== "undefined") {
    const fromWindow = originFromUrlString(window.location.origin);
    if (fromWindow) return fromWindow;
    if (isLocalOrPrivateHost(window.location.hostname)) {
      return window.location.origin;
    }
  }

  return absoluteSiteUrl("/").replace(/\/$/, "");
}
