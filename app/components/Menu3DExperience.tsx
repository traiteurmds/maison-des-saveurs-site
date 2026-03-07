"use client";

import { useState, useRef, useCallback, useEffect } from "react";
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
  {
    id: "salade-variee",
    title: "Salade variée",
    description: "Salade fraîche et colorée, préparée avec des légumes de saison et une touche d'épices douces. Idéale pour ouvrir l'appétit en douceur.",
    image: "/images/menu/mini-sales.jpg",
    alt: "Salade variée traiteur Lyon",
    category: "entrees",
  },
  {
    id: "salade-royale",
    title: "Salade royale",
    description: "Une salade raffinée aux saveurs marocaines : semoule, légumes croquants, herbes fraîches et une vinaigrette subtile. Parfaite pour un début de repas élégant.",
    image: "/images/menu/mini-sales.jpg",
    alt: "Salade royale traiteur Lyon",
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
  {
    id: "couscous-royal",
    title: "Couscous Royal",
    description: "Couscous royal marocain avec légumes fondants et viandes mijotées, signature de notre maison.",
    image: "/images/menu/couscous.jpg",
    alt: "Couscous marocain traiteur Lyon",
    category: "plats",
  },
  {
    id: "viande-pruneaux",
    title: "Viande aux pruneaux",
    description: "Tajine de boeuf marocain aux pruneaux et amandes, sucré-salé emblématique des mariages.",
    image: "/images/menu/viande-pruneaux.jpg",
    alt: "Tajine marocain traiteur Lyon",
    category: "plats",
  },
  {
    id: "poulet-olives",
    title: "Poulet aux olives",
    description: "Poulet marocain aux olives et citron confit, servi sur plat traditionnel.",
    image: "/images/menu/poulet-olives.jpg",
    alt: "Poulet olives citron marocain traiteur Lyon",
    category: "plats",
  },
  {
    id: "pastilla",
    title: "Pastilla",
    description: "Pastilla marocaine traditionnelle, idéale pour les grandes occasions et les réceptions raffinées.",
    image: "/images/menu/pastilla.jpg",
    alt: "Pastilla marocaine traiteur Lyon",
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
    id: "assiette-fruits",
    title: "Assiette de fruits",
    description: "Sélection de fruits frais de saison, présentée avec élégance. Une fin de repas légère et rafraîchissante.",
    image: "/images/menu/pastilla.jpg",
    alt: "Assiette de fruits traiteur Lyon",
    category: "desserts",
  },
  {
    id: "gateaux-marocains",
    title: "Gâteaux marocains",
    description: "Pâtisseries orientales et douceurs marocaines : cornes de gazelle, gâteaux au miel et aux amandes, pour clôturer le repas en beauté.",
    image: "/images/menu/pastilla.jpg",
    alt: "Gâteaux marocains traiteur Lyon",
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  const filteredDishes = dishes.filter((d) => d.category === activeCategory);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>, index: number) => {
    const card = cardRefs.current[index];
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (y - 0.5) * -12;
    const rotateY = (x - 0.5) * 12;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
  }, []);

  const handleMouseLeave = useCallback((index: number) => {
    const card = cardRefs.current[index];
    if (card) card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)";
  }, []);

  useEffect(() => {
    if (!openDish) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDish(null);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [openDish]);

  return (
    <section id="menu" className="border-t border-deep-green/10 bg-beige py-24" aria-labelledby="menu-heading">
      <div className="mx-auto max-w-7xl px-6">
        <h2 id="menu-heading" className="text-center font-serif text-4xl font-semibold text-deep-green md:text-5xl">
          Notre menu
        </h2>

        <motion.div
          className="mt-12 flex flex-wrap justify-center gap-2"
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
              className={`min-h-[48px] min-w-[120px] rounded-full px-6 py-3 font-medium tracking-wide transition-all duration-300 ease-out md:min-w-[140px] ${
                activeCategory === cat.id
                  ? "bg-deep-green text-beige shadow-lg"
                  : "bg-white text-deep-green shadow-md hover:-translate-y-0.5 hover:shadow-lg"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {filteredDishes.length === 0 ? (
            <p className="col-span-full py-12 text-center font-serif text-lg text-deep-green/70">
              Cette catégorie sera bientôt enrichie.
            </p>
          ) : (
          <AnimatePresence mode="wait">
          {filteredDishes.map((dish, i) => (
            <motion.div
              key={dish.id}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, delay: 0.05 * i, ease: [0.22, 1, 0.36, 1] }}
              className="aspect-[4/3] min-h-[320px] w-full md:min-h-[360px]"
            >
              <div
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                role="button"
                tabIndex={0}
                onClick={() => setOpenDish(dish)}
                onMouseMove={(e) => handleMouseMove(e, i)}
                onMouseLeave={() => handleMouseLeave(i)}
                onKeyDown={(e) => e.key === "Enter" && setOpenDish(dish)}
                className="group relative h-full w-full cursor-pointer overflow-hidden rounded-2xl shadow-lg transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-[0_32px_64px_rgba(15,31,24,0.3)] hover:scale-[1.02]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src={dish.image}
                  alt={dish.alt}
                  fill
                  loading="lazy"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-300 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" aria-hidden />
                {/* Reflet lumière dorée au survol (luxe) */}
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: "linear-gradient(135deg, transparent 40%, rgba(212,175,55,0.08) 50%, transparent 60%)",
                  }}
                  aria-hidden
                />
                {/* Light sweep au survol */}
                <div
                  className="absolute inset-0 translate-x-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-500 ease-out group-hover:translate-x-[100%]"
                  aria-hidden
                />
                <span className="absolute bottom-6 left-6 right-6 font-serif text-2xl font-semibold text-white drop-shadow-md md:text-3xl">
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
              className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-[900px] flex-col overflow-hidden rounded-[20px] bg-white shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-3d-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpenDish(null)}
                className="absolute right-4 top-4 z-20 flex h-12 w-12 items-center justify-center rounded-full bg-black/60 text-2xl text-white transition-colors hover:bg-black"
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
