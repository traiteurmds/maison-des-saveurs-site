"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const categories = [
  {
    id: "mini-sales",
    label: "Mini salés",
    items: [
      {
        title: "Assortiment mini salés",
        image: "/images/menu/mini-sales.jpg",
        alt: "Buffet de mini salés marocains pour événements",
      },
    ],
  },
  {
    id: "plats",
    label: "Plats",
    items: [
      {
        title: "Pastilla aux fruits de mer",
        image: "/images/menu/pastilla.jpg",
        alt: "Pastilla marocaine traditionnelle faite maison",
      },
      {
        title: "Couscous royal",
        image: "/images/menu/couscous.jpg",
        alt: "Couscous royal marocain traiteur Lyon",
      },
      {
        title: "Poulet aux olives",
        image: "/images/menu/poulet-olives.jpg",
        alt: "Poulet marocain aux olives et citron",
      },
      {
        title: "Viande aux pruneaux",
        image: "/images/menu/viande-pruneaux.jpg",
        alt: "Tajine de boeuf marocain aux pruneaux et amandes",
      },
      {
        title: "Rfissa",
        image: "/images/menu/rfissa.jpg",
        alt: "Rfissa marocaine traditionnelle",
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    items: [
      { title: "Pâtisseries orientales", image: "https://images.unsplash.com/photo-1604329760661-e71dc83f2b26?w=600&q=80", alt: "Pâtisseries" },
      { title: "Sélection de douceurs", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80", alt: "Douceurs" },
    ],
  },
  {
    id: "boissons",
    label: "Boissons",
    items: [
      { title: "Thé à la menthe", image: "https://images.unsplash.com/photo-1564890369478-c89ca6d9cde9?w=600&q=80", alt: "Thé à la menthe" },
      { title: "Jus et rafraîchissements", image: "https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=600&q=80", alt: "Jus" },
    ],
  },
];

export default function InteractiveMenu() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section className="border-t border-deep-green/10 bg-beige-dark py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="font-serif text-sm uppercase tracking-[0.3em] text-terracotta">
            Notre carte
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-deep-green md:text-5xl">
            Notre menu
          </h2>
        </motion.div>

        <div className="mt-16 space-y-4">
          {categories.map((category, i) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-20px" }}
              transition={{ duration: 0.5, delay: 0.06 * i, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden rounded-3xl border border-deep-green/10 bg-white shadow-[0_18px_45px_rgba(15,31,24,0.1)]"
            >
              <button
                type="button"
                onClick={() => setOpenId(openId === category.id ? null : category.id)}
                className="flex w-full items-center justify-between px-8 py-6 text-left transition-colors hover:bg-beige/50"
              >
                <span className="font-serif text-xl font-semibold text-deep-green md:text-2xl">
                  {category.label}
                </span>
                <motion.span
                  animate={{ rotate: openId === category.id ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-terracotta"
                >
                  ▼
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {openId === category.id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="grid gap-6 border-t border-deep-green/10 p-6 sm:grid-cols-2 lg:grid-cols-3">
                      {category.items.map((item, j) => (
                        <motion.div
                          key={item.title}
                          initial={{ opacity: 0, y: 16 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: 0.05 * j }}
                          className="group overflow-hidden rounded-2xl border border-deep-green/5 bg-white shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                        >
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={item.image}
                              alt={item.alt}
                              fill
                              className="object-cover transition-transform duration-500 group-hover:scale-105"
                              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                              quality={80}
                              loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-deep-green/60 to-transparent" aria-hidden />
                            <p className="absolute bottom-3 left-3 right-3 font-serif text-lg font-semibold text-white">
                              {item.title}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
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
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-terracotta px-10 py-4 font-medium tracking-widest text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-terracotta/90 hover:shadow-xl"
          >
            Demander un devis
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
