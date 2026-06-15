"use client";

import Reveal from "./ui/Reveal";

const pillars = [
  {
    title: "Préparation soignée",
    text: "Cuisine traditionnelle faite maison, avec des ingrédients soigneusement sélectionnés et des épices venues du Maroc.",
  },
  {
    title: "Dressage élégant",
    text: "De la réception au dessert, nous assurons une prestation complète, élégante et parfaitement maîtrisée.",
  },
  {
    title: "Saveurs marocaines traditionnelles",
    text: "Couscous, tajines, pâtisseries marocaines et buffets gourmands pour mariages, anniversaires et événements professionnels.",
  },
  {
    title: "Accompagnement personnalisé",
    text: "Menus entièrement personnalisables et prestations sur mesure, adaptées à votre lieu, à votre nombre d'invités et à votre événement.",
  },
];

export default function ExperienceSection() {
  return (
    <section className="mds-section relative overflow-hidden border-t border-mds-border bg-mds-bg">
      <div className="mds-pattern pointer-events-none absolute inset-0 opacity-20 dark:opacity-10" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-sm uppercase tracking-[0.28em] text-terracotta">
            L&apos;expérience Maison Des Saveurs
          </p>
          <h2 className="lux-heading mt-4 font-serif text-4xl font-semibold text-mds-text md:text-5xl">
            Une réception pensée comme un art de recevoir
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-mds-muted">
            Traiteur marocain halal basé à Lyon, nous créons des moments d&apos;exception autour
            d&apos;une cuisine généreuse, raffinée et authentique.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {pillars.map((item, i) => (
            <Reveal key={item.title} delay={0.08 * i}>
              <article className="glass-card group h-full rounded-2xl p-7 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_24px_56px_var(--mds-shadow)]">
                <div className="mb-4 h-px w-10 bg-gradient-to-r from-terracotta to-transparent transition-all duration-500 group-hover:w-16" />
                <h3 className="font-serif text-xl font-semibold text-mds-text">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-mds-muted">{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
