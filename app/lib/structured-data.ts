import { GOOGLE_BUSINESS } from "./testimonials";
import { PHONE_E164, SERVICE_AREAS, SITE_URL, SOCIAL_LINKS } from "./site-seo";

export function getStructuredDataGraph() {
  const organizationId = `${SITE_URL}/#organization`;

  const areaServed = SERVICE_AREAS.map((name) => ({
    "@type": "City" as const,
    name,
  }));

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["LocalBusiness", "FoodEstablishment", "Caterer"],
        "@id": organizationId,
        name: "Maison Des Saveurs",
        alternateName: "MDS Traiteur",
        description:
          "Traiteur halal événementiel à Lyon pour mariages, buffets, entreprises et événements privés. Cuisine orientale maison, dressage élégant.",
        url: SITE_URL,
        image: `${SITE_URL}/logo-share.png`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Villeurbanne",
          addressRegion: "Auvergne-Rhône-Alpes",
          addressCountry: "FR",
        },
        areaServed,
        priceRange: "€€",
        telephone: PHONE_E164,
        email: "contact.mds.traiteur@gmail.com",
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
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services traiteur",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Traiteur mariage Lyon" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Traiteur événements et réceptions" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Buffet entreprise Lyon" } },
          ],
        },
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
