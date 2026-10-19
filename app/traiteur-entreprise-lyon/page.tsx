import type { Metadata } from "next";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import FeatureGrid from "../components/sections/FeatureGrid";
import DishSelection from "../components/sections/DishSelection";
import Reviews from "../components/sections/Reviews";
import FaqAccordion from "../components/sections/FaqAccordion";
import FinalCta from "../components/sections/FinalCta";
import { FAQ_ITEMS } from "../lib/faq-data";
import { SITE_URL } from "../lib/site-seo";
import { withSocial } from "../lib/page-meta";

export const metadata: Metadata = withSocial({
  title: "Traiteur entreprise à Lyon : buffets et repas halal",
  description:
    "Buffets salés, repas d'équipe et événements professionnels à Lyon : Maison Des Saveurs, traiteur marocain halal pour entreprises, associations, universités et clubs. Devis rapide.",
  alternates: { canonical: `${SITE_URL}/traiteur-entreprise-lyon` },
});

const formats = [
  {
    title: "Buffets et cocktails",
    text: "Pièces salées individuelles, snacking ou orientales, faciles à servir et à déguster debout.",
  },
  {
    title: "Repas d'équipe",
    text: "Couscous, poulet aux olives, pastillas : un vrai repas convivial pour réunir vos collaborateurs.",
  },
  {
    title: "Événements associatifs",
    text: "Soirées, galas, rencontres et fêtes de fin d'année pour les associations et les clubs.",
  },
  {
    title: "Universités et écoles",
    text: "Événements étudiants, remises de diplômes, journées d'intégration et réceptions de fin d'année.",
  },
  {
    title: "Séminaires et inaugurations",
    text: "Un buffet soigné qui fait bonne impression auprès de vos clients et partenaires.",
  },
  {
    title: "Prestations récurrentes",
    text: "Vous organisez des événements réguliers ? Parlons d'un partenariat dans la durée.",
  },
];

const why = [
  {
    title: "Une cuisine halal pour tous",
    text: "Une offre qui convient au plus grand nombre de vos invités, sans casse-tête.",
  },
  {
    title: "Un interlocuteur réactif",
    text: "Une réponse rapide, par téléphone, WhatsApp ou e-mail, et un devis détaillé.",
  },
  {
    title: "Livraison et service",
    text: "Nous livrons dans vos locaux ou sur le lieu de votre choix, avec serveurs si besoin.",
  },
];

export default function EntreprisePage() {
  return (
    <>
      <PageHero
        eyebrow="Entreprises · Associations · Universités"
        title={
          <>
            Des buffets qui <em className="text-gold-gradient">rassemblent vos équipes</em>
          </>
        }
        intro="Repas d'entreprise, buffets, événements associatifs et universitaires à Lyon : une cuisine marocaine halal, généreuse, livrée et servie avec sérieux."
        image="/images/realisations/buffet-salades-composees.jpg"
        imageAlt="Buffet de salades composées pour un événement professionnel"
        imagePosition="center 50%"
      >
        <Link href="/contact" className="btn btn-gold">
          Demander un devis <FiArrowRight aria-hidden />
        </Link>
      </PageHero>

      <section className="section bg-paper">
        <div className="container-x">
          <SectionHeading
            eyebrow="Nos formats"
            title={
              <>
                Du buffet debout <em className="text-gold">au repas complet</em>
              </>
            }
            intro="Nous adaptons la formule au nombre de participants, au lieu et au moment de la journée."
          />
          <div className="mt-14">
            <FeatureGrid features={formats} />
          </div>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-x">
          <SectionHeading
            eyebrow="Au menu"
            title={
              <>
                Buffets salés <em className="text-gold">et plats à partager</em>
              </>
            }
            intro="Ajoutez les formules qui vous intéressent à votre demande : nous vous proposons les quantités adaptées."
          />
          <div className="mt-12">
            <DishSelection ids={["buffet-snacking", "buffet-oriental", "salade-variee", "couscous-poulet", "poulet-olives", "plateau-fruits"]} />
          </div>
        </div>
      </section>

      <section className="section bg-paper">
        <div className="container-x">
          <SectionHeading eyebrow="Pourquoi nous" title="Simple à organiser, mémorable à déguster" />
          <div className="mt-12">
            <FeatureGrid features={why} />
          </div>
          <Reveal className="mt-10">
            <Link href="/menu" className="btn btn-ink">
              Voir toute la carte <FiArrowRight aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <Reviews />

      <section className="section bg-paper">
        <div className="container-x max-w-4xl">
          <SectionHeading eyebrow="Vos questions" title="Questions fréquentes" />
          <div className="mt-10">
            <FaqAccordion items={FAQ_ITEMS.filter((f) => ["halal", "zones", "service", "options", "allergies"].includes(f.id))} />
          </div>
        </div>
      </section>

      <FinalCta
        title={
          <>
            Un événement à prévoir ? <em className="text-gold-gradient">Recevez votre devis.</em>
          </>
        }
        text="Indiquez la date, le lieu, le nombre de participants et le format souhaité : nous vous répondons rapidement."
      />
    </>
  );
}
