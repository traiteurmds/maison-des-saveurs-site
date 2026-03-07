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
            Une cuisine faite avec le cœur
          </motion.h2>
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 space-y-6 text-lg leading-relaxed text-deep-green/90"
          >
            <p>
              Maison Des Saveurs est avant tout une histoire de cœur. Derrière chaque plat se trouve une maman marocaine passionnée par la cuisine et par le plaisir de recevoir. Depuis toujours, cuisiner est bien plus qu&apos;un métier : c&apos;est une véritable passion, une manière de partager, de rassembler et de faire plaisir aux autres.
            </p>
            <p>
              Chaque recette est préparée comme à la maison, avec la même attention que pour sa propre famille. Les saveurs authentiques du Maroc, les épices choisies avec soin et les plats généreux rappellent les grandes tables où tout le monde se réunit pour partager un moment chaleureux.
            </p>
            <p>
              Se lancer dans ce métier est né d&apos;une envie simple : offrir aux gens des repas qui comptent vraiment. Lors d&apos;un mariage, d&apos;un anniversaire ou d&apos;une fête, la nourriture est au cœur du moment. C&apos;est ce qui rassemble les invités, ce qui crée les souvenirs et ce dont tout le monde se souvient en rentrant chez soi.
            </p>
            <p>
              Notre objectif est simple : que chaque événement soit accompagné d&apos;un repas délicieux, généreux et authentique, pour que chacun puisse partager un vrai moment de bonheur autour de la table.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="border-t border-deep-green/10 bg-beige-dark py-24">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="text-center font-serif text-3xl font-semibold text-deep-green md:text-4xl"
          >
            Nos engagements
          </motion.h2>
          <div className="mt-16 grid grid-cols-1 gap-16 md:grid-cols-3 lg:gap-24">
            {[
              { title: "Une cuisine faite avec amour", text: "Chaque plat est préparé avec le même soin qu'un repas pour sa propre famille. Les recettes sont inspirées de la tradition marocaine, avec des ingrédients de qualité et des épices sélectionnées pour retrouver les vraies saveurs d'antan. Ici, rien n'est fait à la va-vite : tout est cuisiné avec patience, passion et beaucoup de cœur." },
              { title: "Le plaisir de partager", text: "Pour nous, un événement réussi est un moment où les invités se retrouvent autour d'une belle table et partagent un bon repas ensemble. La cuisine marocaine est une cuisine généreuse, faite pour être partagée. Voir les invités apprécier les plats et repartir satisfaits est la plus belle récompense." },
              { title: "Votre événement compte", text: "Chaque mariage, anniversaire ou réception est unique et mérite une attention particulière. Nous prenons le temps d'écouter chaque client afin de proposer un menu adapté à ses envies, à sa culture et à son budget. Le plus important est que vos invités passent un moment inoubliable et repartent avec le souvenir d'un repas exceptionnel." },
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
                <p className="mt-3 text-lg leading-loose text-deep-green/80">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
