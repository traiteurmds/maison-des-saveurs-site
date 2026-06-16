import type { Metadata } from "next";
import SeoLandingTemplate from "../components/SeoLandingTemplate";
import { SEO_LANDING_PAGES } from "../lib/seo-landing-pages";
import { SITE_URL } from "../lib/site-seo";

const SLUG = "traiteur-buffet-lyon" as const;

export const metadata: Metadata = {
  title: "Traiteur Buffet Lyon | Cuisine Orientale Halal",
  description:
    "Traiteur buffet Lyon pour mariages, entreprises et réceptions. Buffet oriental halal, dressage premium et devis en ligne.",
  alternates: { canonical: `${SITE_URL}/${SLUG}` },
};

export default function TraiteurBuffetLyonPage() {
  return <SeoLandingTemplate content={SEO_LANDING_PAGES[SLUG]} />;
}
