import type { Metadata } from "next";
import PageHero from "../components/ui/PageHero";
import MenuBrowser from "../components/menu/MenuBrowser";
import FinalCta from "../components/sections/FinalCta";
import { SITE_URL } from "../lib/site-seo";
import { withSocial } from "../lib/page-meta";

export const metadata: Metadata = withSocial({
  title: "La carte : couscous, pastilla, buffets",
  description:
    "La carte de Maison Des Saveurs, traiteur marocain halal à Lyon : salade royale, pastilla, couscous, poulet aux olives, viande aux pruneaux, rfissa, buffets salés et desserts. Composez votre demande de devis.",
  alternates: { canonical: `${SITE_URL}/menu` },
});

export default function MenuPage() {
  return (
    <>
      <PageHero
        eyebrow="La carte"
        title={
          <>
            Composez votre <em className="text-gold-gradient">réception</em>
          </>
        }
        intro="Ajoutez les plats qui vous font envie à votre demande. Nous revenons vers vous avec un devis sur mesure, adapté à votre nombre d'invités et de tables."
        image="/images/menu/couscous-poulet.jpg"
        imageAlt="Couscous au poulet préparé par Maison Des Saveurs"
        imagePosition="center 45%"
      />
      <MenuBrowser />
      <FinalCta
        title={
          <>
            Une question sur un plat ? <em className="text-gold-gradient">Demandez-nous.</em>
          </>
        }
        text="Compositions, quantités, adaptations : nous vous répondons avec plaisir par téléphone ou sur WhatsApp."
      />
    </>
  );
}
