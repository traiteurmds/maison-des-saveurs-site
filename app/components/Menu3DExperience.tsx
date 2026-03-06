"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

type Dish = {
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

const dishes: Dish[] = [
  {
    id: "pastilla",
    title: "Pastilla",
    description: "Pastilla marocaine traditionnelle, idéale pour les grandes occasions et les réceptions raffinées.",
    image: "/images/menu/pastilla.jpg",
    alt: "Pastilla marocaine traditionnelle faite maison",
  },
  {
    id: "couscous-royal",
    title: "Couscous Royal",
    description: "Couscous royal marocain avec légumes fondants et viandes mijotées, signature de notre maison.",
    image: "/images/menu/couscous.jpg",
    alt: "Couscous royal marocain traiteur Lyon",
  },
  {
    id: "viande-pruneaux",
    title: "Viande aux pruneaux",
    description: "Tajine de boeuf marocain aux pruneaux et amandes, sucré-salé emblématique des mariages.",
    image: "/images/menu/viande-pruneaux.jpg",
    alt: "Tajine de boeuf marocain aux pruneaux et amandes",
  },
  {
    id: "poulet-olives",
    title: "Poulet aux olives",
    description: "Tajine de poulet marocain aux olives et citron confit, servi sur plat traditionnel.",
    image: "/images/menu/poulet-olives.jpg",
    alt: "Tajine de poulet marocain aux olives et citron",
  },
  {
    id: "rfissa",
    title: "Rfissa",
    description: "Rfissa marocaine traditionnelle au poulet, plat généreux pour les grandes tablées.",
    image: "/images/menu/rfissa.jpg",
    alt: "Rfissa marocaine traditionnelle au poulet",
  },
  {
    id: "mini-sales",
    title: "Mini salés",
    description: "Buffet de mini salés marocains : mini burgers, batbout, briouates et bouchées gourmandes.",
    image: "/images/menu/mini-sales.jpg",
    alt: "Buffet de mini salés marocains pour événements",
  },
];

export default function Menu3DExperience() {
  const [openDish, setOpenDish] = useState<Dish | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    <section className="border-t border-deep-green/10 bg-beige py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <h2 className="text-center font-serif text-4xl font-semibold text-deep-green md:text-5xl">
          Notre menu
        </h2>
        <div className="mt-16 grid gap-8 sm:grid-cols-2" style={{ perspective: "1200px" }}>
          {dishes.map((dish, i) => (
            <div
              key={dish.id}
              className="flex justify-center"
              style={{ perspective: "1000px" }}
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
                className="relative aspect-[4/3] w-full max-w-md cursor-pointer overflow-hidden rounded-3xl border border-deep-green/10 bg-white shadow-[0_25px_60px_rgba(15,31,24,0.12)] transition-all duration-500 ease-out will-change-transform hover:shadow-[0_32px_72px_rgba(15,31,24,0.2)]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <Image
                  src={dish.image}
                  alt={dish.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, 50vw"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-deep-green/85 to-transparent" aria-hidden />
                <span className="absolute bottom-6 left-6 right-6 font-serif text-2xl font-semibold text-white">
                  {dish.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openDish && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
              onClick={() => setOpenDish(null)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-4 z-50 flex max-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:inset-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-3d-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[45vh] min-h-[260px] shrink-0 overflow-hidden">
                {openDish && (
                  <Image
                    src={openDish.image}
                    alt={openDish.alt}
                    fill
                    className="object-cover"
                    sizes="100vw"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" aria-hidden />
                <h2 id="menu-3d-modal-title" className="absolute bottom-6 left-6 right-6 font-serif text-3xl font-semibold text-white md:text-4xl">
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
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-terracotta px-10 py-4 font-medium tracking-widest text-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:bg-terracotta/90 hover:shadow-xl hover:shadow-terracotta/25"
                >
                  Demander un devis
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
