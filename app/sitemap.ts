import { MetadataRoute } from "next";
import { LEGAL_ROUTES } from "./lib/legal";
import { SITE_URL } from "./lib/site-seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const legalPages: MetadataRoute.Sitemap = [
    LEGAL_ROUTES.mentions,
    LEGAL_ROUTES.privacy,
    LEGAL_ROUTES.cookies,
    LEGAL_ROUTES.cgv,
  ].map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.3,
  }));

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/caftans`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...legalPages,
  ];
}
