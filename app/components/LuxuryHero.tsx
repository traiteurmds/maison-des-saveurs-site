"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function LuxuryHero() {
  const { scrollYProgress } = useScroll();
  const heroParallaxY = useTransform(scrollYProgress, [0, 0.25], [0, 12]);

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0F1F18] text-white">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1547592166-23ac45744acd?w=1920&q=85"
          alt=""
          fill
          className="object-cover"
          sizes="100vw"
          priority
        />
      </div>
      <div className="absolute inset-0 bg-[#0F1F18]/88" aria-hidden />
      <motion.div
        className="absolute inset-0 hero-gradient-layer opacity-90"
        style={{ y: heroParallaxY }}
        aria-hidden
      />
      <div className="hero-grain absolute inset-0 z-[1]" aria-hidden />
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[2] h-[42vh] min-h-[220px]"
        style={{
          background: "linear-gradient(to top, rgba(15,31,24,0.95), transparent)",
        }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-center px-6 text-center">
        <div className="relative">
          <div className="hero-heading-glow pointer-events-none absolute -inset-x-8 top-1/2 h-32 -translate-y-1/2" aria-hidden />
          <motion.h1
            initial={{ opacity: 0, y: 48 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="relative font-serif text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl lg:text-7xl"
            style={{ textShadow: "0 2px 24px rgba(0,0,0,0.2), 0 1px 8px rgba(0,0,0,0.12)" }}
          >
            Traiteur Marocain Halal à Lyon
          </motion.h1>
          <motion.div
            className="hero-accent-line mx-auto mt-5 w-full max-w-[280px]"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
            aria-hidden
          />
        </div>
        <motion.p
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-8 max-w-3xl font-serif text-lg sm:text-xl md:text-2xl"
          style={{ color: "#F8F5F0" }}
        >
          Maison des Saveurs est un traiteur marocain halal basé à Lyon proposant des buffets gourmands pour mariages, anniversaires et événements professionnels. Cuisine traditionnelle faite maison, ingrédients soigneusement sélectionnés et épices venues du Maroc.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-14 flex flex-wrap justify-center gap-5"
        >
          <Link href="/contact" className="group inline-flex items-center justify-center rounded-full bg-terracotta px-10 py-4 font-medium tracking-widest text-white shadow-lg shadow-black/25 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-terracotta/90 hover:shadow-xl hover:shadow-black/35">
            Demander un devis
          </Link>
          <Link
            href="/services"
            className="inline-flex items-center justify-center rounded-full border-2 border-[#F8F5F0] px-10 py-4 font-medium tracking-widest text-[#F8F5F0] shadow-[0_10px_40px_rgba(0,0,0,0.35)] transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-[#F8F5F0]/10"
          >
            Découvrir nos prestations
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="pointer-events-none absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <div className="flex flex-col items-center gap-3 text-[10px] font-medium tracking-[0.3em] text-[#F8F5F0]/70 uppercase">
            <span>Faire défiler</span>
            <div className="relative h-10 w-px overflow-hidden rounded-full bg-[#F8F5F0]/30">
              <motion.span
                className="absolute inset-x-0 top-0 h-3 rounded-full bg-[#F8F5F0]"
                animate={{ y: [0, 24, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
