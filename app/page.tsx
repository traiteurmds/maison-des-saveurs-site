"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

const homeServices = [
  {
    title: "Traiteur mariages Lyon",
    desc: "Nous accompagnons tous les mariages à Lyon et dans ses alentours, quels que soient vos traditions, votre culture ou le style de votre réception. Chaque mariage est unique, et nous mettons tout notre savoir-faire au service de votre union pour créer une expérience culinaire exceptionnelle. De la réception au dessert, nous assurons une prestation complète, élégante et parfaitement maîtrisée, afin que le repas de votre plus beau jour reste gravé dans les mémoires.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    imageAlt: "Traiteur mariage marocain Lyon - buffet et prestation mariage",
  },
  {
    title: "Traiteur Événements",
    desc: "Anniversaires, fêtes familiales, événements associatifs ou célébrations spéciales : nous vous accompagnons pour tous vos moments importants. Nous nous adaptons à votre lieu, à votre nombre d'invités et à votre budget afin de proposer une prestation sur mesure, généreuse et élégante. Chaque événement est pensé pour rassembler vos proches autour d'une cuisine authentique et mémorable.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&q=80",
    imageAlt: "Buffet mini salés événement Lyon - traiteur anniversaire",
  },
  {
    title: "Traiteur Professionnel",
    desc: "Repas d'entreprise, événements internes, célébrations professionnelles ou rassemblements d'équipe : Maison Des Saveurs se déplace directement dans vos locaux ou sur le lieu de votre choix. Nous organisons des prestations adaptées à vos besoins afin de réunir vos collaborateurs autour d'un moment convivial et fédérateur à travers le repas. Buffet, service à table ou formule personnalisée, nous assurons une organisation sérieuse et raffinée.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    imageAlt: "Traiteur entreprise Lyon - buffet marocain traiteur Lyon",
  },
];

export default function Home() {
  const { scrollYProgress } = useScroll();
  const heroParallaxY = useTransform(scrollYProgress, [0, 0.25], [0, 12]);

  return (
    <>
      {/* Hero — deep green luxury gradient + parallax + grain */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0F1F18] text-white">
        <motion.div
          className="absolute inset-0 hero-gradient-layer"
          style={{ y: heroParallaxY }}
          aria-hidden
        />
        <div className="hero-grain absolute inset-0 z-[1]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[32vh] min-h-[160px]"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.2), transparent)",
          }}
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <div className="relative">
            <div className="hero-heading-glow pointer-events-none absolute -inset-x-8 top-1/2 h-32 -translate-y-1/2" aria-hidden />
            <motion.h1
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="relative font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
              style={{ textShadow: "0 2px 24px rgba(0,0,0,0.18), 0 1px 8px rgba(0,0,0,0.1)" }}
            >
              Traiteur Marocain Halal à Lyon
            </motion.h1>
            <motion.div
              className="hero-accent-line mx-auto mt-4 w-full max-w-[280px]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
              aria-hidden
            />
          </div>
          <motion.p
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 max-w-2xl font-serif text-lg sm:text-xl md:text-2xl"
            style={{ color: "#F8F5F0" }}
          >
            Maison des Saveurs est un traiteur marocain halal basé à Lyon proposant des buffets gourmands pour mariages, anniversaires et événements professionnels. Notre cuisine est traditionnelle, faite maison avec des ingrédients soigneusement sélectionnés et des épices venues du Maroc.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex flex-wrap justify-center gap-5"
          >
            <Link
              href="/contact"
              className="btn-premium btn-cta-signature inline-flex items-center justify-center bg-terracotta px-10 py-4 font-medium tracking-widest text-white hover:bg-terracotta/90"
            >
              Demander un devis
            </Link>
            <Link
              href="/services"
              className="btn-premium btn-premium-outline inline-flex items-center justify-center border-2 border-[#F8F5F0] px-10 py-4 font-medium tracking-widest hover:bg-[#F8F5F0]/10"
              style={{ color: "#F8F5F0" }}
            >
              Découvrir nos prestations
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Intro strip — overlaps hero, rounded top, soft shadow */}
      <section
        className="intro-strip-beige relative z-10 -mt-[60px] rounded-t-[40px] border-b border-deep-green/10 py-20"
        style={{
          boxShadow: "0 -40px 80px rgba(0,0,0,0.08), inset 0 20px 40px rgba(0,0,0,0.04)",
        }}
      >
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-2xl leading-relaxed text-deep-green md:text-3xl"
          >
            Nous créons des expériences inoubliables : saveurs raffinées, service
            impeccable et une attention portée à chaque détail.
          </motion.p>
        </div>
      </section>

      {/* Services preview */}
      <section className="bg-beige py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="font-serif text-sm uppercase tracking-[0.3em] text-terracotta">
              Notre offre
            </p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-deep-green md:text-5xl">
              Nos services
            </h2>
          </motion.div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {homeServices.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                className="service-card-hover overflow-hidden border border-deep-green/10 bg-white"
              >
                <div className="relative h-40 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="p-8">
                  <h3 className="font-serif text-xl font-semibold text-deep-green">
                    {item.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-deep-green/80">
                    {item.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-12 text-center"
          >
            <Link
              href="/services"
              className="inline-block border-b-2 border-terracotta font-medium tracking-widest text-deep-green transition-colors hover:text-terracotta"
            >
              Découvrir tous nos services
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Section SEO — zone géographique et prestations */}
      <section className="bg-beige-dark border-t border-deep-green/10 py-16" aria-labelledby="prestations-seo">
        <div className="mx-auto max-w-4xl px-6">
          <h2 id="prestations-seo" className="sr-only">
            Traiteur marocain halal Lyon et métropole
          </h2>
          <p className="text-center font-serif text-lg leading-relaxed text-deep-green md:text-xl">
            Nous proposons nos services de traiteur marocain halal à Lyon, Villeurbanne, Bron, Vénissieux, Vaulx-en-Velin et dans toute la métropole lyonnaise.
          </p>
          <p className="mt-6 font-serif text-sm font-semibold uppercase tracking-widest text-terracotta">
            Prestations :
          </p>
          <ul className="mt-3 flex flex-wrap justify-center gap-x-8 gap-y-1 text-deep-green/90">
            <li>Traiteur mariage marocain</li>
            <li>Buffet anniversaire</li>
            <li>Traiteur événementiel entreprise</li>
            <li>Buffet marocain traditionnel</li>
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden bg-deep-green py-24" aria-labelledby="cta-contact">
        <div className="absolute inset-0 bg-gradient-to-b from-terracotta/5 to-transparent pointer-events-none" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center">
          <motion.h2
            id="cta-contact"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-3xl font-semibold text-beige md:text-4xl"
          >
            Écrivons ensemble votre histoire
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mt-4 text-beige/80"
          >
            Réservez un rendez-vous ou demandez une proposition sur mesure.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/contact"
              className="btn-premium btn-cta-signature mt-8 inline-flex bg-terracotta px-10 py-4 font-medium tracking-widest text-beige hover:bg-terracotta/90"
            >
              Nous contacter
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
