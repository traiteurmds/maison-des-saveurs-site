"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function CinematicHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0F1F18] text-white">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1920&q=90"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-[#0F1F18]/88" aria-hidden />
      <div className="hero-grain absolute inset-0 z-[1]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[45vh] min-h-[240px]"
        style={{
          background: "linear-gradient(to top, rgba(15,31,24,0.95), transparent)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 56 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-5xl font-semibold tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl"
          style={{ textShadow: "0 2px 32px rgba(0,0,0,0.25)" }}
        >
          Maison des Saveurs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-serif text-xl text-[#F8F5F0] sm:text-2xl md:text-3xl"
        >
          Traiteur marocain d&apos;exception à Lyon
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-wrap justify-center gap-5"
        >
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#F8F5F0] px-10 py-4 font-medium tracking-widest text-[#F8F5F0] transition-all duration-300 hover:bg-[#F8F5F0]/10"
          >
            Découvrir le menu
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center rounded-full bg-terracotta px-10 py-4 font-medium tracking-widest text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:bg-terracotta/90 hover:shadow-xl"
          >
            Demander un devis
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
