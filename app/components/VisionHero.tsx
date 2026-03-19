"use client";

import { motion } from "framer-motion";

export default function VisionHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-beige text-deep-green">
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
      </div>
    </section>
  );
}
