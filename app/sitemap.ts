import { MetadataRoute } from "next";
import { LEGAL_ROUTES } from "./lib/legal";
import { SITE_URL } from "./lib/site-seo";
import { ARTICLES, articleUrl } from "./lib/journal";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date("2026-10-19");
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

  const journalArticles: MetadataRoute.Sitemap = ARTICLES.map((a) => ({
    url: `${SITE_URL}${articleUrl(a.slug)}`,
    lastModified: new Date(a.updatedAt ?? a.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  const latestArticleDate = ARTICLES.map((a) => a.updatedAt ?? a.publishedAt).sort().at(-1)!;

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/menu`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${SITE_URL}/traiteur-mariage-lyon`, lastModified: now, changeFrequency: "monthly", priority: 0.95 },
    { url: `${SITE_URL}/traiteur-entreprise-lyon`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/caftans`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE_URL}/journal`, lastModified: new Date(latestArticleDate), changeFrequency: "weekly", priority: 0.8 },
    ...journalArticles,
    ...legalPages,
  ];
}
