import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import GoogleRating from "../components/ui/GoogleRating";
import FeatureGrid from "../components/sections/FeatureGrid";
import DishSelection from "../components/sections/DishSelection";
import JourJ from "../components/sections/JourJ";
import Reviews from "../components/sections/Reviews";
import FaqAccordion from "../components/sections/FaqAccordion";
import FinalCta from "../components/sections/FinalCta";
import { FAQ_ITEMS } from "../lib/faq-data";
import { SITE_URL } from "../lib/site-seo";
import { withSocial } from "../lib/page-meta";

export const metadata: Metadata = withSocial({
  title: "Traiteur mariage marocain halal à Lyon",
  description:
    "Traiteur pour mariage marocain et hlel à Lyon : salade royale, pastilla, viande aux pruneaux, couscous, service en salle, vaisselle et décoration de table. Cuisine halal, devis sur mesure.",
  alternates: { canonical: `${SITE_URL}/traiteur-mariage-lyon` },
});

const features = [
  {
    title: "Un menu de fête traditionnel",
    text: "Des grands plats à partager au centre de chaque table de 8 ou de 10, généreux et dressés avec soin.",
  },
  {
    title: "Une entrée qui impressionne",
    text: "La salade royale, montée en étages et couronnée de briouates ou de cigares, ou la pastilla de votre choix.",
  },
  {
    title: "Un service en salle",
    text: "Nos serveurs assurent le service. Vous choisissez leur nombre et le profil de l'équipe : hommes, femmes ou mixte.",
  },
  {
    title: "Des tables élégantes",
    text: "Kit vaisselle individuelle aux couverts dorés et décoration de table complète, selon votre ambiance.",
  },
  {
    title: "Livraison, réchauffage, dressage",
    text: "Nous arrivons avec tout le nécessaire, réchauffons et dressons sur place selon les options retenues.",
  },
  {
    title: "Une fin de soirée sans corvée",
    text: "Avec l'option dédiée, nous récupérons et nettoyons notre vaisselle. Vous profitez de votre nuit.",
  },
];

export default function MariagePage() {
  return (
    <>
      <PageHero
        eyebrow="Mariages · Hlel · Fiançailles"
        title={
          <>
            Un repas de mariage <em className="text-gold-gradient">à la hauteur du jour</em>
          </>
        }
        intro="Traiteur marocain halal à Lyon, nous préparons et servons le repas de votre mariage ou de votre hlel avec la générosité et l'élégance qu'il mérite."
        image="/images/realisations/salades-composees-crevettes.jpg"
        imageAlt="Salades composées aux crevettes servies lors d'une réception"
        imagePosition="center 40%"
      >
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link href="/contact" className="btn btn-gold">
            Demander un devis mariage <FiArrowRight aria-hidden />
          </Link>
          <GoogleRating />
        </div>
      </PageHero>

      <section className="section bg-paper">
        <div className="container-x">
          <SectionHeading
            eyebrow="Ce que nous prenons en charge"
            title={
              <>
                Vous recevez, <em className="text-gold">nous orchestrons le repas</em>
              </>
            }
            intro="Le jour de votre mariage, vous avez mieux à faire que surveiller les cuisines. Nous gérons le repas de bout en bout, selon la formule que vous choisissez."
          />
          <div className="mt-14">
            <FeatureGrid features={features} />
          </div>
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-x">
          <SectionHeading
            eyebrow="Composer votre menu"
            title={
              <>
                Les classiques <em className="text-gold">des mariages marocains</em>
              </>
            }
            intro="Une composition possible pour votre repas. Ajoutez les plats qui vous plaisent à votre demande, nous ajustons tout avec vous."
          />
          <div className="mt-12">
            <DishSelection ids={["salade-royale", "pastilla", "viande-pruneaux", "poulet-olives", "couscous-viande", "plateau-fruits"]} />
          </div>
          <Reveal className="mt-10">
            <Link href="/menu" className="btn btn-ink">
              Voir toute la carte <FiArrowRight aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <JourJ />

      <section className="section bg-paper">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <Reveal className="relative mx-auto grid w-full max-w-lg grid-cols-2 gap-4">
            {["/images/caftans/caftan-01.jpg", "/images/caftans/caftan-05.jpg"].map((src, i) => (
              <div key={src} className={`arch relative aspect-[3/4] overflow-hidden bg-sand ${i === 1 ? "mt-12" : ""}`}>
                <Image src={src} alt="Caftan de la collection MDS x Lamia Créations" fill sizes="(max-width: 1024px) 45vw, 280px" className="object-cover object-top" />
              </div>
            ))}
          </Reveal>
          <Reveal>
            <p className="eyebrow">MDS x Lamia Créations</p>
            <h2 className="display-lg mt-5 text-ink">
              Et pour la mariée, <em className="text-gold">des caftans d&apos;exception</em>
            </h2>
            <p className="lead mt-6">
              En partenariat avec Lamia Créations, nous proposons une sélection de caftans à la location et à la
              vente, avec essayage sur demande.
            </p>
            <Link href="/caftans" className="btn btn-outline mt-8">
              Découvrir la collection <FiArrowRight aria-hidden />
            </Link>
          </Reveal>
        </div>
      </section>

      <Reviews />

      <section className="section-tight border-t border-line bg-ivory">
        <Reveal className="container-x grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-16">
          <div className="max-w-3xl">
            <p className="eyebrow">Le Journal</p>
            <h2 className="display-md mt-5 text-ink">
              Préparer le repas de votre mariage&nbsp;: <em className="text-gold">notre guide</em>
            </h2>
            <p className="lead mt-5">
              Nombre d&apos;invités, format, menu, besoins alimentaires, contraintes de la salle : les questions à se
              poser, dans l&apos;ordre, avant de choisir son traiteur.
            </p>
          </div>
          <Link href="/journal/repas-de-mariage" className="btn btn-outline self-start lg:self-end">
            Lire le guide <FiArrowRight aria-hidden />
          </Link>
        </Reveal>
      </section>

      <section className="section bg-paper">
        <div className="container-x max-w-4xl">
          <SectionHeading eyebrow="Vos questions" title="Mariage : ce qu'on nous demande souvent" />
          <div className="mt-10">
            <FaqAccordion items={FAQ_ITEMS.filter((f) => ["reservation", "tables", "options", "acompte", "zones"].includes(f.id))} />
          </div>
        </div>
      </section>

      <FinalCta
        title={
          <>
            Votre date est fixée ? <em className="text-gold-gradient">Réservons-la ensemble.</em>
          </>
        }
      />
    </>
  );
}
