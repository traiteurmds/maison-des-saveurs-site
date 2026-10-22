"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { Rubrique } from "../../lib/journal/types";

const ease = [0.22, 1, 0.36, 1] as const;

/** Une du Journal : grand titre de magazine, promesse éditoriale et accès aux rubriques. */
export default function JournalMasthead({ intro, rubriques }: { intro: string; rubriques: Rubrique[] }) {
  const reduced = useReducedMotion();
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0.01, y: 30 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1.1, ease, delay },
        };

  return (
    <section className="relative overflow-hidden bg-paper pt-[calc(var(--header-h)+env(safe-area-inset-top)+2.5rem)] md:pt-[calc(var(--header-h)+4rem)]">
      <div className="container-x">
        <motion.div
          className="flex items-center justify-between gap-6 border-b border-line-dark pb-4 text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-ink-3"
          {...rise(0)}
        >
          <span className="eyebrow">Le Journal</span>
          <span className="hidden sm:inline">Cuisine marocaine · Traditions · Réceptions</span>
          <span>Lyon</span>
        </motion.div>

        <motion.h1 className="mt-8 text-ink md:mt-10" {...rise(0.08)}>
          <span className="block font-display text-[clamp(3.6rem,13.5vw,12.5rem)] leading-[0.86] tracking-[-0.05em]">
            Le Journal
          </span>
          <span className="mt-3 block font-display text-[clamp(1.7rem,4.4vw,4rem)] italic leading-none tracking-[-0.03em] text-gold md:mt-4 md:pl-[0.4em]">
            de Maison Des Saveurs
          </span>
        </motion.h1>

        <div className="mt-12 grid gap-8 md:mt-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <motion.p
            className="font-display text-[clamp(1.45rem,2.4vw,2.1rem)] leading-[1.2] tracking-[-0.015em] text-ink"
            {...rise(0.2)}
          >
            Histoires de cuisine, traditions marocaines et instants de partage.
          </motion.p>
          <motion.p className="lead" {...rise(0.28)}>
            {intro}
          </motion.p>
        </div>

        <motion.nav aria-label="Rubriques du Journal" className="mt-14 border-y border-line md:mt-20" {...rise(0.36)}>
          <ul className="snap-row -mx-[clamp(1.25rem,4vw,3rem)] gap-0 px-[clamp(1.25rem,4vw,3rem)] lg:mx-0 lg:grid lg:grid-cols-6 lg:px-0">
            {rubriques.map((r) => (
              <li key={r.id} className="border-r border-line last:border-r-0 lg:border-r">
                <a
                  href={`#${r.id}`}
                  className="group flex h-full min-w-[11rem] flex-col gap-2 px-5 py-5 transition-colors duration-300 hover:bg-ivory lg:min-w-0"
                >
                  <span className="font-display text-[0.95rem] text-gold">{r.number}</span>
                  <span className="text-[0.8rem] font-semibold leading-snug text-ink-3 transition-colors group-hover:text-ink">
                    {r.label}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      </div>
    </section>
  );
}
