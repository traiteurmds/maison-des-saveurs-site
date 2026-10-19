"use client";

import { useRef } from "react";
import { FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { GOOGLE_BUSINESS, TESTIMONIALS } from "../../lib/testimonials";
import { Stars } from "../ui/GoogleRating";
import Reveal from "../ui/Reveal";

/** Avis mis en avant : avis Google authentiques, recopiés mot pour mot. */
const FEATURED_IDS = [
  "irene-abdellaoui",
  "ghizlane-amine",
  "lamia-cheklat",
  "fatiha-seghir-ouali",
  "mohamed-zakouni",
  "ahfir-e",
  "jamal-mokhtari",
  "imane-beriane",
];

const featured = FEATURED_IDS.map((id) => TESTIMONIALS.find((t) => t.id === id)).filter(
  (t): t is (typeof TESTIMONIALS)[number] => Boolean(t)
);

function initials(name: string) {
  return name
    .split(/\s+/)
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase() ?? "")
    .join("");
}

export default function Reviews() {
  const rowRef = useRef<HTMLDivElement>(null);
  const scroll = (dir: 1 | -1) => {
    const el = rowRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.min(el.clientWidth * 0.85, 440), behavior: "smooth" });
  };

  return (
    <section className="section overflow-hidden bg-ivory">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">Ils nous ont fait confiance</p>
            <h2 className="display-lg mt-5 text-ink">
              5,0 sur Google, <em className="text-gold">et des mots qui nous touchent</em>
            </h2>
            <p className="lead mt-5">
              {GOOGLE_BUSINESS.reviewCount} avis, tous 5 étoiles. Voici quelques-uns d&apos;entre eux, recopiés tels
              quels.
            </p>
          </Reveal>
          <Reveal className="flex items-center gap-3">
            <button type="button" onClick={() => scroll(-1)} aria-label="Avis précédents" className="hidden h-12 w-12 items-center justify-center rounded-full border border-line bg-white/70 text-ink transition-colors hover:border-gold md:flex">
              <FiArrowLeft />
            </button>
            <button type="button" onClick={() => scroll(1)} aria-label="Avis suivants" className="hidden h-12 w-12 items-center justify-center rounded-full border border-line bg-white/70 text-ink transition-colors hover:border-gold md:flex">
              <FiArrowRight />
            </button>
            <a href={GOOGLE_BUSINESS.profileUrl} target="_blank" rel="noopener noreferrer" className="btn btn-outline">
              Tous les avis Google
            </a>
          </Reveal>
        </div>
      </div>

      <div
        ref={rowRef}
        className="snap-row mt-12 scroll-px-[max(1.25rem,calc((100vw-1240px)/2+2.5rem))] px-[max(1.25rem,calc((100vw-1240px)/2+2.5rem))] pb-4"
      >
        {featured.map((t) => (
          <figure
            key={t.id}
            className="card flex w-[84vw] max-w-[400px] flex-col p-7 sm:w-[380px] md:p-8"
          >
            <Stars className="text-sm" />
            <blockquote className="mt-5 flex-1 font-display text-[1.32rem] leading-snug text-ink">
              « {t.text} »
            </blockquote>
            <figcaption className="mt-7 flex items-center gap-3 border-t border-line pt-5">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-ink font-display text-lg text-gold-bright">
                {initials(t.name)}
              </span>
              <span>
                <span className="block text-sm font-semibold capitalize text-ink">{t.name}</span>
                <span className="block text-xs text-muted">Avis Google</span>
              </span>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}
