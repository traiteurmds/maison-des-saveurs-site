"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import Reveal from "./ui/Reveal";
import HeroFloatingCards from "./ui/HeroFloatingCards";

function scrollToMenu() {
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
}

const trustBadges = [
  "Mariages",
  "Événements privés",
  "Réceptions professionnelles",
  "Cuisine halal",
];

export default function VisionHero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 500], [0, reduced ? 0 : 60]);
  const contentY = useTransform(scrollY, [0, 500], [0, reduced ? 0 : 30]);

  return (
    <section className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden bg-mds-bg pt-28 pb-32 md:min-h-0 md:py-32 md:pb-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, var(--mds-hero-glow), transparent 50%), radial-gradient(circle at 20% 80%, rgba(21,40,31,0.04), transparent 40%)",
        }}
      />
      <div className="mds-pattern pointer-events-none absolute inset-0 opacity-20" aria-hidden />

      <motion.div
        style={{ y: blobY }}
        aria-hidden
        className="hero-blob pointer-events-none absolute -left-32 top-16 hidden h-80 w-80 bg-terracotta/15 md:block"
      />
      <motion.div
        style={{ y: blobY }}
        aria-hidden
        className="hero-blob pointer-events-none absolute -right-24 bottom-20 hidden h-72 w-72 bg-mds-text/5 md:block"
      />

      <HeroFloatingCards />

      <motion.div
        style={{ y: contentY }}
        className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center px-6 text-center"
      >
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-8 inline-flex items-center rounded-full border border-mds-border bg-mds-card px-5 py-2 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-terracotta shadow-[0_4px_24px_var(--mds-shadow)] md:mb-8"
        >
          Traiteur marocain halal à Lyon
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lux-heading font-serif text-[clamp(2.5rem,8vw,6.5rem)] font-semibold leading-[1.05] tracking-tight text-mds-text"
        >
          Maison Des Saveurs
        </motion.h1>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="hero-accent-line mx-auto mt-8 w-full max-w-[180px]"
          aria-hidden
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 font-serif text-xl tracking-wide text-mds-muted sm:text-2xl md:text-3xl"
        >
          Traiteur traditionnel halal
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex w-full max-w-[300px] flex-col items-center gap-4 md:mt-14 md:max-w-none md:flex-row md:flex-wrap md:justify-center md:gap-5"
        >
          <MagneticButton className="w-full md:w-auto">
            <button type="button" onClick={scrollToMenu} className="btn-hero btn-hero-outline w-full">
              Découvrir le menu
            </button>
          </MagneticButton>
          <MagneticButton className="w-full md:w-auto">
            <Link href="/contact" className="btn-hero btn-hero-primary w-full">
              Demander un devis
            </Link>
          </MagneticButton>
          <MagneticButton className="w-full md:w-auto">
            <Link href="/caftans" className="btn-hero btn-hero-accent w-full">
              Découvrir les caftans
            </Link>
          </MagneticButton>
        </motion.div>

        <Reveal className="mt-14 w-full max-w-lg md:mt-16 md:max-w-3xl" delay={0.2}>
          <div className="grid grid-cols-2 gap-3 sm:gap-4 md:flex md:flex-wrap md:justify-center">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-mds-border bg-mds-card px-3 py-2.5 text-center text-[0.6rem] font-medium uppercase leading-snug tracking-[0.08em] text-mds-muted sm:text-[0.65rem] md:px-4 md:py-2 md:tracking-[0.12em]"
              >
                {badge}
              </span>
            ))}
          </div>
        </Reveal>
      </motion.div>
    </section>
  );
}
