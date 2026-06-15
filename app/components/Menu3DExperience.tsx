"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaInfo } from "react-icons/fa";
import TiltCard from "./ui/TiltCard";
import MagneticButton from "./ui/MagneticButton";
import Reveal from "./ui/Reveal";
import { useSelection } from "./providers/SelectionProvider";
import { selectableCardClass, selectableFocusClass, type SelectionState } from "../lib/whatsapp";
import { cn } from "../lib/utils";

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

const CATEGORY_MAP: Record<Category, keyof SelectionState> = {
  entrees: "starters",
  plats: "mains",
  desserts: "desserts",
};

function DishCard({
  dish,
  selected,
  onToggle,
  onInfo,
}: {
  dish: Dish;
  selected: boolean;
  onToggle: () => void;
  onInfo: () => void;
}) {
  return (
    <div className="relative h-full w-full">
      <button
        type="button"
        onClick={onToggle}
        aria-pressed={selected}
        aria-label={`${selected ? "Désélectionner" : "Sélectionner"} ${dish.title}`}
        className={cn(
          "group relative h-full w-full cursor-pointer overflow-hidden rounded-[20px] border transition-all duration-300",
          selectableCardClass(selected),
          selectableFocusClass
        )}
      >
        <Image
          src={dish.image}
          alt={dish.alt}
          fill
          loading="lazy"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          quality={80}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" aria-hidden />
        {selected && (
          <div
            className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-terracotta text-xs font-bold text-white shadow-md"
            aria-hidden
          >
            ✓
          </div>
        )}
        <span className="absolute bottom-5 left-4 right-4 text-center font-serif text-xl font-semibold tracking-wide text-white drop-shadow-md md:text-2xl">
          {dish.title}
        </span>
      </button>
      <button
        type="button"
        onClick={onInfo}
        className={cn(
          "absolute left-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/40 bg-black/40 text-sm text-white backdrop-blur-sm transition-colors hover:bg-black/60",
          selectableFocusClass
        )}
        aria-label={`Voir le détail de ${dish.title}`}
      >
        <FaInfo aria-hidden />
      </button>
    </div>
  );
}

