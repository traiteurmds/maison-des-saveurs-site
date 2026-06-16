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
          "Traiteur halal événementiel à Lyon. Cuisine orientale raffinée pour mariages, buffets d'entreprise, associations, universités et réceptions privées.",
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
        servingCuisine: ["Moroccan", "Middle Eastern"],
        sameAs: [SOCIAL_LINKS.instagram, SOCIAL_LINKS.tiktok, SOCIAL_LINKS.googleBusiness],
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "5.0",
          reviewCount: "22",
          bestRating: "5",
          worstRating: "1",
        },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: "Services traiteur",
          itemListElement: [
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Traiteur mariage Lyon" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Buffet entreprise Lyon" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Traiteur événementiel Lyon" } },
            { "@type": "Offer", itemOffered: { "@type": "Service", name: "Traiteur halal Lyon" } },
          ],
        },
      },
    ],
  };
}
