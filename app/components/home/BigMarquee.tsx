"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";

const WORDS = ["Mariages", "Hlels", "Naissances", "Aqiqas", "Fiançailles", "Entreprises", "Anniversaires"];

/** Deux lignes de texte géant qui glissent en sens opposé avec le défilement. */
export default function BigMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x1 = useTransform(scrollYProgress, [0, 1], ["0%", "-30%"]);
  const x2 = useTransform(scrollYProgress, [0, 1], ["-30%", "0%"]);
  const line = [...WORDS, ...WORDS];
  // Les lignes penchent selon la vitesse de défilement
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const skewX = useSpring(useTransform(useVelocity(scrollY), [-2500, 0, 2500], reduced ? [0, 0, 0] : [-8, 0, 8]), {
    stiffness: 220,
    damping: 40,
  });

  return (
    <div ref={ref} className="overflow-hidden border-y border-line bg-paper py-10 md:py-16" aria-hidden>
      <motion.p style={{ x: x1, skewX }} className="flex whitespace-nowrap font-display text-[15vw] leading-[1] tracking-[-0.04em] md:text-[9vw]">
        {line.map((w, i) => (
          <span key={i} className="flex items-center">
            <span className={i % 2 ? "italic text-gold" : ""}>{w}</span>
            <span className="mx-[0.35em] inline-block h-[0.12em] w-[0.12em] rotate-45 bg-ink/70" />
          </span>
        ))}
      </motion.p>
      <motion.p style={{ x: x2, skewX }} className="mt-2 flex whitespace-nowrap font-display text-[15vw] leading-[1] tracking-[-0.04em] md:text-[9vw]">
        {[...line].reverse().map((w, i) => (
          <span key={i} className="flex items-center">
            <span className="text-outline text-ink">{w}</span>
            <span className="mx-[0.35em] inline-block h-[0.12em] w-[0.12em] rotate-45 bg-ink/40" />
          </span>
        ))}
      </motion.p>
    </div>
  );
}
