"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const homeServices = [
  {
    title: "Traiteur mariages Lyon",
    desc: "Nous accompagnons tous les mariages à Lyon et dans ses alentours, quels que soient vos traditions, votre culture ou le style de votre réception. Chaque mariage est unique, et nous mettons tout notre savoir-faire au service de votre union pour créer une expérience culinaire exceptionnelle. De la réception au dessert, nous assurons une prestation complète, élégante et parfaitement maîtrisée, afin que le repas de votre plus beau jour reste gravé dans les mémoires.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    imageAlt: "Poulet olives citron confit mariage marocain Lyon - traiteur mariage buffet événementiel Lyon",
  },
  {
    title: "Traiteur Événements",
    desc: "Anniversaires, fêtes familiales, événements associatifs ou célébrations spéciales : nous vous accompagnons pour tous vos moments importants. Nous nous adaptons à votre lieu, à votre nombre d'invités et à votre budget afin de proposer une prestation sur mesure, généreuse et élégante. Chaque événement est pensé pour rassembler vos proches autour d'une cuisine authentique et mémorable.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=600&q=80",
    imageAlt: "Mini burgers et buffet marocain Lyon - buffet mini salés événement Lyon traiteur",
  },
  {
    title: "Traiteur Professionnel",
    desc: "Repas d'entreprise, événements internes, célébrations professionnelles ou rassemblements d'équipe : Maison Des Saveurs se déplace directement dans vos locaux ou sur le lieu de votre choix. Nous organisons des prestations adaptées à vos besoins afin de réunir vos collaborateurs autour d'un moment convivial et fédérateur à travers le repas. Buffet, service à table ou formule personnalisée, nous assurons une organisation sérieuse et raffinée.",
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80",
    imageAlt: "Buffet marocain Lyon traiteur entreprise - buffet événementiel Lyon",
  },
];

const menuItems = [
  {
    id: "mini-sales",
    title: "Mini salés",
    description: "Buffet de mini salés parfait pour les événements, anniversaires et réceptions : mini burgers, mini pizzas, mini batbout, petits fours, et autres bouchées gourmandes.",
    image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80",
    imageAlt: "Mini salés buffet traiteur Lyon",
  },
  {
    id: "pastilla",
    title: "Pastilla",
    description: "Feuilleté traditionnel marocain aux amandes et à la cannelle, ou version salée au poulet et aux épices. Un classique de la cuisine marocaine pour vos buffets et réceptions.",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
    imageAlt: "Pastilla traiteur marocain Lyon",
  },
  {
    id: "tajine",
    title: "Tajine",
    description: "Plat mijoté en terre cuite, poulet ou agneau aux olives et citron confit, légumes et épices du Maroc. Une institution de la cuisine marocaine pour vos événements.",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    imageAlt: "Tajine traiteur marocain Lyon",
  },
  {
    id: "couscous",
    title: "Couscous",
    description: "Semoule légère, légumes de saison, viande tendre et bouillon parfumé. Le couscous maison est un incontournable de nos buffets et repas de fête.",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    imageAlt: "Couscous traiteur marocain Lyon",
  },
  {
    id: "rfissa",
    title: "Rfissa",
    description: "Plat traditionnel aux lentilles, poulet et msemen, parfumé au ras el hanout et à la coriandre. Une spécialité marocaine raffinée pour vos réceptions.",
    image: "https://images.unsplash.com/photo-1604329760661-e71dc83f2b26?w=800&q=80",
    imageAlt: "Rfissa traiteur marocain Lyon",
  },
];

