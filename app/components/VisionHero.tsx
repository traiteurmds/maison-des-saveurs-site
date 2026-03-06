"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

function scrollToMenu() {
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
}

export default function VisionHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-white">
      {/* Fond image cuisine marocaine + overlay sombre */}
      <div className="absolute inset-0">
        <Image
          src="/images/menu/couscous.jpg"
          alt="Cuisine marocaine traiteur Lyon"
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <div
        className="absolute inset-0 bg-deep-green/75"
        style={{
          background: "linear-gradient(135deg, rgba(15,61,46,0.88) 0%, rgba(27,94,68,0.82) 50%, rgba(47,122,90,0.78) 100%)",
        }}
        aria-hidden
      />
      {/* Lumière douce animée très lente (effet premium discret) */}
      <div
        className="absolute inset-0 opacity-30 hero-light-drift"
        style={{
          background: "radial-gradient(ellipse 80% 60% at 50% 30%, rgba(248, 245, 240, 0.12) 0%, transparent 55%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-25"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 80% 70%, rgba(196, 106, 74, 0.06) 0%, transparent 50%)",
        }}
        aria-hidden
      />
      <div className="hero-grain absolute inset-0 z-[1]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[50vh] min-h-[280px]"
        style={{
          background: "linear-gradient(to top, rgba(15, 61, 46, 0.97), transparent)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 64 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ textShadow: "0 4px 40px rgba(0,0,0,0.35)" }}
        >
          Maison des Saveurs — Traiteur marocain à Lyon
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-serif text-xl text-beige/95 sm:text-2xl md:text-3xl"
        >
          Cuisine marocaine authentique pour mariages, événements et réceptions à Lyon.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.9, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-wrap justify-center gap-5"
        >
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
          >
            <button
              type="button"
              onClick={scrollToMenu}
              className="btn-hero-outline inline-flex items-center justify-center rounded-full border-2 border-beige px-10 py-4 font-medium tracking-widest text-beige transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:bg-beige/10 hover:shadow-lg hover:shadow-[0_8px_32px_rgba(248,245,240,0.12)]"
            >
              Découvrir le menu
            </button>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/contact"
              className="btn-hero-cta inline-flex items-center justify-center rounded-full bg-terracotta px-10 py-4 font-medium tracking-widest text-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-105 hover:shadow-xl hover:shadow-terracotta/25"
            >
              Demander un devis
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
