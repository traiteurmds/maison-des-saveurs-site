import type { Metadata } from "next";
import SeoLandingTemplate from "../components/SeoLandingTemplate";
import { SEO_LANDING_PAGES } from "../lib/seo-landing-pages";
import { SITE_URL } from "../lib/site-seo";

const SLUG = "traiteur-entreprise-lyon" as const;

export const metadata: Metadata = {
  title: "Traiteur Entreprise Lyon | Buffet & Repas Professionnels",
  description:
    "Traiteur entreprise Lyon : buffet entreprise, repas d'équipe, cocktail et événements associatifs. Cuisine orientale halal faite maison. Devis rapide.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
};

export default function TraiteurEntrepriseLyonPage() {
  return <SeoLandingTemplate content={SEO_LANDING_PAGES[SLUG]} />;
}
