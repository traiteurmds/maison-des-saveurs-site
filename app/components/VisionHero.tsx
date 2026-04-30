"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function scrollToMenu() {
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
}

export default function VisionHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden border-b border-white/10 bg-[#0f0f12] text-[#f2eee7] md:min-h-[100vh]">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(120deg, rgba(10,10,14,0.86), rgba(10,10,14,0.52)), url('/images/menu/couscous.jpg') center/cover no-repeat",
        }}
      />
      <div className="hero-grain absolute inset-0 z-[1] opacity-60" aria-hidden />
      <div className="pointer-events-none absolute inset-0 z-[2] bg-[radial-gradient(circle_at_20%_20%,rgba(184,153,106,0.25),transparent_35%)]" aria-hidden />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="lux-heading font-serif text-5xl font-semibold tracking-tight text-[#f7f3ec] sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Maison Des Saveurs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-3xl font-serif text-xl tracking-wide text-[#f7f3ec]/85 sm:text-2xl md:text-3xl"
        >
          Traiteur traditionnel halal
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-5 max-w-2xl text-sm tracking-[0.18em] text-[#ccb287]/90 uppercase"
        >
          Mariages · Événements privés · Réceptions d&apos;exception
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-col items-center gap-5"
        >
          <div className="flex flex-wrap justify-center gap-5">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
            >
              <button
                type="button"
                onClick={scrollToMenu}
                className="inline-flex min-h-[52px] min-w-[210px] items-center justify-center rounded-full border border-[#ccb287]/40 bg-white/10 px-10 py-4 font-medium tracking-[0.18em] text-[#f5f0e8] shadow-[0_8px_24px_rgba(0,0,0,0.3)] backdrop-blur transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-white/15 hover:shadow-lg md:min-h-[56px] md:min-w-[230px]"
              >
                Découvrir le menu
              </button>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
            >
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] min-w-[210px] items-center justify-center rounded-full bg-gradient-to-r from-[#b8996a] to-[#ccb287] px-10 py-4 font-medium tracking-[0.18em] text-[#15151b] shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl md:min-h-[56px] md:min-w-[230px]"
              >
                Demander un devis
              </Link>
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 1.35, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/caftans"
              className="inline-flex min-h-[52px] min-w-[240px] items-center justify-center rounded-full border border-[#ccb287]/50 bg-[#15151d]/70 px-10 py-4 font-medium tracking-[0.18em] text-[#ccb287] shadow-[0_8px_24px_rgba(0,0,0,0.28)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#1d1d27] hover:shadow-lg md:min-h-[56px]"
            >
              Découvrir les caftans
            </Link>
          </motion.div>
        </motion.div>
      </div>
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
