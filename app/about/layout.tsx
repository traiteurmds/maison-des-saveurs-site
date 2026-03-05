import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notre Maison - Traiteur Marocain Lyon",
  description:
    "Découvrez l'histoire de Maison des Saveurs, traiteur marocain à Lyon et Villeurbanne. Une passion pour l'excellence, la cuisine traditionnelle et les mariages et événements.",
};

export default function AboutLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
