"use client";

import { motion } from "framer-motion";

const reviews = [
  { quote: "Un traiteur exceptionnel, nos invités ont adoré le couscous et la pastilla.", name: "Marie L." },
  { quote: "Service parfait et cuisine incroyable pour notre mariage.", name: "Thomas & Sophie" },
  { quote: "Service exceptionnel et plats délicieux.", name: "Sarah M." },
  { quote: "Couscous incroyable pour notre mariage.", name: "Karim B." },
  { quote: "Traiteur parfait pour événement professionnel.", name: "Julien D." },
];

export default function LuxuryTestimonials() {
  return (
    <section className="border-t border-deep-green/10 bg-beige-dark py-24" aria-labelledby="testimonials-heading">
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <motion.h2
          id="testimonials-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-serif text-4xl font-semibold text-deep-green md:text-5xl"
        >
          Ce que disent nos clients
        </motion.h2>
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.figure
              key={`${review.name}-${index}`}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, delay: 0.08 * index, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -6 }}
              className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-[0_18px_48px_rgba(15,31,24,0.08)] transition-all duration-300 hover:shadow-[0_24px_56px_rgba(15,31,24,0.18)]"
            >
              <div>
                <p className="text-xl leading-none text-amber-400" aria-hidden>★★★★★</p>
                <blockquote className="mt-4 text-sm leading-relaxed text-deep-green/85">
                  &quot;{review.quote}&quot;
                </blockquote>
              </div>
              <figcaption className="mt-4 font-serif text-sm font-semibold text-deep-green/90">
                — {review.name}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
