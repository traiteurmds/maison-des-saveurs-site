"use client";

import { motion } from "framer-motion";

const reviews = [
  { quote: "Service exceptionnel pour notre mariage.", name: "Sarah M." },
  { quote: "Cuisine incroyable et service parfait.", name: "Karim L." },
  { quote: "Le meilleur traiteur marocain à Lyon.", name: "Nadia A." },
];

export default function LuxuryTestimonials() {
  return (
    <section className="border-t border-deep-green/10 bg-beige-dark py-24">
      <div className="mx-auto max-w-5xl px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-serif text-4xl font-semibold text-deep-green md:text-5xl"
        >
          Avis de nos clients
        </motion.h2>
        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.figure
              key={review.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, delay: 0.12 * index, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className="flex flex-col justify-between rounded-3xl bg-white p-8 shadow-[0_20px_55px_rgba(15,31,24,0.1)] transition-all duration-500 hover:shadow-[0_32px_70px_rgba(15,31,24,0.22)]"
            >
              <div>
                <p className="text-2xl leading-none text-amber-400" aria-hidden>★★★★★</p>
                <blockquote className="mt-6 text-base leading-relaxed text-deep-green/85">
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
