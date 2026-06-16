import { MetadataRoute } from "next";
import { SITE_URL } from "./lib/site-seo";

const SEO_LANDING_SLUGS = [
  "traiteur-entreprise-lyon",
  "traiteur-mariage-lyon",
  "traiteur-halal-lyon",
  "traiteur-buffet-lyon",
  "traiteur-evenementiel-lyon",
] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const seoPages: MetadataRoute.Sitemap = SEO_LANDING_SLUGS.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: slug === "traiteur-entreprise-lyon" ? 0.85 : 0.8,
  }));

  return [
    { url: SITE_URL, lastModified: now, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/caftans`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${SITE_URL}/gallery`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    ...seoPages,
  ];
}
