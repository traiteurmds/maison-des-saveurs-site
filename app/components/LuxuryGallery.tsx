"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const galleryItems = [
  { id: "1", src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=85", alt: "Tajine et plats marocains" },
  { id: "2", src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=85", alt: "Couscous royal" },
  { id: "3", src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800&q=85", alt: "Buffet mini salés" },
  { id: "4", src: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=85", alt: "Pastilla" },
  { id: "5", src: "https://images.unsplash.com/photo-1604329760661-e71dc83f2b26?w=800&q=85", alt: "Pâtisseries marocaines" },
  { id: "6", src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=85", alt: "Buffet événement" },
];

export default function LuxuryGallery() {
  return (
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
            Galerie
          </p>
          <h2 className="mt-2 font-serif text-4xl font-semibold text-deep-green md:text-5xl">
            Nos créations
          </h2>
        </motion.div>

        <div className="mt-16 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {galleryItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl border border-deep-green/10 shadow-[0_18px_45px_rgba(15,31,24,0.12)] transition-shadow duration-500 hover:shadow-[0_28px_60px_rgba(15,31,24,0.2)]"
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                quality={85}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-green/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
