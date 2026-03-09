"use client";

import { motion } from "framer-motion";

export default function GoogleMapReviews() {
  return (
    <section id="avis" className="border-t border-deep-green/10 bg-beige py-24" aria-labelledby="avis-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <motion.h2
          id="avis-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-serif text-4xl font-semibold text-deep-green md:text-5xl"
        >
          Avis de nos clients
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-30px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 flex flex-col items-center gap-1 text-center"
        >
          <p className="text-deep-green/70 md:text-lg">
            Ils nous ont fait confiance pour leurs événements
          </p>
        </motion.div>

        <div className="mt-14 flex justify-center">
          <div className="w-full max-w-[900px]">
            <div className="flex justify-center">
              <div
                className="elfsight-app-086e1472-babb-4d8b-badb-86c0c9fcf1fa"
                data-elfsight-app-lazy
              />
            </div>
            <script src="https://elfsightcdn.com/platform.js" async />
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="mt-24 flex flex-col items-center justify-center pb-4 pt-6 md:mt-28 md:pb-6 md:pt-8"
        >
          <h3 className="text-center font-serif text-2xl font-semibold text-deep-green md:text-3xl">
            Retrouvez-nous dans la métropole lyonnaise
          </h3>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 overflow-hidden rounded-2xl shadow-lg md:mt-8"
        >
          <iframe
            src="https://www.google.com/maps?q=M%C3%A9tropole+de+Lyon&output=embed"
            title="Carte Métropole de Lyon - Traiteur marocain Lyon, Villeurbanne, Vénissieux, Bron, Feyzin, Saint-Priest"
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
