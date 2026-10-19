"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { FiArrowUpRight, FiCheck, FiPlus } from "react-icons/fi";
import { CATEGORY_TO_SELECTION, DISHES } from "../../lib/menu-data";
import { cn } from "../../lib/utils";
import { useSelection } from "../providers/SelectionProvider";

type Slide = {
  dishId: string;
  name: string;
  kicker: string;
  plate: string;
  bg: string;
  fg: "dark" | "light";
};

const SLIDES: Slide[] = [
  {
    dishId: "couscous-viande",
    name: "Couscous",
    kicker: "Le plat de fête",
    plate: "/images/plats/couscous-viande.webp",
    bg: "#e0a93e",
    fg: "dark",
  },
  {
    dishId: "pastilla",
    name: "Pastilla",
    kicker: "L'entrée d'apparat",
    plate: "/images/plats/pastilla.webp",
    bg: "#2b3f92",
    fg: "light",
  },
  {
    dishId: "rfissa",
    name: "Rfissa",
    kicker: "La tradition des naissances",
    plate: "/images/plats/rfissa.webp",
    bg: "#b4502f",
    fg: "light",
  },
];

const ease = [0.22, 1, 0.36, 1] as const;

export default function PlateShowcase() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const { isSelected, toggleSelection } = useSelection();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const n = SLIDES.length;
  const stops = SLIDES.flatMap((_, i) => [i / n + 0.06, (i + 1) / n - 0.06]);
  const colors = SLIDES.flatMap((s) => [s.bg, s.bg]);
  const bg = useTransform(p, stops, colors);
  const rotate = useTransform(p, [0, 1], [0, reduced ? 0 : 300]);
  const nameX = useTransform(p, [0, 1], ["6%", "-6%"]);

  useMotionValueEvent(p, "change", (v) => {
    const i = Math.min(n - 1, Math.max(0, Math.floor(v * n)));
    if (i !== index) setIndex(i);
  });

  const slide = SLIDES[index];
  const dish = DISHES.find((d) => d.id === slide.dishId)!;
  const category = CATEGORY_TO_SELECTION[dish.category];
  const selected = isSelected(category, dish.title);
  const light = slide.fg === "light";

  return (
    <motion.section
      ref={ref}
      style={{ backgroundColor: bg, height: `${n * 100 + 40}vh` }}
      className="relative"
      aria-label="Nos plats signatures"
    >
      <div
        className={cn(
          "sticky top-0 flex h-[100svh] flex-col overflow-hidden transition-colors duration-700",
          light ? "text-ivory" : "text-ink"
        )}
      >
        {/* En-tête */}
        <div className="container-x relative z-30 flex items-start justify-between pt-[calc(var(--header-h)+1.25rem)]">
          <p className={cn("eyebrow", light && "on-dark")}>Nos signatures</p>
          <p className="font-display text-xl tabular-nums md:text-2xl">
            {String(index + 1).padStart(2, "0")}
            <span className="opacity-50"> / {String(n).padStart(2, "0")}</span>
          </p>
        </div>

        {/* Nom géant derrière l'assiette */}
        <motion.div style={{ x: nameX }} className="pointer-events-none absolute inset-x-0 top-1/2 z-0 -translate-y-1/2">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.p
              key={slide.name}
              initial={{ y: "40%", opacity: 0 }}
              animate={{ y: 0, opacity: light ? 0.95 : 0.9 }}
              exit={{ y: "-40%", opacity: 0 }}
              transition={{ duration: 0.9, ease }}
              className="whitespace-nowrap text-center font-display text-[25vw] italic leading-none tracking-[-0.05em] md:text-[22vw]"
              aria-hidden
            >
              {slide.name}
            </motion.p>
          </AnimatePresence>
        </motion.div>

        {/* Assiette qui tourne */}
        <div className="relative z-10 flex flex-1 items-center justify-center">
          <motion.div style={{ rotate }} className="relative aspect-square w-[min(82vw,52svh)] md:w-[min(42vw,62svh)]">
            <AnimatePresence initial={false}>
              <motion.div
                key={slide.plate}
                className="absolute inset-0"
                initial={{ opacity: 0, scale: 0.7, rotate: -90, y: "30%" }}
                animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, rotate: 90, y: "-30%" }}
                transition={{ duration: 1, ease }}
              >
                <Image
                  src={slide.plate}
                  alt={dish.alt}
                  fill
                  sizes="(max-width: 768px) 82vw, 42vw"
                  quality={85}
                  className="object-contain drop-shadow-[0_45px_50px_rgba(0,0,0,0.38)]"
                />
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Description et action */}
        <div className="container-x relative z-30 pb-[calc(var(--mobile-bar-h)+1.5rem)] lg:pb-10">
          <div className="flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={slide.dishId}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease }}
                className="max-w-md"
              >
                <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] opacity-80">{slide.kicker}</p>
                <p className="mt-2 hidden text-[0.98rem] leading-relaxed opacity-90 sm:block">{dish.description}</p>
              </motion.div>
            </AnimatePresence>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => toggleSelection(category, dish.title)}
                className={cn("btn btn-sm", light ? "btn-light" : "btn-ink")}
                aria-pressed={selected}
              >
                {selected ? <FiCheck aria-hidden /> : <FiPlus aria-hidden />}
                {selected ? "Dans ma demande" : "Ajouter à ma demande"}
              </button>
              <Link href="/menu" className={cn("btn btn-sm", light ? "btn-ghost-light" : "btn-outline")}>
                Toute la carte <FiArrowUpRight aria-hidden />
              </Link>
            </div>
          </div>
          <div className="mt-6 flex gap-2" aria-hidden>
            {SLIDES.map((s, i) => (
              <span key={s.dishId} className="relative h-px flex-1">
                <span className="absolute inset-0 bg-current opacity-25" />
                <span
                  className="absolute inset-y-0 left-0 bg-current transition-[width] duration-700"
                  style={{ width: i < index ? "100%" : i === index ? "50%" : "0%" }}
                />
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
