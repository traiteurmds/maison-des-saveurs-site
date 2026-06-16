import type { Metadata } from "next";
import SeoLandingTemplate from "../components/SeoLandingTemplate";
import { SEO_LANDING_PAGES } from "../lib/seo-landing-pages";
import { SITE_URL } from "../lib/site-seo";

const SLUG = "traiteur-mariage-lyon" as const;

export const metadata: Metadata = {
  title: "Traiteur Mariage Lyon | Réception Halal sur Mesure",
  description:
    "Traiteur mariage Lyon et réceptions familiales. Cuisine orientale halal, dressage élégant et menu personnalisé. Devis traiteur mariage Lyon.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
};

export default function TraiteurMariageLyonPage() {
  return <SeoLandingTemplate content={SEO_LANDING_PAGES[SLUG]} />;
}
