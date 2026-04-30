"use client";

import { motion } from "framer-motion";

const highlights = [
  "Cuisine marocaine traditionnelle faite maison",
  "Prestations sur mesure pour tous vos événements",
  "Service haut de gamme, de la réception au dessert",
];

export default function BrandStorySection() {
  return (
    <section className="border-t border-white/10 lux-section-dark py-24">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2 lg:items-center lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="space-y-6"
        >
          <p className="font-serif text-sm uppercase tracking-[0.28em] text-[#ccb287]">
            Signature Maison Des Saveurs
          </p>
          <h2 className="lux-heading font-serif text-4xl font-semibold text-[#f6f2eb] md:text-5xl">
            Une expérience traiteur pensée comme un art de recevoir.
          </h2>
          <p className="max-w-xl text-lg leading-relaxed text-[#f6f2eb]/75">
            Maison des Saveurs est un traiteur marocain halal basé à Lyon proposant des buffets
            gourmands pour mariages, anniversaires et événements professionnels.
          </p>
          <ul className="space-y-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[#f6f2eb]/82">
                <span className="mt-2 h-2 w-2 rounded-full bg-[#ccb287]" aria-hidden />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
          className="lux-surface rounded-3xl p-8 md:p-10"
        >
          <p className="font-serif text-2xl text-[#f6f2eb]">
            &quot;Cuisine traditionnelle, ingrédients soigneusement sélectionnés et service élégant
            pour faire de chaque réception un moment inoubliable.&quot;
          </p>
          <p className="mt-6 text-sm uppercase tracking-[0.24em] text-[#ccb287]/95">
            Maison Des Saveurs
          </p>
        </motion.div>
      </div>
    </section>
  );
}
