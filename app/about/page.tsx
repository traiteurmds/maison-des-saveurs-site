"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="pt-24">
      <section className="relative h-[50vh] min-h-[400px] overflow-hidden bg-page-hero grain-overlay flex items-center justify-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 font-serif text-5xl font-semibold text-beige md:text-6xl"
        >
          Notre histoire
        </motion.h1>
      </section>

      <section className="bg-beige py-24">
        <div className="mx-auto max-w-4xl px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="font-serif text-sm uppercase tracking-[0.3em] text-terracotta"
          >
            Maison Des Saveurs
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-2 font-serif text-3xl font-semibold text-deep-green md:text-4xl"
          >
            Une passion pour l&apos;excellence
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 space-y-6 text-lg leading-relaxed text-deep-green/90"
          >
            <p>
              Notre chef réunit plus de vingt ans d&apos;expérience en
              gastronomie et des racines profondes dans la tradition culinaire
              marocaine. Chaque plat traditionnel est préparé avec précision et
              authenticité—tout est fait maison, avec des ingrédients de
              première qualité et des épices importées directement du Maroc.
            </p>
            <p>
              Nous nous adaptons à vos goûts, à votre culture et à votre budget,
              pour que la table du plus beau jour de votre vie reste
              inoubliable. Élégance, authenticité, générosité et excellence :
              telle est notre promesse pour vos mariages et vos célébrations à
              Lyon et Villeurbanne.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-deep-green/10 bg-beige-dark py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center font-serif text-3xl font-semibold text-deep-green md:text-4xl"
          >
            Nos valeurs
          </motion.h2>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {[
              { title: "Exigence", text: "Ingrédients de qualité et épices du Maroc. Nous ne transigeons jamais sur la technique ni sur l'authenticité." },
              { title: "Élégance", text: "Chaque détail—du dressage au service—est pensé pour sublimer votre plus beau jour." },
              { title: "Confiance", text: "Nous nous adaptons à vos goûts, votre culture et votre budget, du premier échange au dernier plat." },
            ].map((item, i) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: 0.08 * i, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <h3 className="font-serif text-xl font-semibold text-terracotta">
                  {item.title}
                </h3>
                <p className="mt-3 text-deep-green/80">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
