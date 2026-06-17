import { GOOGLE_BUSINESS } from "./testimonials";
import { EMAIL, PHONE_E164, SERVICE_AREAS, SITE_URL, SOCIAL_LINKS } from "./site-seo";

export function getStructuredDataGraph() {
  const organizationId = `${SITE_URL}/#organization`;
  const websiteId = `${SITE_URL}/#website`;

  const areaServed = SERVICE_AREAS.map((name) => ({
    "@type": "City" as const,
    name,
  }));

  const localBusinessKeywords = [
    "Traiteur marocain Lyon",
    "Traiteur halal Lyon",
    "Traiteur oriental Lyon",
    "Mariage marocain Lyon",
    "Buffet oriental Lyon",
    "Couscous traiteur Lyon",
  ];

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": websiteId,
        url: SITE_URL,
        name: "Maison Des Saveurs",
        description:
          "Traiteur marocain halal à Lyon — mariages, buffets orientaux, événements privés et entreprises.",
        inLanguage: "fr-FR",
        publisher: { "@id": organizationId },
      },
      {
        "@type": "Organization",
        "@id": `${SITE_URL}/#organization-entity`,
        name: "Maison Des Saveurs",
        url: SITE_URL,
        logo: `${SITE_URL}/logo-share.png`,
        email: EMAIL,
        telephone: PHONE_E164,
        sameAs: [
          SOCIAL_LINKS.instagram,
          SOCIAL_LINKS.tiktok,
          SOCIAL_LINKS.googleBusiness,
        ],
        contactPoint: {
          "@type": "ContactPoint",
          telephone: PHONE_E164,
          email: EMAIL,
          contactType: "customer service",
          areaServed: "FR",
          availableLanguage: ["French"],
        },
      },
      {
        "@type": ["LocalBusiness", "FoodEstablishment", "Caterer"],
        "@id": organizationId,
        name: "Maison Des Saveurs",
        alternateName: "MDS Traiteur",
        description:
          "Traiteur halal événementiel à Lyon pour mariages, buffets, entreprises et événements privés. Cuisine orientale maison, dressage élégant.",
        url: SITE_URL,
        image: `${SITE_URL}/logo-share.png`,
        keywords: localBusinessKeywords.join(", "),
        address: {
          "@type": "PostalAddress",
          addressLocality: "Villeurbanne",
          addressRegion: "Auvergne-Rhône-Alpes",
          addressCountry: "FR",
        },
        areaServed,
        priceRange: "€€",
        telephone: PHONE_E164,
        email: EMAIL,
        servesCuisine: ["Marocaine", "Orientale", "Halal"],
        sameAs: [
          SOCIAL_LINKS.instagram,
          SOCIAL_LINKS.tiktok,
          SOCIAL_LINKS.googleBusiness,
        ],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: String(GOOGLE_BUSINESS.reviewCount),
          bestRating: "5",
        },
        parentOrganization: { "@id": `${SITE_URL}/#organization-entity` },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services traiteur",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Traiteur mariage Lyon" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Buffet oriental Lyon" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Couscous traiteur Lyon" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Buffet entreprise Lyon" } },
          ],
        },
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${SITE_URL}/#breadcrumb-home`,
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Accueil",
            item: SITE_URL,
          },
        ],
      },
    ],
  };
}

export function getStructuredDataJson(): string {
  try {
    return JSON.stringify(getStructuredDataGraph());
  } catch {
    return "{}";
  }
}
