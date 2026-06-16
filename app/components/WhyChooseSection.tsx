"use client";

import {
  FaLeaf,
  FaUtensils,
  FaStar,
  FaConciergeBell,
  FaUsers,
  FaHandshake,
} from "react-icons/fa";
import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";

const points = [
  { icon: FaLeaf, label: "Produits frais" },
  { icon: FaUtensils, label: "Cuisine faite maison" },
  { icon: FaStar, label: "Épices sélectionnées au Maroc" },
  { icon: FaConciergeBell, label: "Dressage élégant" },
  { icon: FaUsers, label: "Équipe expérimentée" },
  { icon: FaHandshake, label: "Accompagnement complet" },
];

export default function WhyChooseSection() {
  return (
    <section
      className="relative overflow-hidden border-t border-mds-border bg-mds-bg py-16 md:py-20"
      aria-labelledby="why-choose-heading"
    >
      <div className="mds-pattern pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-sm uppercase tracking-[0.28em] text-[var(--gold)]">
            Notre engagement
          </p>
          <h2
            id="why-choose-heading"
            className="lux-heading mt-4 font-serif text-3xl font-semibold text-mds-text md:text-4xl"
          >
            Pourquoi choisir Maison Des Saveurs ?
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 items-stretch gap-4 md:grid-cols-3 md:gap-5">
          {points.map((point, i) => {
            const Icon = point.icon;
            return (
              <Reveal key={point.label} delay={0.05 * i} className="h-full">
                <motion.div
                  whileHover={{ y: -3 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                  className="flex h-full min-h-[88px] items-center gap-4 rounded-2xl border border-[var(--gold)]/20 bg-[var(--surface)] px-5 py-5 shadow-[0_8px_28px_var(--mds-shadow)] transition-shadow duration-300 hover:border-[var(--gold)]/35 hover:shadow-[0_14px_40px_var(--mds-shadow)] md:min-h-[96px] md:px-6"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/30 bg-[var(--soft-gold)]/15 text-[var(--gold)]">
                    <Icon className="text-sm" aria-hidden />
                  </span>
                  <p className="font-serif text-base font-medium leading-snug text-mds-text md:text-lg">
                    {point.label}
                  </p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
