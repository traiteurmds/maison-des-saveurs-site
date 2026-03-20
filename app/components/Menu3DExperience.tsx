"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Category = "entrees" | "plats" | "desserts";

type Dish = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
  category: Category;
};

const dishes: Dish[] = [
  // ENTREES (2)
  {
    id: "salade-variee",
    title: "Salade variée",
    description: "Salade fraîche et colorée, préparée avec des légumes de saison et une touche d'épices douces. Idéale pour ouvrir l'appétit en douceur.",
    image: "/images/menu/salade-variee.jpg",
    alt: "Salade variée traiteur Lyon",
    category: "entrees",
  },
  {
    id: "mini-sales",
    title: "Mini salés",
    description: "Buffet de mini salés marocains : mini burgers, batbout, briouates et bouchées gourmandes.",
    image: "/images/menu/mini-sales.jpg",
    alt: "Mini salés marocains buffet traiteur Lyon",
    category: "entrees",
  },
  // PLATS (5)
  {
    id: "couscous-royal",
    title: "Couscous royal",
    description: "Couscous royal marocain avec légumes fondants et viandes mijotées, signature de notre maison.",
    image: "/images/menu/couscous.jpg",
    alt: "Couscous marocain traiteur Lyon",
    category: "plats",
  },
  {
    id: "poulet-olives",
    title: "Poulet olives",
    description: "Poulet marocain aux olives et citron confit, servi sur plat traditionnel.",
    image: "/images/menu/poulet-olives.jpg",
    alt: "Poulet olives traiteur Lyon",
    category: "plats",
  },
  {
    id: "viande-pruneaux",
    title: "Viande aux pruneaux",
    description: "Viande aux pruneaux et amandes, sucré-salé emblématique des mariages.",
    image: "/images/menu/viande-pruneaux.jpg",
    alt: "Viande aux pruneaux traiteur Lyon",
    category: "plats",
  },
  {
    id: "rfissa",
    title: "Rfissa",
    description: "Rfissa marocaine traditionnelle, plat généreux pour les grandes tablées.",
    image: "/images/menu/rfissa.jpg",
    alt: "Rfissa marocaine traditionnelle traiteur Lyon",
    category: "plats",
  },
  {
    id: "pastilla",
    title: "Pastilla",
    description: "Pastilla marocaine traditionnelle, feuilletage croustillant et saveurs raffinées. Idéale pour les réceptions.",
    image: "/images/menu/pastilla.jpg",
    alt: "Pastilla marocaine traiteur Lyon",
    category: "plats",
  },
  // DESSERTS (2)
  {
    id: "assiette-fruits",
    title: "Assiette de fruits",
    description: "Sélection de fruits frais de saison, présentée avec élégance. Une fin de repas légère et rafraîchissante.",
    image: "/images/menu/assiette-fruits.jpg",
    alt: "Assiette de fruits traiteur Lyon",
    category: "desserts",
  },
  {
    id: "gateaux-marocains",
    title: "Gateaux marocains",
    description: "Pâtisseries orientales et douceurs marocaines : cornes de gazelle, gâteaux au miel et aux amandes, pour clôturer le repas en beauté.",
    image: "/images/menu/gateaux-marocains.jpg",
    alt: "Gateaux marocains traiteur Lyon",
    category: "desserts",
  },
];

const categories: { id: Category; label: string }[] = [
  { id: "entrees", label: "Entrées" },
  { id: "plats", label: "Plats" },
  { id: "desserts", label: "Desserts" },
];

