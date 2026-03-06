"use client";

import { motion } from "framer-motion";

export default function GlobeLyon() {
  return (
    <section className="relative overflow-hidden border-t border-white/5 bg-[#0f172a] py-24">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col items-center gap-16 lg:flex-row lg:gap-20">
          {/* Globe visuel */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex shrink-0 items-center justify-center"
          >
            <div className="relative h-64 w-64 md:h-80 md:w-80">
              {/* Cercle globe avec gradient */}
              <div
                className="absolute inset-0 animate-globe rounded-full border border-slate-500/30 shadow-[inset_0_0_60px_rgba(15,23,42,0.8)]"
                style={{
                  background: "radial-gradient(circle at 30% 30%, #334155 0%, #1e293b 40%, #0f172a 100%)",
                }}
              />
              {/* Point Lyon */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="absolute left-1/2 top-[42%] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta shadow-[0_0_20px_rgba(196,106,74,0.8)]"
                aria-hidden
              />
              {/* Anneau */}
              <div
                className="absolute inset-0 animate-globe rounded-full border border-slate-500/20"
                style={{ transform: "rotateX(75deg) scale(1.05)" }}
                aria-hidden
              />
            </div>
          </motion.div>

          {/* Texte */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="font-serif text-3xl font-semibold text-white md:text-4xl lg:text-5xl">
              Basé à Lyon
            </h2>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate-300">
              Maison des Saveurs accompagne vos événements avec une cuisine marocaine authentique et
              raffinée. Mariages, séminaires ou réceptions : nous nous déplaçons dans toute la métropole
              lyonnaise pour sublimer vos moments.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
