import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services - Traiteur Lyon, Buffet Événementiel Lyon",
  description:
    "Traiteur marocain à Lyon : mariages, anniversaires, buffets événementiels et traiteur entreprise. Buffet marocain traditionnel, mini salés et prestations sur mesure.",
};

export default function ServicesLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
