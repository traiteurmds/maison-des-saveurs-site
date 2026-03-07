"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const faqData = [
  {
    id: "events",
    question: "Quels types d'événements acceptez-vous ?",
    answer:
      "Nous réalisons tous types d'événements : mariages, anniversaires, fêtes privées, événements d'entreprise ou réceptions familiales. Que votre événement soit intime ou très grand, notre équipe s'adapte à votre besoin.",
  },
  {
    id: "zones",
    question: "Dans quelles zones intervenez-vous ?",
    answer:
      "Nous sommes basés à Lyon et intervenons principalement sur Lyon et toute sa région. Pour les grands événements, nous pouvons également nous déplacer partout en France.",
  },
  {
    id: "reservation",
    question: "Combien de temps à l'avance faut-il réserver ?",
    answer:
      "Nous recommandons de réserver au moins un mois à l'avance afin de préparer votre événement dans les meilleures conditions. Cependant, si votre demande est urgente, contactez-nous : nous faisons toujours notre maximum pour trouver une solution rapidement.",
  },
  {
    id: "personnalisation",
    question: "Peut-on personnaliser le menu ?",
    answer:
      "Oui, tous nos menus sont entièrement personnalisables. Vous pouvez choisir vos entrées, plats et desserts afin de créer un menu qui correspond parfaitement à votre événement.",
  },
  {
    id: "mariages",
    question: "Proposez-vous des services pour les mariages ?",
    answer:
      "Oui, les mariages font partie de nos spécialités. Nous vous accompagnons dans l'organisation culinaire de votre réception afin d'offrir une expérience inoubliable à vos invités.",
  },
  {
    id: "preparation",
    question: "Où la nourriture est-elle préparée ?",
    answer:
      "Selon votre préférence, nous pouvons cuisiner dans notre cuisine professionnelle puis venir effectuer le dressage sur votre lieu d'événement, ou bien cuisiner directement sur place si l'infrastructure le permet.",
  },
  {
    id: "vegetarien",
    question: "Proposez-vous des plats végétariens ?",
    answer:
      "Nous pouvons adapter plusieurs de nos plats pour proposer des options sans viande, comme certaines salades ou un couscous végétarien. N'hésitez pas à nous contacter pour discuter de vos besoins spécifiques.",
  },
  {
    id: "devis",
    question: "Comment obtenir un devis ?",
    answer:
      "Pour obtenir un devis personnalisé, vous pouvez nous contacter via le formulaire du site, par email ou par téléphone pour une réponse plus rapide.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <section id="faq" className="border-t border-deep-green/10 bg-neutral-100 py-24" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-3xl px-6">
        <motion.h2
          id="faq-heading"
          className="text-center font-serif text-4xl font-semibold text-deep-green md:text-5xl"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          Questions fréquentes
        </motion.h2>
        <motion.p
          className="mt-4 text-center text-deep-green/70 md:text-lg"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        >
          Tout ce que vous devez savoir avant de nous confier votre événement.
        </motion.p>

        <ul className="mt-14 space-y-4" role="list">
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
                <div
                  className="overflow-hidden rounded-2xl bg-white shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-shadow duration-300 hover:shadow-[0_8px_30px_rgba(0,0,0,0.08)]"
                  style={{ willChange: "box-shadow" }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors hover:bg-deep-green/[0.02] md:px-8 md:py-6"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    id={`faq-question-${item.id}`}
                  >
                    <span className="font-medium text-deep-green md:text-lg">{item.question}</span>
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-deep-green/10 text-deep-green transition-all duration-300 ease-out"
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
                        <p className="border-t border-deep-green/5 px-6 pb-5 pt-1 text-deep-green/85 md:px-8 md:pb-6 md:pt-2 md:leading-relaxed">
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
      </div>
    </section>
  );
}