export default function Menu3DExperience() {
  const [openDish, setOpenDish] = useState<Dish | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("plats");

  const filteredDishes = dishes.filter((d) => d.category === activeCategory);
  const isFiveItems = filteredDishes.length === 5;
  const isTwoItems = filteredDishes.length === 2;
  const gridColsClass = isTwoItems
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  const gridMaxWidthClass = "max-w-[1100px]";

  useEffect(() => {
    if (!openDish) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDish(null);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [openDish]);

  return (
    <section
      id="menu"
      className="relative overflow-hidden border-t border-deep-green/10 bg-beige py-24"
      aria-labelledby="menu-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white/30 via-transparent to-beige-dark/10"
      />
      <div className="mx-auto max-w-7xl px-6">
        <h2 id="menu-heading" className="text-center font-serif text-4xl font-semibold text-deep-green md:text-5xl">
          Notre menu
        </h2>

        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-3"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`min-h-[48px] min-w-[120px] rounded-full px-6 py-3 font-medium tracking-wide transition-all duration-300 ease-out md:min-w-[140px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-deep-green/30 ${
                activeCategory === cat.id
                  ? "border border-beige/10 bg-deep-green text-beige shadow-lg shadow-deep-green/20 hover:-translate-y-0.5 hover:shadow-xl"
                  : "border border-deep-green/15 bg-white/55 text-deep-green shadow-md hover:-translate-y-0.5 hover:bg-white/80 hover:shadow-lg"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <div className={`mx-auto mt-16 grid justify-center justify-items-center gap-8 ${gridMaxWidthClass} ${gridColsClass}`}>
          {filteredDishes.length === 0 ? (
            <p className="col-span-full py-12 text-center font-serif text-lg text-deep-green/70">
              Cette catégorie sera bientôt enrichie.
            </p>
          ) : (
          <AnimatePresence mode="wait">
          {filteredDishes.map((dish, i) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              className={`aspect-[4/3] min-h-[280px] w-full md:min-h-[320px] ${isFiveItems && i === 3 ? "lg:col-start-2" : ""} ${isFiveItems && i === 4 ? "lg:col-start-3" : ""}`}
            >
              <div
                role="button"
                tabIndex={0}
                onClick={() => setOpenDish(dish)}
                onKeyDown={(e) => e.key === "Enter" && setOpenDish(dish)}
                  className="group relative h-full w-full cursor-pointer overflow-hidden rounded-[18px] border border-deep-green/10 bg-white/40 shadow-lg transition-[box-shadow,transform] duration-[350ms] ease hover:shadow-[0_26px_70px_rgba(15,31,24,0.22)]"
              >
                <Image
                  src={dish.image}
                  alt={dish.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
                  quality={80}
                    className="h-full w-full object-cover transition-transform duration-[350ms] ease group-hover:scale-[1.06]"
                />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 to-transparent" aria-hidden />
                <div
                    className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                      background:
                        "linear-gradient(135deg, transparent 40%, rgba(212,175,55,0.10) 50%, transparent 60%)",
                  }}
                  aria-hidden
                />
                <div
                  className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-[100%]"
                  aria-hidden
                />
                  <span className="absolute bottom-6 left-6 right-6 text-center font-serif text-2xl font-semibold tracking-wide text-white drop-shadow-md md:text-3xl">
                  {dish.title}
                </span>
              </div>
            </motion.div>
          ))}
          </AnimatePresence>
          )}
        </div>
      </div>

      <AnimatePresence>
        {openDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm md:p-8"
            onClick={() => setOpenDish(null)}
            role="presentation"
            aria-hidden
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-[900px] flex-col overflow-hidden rounded-[22px] border border-deep-green/10 bg-white/90 shadow-2xl backdrop-blur"
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-3d-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpenDish(null)}
                className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-deep-green/70 text-2xl text-white transition-colors hover:bg-deep-green/90"
                aria-label="Fermer le détail du plat"
              >
                ×
              </button>
                <div className="relative h-[45vh] min-h-[260px] shrink-0 overflow-hidden rounded-t-[20px]">
                {openDish && (
                  <Image
                    src={openDish.image}
                    alt={openDish.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 900px) 100vw, 900px"
                    quality={85}
                    loading="lazy"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" aria-hidden />
                <h2
                  id="menu-3d-modal-title"
                  className="absolute bottom-6 left-6 right-6 font-serif text-3xl font-semibold text-white md:text-4xl"
                >
                  {openDish?.title}
                </h2>
              </div>
              <div className="flex flex-1 flex-col overflow-y-auto p-8 md:p-12">
                {openDish && (
                  <p className="text-lg leading-relaxed text-deep-green/90">
                    {openDish.description}
                  </p>
                )}
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-terracotta px-10 py-4 font-medium tracking-widest text-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:scale-105 hover:bg-terracotta/90 hover:shadow-xl hover:shadow-terracotta/25"
                >
                  Demander un devis
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
