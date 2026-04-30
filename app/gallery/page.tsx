"use client";

import { motion } from "framer-motion";

const cells = [
  "bg-cell-deep",
  "bg-cell-warm",
  "bg-cell-muted",
  "bg-cell-accent",
  "bg-cell-soft",
  "bg-cell-terracotta-soft",
  "bg-cell-muted",
  "bg-cell-warm",
  "bg-cell-deep",
];

export default function GalleryPage() {
  return (
    <div className="pt-24">
      <section className="relative overflow-hidden border-b border-deep-green/10 bg-soft-gradient-beige py-20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 15% 18%, rgba(184,132,84,0.16), transparent 36%), radial-gradient(circle at 88% 12%, rgba(21,40,31,0.08), transparent 30%)",
          }}
        />
        <div className="mx-auto max-w-4xl px-6 text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="font-serif text-sm uppercase tracking-[0.3em] text-terracotta"
          >
            Instants
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mt-2 font-serif text-5xl font-semibold text-deep-green md:text-6xl"
          >
            Galerie
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4 text-deep-green/80"
          >
            L&apos;ambiance et l&apos;attention portée à chaque détail font la
            singularité de nos événements.
          </motion.p>
        </div>
      </section>

      <section className="bg-soft-gradient-beige py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cells.map((cellClass, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 * i, duration: 0.5 }}
                className={`group relative aspect-[4/3] overflow-hidden rounded-sm border border-deep-green/5 ${cellClass}`}
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background:
                      "radial-gradient(circle at 50% 50%, rgba(31, 58, 46, 0.03) 0%, transparent 70%)",
                  }}
                  aria-hidden
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