export default function Menu3DExperience() {
  const [openDish, setOpenDish] = useState<Dish | null>(null);
  const [activeCategory, setActiveCategory] = useState<Category>("plats");
  const { toggleSelection, isSelected, whatsappUrl, counts } = useSelection();

  const filteredDishes = dishes.filter((d) => d.category === activeCategory);
  const isFiveItems = filteredDishes.length === 5;
  const isTwoItems = filteredDishes.length === 2;
  const gridColsClass = isTwoItems
    ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-2"
    : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
  const gridMaxWidthClass = "max-w-[1100px]";

  const isDishSelected = (dish: Dish) => isSelected(CATEGORY_MAP[dish.category], dish.title);

  const toggleDish = (dish: Dish) => {
    toggleSelection(CATEGORY_MAP[dish.category], dish.title);
  };

  useEffect(() => {
    if (!openDish) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenDish(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [openDish]);

  return (
    <section
      id="menu"
      className="mds-section relative overflow-hidden border-t border-mds-border bg-mds-bg"
      aria-labelledby="menu-heading"
    >
      <div className="mds-pattern pointer-events-none absolute inset-0 opacity-15" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6">
        <Reveal className="text-center">
          <p className="font-serif text-sm uppercase tracking-[0.28em] text-terracotta">Notre carte</p>
          <h2 id="menu-heading" className="lux-heading mt-3 font-serif text-4xl font-semibold text-mds-text md:text-5xl">
            Notre menu
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-mds-muted md:text-base">
            Sélectionnez les plats qui vous intéressent pour préparer votre demande.
          </p>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap justify-center gap-3" delay={0.1}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={cn(
                "min-h-[48px] min-w-[120px] rounded-full px-6 py-3 text-sm font-medium tracking-wide transition-all duration-300 ease-out md:min-w-[140px]",
                selectableFocusClass,
                activeCategory === cat.id
                  ? "border border-mds-border bg-mds-text text-mds-bg shadow-lg"
                  : "glass-card border border-mds-border text-mds-text hover:-translate-y-0.5"
              )}
            >
              {cat.label}
            </button>
          ))}
        </Reveal>

        <div className={`mx-auto mt-14 grid justify-center justify-items-center gap-8 ${gridMaxWidthClass} ${gridColsClass}`}>
          {filteredDishes.length === 0 ? (
            <p className="col-span-full py-12 text-center font-serif text-lg text-mds-muted">
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
                  <TiltCard className="h-full w-full">
                    <DishCard
                      dish={dish}
                      selected={isDishSelected(dish)}
                      onToggle={() => toggleDish(dish)}
                      onInfo={() => setOpenDish(dish)}
                    />
                  </TiltCard>
                </motion.div>
              ))}
            </AnimatePresence>
          )}
        </div>

        <Reveal className="mt-14 text-center" delay={0.15}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex min-h-[56px] w-full max-w-md items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-sm font-medium tracking-wide text-white shadow-[0_8px_32px_rgba(37,211,102,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,211,102,0.45)] sm:w-auto sm:min-w-[320px]",
              selectableFocusClass
            )}
          >
            <FaWhatsapp className="text-xl" aria-hidden />
            Envoyer ma sélection menu
          </a>
          {counts.menu === 0 ? (
            <p className="mt-4 text-sm text-mds-muted">
              Sélectionnez un ou plusieurs plats pour les inclure dans votre message WhatsApp.
            </p>
          ) : (
            <p className="mt-4 text-sm text-mds-muted">
              {counts.menu} plat{counts.menu > 1 ? "s" : ""} sélectionné{counts.menu > 1 ? "s" : ""} · message global avec toutes vos sélections
            </p>
          )}
        </Reveal>
      </div>

      <AnimatePresence>
        {openDish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 p-4 backdrop-blur-md md:p-8"
            onClick={() => setOpenDish(null)}
            role="presentation"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex max-h-[calc(100vh-2rem)] w-full max-w-[900px] flex-col overflow-hidden rounded-[24px] border border-mds-border bg-mds-card shadow-2xl backdrop-blur-xl"
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-3d-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setOpenDish(null)}
                className="absolute right-4 top-4 z-20 flex h-11 w-11 items-center justify-center rounded-full border border-white/30 bg-deep-green/80 text-xl text-white transition-colors hover:bg-deep-green"
                aria-label="Fermer le détail du plat"
              >
                ×
              </button>
              <div className="relative h-[45vh] min-h-[260px] shrink-0 overflow-hidden">
                <Image
                  src={openDish.image}
                  alt={openDish.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 900px) 100vw, 900px"
                  quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent" aria-hidden />
                <h2
                  id="menu-3d-modal-title"
                  className="absolute bottom-6 left-6 right-6 font-serif text-3xl font-semibold text-white md:text-4xl"
                >
                  {openDish.title}
                </h2>
              </div>
              <div className="flex flex-1 flex-col overflow-y-auto p-8 md:p-12">
                <p className="text-lg leading-relaxed text-mds-muted">{openDish.description}</p>
                <div className="mt-8 flex flex-wrap gap-4">
                  <button
                    type="button"
                    onClick={() => toggleDish(openDish)}
                    aria-pressed={isDishSelected(openDish)}
                    className={cn(
                      "inline-flex min-h-[48px] items-center justify-center rounded-full border px-8 py-3 text-sm font-medium tracking-wide transition-all",
                      selectableFocusClass,
                      isDishSelected(openDish)
                        ? "border-terracotta bg-[#faf6f0] text-terracotta dark:bg-[#1a241c]"
                        : "border-mds-border bg-mds-card text-mds-text hover:border-terracotta/40"
                    )}
                  >
                    {isDishSelected(openDish) ? "Retirer de ma sélection" : "Ajouter à ma sélection"}
                  </button>
                  <MagneticButton className="inline-block">
                    <Link
                      href="/contact"
                      className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-terracotta to-[#c99a67] px-10 py-4 font-medium tracking-widest text-white shadow-lg transition-all duration-300 hover:shadow-xl"
                    >
                      Demander un devis
                    </Link>
                  </MagneticButton>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
