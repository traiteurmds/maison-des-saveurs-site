"use client";

import { useEffect, useRef, useState } from "react";
import {
  animate,
  motion,
  useAnimationFrame,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { FaGoogle, FaStar } from "react-icons/fa";
import { FiArrowLeft, FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { GOOGLE_BUSINESS, TESTIMONIALS } from "../../lib/testimonials";
import TitleReveal from "../ui/TitleReveal";

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

const N = featured.length;
const STEP = 360 / N;

function displayName(name: string) {
  return name
    .toLowerCase()
    .split(/\s+/)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(" ");
}

function excerpt(text: string, max = 210) {
  if (text.length <= max) return text;
  return text.slice(0, text.lastIndexOf(" ", max)) + "…";
}

function useCardWidth() {
  const [w, setW] = useState(340);
  useEffect(() => {
    const update = () => setW(window.innerWidth < 640 ? 250 : window.innerWidth < 1024 ? 300 : 340);
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return w;
}

function Card({
  review,
  index,
  angle,
  radius,
  width,
}: {
  review: (typeof featured)[number];
  index: number;
  angle: MotionValue<number>;
  radius: number;
  width: number;
}) {
  // Les cartes de dos s'effacent, celle de face est pleinement lisible
  const opacity = useTransform(angle, (a) => {
    const rel = ((((index * STEP + a) % 360) + 540) % 360) - 180;
    return Math.max(0.12, Math.cos((rel * Math.PI) / 180));
  });
  return (
    <motion.figure
      className="absolute left-1/2 top-0 flex h-full flex-col justify-between border border-line bg-ivory p-6 shadow-[0_30px_60px_-30px_rgba(29,25,21,0.35)] [backface-visibility:hidden] md:p-8"
      style={{
        width,
        marginLeft: -width / 2,
        transform: `rotateY(${index * STEP}deg) translateZ(${radius}px)`,
        opacity,
      }}
    >
      <div>
        <div className="flex items-center justify-between">
          <span className="flex gap-0.5 text-[0.75rem] text-saffron" aria-hidden>
            {Array.from({ length: 5 }).map((_, i) => (
              <FaStar key={i} />
            ))}
          </span>
          <FaGoogle className="text-muted" aria-hidden />
        </div>
        <blockquote className="mt-5 font-display text-[1.08rem] leading-[1.45] text-ink md:text-[1.2rem]">
          &ldquo;{excerpt(review.text)}&rdquo;
        </blockquote>
      </div>
      <figcaption className="mt-6 border-t border-line pt-4 text-[0.72rem] font-semibold uppercase tracking-[0.18em] text-ink-3">
        {displayName(review.name)}
      </figcaption>
    </motion.figure>
  );
}

function RatingCounter() {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, GOOGLE_BUSINESS.rating, {
      duration: 1.8,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setValue(v),
    });
    return () => controls.stop();
  }, [inView]);
  return (
    <span ref={ref} className="tabular-nums">
      {value.toFixed(1).replace(".", ",")}
    </span>
  );
}

export default function ReviewsQuote() {
  const reduced = useReducedMotion();
  const width = useCardWidth();
  const radius = Math.round(width / 2 / Math.tan(Math.PI / N)) + 24;
  const angle = useMotionValue(0);
  const dragging = useRef(false);
  const hovering = useRef(false);
  const lastX = useRef(0);

  useAnimationFrame((_, delta) => {
    if (reduced || dragging.current || hovering.current) return;
    angle.set(angle.get() - delta * 0.006);
  });

  const snap = (dir: 1 | -1) => {
    const target = Math.round(angle.get() / STEP) * STEP - dir * STEP;
    animate(angle, target, { duration: 0.9, ease: [0.22, 1, 0.36, 1] });
  };

  return (
    <section className="section relative overflow-hidden bg-paper">
      <div className="container-x">
        <div className="grid items-end gap-10 lg:grid-cols-[1fr_auto]">
          <div>
            <p className="eyebrow">Ils nous ont fait confiance</p>
            <TitleReveal className="display-xl mt-5 max-w-3xl">
              Des invités conquis, <em className="text-gold-gradient">des mots qui nous touchent</em>
            </TitleReveal>
          </div>
          <a
            href={GOOGLE_BUSINESS.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="view"
            className="group flex items-end gap-5 lg:justify-self-end"
          >
            <span className="font-display text-[6.5rem] leading-[0.8] tracking-[-0.05em] md:text-[9rem]">
              <RatingCounter />
            </span>
            <span className="pb-2">
              <span className="flex gap-1 text-saffron" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.4 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.12, type: "spring", stiffness: 300, damping: 15 }}
                  >
                    <FaStar />
                  </motion.span>
                ))}
              </span>
              <span className="mt-2 flex items-center gap-2 text-[0.8rem] text-ink-3">
                Note Google sur {GOOGLE_BUSINESS.reviewCount} avis
                <FiArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
              </span>
            </span>
          </a>
        </div>
      </div>

      {/* Carrousel 3D */}
      <div
        className="relative mt-14 h-[400px] cursor-grab touch-pan-y select-none [perspective:1800px] active:cursor-grabbing md:mt-20 md:h-[440px]"
        onPointerEnter={(e) => e.pointerType === "mouse" && (hovering.current = true)}
        onPointerLeave={() => {
          hovering.current = false;
          dragging.current = false;
        }}
        onPointerDown={(e) => {
          dragging.current = true;
          lastX.current = e.clientX;
        }}
        onPointerMove={(e) => {
          if (!dragging.current) return;
          angle.set(angle.get() + (e.clientX - lastX.current) * 0.25);
          lastX.current = e.clientX;
        }}
        onPointerUp={() => (dragging.current = false)}
        onPointerCancel={() => (dragging.current = false)}
        aria-hidden
      >
        <motion.div
          className="absolute inset-x-0 top-0 mx-auto h-[360px] md:h-[400px]"
          style={{ rotateY: angle, transformStyle: "preserve-3d", translateZ: -radius }}
        >
          {featured.map((r, i) => (
            <Card key={r.id} review={r} index={i} angle={angle} radius={radius} width={width} />
          ))}
        </motion.div>
      </div>

      <div className="container-x mt-6 flex items-center justify-between gap-6">
        <p className="text-[0.75rem] text-muted">Faites glisser pour parcourir les avis</p>
        <div className="flex gap-3">
          <button type="button" onClick={() => snap(-1)} aria-label="Avis précédent" className="flex h-12 w-12 items-center justify-center rounded-full border border-line-dark transition-colors hover:bg-ink hover:text-ivory">
            <FiArrowLeft />
          </button>
          <button type="button" onClick={() => snap(1)} aria-label="Avis suivant" className="flex h-12 w-12 items-center justify-center rounded-full border border-line-dark transition-colors hover:bg-ink hover:text-ivory">
            <FiArrowRight />
          </button>
        </div>
      </div>

      {/* Version lisible par les lecteurs d'écran */}
      <ul className="sr-only">
        {featured.map((r) => (
          <li key={r.id}>
            {r.text} — {displayName(r.name)}, avis Google 5 étoiles
          </li>
        ))}
      </ul>
    </section>
  );
}
