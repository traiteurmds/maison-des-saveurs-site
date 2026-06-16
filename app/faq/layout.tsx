import type { Metadata } from "next";
import FaqJsonLd from "../components/FaqJsonLd";
import { SITE_URL } from "../lib/site-seo";

export const metadata: Metadata = {
  title: "Questions fréquentes",
  description:
    "FAQ traiteur marocain Lyon : mariages, événements privés, zones desservies, menus personnalisés et devis Maison Des Saveurs.",
  alternates: { canonical: `${SITE_URL}/faq` },
};

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FaqJsonLd />
      {children}
    </>
  );
}
