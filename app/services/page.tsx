"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const services = [
  {
    title: "Traiteur mariages Lyon",
    description:
      "Nous accompagnons tous les mariages à Lyon et dans ses alentours, quels que soient vos traditions, votre culture ou le style de votre réception. Chaque mariage est unique, et nous mettons tout notre savoir-faire au service de votre union pour créer une expérience culinaire exceptionnelle. De la réception au dessert, nous assurons une prestation complète, élégante et parfaitement maîtrisée, afin que le repas de votre plus beau jour reste gravé dans les mémoires.",
    image: "/images/services/mariage.png",
    imageAlt: "Traiteur mariage marocain haut de gamme",
  },
  {
    title: "Traiteur Événements",
    description:
      "Anniversaires, fêtes familiales, événements associatifs ou célébrations spéciales : nous vous accompagnons pour tous vos moments importants. Nous nous adaptons à votre lieu, à votre nombre d'invités et à votre budget afin de proposer une prestation sur mesure, généreuse et élégante. Chaque événement est pensé pour rassembler vos proches autour d'une cuisine authentique et mémorable.",
    image: "/images/services/evenement.png",
    imageAlt: "Service traiteur pour événements et réceptions",
  },
  {
    title: "Traiteur Professionnel",
    description:
      "Repas d'entreprise, événements internes, célébrations professionnelles ou rassemblements d'équipe : Maison Des Saveurs se déplace directement dans vos locaux ou sur le lieu de votre choix. Nous organisons des prestations adaptées à vos besoins afin de réunir vos collaborateurs autour d'un moment convivial et fédérateur à travers le repas. Buffet, service à table ou formule personnalisée, nous assurons une organisation sérieuse et raffinée.",
    image: "/images/services/professionnel.jpg",
    imageAlt: "Service traiteur pour entreprises et événements professionnels",
  },
];

export default function ServicesPage() {
  return (
    <div className="pt-24">
      <section className="relative flex h-[45vh] min-h-[360px] items-center justify-center overflow-hidden border-b border-deep-green/10 bg-beige">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 text-center"
        >
          <p className="font-serif text-sm uppercase tracking-[0.3em] text-terracotta">
            Ce que nous proposons
          </p>
          <h1 className="mt-2 font-serif text-5xl font-semibold text-deep-green md:text-6xl">
            Nos services
          </h1>
        </motion.div>
      </section>

      <section className="bg-beige py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mt-20 space-y-24">
            {services.map((service, i) => (
              <motion.article
                key={service.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
                className={`group grid gap-12 md:grid-cols-2 md:gap-16 ${
                  i % 2 === 1 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div
                  className={`relative h-80 overflow-hidden rounded-xl border border-deep-green/5 bg-white/5 shadow-[0_18px_45px_rgba(15,31,24,0.14)] transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:shadow-[0_26px_70px_rgba(15,31,24,0.22)] md:h-96 ${
                    i % 2 === 1 ? "md:order-2" : ""
                  }`}
                >
                  <Image
                    src={service.image}
                    alt={service.imageAlt}
                    fill
                    className="rounded-xl object-cover transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-translate-y-1"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={90}
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-deep-green/10 to-transparent"
                    aria-hidden
                  />
                </div>
                <div
                  className={`flex flex-col justify-center ${
                    i % 2 === 1 ? "md:order-1" : ""
                  }`}
                >
                  <h2 className="font-serif text-2xl font-semibold text-deep-green md:text-3xl">
                    {service.title}
                  </h2>
                  <p className="mt-4 leading-relaxed text-deep-green/85">
                    {service.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <Link
              href="/contact"
              className="btn-premium btn-cta-signature inline-flex bg-terracotta px-10 py-4 font-medium tracking-widest text-beige hover:bg-terracotta/90"
            >
              Demander un devis
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
