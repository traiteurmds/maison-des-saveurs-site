import { PHONE_E164, SERVICE_AREAS, SITE_URL, SOCIAL_LINKS } from "./site-seo";
import { LEGAL } from "./legal";

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
        "@type": "LocalBusiness",
        additionalType: [
          "https://schema.org/FoodEstablishment",
          "https://schema.org/Caterer",
        ],
        "@id": organizationId,
        name: LEGAL.tradeName,
        alternateName: "MDS Traiteur",
        description:
          "Traiteur halal événementiel à Lyon et métropole. Cuisine orientale raffinée pour mariages, buffets entreprise, associations, universités et réceptions privées.",
        url: SITE_URL,
        image: {
          "@type": "ImageObject",
          url: `${SITE_URL}/logo-share.png`,
          width: 1200,
          height: 630,
        },
        address: {
          "@type": "PostalAddress",
          streetAddress: "5 Place de Croix-Luizet",
          addressLocality: "Villeurbanne",
          postalCode: "69100",
          addressRegion: "Auvergne-Rhône-Alpes",
          addressCountry: "FR",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: 45.766,
          longitude: 4.88,
        },
        areaServed,
        priceRange: "€€",
        telephone: PHONE_E164,
        email: LEGAL.email,
        servingCuisine: ["Moroccan", "Middle Eastern"],
        sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.tiktok, SOCIAL_LINKS.googleBusiness],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: 5,
          reviewCount: 22,
          bestRating: 5,
          worstRating: 1,
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services traiteur",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Traiteur mariage Lyon" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Buffet entreprise Lyon" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Repas entreprise Lyon" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Traiteur événementiel Lyon" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Traiteur halal Lyon" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Traiteur association Lyon" } },
          ],
        },
      },
    ],
  };
}
