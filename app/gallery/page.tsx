import type { Metadata } from "next";
import PageHero from "../components/ui/PageHero";
import GalleryGrid from "../components/sections/GalleryGrid";
import FinalCta from "../components/sections/FinalCta";
import { SITE_URL } from "../lib/site-seo";

export const metadata: Metadata = {
  title: "Réalisations : nos plats en photos",
  description:
    "Couscous, pastilla, salade royale, buffets et plateaux de fruits : les réalisations de Maison Des Saveurs, traiteur marocain halal à Lyon, en photos.",
  alternates: { canonical: `${SITE_URL}/gallery` },
};

export default function GalleryPage() {
  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title={
          <>
            Nos plats, <em className="text-gold-gradient">tels qu&apos;ils arrivent sur vos tables</em>
          </>
        }
        intro="Des photos de nos vraies préparations, prises lors de nos prestations."
      />
      <GalleryGrid />
      <FinalCta />
    </>
  );
}
