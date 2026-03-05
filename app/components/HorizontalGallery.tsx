"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const items = [
  { id: "1", title: "Tajine", src: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=900&q=85", alt: "Tajine marocain" },
  { id: "2", title: "Couscous royal", src: "https://images.unsplash.com/photo-1544025162-d76694265947?w=900&q=85", alt: "Couscous royal" },
  { id: "3", title: "Pastilla", src: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=900&q=85", alt: "Pastilla" },
  { id: "4", title: "Mini salés", src: "https://images.unsplash.com/photo-1615529182904-14819c35db37?w=900&q=85", alt: "Mini salés" },
  { id: "5", title: "Pâtisseries marocaines", src: "https://images.unsplash.com/photo-1604329760661-e71dc83f2b26?w=900&q=85", alt: "Pâtisseries marocaines" },
];

export default function HorizontalGallery() {
  return (
    <section className="overflow-hidden border-t border-deep-green/10 bg-deep-green py-24">
      <div className="mb-14 px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-4xl font-semibold text-beige md:text-5xl"
        >
          Nos créations
        </motion.h2>
      </div>
      <div
        className="flex gap-8 overflow-x-auto px-6 pb-6 scrollbar-hide md:gap-10 md:px-10"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 48 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-20px" }}
            transition={{ duration: 0.7, delay: 0.1 * i, ease: [0.22, 1, 0.36, 1] }}
            className="group relative h-[420px] min-w-[320px] shrink-0 overflow-hidden rounded-3xl shadow-2xl md:min-w-[380px] md:h-[480px]"
            style={{ scrollSnapAlign: "center" }}
          >
            <Image
              src={item.src}
              alt={item.alt}
              fill
              className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 768px) 320px, 380px"
              quality={85}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-deep-green/95 via-deep-green/30 to-transparent" aria-hidden />
            <p className="absolute bottom-6 left-6 right-6 font-serif text-2xl font-semibold text-white md:text-3xl">
              {item.title}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
