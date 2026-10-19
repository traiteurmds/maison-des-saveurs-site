"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { GOOGLE_BUSINESS, TESTIMONIALS } from "../../lib/testimonials";
import { Stars } from "../ui/GoogleRating";

/** Avis Google authentiques, recopiés mot pour mot. */
const FEATURED_IDS = [
  "ghizlane-amine",
  "irene-abdellaoui",
  "lamia-cheklat",
  "fatiha-seghir-ouali",
  "mohamed-zakouni",
  "jamal-mokhtari",
  "imane-beriane",
  "ahfir-e",
];

const featured = FEATURED_IDS.map((id) => TESTIMONIALS.find((t) => t.id === id)).filter(
  (t): t is (typeof TESTIMONIALS)[number] => Boolean(t)
);

function displayName(name: string) {
  return name
    .toLowerCase()
    .split(/\s+/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

export default function ReviewsQuote() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const review = featured[i];
  const go = (d: number) => setI((v) => (v + d + featured.length) % featured.length);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => setI((v) => (v + 1) % featured.length), 8000);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <section
      className="section relative overflow-hidden bg-paper"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="container-x">
        <div className="flex flex-wrap items-center justify-between gap-6 border-b border-line pb-6">
          <p className="eyebrow">Ils nous ont fait confiance</p>
          <a
            href={GOOGLE_BUSINESS.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="link-underline inline-flex items-center gap-2 text-[0.85rem] text-ink-3"
          >
            <Stars className="text-[0.7rem]" /> 5,0 sur Google · {GOOGLE_BUSINESS.reviewCount} avis <FiArrowUpRight aria-hidden />
          </a>
        </div>

        <div className="relative mt-14 min-h-[23rem] md:mt-20 md:min-h-[21rem]">
          <span className="pointer-events-none absolute -left-2 -top-16 font-display text-[12rem] leading-none text-gold/15 md:-left-6 md:-top-24 md:text-[18rem]" aria-hidden>
            &ldquo;
          </span>
          <AnimatePresence mode="wait">
            <motion.figure
              key={review.id}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="relative"
            >
              <blockquote className="max-w-5xl font-display text-[clamp(1.45rem,3vw,2.7rem)] leading-[1.25] tracking-[-0.015em]">
                {review.text}
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4 text-[0.8rem] font-semibold uppercase tracking-[0.2em] text-ink-3">
                <span className="h-px w-10 bg-ink/40" />
                {displayName(review.name)} · Avis Google
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => go(-1)} aria-label="Avis précédent" className="flex h-12 w-12 items-center justify-center rounded-full border border-line-dark transition-colors hover:bg-ink hover:text-ivory">
              <FiArrowLeft />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Avis suivant" className="flex h-12 w-12 items-center justify-center rounded-full border border-line-dark transition-colors hover:bg-ink hover:text-ivory">
              <FiArrowRight />
            </button>
          </div>
          <p className="font-display text-xl tabular-nums">
            {String(i + 1).padStart(2, "0")} <span className="text-muted">/ {String(featured.length).padStart(2, "0")}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
