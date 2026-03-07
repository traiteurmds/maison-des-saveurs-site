import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notre Maison - Traiteur Marocain Lyon",
  description:
    "L'histoire de Maison des Saveurs, traiteur marocain à Lyon : une maman passionnée de cuisine, des plats faits avec le cœur pour vos mariages et événements.",
};

export default function AboutLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
