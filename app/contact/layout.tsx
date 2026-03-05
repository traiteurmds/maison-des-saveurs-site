import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact - Traiteur Marocain Lyon Devis",
  description:
    "Contactez Maison des Saveurs, traiteur marocain halal à Lyon et Villeurbanne. Devis gratuit pour mariage, buffet événementiel et événements entreprise.",
};

export default function ContactLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
