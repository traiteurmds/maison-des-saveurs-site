"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    id: "events",
    question: "Quels types d'événements acceptez-vous ?",
    answer:
      "Nous réalisons tous types d'événements : mariages, anniversaires, fêtes privées, événements d'entreprise ou réceptions familiales. Que votre événement soit intime ou très grand, nous nous adaptons à votre besoin.",
  },
  {
    id: "zones",
    question: "Dans quelles zones intervenez-vous ?",
    answer:
      "Nous intervenons principalement à Lyon et dans toute la région lyonnaise. Pour les événements plus importants, nous pouvons également nous déplacer partout en France.",
  },
  {
    id: "reservation",
    question: "Combien de temps à l'avance faut-il réserver ?",
    answer:
      "Nous recommandons de réserver environ un mois à l'avance afin de préparer votre événement dans les meilleures conditions. Cependant, si votre demande est urgente, contactez-nous : nous faisons toujours notre maximum pour trouver une solution rapidement.",
  },
  {
    id: "personnalisation",
    question: "Peut-on personnaliser le menu ?",
    answer:
      "Oui, tous nos menus sont entièrement personnalisables. Vous pouvez choisir vos entrées, plats et desserts afin de créer un menu qui correspond parfaitement à votre événement.",
  },
  {
    id: "mariages",
    question: "Proposez-vous des prestations pour les mariages ?",
    answer:
      "Oui, nous réalisons régulièrement des prestations pour les mariages. Notre objectif est de proposer une cuisine marocaine généreuse et élégante pour rendre votre réception inoubliable.",
  },
  {
    id: "prestation",
    question: "Comment se déroule la prestation traiteur ?",
    answer:
      "Nous pouvons préparer les plats dans notre cuisine puis venir effectuer le dressage sur votre lieu d'événement. Il est également possible de cuisiner directement sur place si les conditions le permettent.",
  },
  {
    id: "sans-viande",
    question: "Proposez-vous des plats sans viande ?",
    answer:
      "Certains plats peuvent être adaptés sans viande, comme le couscous végétarien ou certaines entrées et salades.",
  },
  {
    id: "devis",
    question: "Comment obtenir un devis ?",
    answer:
      "Pour obtenir un devis personnalisé, vous pouvez nous contacter via le formulaire du site, par email ou par téléphone pour une réponse plus rapide.",
  },
];

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-soft-gradient-beige pt-24 pb-24">
      <div className="mx-auto max-w-[900px] px-6 py-12 md:px-8 md:py-16">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lux-heading font-serif text-4xl font-semibold text-deep-green md:text-5xl"
        >
          Questions fréquentes
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-lg leading-relaxed text-deep-green/80 md:mt-8 md:text-xl"
        >
          Vous organisez un événement et vous avez des questions ? Retrouvez ici les réponses aux
          questions les plus fréquentes concernant nos prestations.
        </motion.p>

        <ul className="mt-14 space-y-4 md:mt-16" role="list">
          {faqData.map((item, index) => {
            const isOpen = openId === item.id;
            return (
              <motion.li
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.4, delay: index * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className="list-none"
              >
                <div className="lux-surface overflow-hidden rounded-2xl p-1 transition-shadow duration-300 hover:shadow-[0_16px_36px_rgba(15,29,23,0.12)]">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-deep-green/[0.02] active:bg-deep-green/[0.04] min-[768px]:px-6 min-[768px]:py-5"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    id={`faq-question-${item.id}`}
                  >
                    <span className="font-medium text-deep-green md:text-lg">{item.question}</span>
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-deep-green/10 text-deep-green transition-transform duration-300"
                      aria-hidden
                    >
                      <motion.span
                        animate={{ rotate: isOpen ? 45 : 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="text-xl leading-none"
                      >
                        +
                      </motion.span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`faq-answer-${item.id}`}
                        role="region"
                        aria-labelledby={`faq-question-${item.id}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="border-t border-deep-green/5 px-5 pb-5 pt-2 text-deep-green/85 md:px-6 md:pb-6 md:pt-3 md:leading-relaxed">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.li>
            );
          })}
        </ul>

        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="lux-surface mt-20 rounded-2xl px-6 py-10 text-center md:mt-24 md:px-10 md:py-14"
        >
          <h2 className="font-serif text-2xl font-semibold text-deep-green md:text-3xl">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="mt-3 text-deep-green/70 md:text-lg">
            Notre équipe est à votre écoute pour toute question.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-terracotta px-10 py-4 font-medium tracking-widest text-white shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-xl hover:shadow-terracotta/25 focus:outline-none focus:ring-2 focus:ring-terracotta focus:ring-offset-2 focus:ring-offset-beige"
          >
            Nous contacter
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