export default function Home() {
  const [menuModal, setMenuModal] = useState<typeof menuItems[0] | null>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (!menuModal) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuModal(null);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [menuModal]);
  const heroParallaxY = useTransform(scrollYProgress, [0, 0.25], [0, 12]);

  return (
    <>
      {/* Hero — deep green luxury gradient + parallax + grain */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0F1F18] text-white">
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
        <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
          <div className="relative">
            <div className="hero-heading-glow pointer-events-none absolute -inset-x-8 top-1/2 h-32 -translate-y-1/2" aria-hidden />
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
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
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="mx-auto mt-8 max-w-3xl font-serif text-lg sm:text-xl md:text-2xl"
            style={{ color: "#F8F5F0" }}
          >
            Maison des Saveurs est un traiteur marocain halal basé à Lyon proposant des buffets gourmands pour mariages, anniversaires et événements professionnels. Notre cuisine est traditionnelle, faite maison avec des ingrédients soigneusement sélectionnés et des épices venues du Maroc.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
            className="mt-14 flex flex-wrap justify-center gap-5"
          >
            <Link
              href="/contact"
              className="btn-premium btn-cta-signature inline-flex items-center justify-center rounded-full bg-terracotta px-10 py-4 font-medium tracking-widest text-white shadow-lg shadow-black/25 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-terracotta/90 hover:shadow-xl hover:shadow-black/35"
            >
              Demander un devis
            </Link>
            <Link
              href="/services"
              className="btn-premium btn-premium-outline inline-flex items-center justify-center rounded-full border-2 border-[#F8F5F0] px-10 py-4 font-medium tracking-widest text-[#F8F5F0] shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#F8F5F0]/10"
            >
              Découvrir nos prestations
            </Link>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-3 text-[10px] font-medium tracking-[0.3em] text-[#F8F5F0]/70 uppercase">
              <span>Faire défiler</span>
              <div className="relative h-10 w-px overflow-hidden rounded-full bg-[#F8F5F0]/30">
                <motion.span
                  className="absolute inset-x-0 top-0 h-3 rounded-full bg-[#F8F5F0]"
                  animate={{ y: [0, 24, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
                />
              </div>
            </div>
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
          <div className="mt-16 grid gap-10 md:grid-cols-3">
            {homeServices.map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                className="group relative overflow-hidden rounded-3xl border border-deep-green/10 bg-white/95 shadow-[0_18px_45px_rgba(15,31,24,0.12)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,31,24,0.22)]"
              >
                <div className="relative h-44 w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 group-hover:-translate-y-1"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={80}
                    loading="lazy"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-white/40 to-transparent"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col p-8">
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

      {/* Avis clients premium */}
      <section className="border-t border-deep-green/10 bg-beige py-24">
        <div className="mx-auto max-w-5xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="font-serif text-sm uppercase tracking-[0.3em] text-terracotta">
              Avis clients
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-deep-green md:text-4xl">
              Ils nous ont fait confiance
            </h2>
          </motion.div>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              {
                quote: "Service exceptionnel pour notre mariage.",
                name: "Sarah M.",
              },
              {
                quote: "Cuisine incroyable et service professionnel.",
                name: "Karim L.",
              },
              {
                quote: "Le meilleur traiteur marocain à Lyon.",
                name: "Nadia A.",
              },
            ].map((testimonial, index) => (
              <motion.figure
                key={testimonial.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{
                  duration: 0.6,
                  delay: 0.1 * index,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="flex flex-col justify-between rounded-3xl bg-white/95 p-6 shadow-[0_14px_40px_rgba(15,31,24,0.12)] ring-1 ring-deep-green/5"
              >
                <div>
                  <p className="text-xl leading-none text-amber-400" aria-hidden>★★★★★</p>
                  <blockquote className="mt-4 text-sm leading-relaxed text-deep-green/85">
                    “{testimonial.quote}”
                  </blockquote>
                </div>
                <figcaption className="mt-6 font-serif text-sm font-semibold text-deep-green/90">
                  — {testimonial.name}
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </div>
      </section>

      {/* Notre menu — cartes interactives + modal */}
      <section className="border-t border-deep-green/10 bg-beige-dark py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="font-serif text-sm uppercase tracking-[0.3em] text-terracotta">
              Nos plats
            </p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-deep-green md:text-5xl">
              Notre menu
            </h2>
          </motion.div>

          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
            {menuItems.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setMenuModal(item)}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-deep-green/10 bg-white text-left shadow-[0_18px_45px_rgba(15,31,24,0.12)] transition-all duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,31,24,0.22)] focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 20vw"
                    quality={80}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-deep-green/40 to-transparent" aria-hidden />
                </div>
                <div className="flex flex-1 flex-col justify-end p-5">
                  <h3 className="font-serif text-lg font-semibold text-deep-green">
                    {item.title}
                  </h3>
                </div>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Modal menu */}
      <AnimatePresence>
        {menuModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
              onClick={() => setMenuModal(null)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-2xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white shadow-2xl focus:outline-none"
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-modal-title"
            >
              <div className="relative aspect-video w-full overflow-hidden">
                <Image
                  src={menuModal.image}
                  alt={menuModal.imageAlt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 672px) 100vw, 672px"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden />
                <h2 id="menu-modal-title" className="absolute bottom-4 left-4 right-4 font-serif text-2xl font-semibold text-white md:text-3xl">
                  {menuModal.title}
                </h2>
              </div>
              <div className="p-6 md:p-8">
                <p className="leading-relaxed text-deep-green/90">
                  {menuModal.description}
                </p>
                <Link
                  href="/contact"
                  className="mt-6 inline-flex items-center justify-center rounded-full bg-terracotta px-8 py-3 font-medium tracking-widest text-white shadow-md transition-all duration-300 hover:bg-terracotta/90 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2"
                >
                  Demander un devis
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Section SEO — ~120 mots traiteur marocain Lyon, mariages, anniversaires, événements, entreprises */}
      <section className="bg-beige-dark border-t border-deep-green/10 py-16" aria-labelledby="prestations-seo">
        <div className="mx-auto max-w-4xl px-6">
          <h2 id="prestations-seo" className="sr-only">
            Traiteur marocain Lyon, mariages, anniversaires, événements et entreprises
          </h2>
          <div className="space-y-4 text-center text-deep-green/90">
            <p className="font-serif text-lg leading-relaxed md:text-xl">
              Nous proposons nos services de traiteur marocain halal à Lyon, Villeurbanne, Bron, Vénissieux, Vaulx-en-Velin et dans toute la métropole lyonnaise.
            </p>
            <p className="leading-relaxed">
              <strong className="text-deep-green">Maison des Saveurs</strong> est votre traiteur marocain à Lyon pour les <strong>mariages</strong>, les <strong>anniversaires</strong>, les <strong>événements</strong> privés ou professionnels et les réceptions en <strong>entreprise</strong>. Notre buffet événementiel Lyon allie cuisine traditionnelle marocaine, ingrédients de qualité et épices du Maroc. Que ce soit pour un mariage, un anniversaire, un séminaire ou un cocktail d&apos;entreprise, nous créons des buffets gourmands et des prestations sur mesure. Traiteur Lyon et Villeurbanne depuis des années, nous assurons un service élégant et une cuisine faite maison pour tous vos événements dans la métropole lyonnaise.
            </p>
          </div>
          <p className="mt-6 font-serif text-sm font-semibold uppercase tracking-widest text-terracotta text-center">
            Prestations
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
