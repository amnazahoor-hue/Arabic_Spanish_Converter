import { SITE_CONFIG } from "@/lib/constants";
import type { MetadataRoute } from "next";

const routes = [
  "",
  "/about",
  "/disclaimer",
  "/privacy-policy",
  "/terms-and-conditions",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = SITE_CONFIG.url.replace(/\/$/, "");
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-05-01"),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
