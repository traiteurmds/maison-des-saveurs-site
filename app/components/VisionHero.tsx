"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

export default function VisionHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0F1F18] text-white">
      <div className="absolute inset-0">
        <motion.div
          className="h-full w-full"
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Image
            src="/images/menu/pastilla.jpg"
            alt="Pastilla marocaine traditionnelle faite maison"
            fill
            className="object-cover"
            sizes="100vw"
            priority
          />
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-[#0F1F18]/85" aria-hidden />
      <div className="hero-grain absolute inset-0 z-[1]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[50vh] min-h-[280px]"
        style={{
          background: "linear-gradient(to top, rgba(15,31,24,0.97), transparent)",
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
          Maison des Saveurs
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 font-serif text-xl text-[#F8F5F0] sm:text-2xl md:text-3xl"
        >
          Traiteur marocain d&apos;exception à Lyon
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
            <Link
              href="#menu"
              className="inline-flex items-center justify-center rounded-full border-2 border-[#F8F5F0] px-10 py-4 font-medium tracking-widest text-[#F8F5F0] transition-all duration-500 hover:-translate-y-1 hover:bg-[#F8F5F0]/10 hover:shadow-[0_12px_40px_rgba(248,245,240,0.15)]"
            >
              Découvrir le menu
            </Link>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 1.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-full bg-terracotta px-10 py-4 font-medium tracking-widest text-white shadow-lg transition-all duration-500 hover:-translate-y-1 hover:shadow-xl hover:shadow-terracotta/30"
            >
              Demander un devis
            </Link>
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
