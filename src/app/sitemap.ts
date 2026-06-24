import { absoluteSiteUrl } from "@/lib/siteUrl";
import { SITE_ROUTES } from "@/lib/routes";
import type { MetadataRoute } from "next";

const routes = [
  SITE_ROUTES.home,
  SITE_ROUTES.marroqui,
  SITE_ROUTES.about,
  SITE_ROUTES.contact,
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = absoluteSiteUrl("/").replace(/\/$/, "");
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-05-01"),
    changeFrequency: path === SITE_ROUTES.home ? "weekly" : "monthly",
    priority: path === SITE_ROUTES.home ? 1 : 0.7,
  }));
}
