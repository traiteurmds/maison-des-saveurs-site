"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    quote: "Service exceptionnel, nos invités ont adoré.",
    name: "Sophie L.",
  },
  {
    quote: "Présentation magnifique et plats délicieux.",
    name: "Marc D.",
  },
  {
    quote: "Le meilleur traiteur marocain à Lyon. Nous reviendrons.",
    name: "Nadia A.",
  },
];

export default function LuxuryReviews() {
  return (
    <section className="border-t border-deep-green/10 bg-beige py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <p className="font-serif text-sm uppercase tracking-[0.3em] text-terracotta">
            Témoignages
          </p>
          <h2 className="mt-2 font-serif text-3xl font-semibold text-deep-green md:text-4xl">
            Avis de nos clients
          </h2>
        </motion.div>

        <div className="mt-14 grid gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.figure
              key={review.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: 0.1 * index,
                ease: [0.22, 1, 0.36, 1],
              }}
              whileHover={{ y: -4 }}
              className="flex flex-col justify-between rounded-3xl bg-white/95 p-8 shadow-[0_14px_40px_rgba(15,31,24,0.12)] ring-1 ring-deep-green/5 transition-shadow duration-300 hover:shadow-[0_24px_56px_rgba(15,31,24,0.18)]"
            >
            <div>
              <p className="text-xl leading-none text-amber-400" aria-hidden>★★★★★</p>
              <blockquote className="mt-5 text-base leading-relaxed text-deep-green/85">
                &quot;{review.quote}&quot;
              </blockquote>
            </div>
            <figcaption className="mt-6 font-serif text-sm font-semibold text-deep-green/90">
              — {review.name}
            </figcaption>
          </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
