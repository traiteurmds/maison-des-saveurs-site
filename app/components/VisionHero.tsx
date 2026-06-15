"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import Reveal from "./ui/Reveal";

function scrollToMenu() {
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
}

const trustBadges = [
  "Mariages",
  "Événements privés",
  "Réceptions professionnelles",
  "Halal",
];

export default function VisionHero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 400], [0, reduced ? 0 : 40]);
  const contentY = useTransform(scrollY, [0, 400], [0, reduced ? 0 : 20]);

  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden border-b border-deep-green/10 bg-[#f5efe6] text-deep-green md:min-h-[100vh]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 12% 18%, rgba(184,132,84,0.22), transparent 38%), radial-gradient(circle at 88% 12%, rgba(21,40,31,0.1), transparent 32%), linear-gradient(160deg, #f8f2e8 0%, #f4ecdf 45%, #efe4d6 100%)",
        }}
      />
      <div className="mds-pattern pointer-events-none absolute inset-0 opacity-30" aria-hidden />
      <motion.div
        style={{ y: blobY }}
        aria-hidden
        className="hero-blob pointer-events-none absolute -left-24 top-20 h-72 w-72 bg-terracotta/25"
      />
      <motion.div
        style={{ y: blobY }}
        aria-hidden
        className="hero-blob pointer-events-none absolute -right-16 bottom-24 h-64 w-64 bg-deep-green/10"
      />
      <div className="hero-grain absolute inset-0 z-[1]" aria-hidden />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-5 font-serif text-xs uppercase tracking-[0.32em] text-terracotta"
        >
          Traiteur marocain · Lyon
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lux-heading font-serif text-5xl font-semibold tracking-tight text-deep-green sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Maison Des Saveurs
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="hero-accent-line mx-auto mt-6 w-full max-w-[220px]"
          aria-hidden
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl font-serif text-xl tracking-wide text-deep-green/80 sm:text-2xl md:text-3xl"
        >
          Traiteur traditionnel halal
        </motion.p>

        <Reveal className="mt-8 flex flex-wrap justify-center gap-2" delay={0.75}>
          {trustBadges.map((badge) => (
            <span
              key={badge}
              className="rounded-full border border-deep-green/10 bg-white/60 px-4 py-1.5 text-[0.68rem] font-medium uppercase tracking-[0.14em] text-deep-green/75 backdrop-blur"
            >
              {badge}
            </span>
          ))}
        </Reveal>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center gap-5"
        >
          <div className="flex flex-wrap justify-center gap-5">
            <MagneticButton>
              <button type="button" onClick={scrollToMenu} className="btn-hero btn-hero-outline">
                Découvrir le menu
              </button>
            </MagneticButton>
            <MagneticButton>
              <Link href="/contact" className="btn-hero btn-hero-primary">
                Demander un devis
              </Link>
            </MagneticButton>
          </div>
          <MagneticButton>
            <Link href="/caftans" className="btn-hero btn-hero-accent">
              Découvrir les caftans
            </Link>
          </MagneticButton>
        </motion.div>
      </motion.div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 hidden h-24 bg-gradient-to-b from-transparent to-beige-dark/55 md:block"
      />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-6 hidden justify-center md:flex">
        <div className="flex items-center gap-4 text-deep-green/35">
          <span className="h-px w-20 bg-current" />
          <span className="font-serif text-xs tracking-[0.28em]">MDS</span>
          <span className="h-px w-20 bg-current" />
        </div>
      </div>
    </section>
  );
}
