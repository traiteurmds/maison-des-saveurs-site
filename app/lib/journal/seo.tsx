import type { Metadata } from "next";
import { SITE_URL } from "../site-seo";
import { ARTICLES, JOURNAL_PATH, articleUrl, getRubrique, plain } from "./index";
import type { Article } from "./types";

const ORGANIZATION_ID = `${SITE_URL}/#organization`;
const JOURNAL_URL = `${SITE_URL}${JOURNAL_PATH}`;

export function articleMetadata(article: Article): Metadata {
  const url = `${SITE_URL}${articleUrl(article.slug)}`;
  const image = { url: article.hero.src, width: article.hero.width, height: article.hero.height, alt: article.hero.alt };
  return {
    title: article.seoTitle,
    description: article.description,
    keywords: article.keywords,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: article.seoTitle,
      description: article.description,
      url,
      siteName: "Maison Des Saveurs",
      locale: "fr_FR",
      images: [image],
      publishedTime: article.publishedAt,
      ...(article.updatedAt ? { modifiedTime: article.updatedAt } : {}),
      section: getRubrique(article.rubrique).label,
    },
    twitter: { card: "summary_large_image", title: article.seoTitle, description: article.description, images: [image.url] },
  };
}

export function articleJsonLd(article: Article) {
  const url = `${SITE_URL}${articleUrl(article.slug)}`;
  const rubrique = getRubrique(article.rubrique);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: plain(article.title),
        description: article.description,
        image: [`${SITE_URL}${article.hero.src}`],
        datePublished: article.publishedAt,
        dateModified: article.updatedAt ?? article.publishedAt,
        inLanguage: "fr-FR",
        articleSection: rubrique.label,
        keywords: article.keywords.join(", "),
        mainEntityOfPage: url,
        url,
        author: { "@type": "Organization", "@id": ORGANIZATION_ID, name: "Maison Des Saveurs", url: SITE_URL },
        publisher: { "@id": ORGANIZATION_ID },
        isPartOf: { "@type": "Blog", "@id": `${JOURNAL_URL}#blog` },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Accueil", item: SITE_URL },
          { "@type": "ListItem", position: 2, name: "Le Journal", item: JOURNAL_URL },
          { "@type": "ListItem", position: 3, name: plain(article.title), item: url },
        ],
      },
    ],
  };
}

export function journalJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "@id": `${JOURNAL_URL}#blog`,
    name: "Le Journal de Maison Des Saveurs",
    description: "Histoires de cuisine, traditions marocaines et instants de partage.",
    url: JOURNAL_URL,
    inLanguage: "fr-FR",
    publisher: { "@id": ORGANIZATION_ID },
    blogPost: ARTICLES.map((a) => ({
      "@type": "BlogPosting",
      "@id": `${SITE_URL}${articleUrl(a.slug)}#article`,
      headline: plain(a.title),
      url: `${SITE_URL}${articleUrl(a.slug)}`,
      datePublished: a.publishedAt,
      image: `${SITE_URL}${a.hero.src}`,
    })),
  };
}

export function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
