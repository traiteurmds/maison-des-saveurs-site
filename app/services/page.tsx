"use client";

import PremiumImage from "../components/ui/PremiumImage";
import { IMAGE_QUALITY, IMAGE_SIZES } from "../lib/image-config";
import Link from "next/link";
import { FaHeart, FaUsers, FaBriefcase } from "react-icons/fa";
import Reveal from "../components/ui/Reveal";
import MagneticButton from "../components/ui/MagneticButton";

const services = [
  {
    title: "Traiteur mariages Lyon",
    description:
      "Nous accompagnons tous les mariages à Lyon et dans ses alentours, quels que soient vos traditions, votre culture ou le style de votre réception. Chaque mariage est unique, et nous mettons tout notre savoir-faire au service de votre union pour créer une expérience culinaire exceptionnelle. De la réception au dessert, nous assurons une prestation complète, élégante et parfaitement maîtrisée, afin que le repas de votre plus beau jour reste gravé dans les mémoires.",
    image: "/images/services/mariage.png",
    imageAlt: "Traiteur mariage marocain haut de gamme",
    icon: FaHeart,
  },
  {
    title: "Traiteur Événements",
    description:
      "Anniversaires, fêtes familiales, événements associatifs ou célébrations spéciales : nous vous accompagnons pour tous vos moments importants. Nous nous adaptons à votre lieu, à votre nombre d'invités et à votre budget afin de proposer une prestation sur mesure, généreuse et élégante. Chaque événement est pensé pour rassembler vos proches autour d'une cuisine authentique et mémorable.",
    image: "/images/services/evenement.png",
    imageAlt: "Service traiteur pour événements et réceptions",
    icon: FaUsers,
  },
  {
    title: "Traiteur Professionnel",
    description:
      "Repas d'entreprise, événements internes, célébrations professionnelles ou rassemblements d'équipe : Maison Des Saveurs se déplace directement dans vos locaux ou sur le lieu de votre choix. Nous organisons des prestations adaptées à vos besoins afin de réunir vos collaborateurs autour d'un moment convivial et fédérateur à travers le repas. Buffet, service à table ou formule personnalisée, nous assurons une organisation sérieuse et raffinée.",
    image: "/images/services/professionnel.jpg",
    imageAlt: "Service traiteur pour entreprises et événements professionnels",
    icon: FaBriefcase,
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-mds-bg pt-28">
      <section className="relative overflow-hidden border-b border-mds-border py-16 md:py-24">
        <div className="mds-pattern pointer-events-none absolute inset-0 opacity-15" aria-hidden />
        <Reveal className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <p className="font-serif text-sm uppercase tracking-[0.3em] text-[var(--gold)]">Ce que nous proposons</p>
          <h1 className="lux-heading mt-3 font-serif text-5xl font-semibold text-mds-text md:text-6xl">Nos services</h1>
        </Reveal>
      </section>

      <section className="py-14 md:py-20">
        <div className="mx-auto max-w-7xl space-y-16 px-6 lg:px-8">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <Reveal key={service.title} delay={0.05 * i}>
                <article className="glass-card service-card-hover overflow-hidden rounded-3xl p-6 md:p-8">
                  <div className={`grid items-center gap-10 md:grid-cols-2 ${i % 2 === 1 ? "md:[direction:rtl]" : ""}`}>
                    <div className={`relative aspect-[4/3] w-full overflow-hidden rounded-2xl md:aspect-[5/4] ${i % 2 === 1 ? "md:[direction:ltr]" : ""}`}>
                      <PremiumImage
                        src={service.image}
                        alt={service.imageAlt}
                        sizes={IMAGE_SIZES.serviceHero}
                        quality={IMAGE_QUALITY.hero}
                        hover
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-[var(--black)]/25 to-transparent" aria-hidden />
                    </div>
                    <div className={i % 2 === 1 ? "md:[direction:ltr]" : ""}>
                      <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--gold)]/30 bg-[var(--gold)]/10 text-[var(--gold)]">
                        <Icon aria-hidden />
                      </div>
                      <h2 className="font-serif text-2xl font-semibold text-mds-text md:text-3xl">{service.title}</h2>
                      <p className="mt-4 leading-relaxed text-mds-muted">{service.description}</p>
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>

        <Reveal className="mt-20 text-center">
          <MagneticButton className="inline-block">
            <Link
              href="/contact"
              className="btn-premium btn-cta-signature inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--black)] px-10 py-4 font-medium tracking-widest text-[var(--ivory)] transition-all hover:bg-[var(--charcoal)]"
            >
              Demander un devis
            </Link>
          </MagneticButton>
        </Reveal>
      </section>
    </div>
  );
}
