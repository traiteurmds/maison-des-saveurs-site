"use client";

import {
  FaLeaf,
  FaUtensils,
  FaGlobeAfrica,
  FaGlassCheers,
  FaTruck,
  FaUserTie,
  FaCheckCircle,
} from "react-icons/fa";
import Reveal from "./ui/Reveal";

const points = [
  { icon: FaLeaf, label: "Produits frais" },
  { icon: FaUtensils, label: "Cuisine faite maison" },
  { icon: FaGlobeAfrica, label: "Épices sélectionnées au Maroc" },
  { icon: FaGlassCheers, label: "Dressage élégant" },
  { icon: FaTruck, label: "Livraison & installation" },
  { icon: FaUserTie, label: "Service professionnel" },
  { icon: FaCheckCircle, label: "Traiteur halal" },
];

export default function WhyChooseSection() {
  return (
    <section
      className="relative overflow-hidden border-t border-mds-border bg-mds-bg py-16 md:py-20"
      aria-labelledby="why-choose-heading"
    >
      <div className="mds-pattern pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
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

        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
          {points.map((point, i) => {
            const Icon = point.icon;
            return (
              <Reveal key={point.label} delay={0.05 * i}>
                <div className="flex items-center gap-4 rounded-2xl border border-mds-border/80 bg-[var(--surface)]/60 px-5 py-4 shadow-[0_8px_28px_var(--mds-shadow)] backdrop-blur-sm transition-shadow duration-300 hover:shadow-[0_12px_36px_var(--mds-shadow)]">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/35 bg-[var(--soft-gold)]/15 text-[var(--gold)]">
                    <Icon className="text-sm" aria-hidden />
                  </span>
                  <p className="font-serif text-base font-medium text-mds-text md:text-lg">
                    {point.label}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
