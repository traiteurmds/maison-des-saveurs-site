"use client";

import Link from "next/link";
import { motion } from "framer-motion";

function scrollToMenu() {
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
}

export default function VisionHero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden text-white">
      {/* Gradient fond luxe */}
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(165deg, #0f172a 0%, #1e293b 40%, #334155 100%)",
          backgroundSize: "120% 120%",
        }}
      />
      {/* Overlay subtil pour profondeur */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          background: "radial-gradient(ellipse 100% 100% at 50% 50%, transparent 0%, #0f172a 70%)",
        }}
        aria-hidden
      />
      {/* Léger effet glow */}
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 20%, rgba(148, 163, 184, 0.15) 0%, transparent 50%)",
        }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          background: "radial-gradient(ellipse 60% 80% at 50% 80%, rgba(196, 106, 74, 0.08) 0%, transparent 55%)",
        }}
        aria-hidden
      />
      <div className="hero-grain absolute inset-0 z-[1]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[50vh] min-h-[280px]"
        style={{
          background: "linear-gradient(to top, rgba(15, 23, 42, 0.98), transparent)",
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
          className="mt-6 font-serif text-xl text-slate-200 sm:text-2xl md:text-3xl"
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
            <button
              type="button"
              onClick={scrollToMenu}
              className="inline-flex items-center justify-center rounded-full border-2 border-slate-200 px-10 py-4 font-medium tracking-widest text-slate-100 transition-all duration-500 hover:-translate-y-1 hover:bg-slate-200/10 hover:shadow-[0_12px_40px_rgba(248,250,252,0.15)]"
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
