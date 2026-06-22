import { absoluteSiteUrl } from "@/lib/siteUrl";
import type { MetadataRoute } from "next";

const routes = [
  "",
  "/traductor-marroqui-espanol",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = absoluteSiteUrl("/").replace(/\/$/, "");
  return routes.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date("2026-05-01"),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
