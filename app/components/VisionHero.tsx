"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function scrollToMenu() {
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
}

export default function VisionHero() {
  return (
    <section className="relative flex min-h-[100svh] items-center justify-center overflow-hidden border-b border-deep-green/10 bg-beige text-deep-green md:min-h-[100vh]">
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl font-semibold tracking-tight text-deep-green sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Maison Des Saveurs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl font-serif text-xl tracking-wide text-deep-green/80 sm:text-2xl md:text-3xl"
        >
          Traiteur traditionnel halal
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
          className="mt-12 flex flex-wrap justify-center gap-5"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={scrollToMenu}
              className="inline-flex min-h-[52px] min-w-[210px] items-center justify-center rounded-full border border-deep-green/35 bg-white/40 px-10 py-4 font-medium tracking-[0.18em] text-deep-green transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-lg md:min-h-[56px] md:min-w-[230px]"
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
              className="inline-flex min-h-[52px] min-w-[210px] items-center justify-center rounded-full bg-deep-green px-10 py-4 font-medium tracking-[0.18em] text-beige shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl md:min-h-[56px] md:min-w-[230px]"
            >
              Demander un devis
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
