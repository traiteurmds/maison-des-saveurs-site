import { GOOGLE_BUSINESS } from "./testimonials";
import { PHONE_E164, SERVICE_AREAS, SITE_URL } from "./site-seo";

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
        "@type": ["LocalBusiness", "FoodEstablishment"],
        "@id": organizationId,
        name: "Maison des Saveurs",
        alternateName: "MDS Traiteur",
        description:
          "Traiteur marocain halal à Lyon. Catering pour mariages, événements privés et réceptions professionnelles. Cuisine marocaine traditionnelle.",
        url: SITE_URL,
        image: `${SITE_URL}/logo-share.png`,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Lyon",
          addressRegion: "Auvergne-Rhône-Alpes",
          addressCountry: "FR",
        },
        areaServed,
        priceRange: "€€",
        telephone: PHONE_E164,
        email: "contact.mds.traiteur@gmail.com",
        servingCuisine: "Moroccan",
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: String(GOOGLE_BUSINESS.rating),
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
      {
        "@type": "CateringService",
        "@id": `${SITE_URL}/#catering`,
        name: "Maison Des Saveurs — Traiteur événementiel Lyon",
        description:
          "Traiteur marocain halal, buffet mariage Lyon, réceptions privées et événements professionnels.",
        url: SITE_URL,
        provider: { "@id": organizationId },
        areaServed,
        serviceType: [
          "Traiteur mariage Lyon",
          "Traiteur buffet Lyon",
          "Traiteur entreprise Lyon",
          "Traiteur réception Lyon",
        ],
      },
    ],
  };
}
