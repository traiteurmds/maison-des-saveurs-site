"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FAQ_ITEMS } from "../lib/faq-data";
import Reveal from "../components/ui/Reveal";

export default function FAQPage() {
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-mds-bg pt-28 pb-24">
      <div className="mx-auto max-w-[900px] px-6 py-12 md:px-8 md:py-16">
        <Reveal>
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="lux-heading font-serif text-4xl font-semibold text-mds-text md:text-5xl"
          >
            Questions fréquentes
          </motion.h1>
        </Reveal>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-6 text-lg leading-relaxed text-mds-muted md:mt-8 md:text-xl"
        >
          Vous organisez un événement et vous avez des questions ? Retrouvez ici les réponses aux
          questions les plus fréquentes concernant nos prestations.
        </motion.p>

        <ul className="mt-14 space-y-4 md:mt-16" role="list">
          {FAQ_ITEMS.map((item, index) => {
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
                <div className="glass-card overflow-hidden rounded-2xl transition-all duration-300 hover:shadow-[0_20px_48px_var(--mds-shadow)]">
                  <button
                    type="button"
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-mds-text/[0.03] active:bg-mds-text/[0.05] min-[768px]:px-6 min-[768px]:py-5"
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    id={`faq-question-${item.id}`}
                  >
                    <span className="font-medium text-mds-text md:text-lg">{item.question}</span>
                    <span
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-mds-text/8 text-mds-text transition-transform duration-300"
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
                        <p className="border-t border-mds-border px-5 pb-5 pt-2 text-mds-muted md:px-6 md:pb-6 md:pt-3 md:leading-relaxed">
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
          <h2 className="font-serif text-2xl font-semibold text-mds-text md:text-3xl">
            Vous ne trouvez pas votre réponse ?
          </h2>
          <p className="mt-3 text-mds-muted md:text-lg">
            Notre équipe est à votre écoute pour toute question.
          </p>
          <Link
            href="/contact"
            className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--black)] px-10 py-4 font-medium tracking-widest text-[var(--ivory)] shadow-lg transition-all duration-300 ease-out hover:-translate-y-1 hover:bg-[var(--charcoal)] hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-[var(--gold)] focus:ring-offset-2 focus:ring-offset-[var(--background)]"
          >
            Nous contacter
          </Link>
        </motion.section>
      </div>
    </div>
  );
}
