"use client";

import { motion } from "framer-motion";

const reviews = [
  {
    name: "Marie L.",
    quote: "Un traiteur incroyable. Tous nos invités ont adoré.",
    rating: 5,
    initial: "M",
    photo: null,
  },
  {
    name: "Thomas & Sophie",
    quote: "Service parfait et cuisine incroyable pour notre mariage. Maison des Saveurs a sublimé notre jour J.",
    rating: 5,
    initial: "T",
    photo: null,
  },
  {
    name: "Sarah M.",
    quote: "Une équipe à l'écoute et une cuisine marocaine authentique. Nous recommandons les yeux fermés.",
    rating: 5,
    initial: "S",
    photo: null,
  },
];

function GoogleIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
    </svg>
  );
}

function StarRating({ rating }: { rating: number }) {
  return (
    <p className="flex gap-0.5 text-amber-400" aria-label={`${rating} étoiles`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span key={i} className="text-lg">{i < rating ? "★" : "☆"}</span>
      ))}
    </p>
  );
}

export default function GoogleMapReviews() {
  return (
    <section className="border-t border-deep-green/10 bg-beige py-24" aria-labelledby="avis-heading">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* — Avis clients (premium, conversion) — */}
        <motion.h2
          id="avis-heading"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="text-center font-serif text-4xl font-semibold text-deep-green md:text-5xl"
        >
          Avis clients
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-3 text-center text-lg text-deep-green/80"
        >
          Ce que disent nos clients sur notre traiteur marocain à Lyon
        </motion.p>

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review, index) => (
            <motion.article
              key={review.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: 0.1 * index, ease: [0.22, 1, 0.36, 1] }}
              className="group flex flex-col rounded-2xl bg-white p-8 shadow-md transition-all duration-300 ease-out hover:-translate-y-2 hover:shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-deep-green/20 to-terracotta/20 font-serif text-xl font-semibold text-deep-green ring-2 ring-deep-green/10"
                  aria-hidden
                >
                  {review.initial}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-lg font-semibold text-deep-green">{review.name}</p>
                  <StarRating rating={review.rating} />
                </div>
                <span className="text-deep-green/50 transition-colors group-hover:text-deep-green/70" aria-hidden>
                  <GoogleIcon />
                </span>
              </div>
              <blockquote className="mt-6 flex-1 text-base leading-relaxed text-deep-green/90">
                &quot;{review.quote}&quot;
              </blockquote>
            </motion.article>
          ))}
        </div>

        {/* — SEO + Google Maps (ordre : avis → texte → map) — */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6 }}
          className="mt-20 text-center text-lg text-deep-green/85 md:text-xl"
        >
          Nous livrons vos événements dans toute la métropole de Lyon : Lyon, Villeurbanne, Vénissieux, Bron, Feyzin et alentours.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mt-10 overflow-hidden rounded-2xl shadow-lg"
        >
          <iframe
            src="https://www.google.com/maps?q=M%C3%A9tropole+de+Lyon&output=embed"
            title="Carte Métropole de Lyon - Traiteur marocain Lyon, Villeurbanne, Vénissieux"
            className="h-[420px] w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </motion.div>
      </div>
    </section>
  );
}
