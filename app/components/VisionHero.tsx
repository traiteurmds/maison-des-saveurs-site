"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import ReceptionComposerCard from "./ReceptionComposerCard";

function scrollToMenu() {
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
}

export default function VisionHero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 500], [0, reduced ? 0 : 30]);

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-mds-bg pt-28 pb-20 md:min-h-[92vh] md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 15% 0%, rgba(198,164,106,0.08), transparent 55%), radial-gradient(ellipse 50% 40% at 95% 100%, rgba(11,11,10,0.04), transparent 50%), linear-gradient(180deg, var(--ivory) 0%, var(--cream) 100%)",
        }}
      />

      <motion.div
        style={{ y: blobY }}
        aria-hidden
        className="hero-blob pointer-events-none absolute -right-20 top-1/4 hidden h-96 w-96 bg-[var(--gold)]/6 lg:block"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:px-8">
        <div className="flex flex-col items-center text-center lg:items-start lg:text-left">
          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            className="lux-heading font-serif text-[clamp(2.75rem,7vw,5.25rem)] font-semibold leading-[1.02] tracking-tight text-mds-text"
          >
            Maison Des Saveurs
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="hero-accent-line mx-auto mt-6 w-full max-w-[200px] lg:mx-0"
            aria-hidden
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="mt-6 font-serif text-xl tracking-wide text-mds-muted sm:text-2xl lg:text-[1.55rem]"
          >
            Traiteur traditionnel halal
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.65 }}
            className="mx-auto mt-10 flex w-full max-w-[440px] flex-col items-stretch gap-3.5 lg:mx-0 lg:max-w-none lg:flex-row lg:flex-nowrap lg:items-center lg:justify-start lg:gap-3"
          >
            <button
              type="button"
              onClick={scrollToMenu}
              className="btn-hero btn-hero-outline w-full lg:w-auto"
            >
              Découvrir le menu
            </button>
            <Link href="/caftans" className="btn-hero btn-hero-outline w-full lg:w-auto">
              Découvrir les caftans
            </Link>
            <Link href="/contact" className="btn-hero btn-hero-primary w-full lg:w-auto">
              Demander un devis
            </Link>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <ReceptionComposerCard onBrowseMenu={scrollToMenu} />
        </motion.div>
      </div>
    </section>
  );
}
