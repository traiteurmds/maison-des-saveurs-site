import type { Metadata } from "next";
import { SITE_URL } from "../lib/site-seo";

export const metadata: Metadata = {
  title: "Services - Traiteur Lyon, Buffet Événementiel Lyon",
  description:
    "Traiteur marocain à Lyon : mariages, anniversaires, buffets événementiels et traiteur entreprise. Buffet marocain traditionnel, mini salés et prestations sur mesure.",
  alternates: { canonical: `${SITE_URL}/services` },
};

export default function ServicesLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
