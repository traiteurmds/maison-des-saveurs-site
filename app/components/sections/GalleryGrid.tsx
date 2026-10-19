"use client";

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";
import Reveal from "../ui/Reveal";

const PHOTOS = [
  { src: "/images/menu/couscous-viande.jpg", w: 1320, h: 994, title: "Couscous à la viande" },
  { src: "/images/menu/salade-royale.jpg", w: 898, h: 1600, title: "Salade royale" },
  { src: "/images/menu/pastilla.jpg", w: 1076, h: 1171, title: "Pastilla aux fruits de mer" },
  { src: "/images/menu/assiette-fruits.jpg", w: 900, h: 1202, title: "Plateau de fruits frais" },
  { src: "/images/menu/poulet-olives.jpg", w: 800, h: 902, title: "Poulet aux olives et amandes" },
  { src: "/images/menu/mini-sales.jpg", w: 1080, h: 1350, title: "Buffet de mini salés" },
  { src: "/images/menu/couscous-poulet.jpg", w: 1320, h: 740, title: "Couscous au poulet" },
  { src: "/images/menu/gateaux-marocains.jpg", w: 1922, h: 2560, title: "Gâteaux marocains et thé" },
  { src: "/images/menu/rfissa.jpg", w: 720, h: 796, title: "Rfissa" },
  { src: "/images/menu/salade-variee.jpg", w: 1320, h: 2314, title: "Salades variées" },
  { src: "/images/menu/viande-pruneaux.jpg", w: 720, h: 960, title: "Viande aux pruneaux" },
  { src: "/images/menu/couscous.jpg", w: 736, h: 896, title: "Couscous" },
  { src: "/images/menu/fruits-saison.jpg", w: 1320, h: 2320, title: "Fruits de saison" },
];

export default function GalleryGrid() {
  const [index, setIndex] = useState<number | null>(null);
  const close = useCallback(() => setIndex(null), []);
  const step = useCallback(
    (dir: 1 | -1) => setIndex((i) => (i === null ? i : (i + dir + PHOTOS.length) % PHOTOS.length)),
    []
  );

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    document.documentElement.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [index, close, step]);

  const current = index !== null ? PHOTOS[index] : null;

  return (
    <section className="section-tight bg-paper">
      <div className="container-x columns-2 gap-3 md:columns-3 md:gap-4 lg:columns-4">
        {PHOTOS.map((p, i) => (
          <Reveal key={p.src} delay={0.03 * (i % 4)} className="mb-3 break-inside-avoid md:mb-4">
            <button
              type="button"
              onClick={() => setIndex(i)}
              data-cursor="view"
              className="group relative block w-full overflow-hidden bg-sand"
              aria-label={`Agrandir : ${p.title}`}
            >
              <Image
                src={p.src}
                alt={p.title}
                width={p.w}
                height={p.h}
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 300px"
                quality={75}
                className="h-auto w-full transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
              />
              <span className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 to-transparent p-3 text-left font-display text-lg text-ivory opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                {p.title}
              </span>
            </button>
          </Reveal>
        ))}
      </div>

      <AnimatePresence>
        {current && (
          <motion.div
            className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/95 p-4 backdrop-blur"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={close}
            role="dialog"
            aria-modal="true"
            aria-label={current.title}
          >
            <motion.div
              key={current.src}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex max-h-full max-w-5xl flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={current.src}
                alt={current.title}
                width={current.w}
                height={current.h}
                sizes="100vw"
                quality={85}
                className="max-h-[78vh] w-auto rounded-[14px] object-contain"
              />
              <p className="mt-4 font-display text-2xl text-ivory">{current.title}</p>
            </motion.div>
            <button type="button" onClick={close} aria-label="Fermer" className="absolute right-4 top-[calc(env(safe-area-inset-top)+16px)] flex h-12 w-12 items-center justify-center rounded-full border border-line-dark text-ivory">
              <FiX className="text-xl" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(-1); }} aria-label="Photo précédente" className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-dark bg-ink/60 text-ivory">
              <FiChevronLeft className="text-xl" />
            </button>
            <button type="button" onClick={(e) => { e.stopPropagation(); step(1); }} aria-label="Photo suivante" className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-line-dark bg-ink/60 text-ivory">
              <FiChevronRight className="text-xl" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
