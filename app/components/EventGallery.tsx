"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

const events = [
  { id: "e1", label: "Mariage", src: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&q=85", alt: "Mariage" },
  { id: "e2", label: "Buffet", src: "https://images.unsplash.com/photo-1555244162-803834f70033?w=800&q=85", alt: "Buffet" },
  { id: "e3", label: "Réception", src: "https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=85", alt: "Réception" },
  { id: "e4", label: "Entreprise", src: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&q=85", alt: "Événement entreprise" },
];

export default function EventGallery() {
  const [lightbox, setLightbox] = useState<typeof events[0] | null>(null);

  useEffect(() => {
    if (!lightbox) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [lightbox]);

  return (
    <section className="border-t border-deep-green/10 bg-beige py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-serif text-4xl font-semibold text-deep-green md:text-5xl"
        >
          Nos événements
        </motion.h2>
        <div className="mt-16 grid grid-cols-2 gap-5 md:grid-cols-4 md:gap-6">
          {events.map((event, i) => (
            <motion.button
              key={event.id}
              type="button"
              onClick={() => setLightbox(event)}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_20px_50px_rgba(15,31,24,0.12)] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_30px_70px_rgba(15,31,24,0.22)] focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2"
            >
              <Image
                src={event.src}
                alt={event.alt}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                sizes="(max-width: 768px) 50vw, 25vw"
                quality={85}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-deep-green/90 via-deep-green/40 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" aria-hidden />
              <span className="absolute bottom-5 left-5 right-5 font-serif text-xl font-semibold text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                {event.label}
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {lightbox && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35 }}
              className="fixed inset-0 z-50 bg-black/88 backdrop-blur-md"
              onClick={() => setLightbox(null)}
              aria-hidden
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-4xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Image en grand"
            >
              <div className="relative aspect-video w-full">
                <Image
                  src={lightbox.src}
                  alt={lightbox.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 896px) 100vw, 896px"
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
