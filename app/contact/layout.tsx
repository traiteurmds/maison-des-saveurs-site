import type { Metadata } from "next";
import { SITE_URL } from "../lib/site-seo";

export const metadata: Metadata = {
  title: "Devis traiteur marocain à Lyon | Contact",
  description:
    "Demandez votre devis à Maison Des Saveurs, traiteur marocain halal à Lyon et Villeurbanne : mariage, hlel, naissance, buffet ou repas d'entreprise. Réponse rapide par WhatsApp, téléphone ou e-mail.",
  alternates: { canonical: `${SITE_URL}/contact` },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
