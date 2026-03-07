"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Sarah B.",
    quote:
      "Service exceptionnel, la cuisine était incroyable et tous nos invités ont adoré. Merci pour votre professionnalisme.",
  },
  {
    name: "Karim L.",
    quote:
      "Nous avons fait appel à ce traiteur pour un anniversaire et tout était parfait. Les plats étaient délicieux et très bien présentés.",
  },
  {
    name: "Nadia R.",
    quote:
      "Service très professionnel et cuisine marocaine authentique. Tous nos invités ont adoré le couscous et la pastilla.",
  },
  {
    name: "Julien M.",
    quote:
      "Un traiteur sérieux et à l'écoute. La prestation pour notre événement d'entreprise s'est déroulée parfaitement.",
  },
  {
    name: "Amel T.",
    quote:
      "Les saveurs étaient incroyables et le service impeccable. Nous recommandons sans hésiter.",
  },
  {
    name: "Samir H.",
    quote:
      "Très belle découverte. Les plats étaient généreux et vraiment savoureux.",
  },
  {
    name: "Leila K.",
    quote:
      "Organisation parfaite pour notre réception familiale. Merci encore pour votre professionnalisme.",
  },
];

const DISPLAY_REVIEWS = reviews.slice(0, 6);

function StarRating() {
  return (
    <p className="flex gap-0.5 text-amber-500" aria-label="5 étoiles">
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="text-lg">★</span>
      ))}
    </p>
  );
}

function ReviewCard({
  name,
  quote,
  index,
}: {
  name: string;
  quote: string;
  index: number;
}) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-30px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col rounded-2xl bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.06)] transition-all duration-300 ease-out hover:-translate-y-1.5 hover:shadow-[0_12px_40px_rgba(0,0,0,0.12)] md:p-8"
    >
      <StarRating />
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-deep-green/90 md:text-lg">
        &quot;{quote}&quot;
      </blockquote>
      <footer className="mt-5 text-sm font-medium text-deep-green/80 md:text-base">
        — {name}
      </footer>
    </motion.article>
  );
}

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
          <StarRating />
          <p className="text-deep-green/70 md:text-lg">Plusieurs clients satisfaits</p>
        </motion.div>

        <div className="mt-14 grid grid-cols-1 gap-8 sm:gap-10 md:grid-cols-2 lg:grid-cols-3">
          {DISPLAY_REVIEWS.map((review, index) => (
            <ReviewCard
              key={`${review.name}-${index}`}
              name={review.name}
              quote={review.quote}
              index={index}
            />
          ))}
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
