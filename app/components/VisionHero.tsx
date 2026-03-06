"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function scrollToMenu() {
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
}

export default function VisionHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-deep-green text-white">
      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 48 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
        >
          Cuisine marocaine d&apos;exception à Lyon
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 max-w-2xl font-serif text-xl text-beige/95 sm:text-2xl md:text-3xl"
        >
          Maison des Saveurs sublime vos événements avec une cuisine marocaine authentique, raffinée et généreuse.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-wrap justify-center gap-5"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={scrollToMenu}
              className="inline-flex min-h-[52px] min-w-[200px] items-center justify-center rounded-full border-2 border-beige px-10 py-4 font-medium tracking-widest text-beige transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-beige/10 hover:shadow-lg md:min-h-[56px] md:min-w-[220px]"
            >
              Découvrir le menu
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/contact"
              className="inline-flex min-h-[52px] min-w-[200px] items-center justify-center rounded-full bg-terracotta px-10 py-4 font-medium tracking-widest text-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl hover:shadow-terracotta/25 md:min-h-[56px] md:min-w-[220px]"
            >
              Demander un devis
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
