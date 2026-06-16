import type { Metadata } from "next";
import SeoLandingTemplate from "../components/SeoLandingTemplate";
import { SEO_LANDING_PAGES } from "../lib/seo-landing-pages";
import { SITE_URL } from "../lib/site-seo";

const SLUG = "traiteur-halal-lyon" as const;

export const metadata: Metadata = {
  title: "Traiteur Halal Lyon | Buffet Oriental Événementiel",
  description:
    "Traiteur halal Lyon pour mariages, entreprises et réceptions privées. Buffet halal, cuisine orientale traditionnelle et devis rapide.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
};

export default function TraiteurHalalLyonPage() {
  return <SeoLandingTemplate content={SEO_LANDING_PAGES[SLUG]} />;
}
