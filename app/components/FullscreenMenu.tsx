"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: "mini-sales",
    label: "Mini salés",
    image: "/images/menu/mini-sales.jpg",
    alt: "Mini salés",
    description: "Buffet de mini salés pour vos événements : mini burgers, batbout, petits fours et bouchées gourmandes.",
  },
  {
    id: "plats",
    label: "Plats",
    image: "/images/menu/couscous.jpg",
    alt: "Plats",
    description: "Tajine, couscous, pastilla, rfissa : une cuisine marocaine d'exception pour vos réceptions.",
  },
  {
    id: "desserts",
    label: "Desserts",
    image: "/images/menu/pastilla.jpg",
    alt: "Desserts",
    description: "Pâtisseries orientales et douceurs marocaines pour conclure en beauté.",
  },
  {
    id: "boissons",
    label: "Boissons",
    image: "/images/menu/the-menthe.jpg",
    alt: "Boissons",
    description: "Thé à la menthe, jus et rafraîchissements pour accompagner vos moments.",
  },
];

export default function FullscreenMenu() {
  const [openCategory, setOpenCategory] = useState<typeof categories[0] | null>(null);

  useEffect(() => {
    if (!openCategory) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenCategory(null);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [openCategory]);

  return (
    <section className="border-t border-deep-green/10 bg-beige-dark py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-serif text-4xl font-semibold text-deep-green md:text-5xl"
        >
          Notre menu
        </motion.h2>
        <div className="mt-16 grid gap-6 sm:grid-cols-2">
          {categories.map((cat, i) => (
            <motion.button
              key={cat.id}
              type="button"
              onClick={() => setOpenCategory(cat)}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-deep-green/10 bg-white text-left shadow-[0_20px_50px_rgba(15,31,24,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,31,24,0.22)] focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2"
            >
              <Image
                src={cat.image}
                alt={cat.alt}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, 50vw"
                quality={85}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-green/80 to-transparent" aria-hidden />
              <span className="absolute bottom-6 left-6 right-6 font-serif text-2xl font-semibold text-white">
                {cat.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {openCategory && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 bg-black/75 backdrop-blur-md"
              onClick={() => setOpenCategory(null)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="fixed inset-4 z-50 flex max-h-[calc(100vh-2rem)] flex-col overflow-hidden rounded-3xl bg-white shadow-2xl md:inset-8"
              role="dialog"
              aria-modal="true"
              aria-labelledby="menu-modal-title"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative h-[45vh] min-h-[260px] shrink-0 overflow-hidden">
                <Image
                  src={openCategory.image}
                  alt={openCategory.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" aria-hidden />
                <h2 id="menu-modal-title" className="absolute bottom-6 left-6 right-6 font-serif text-3xl font-semibold text-white md:text-4xl">
                  {openCategory.label}
                </h2>
              </div>
              <div className="flex flex-1 flex-col overflow-y-auto p-8 md:p-12">
                <p className="text-lg leading-relaxed text-deep-green/90">
                  {openCategory.description}
                </p>
                <Link
                  href="/contact"
                  className="mt-8 inline-flex items-center justify-center rounded-full bg-terracotta px-10 py-4 font-medium tracking-widest text-white shadow-lg transition-all duration-300 hover:bg-terracotta/90 hover:shadow-xl"
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
