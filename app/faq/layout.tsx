import type { Metadata } from "next";
import FaqJsonLd from "../components/FaqJsonLd";
import { SITE_URL } from "../lib/site-seo";
import { withSocial } from "../lib/page-meta";

export const metadata: Metadata = withSocial({
  title: "Questions fréquentes | Traiteur marocain halal Lyon",
  description:
    "FAQ Maison Des Saveurs, traiteur marocain halal à Lyon : zones desservies, réservation, service le jour J, options, acompte, allergies et devis.",
  alternates: { canonical: `${SITE_URL}/faq` },
});

export default function FAQLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <FaqJsonLd />
      {children}
    </>
  );
}
