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

const creationsGallery = [
  { id: "tajine", title: "Tajine", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", alt: "Tajine marocain" },
  { id: "couscous", title: "Couscous royal", image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80", alt: "Couscous royal" },
  { id: "pastilla", title: "Pastilla", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80", alt: "Pastilla" },
  { id: "minisales", title: "Mini salés", image: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=80", alt: "Buffet mini salés" },
  { id: "patisseries", title: "Pâtisseries", image: "https://images.unsplash.com/photo-1604329760661-e71dc83f2b26?w=800&q=80", alt: "Pâtisseries marocaines" },
];

const eventsGallery = [
  { id: "e1", image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=600&q=80", alt: "Mariage traiteur Lyon", label: "Mariages" },
  { id: "e2", image: "https://images.unsplash.com/photo-1555244162-803834f70033?w=600&q=80", alt: "Buffet événement", label: "Buffets" },
  { id: "e3", image: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=600&q=80", alt: "Réception", label: "Réceptions" },
  { id: "e4", image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=600&q=80", alt: "Événement entreprise", label: "Entreprise" },
];

export default function Home() {
  const [menuModal, setMenuModal] = useState<typeof menuItems[0] | null>(null);
  const [lightboxImage, setLightboxImage] = useState<typeof eventsGallery[0] | null>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    if (!menuModal && !lightboxImage) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuModal(null);
        setLightboxImage(null);
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [menuModal, lightboxImage]);
  const heroParallaxY = useTransform(scrollYProgress, [0, 0.25], [0, 12]);

  return (
    <>
      {/* Hero — cinématographique : image fond + overlay sombre */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0F1F18] text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1920&q=85"
            alt=""
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </div>
        <div
          className="absolute inset-0 bg-[#0F1F18]/85"
          aria-hidden
        />
        <motion.div
          className="absolute inset-0 hero-gradient-layer opacity-90"
          style={{ y: heroParallaxY }}
          aria-hidden
        />
        <div className="hero-grain absolute inset-0 z-[1]" aria-hidden />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[40vh] min-h-[200px]"
          style={{
            background: "linear-gradient(to top, rgba(15,31,24,0.95), transparent)",
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

      {/* Galerie immersive — Nos créations (scroll horizontal, parallax, hover zoom) */}
      <section className="relative overflow-hidden border-t border-deep-green/10 bg-deep-green py-20">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 px-6 text-center"
        >
          <p className="font-serif text-sm uppercase tracking-[0.3em] text-terracotta">
            Notre savoir-faire
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-beige md:text-5xl">
            Nos créations
          </h2>
        </motion.div>
        <div className="flex gap-6 overflow-x-auto px-6 pb-4 scrollbar-hide md:gap-8 md:px-8" style={{ scrollSnapType: "x mandatory" }}>
          {creationsGallery.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.6, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
              className="group relative h-[380px] min-w-[280px] shrink-0 overflow-hidden rounded-3xl shadow-2xl md:min-w-[340px] md:h-[420px]"
              style={{ scrollSnapAlign: "center" }}
            >
              <Image
                src={item.image}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 280px, 340px"
                quality={85}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-green/90 via-deep-green/20 to-transparent" aria-hidden />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="font-serif text-xl font-semibold text-white md:text-2xl">{item.title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Services */}
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

      {/* Reviews — Avis clients (section affichée sous MenuSection) */}
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
              Témoignages
            </p>
            <h2 className="mt-2 font-serif text-3xl font-semibold text-deep-green md:text-4xl">
              Avis de nos clients
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
                className="flex flex-col justify-between rounded-3xl bg-white/95 p-6 shadow-[0_14px_40px_rgba(15,31,24,0.12)] ring-1 ring-deep-green/5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_20px_50px_rgba(15,31,24,0.18)]"
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

      {/* MenuSection — Notre menu (cartes interactives + modal, affiché sous Services) */}
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

      {/* Modal menu — fullscreen premium avec blur */}
      <AnimatePresence>
        {menuModal && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/70 backdrop-blur-md"
              onClick={() => setMenuModal(null)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-4 z-50 flex max-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:inset-8 focus:outline-none"
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-modal-title"
            >
              <div className="relative h-[45vh] min-h-[240px] shrink-0 overflow-hidden md:h-[50vh]">
                <Image
                  src={menuModal.image}
                  alt={menuModal.imageAlt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={false}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden />
                <h2 id="menu-modal-title" className="absolute bottom-6 left-6 right-6 font-serif text-3xl font-semibold text-white md:text-4xl">
                  {menuModal.title}
                </h2>
              </div>
              <div className="flex flex-1 flex-col overflow-y-auto p-6 md:p-10">
                <p className="text-lg leading-relaxed text-deep-green/90">
                  {menuModal.description}
                </p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-terracotta px-10 py-4 font-medium tracking-widest text-white shadow-lg transition-all duration-300 hover:bg-terracotta/90 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2"
                >
                  Demander un devis
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Galerie Nos événements — grille + lightbox */}
      <section className="border-t border-deep-green/10 bg-beige py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center"
          >
            <p className="font-serif text-sm uppercase tracking-[0.3em] text-terracotta">
              Réalisations
            </p>
            <h2 className="mt-2 font-serif text-4xl font-semibold text-deep-green md:text-5xl">
              Nos événements
            </h2>
          </motion.div>
          <div className="mt-16 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {eventsGallery.map((item, i) => (
              <motion.button
                key={item.id}
                type="button"
                onClick={() => setLightboxImage(item)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.5, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                className="group relative aspect-[4/3] overflow-hidden rounded-2xl border border-deep-green/10 shadow-[0_18px_45px_rgba(15,31,24,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_26px_70px_rgba(15,31,24,0.22)] focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                  quality={80}
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-green/80 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
                <span className="absolute bottom-3 left-3 right-3 font-serif text-sm font-semibold text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.label}
                </span>
              </motion.button>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox événements */}
      <AnimatePresence>
        {lightboxImage && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md"
              onClick={() => setLightboxImage(null)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl shadow-2xl focus:outline-none"
              role="dialog"
              aria-modal="true"
              aria-label="Image en grand"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={lightboxImage.image}
                  alt={lightboxImage.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
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

      {/* Contact — CTA vers page contact */}
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
