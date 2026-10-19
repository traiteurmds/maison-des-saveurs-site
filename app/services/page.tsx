import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import PageHero from "../components/ui/PageHero";
import SectionHeading from "../components/ui/SectionHeading";
import Reveal from "../components/ui/Reveal";
import FeatureGrid from "../components/sections/FeatureGrid";
import JourJ from "../components/sections/JourJ";
import FinalCta from "../components/sections/FinalCta";
import { SERVICE_OPTIONS } from "../lib/menu-data";
import { SITE_URL } from "../lib/site-seo";

export const metadata: Metadata = {
  title: "Prestations traiteur à Lyon : mariages, familles, entreprises",
  description:
    "Toutes les prestations de Maison Des Saveurs, traiteur marocain halal à Lyon : mariages et hlel, naissances et aqiqas, anniversaires, buffets d'entreprise, service en salle, vaisselle et décoration.",
  alternates: { canonical: `${SITE_URL}/services` },
};

const blocks = [
  {
    id: "mariages",
    eyebrow: "Mariages · Hlel · Fiançailles",
    title: "Mariages et hlel",
    text: "Le repas de votre plus beau jour, servi en grands plats à partager, avec service en salle, vaisselle élégante et décoration de table si vous le souhaitez.",
    image: "/images/realisations/viande-pruneaux-amandes.jpg",
    href: "/traiteur-mariage-lyon",
    cta: "Le traiteur mariage",
  },
  {
    id: "familles",
    eyebrow: "Naissances · Aqiqas · Baptêmes · Anniversaires",
    title: "Fêtes de famille",
    text: "Rfissa pour une naissance, couscous pour réunir la famille, buffet salé pour un anniversaire : nous adaptons le menu et les quantités à vos invités, chez vous ou en salle.",
    image: "/images/menu/rfissa.jpg",
    href: "/contact",
    cta: "Demander un devis",
  },
  {
    id: "entreprises",
    eyebrow: "Entreprises · Associations · Universités",
    title: "Événements professionnels",
    text: "Buffets salés, repas d'équipe, soirées associatives et événements étudiants, livrés dans vos locaux ou sur le lieu de votre choix.",
    image: "/images/menu/mini-sales.jpg",
    href: "/traiteur-entreprise-lyon",
    cta: "Le traiteur entreprise",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos prestations"
        title={
          <>
            Chaque occasion <em className="text-gold-gradient">mérite sa table</em>
          </>
        }
        intro="Des fêtes de famille aux grands mariages, en passant par les événements d'entreprise : une même exigence de goût, de générosité et de présentation."
        image="/images/realisations/salades-composees-buffet.jpg"
      />

      <section className="section bg-paper">
        <div className="container-x space-y-20 md:space-y-28">
          {blocks.map((b, i) => (
            <div key={b.id} id={b.id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal className={`relative aspect-[4/3] overflow-hidden rounded-[var(--radius)] bg-sand shadow-[var(--shadow-lg)] ${i % 2 ? "lg:order-2" : ""}`}>
                <Image src={b.image} alt={b.title} fill sizes="(max-width: 1024px) 100vw, 600px" quality={80} className="object-cover" />
              </Reveal>
              <Reveal delay={0.08}>
                <p className="eyebrow">{b.eyebrow}</p>
                <h2 className="display-lg mt-5 text-ink">{b.title}</h2>
                <p className="lead mt-6">{b.text}</p>
                <Link href={b.href} className="btn btn-ink mt-8">
                  {b.cta} <FiArrowRight aria-hidden />
                </Link>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <section className="section bg-ivory">
        <div className="container-x">
          <SectionHeading
            eyebrow="Options et services"
            title={
              <>
                Une réception <em className="text-gold">clé en main</em>
              </>
            }
            intro="Livraison, réchauffage, dressage et service : composez la prestation dont vous avez besoin. Chaque option est chiffrée dans votre devis."
          />
          <div className="mt-12">
            <FeatureGrid features={SERVICE_OPTIONS.map((o) => ({ title: o.title, text: o.description }))} />
          </div>
        </div>
      </section>

      <JourJ />
      <FinalCta />
    </>
  );
}
