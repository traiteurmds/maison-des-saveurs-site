import type { Metadata } from "next";
import SeoLandingTemplate from "../components/SeoLandingTemplate";
import { SEO_LANDING_PAGES } from "../lib/seo-landing-pages";
import { SITE_URL } from "../lib/site-seo";

const SLUG = "traiteur-evenementiel-lyon" as const;

export const metadata: Metadata = {
  title: "Traiteur Événementiel Lyon | Réceptions Privées & Pro",
  description:
    "Traiteur événementiel Lyon : mariages, hlel, entreprises, associations. Cuisine orientale halal, service professionnel et devis rapide.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
};

export default function TraiteurEvenementielLyonPage() {
  return <SeoLandingTemplate content={SEO_LANDING_PAGES[SLUG]} />;
}
