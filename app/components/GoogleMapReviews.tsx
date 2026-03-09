"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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

function GoogleIcon() {
  return (
    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-semibold text-[#4285F4] shadow-md">
      G
    </span>
  );
}

function ReviewCard({ name, quote }: { name: string; quote: string }) {
  return (
    <article className="review-card flex max-w-[320px] flex-col justify-between rounded-2xl border border-white/5 bg-white/5 p-6 text-left text-sm text-beige shadow-[0_18px_45px_rgba(0,0,0,0.35)] backdrop-blur-md md:p-7">
      <div className="flex items-center justify-between gap-3">
        <div>
          <StarRating />
          <p className="mt-3 text-xs font-medium uppercase tracking-[0.18em] text-beige/80">
            Avis vérifié
          </p>
        </div>
        <GoogleIcon />
      </div>
      <blockquote className="mt-5 flex-1 text-[0.95rem] leading-relaxed text-beige/90">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <footer className="mt-5 text-sm font-semibold text-beige">
        — {name}
      </footer>
    </article>
  );
}

function ReviewRow({
  direction,
  duration,
  className,
}: {
  direction: "left" | "right";
  duration: number;
  className?: string;
}) {
  const items = [...DISPLAY_REVIEWS, ...DISPLAY_REVIEWS];

  return (
    <div className={`reviews-row ${className ?? ""}`}>
      <div
        className={`reviews-track ${
          direction === "left" ? "reviews-track-left" : "reviews-track-right"
        }`}
        style={{ animationDuration: `${duration}s` }}
      >
        {items.map((review, index) => (
          <ReviewCard key={`${review.name}-${index}`} name={review.name} quote={review.quote} />
        ))}
      </div>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-beige via-beige/40 to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-beige via-beige/40 to-transparent" />
    </div>
  );
}

export default function GoogleMapReviews() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const yRow1 = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const yRow2 = useTransform(scrollYProgress, [0, 1], [0, 16]);
  const yRow3 = useTransform(scrollYProgress, [0, 1], [0, -10]);

  return (
    <section id="avis" className="border-t border-deep-green/10 bg-beige py-24" aria-labelledby="avis-heading">
      <div ref={sectionRef} className="mx-auto max-w-7xl px-6 lg:px-8">
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
          <p className="text-deep-green/70 md:text-lg">
            Ils nous ont fait confiance pour leurs événements
          </p>
        </motion.div>

        <div className="mt-14 space-y-8 md:space-y-10">
          <motion.div style={{ y: yRow1 }} className="reviews-row-1">
            <ReviewRow direction="left" duration={40} />
          </motion.div>
          <motion.div style={{ y: yRow2 }} className="hidden md:block reviews-row-2">
            <ReviewRow direction="right" duration={50} />
          </motion.div>
          <motion.div style={{ y: yRow3 }} className="hidden md:block reviews-row-3">
            <ReviewRow direction="left" duration={45} />
          </motion.div>
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

      <style jsx global>{`
        .reviews-row {
          position: relative;
          overflow: hidden;
        }
        .reviews-track {
          display: flex;
          gap: 24px;
          will-change: transform;
        }
        .reviews-track-left {
          animation-name: review-marquee-left;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .reviews-track-right {
          animation-name: review-marquee-right;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        .reviews-row:hover .reviews-track {
          animation-play-state: paused;
        }
        .review-card {
          min-width: 260px;
        }
        @keyframes review-marquee-left {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes review-marquee-right {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0);
          }
        }
        @media (max-width: 768px) {
          .reviews-row-2,
          .reviews-row-3 {
            display: none;
          }
          .reviews-row-1 .reviews-track-left,
          .reviews-row-1 .reviews-track-right {
            animation-duration: 60s !important;
          }
          .review-card {
            max-width: 100%;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
