"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import GoogleRating from "../ui/GoogleRating";
import { getIntroDelay } from "./useIntroDelay";

const ease = [0.22, 1, 0.36, 1] as const;

function useIsMobile() {
  const [mobile, setMobile] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);
  return mobile;
}

function Letters({ text, delay, className }: { text: string; delay: number; className?: string }) {
  return (
    <span className={className} aria-hidden>
      {text.split("").map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom">
          <motion.span
            className="inline-block"
            initial={{ y: "105%" }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.035 }}
          >
            {ch === " " ? " " : ch}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

export default function HeroZoom() {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const mobile = useIsMobile();
  const [delay] = useState(getIntroDelay);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Arc de départ → plein écran
  const start = mobile ? { t: 43, s: 14, b: 15 } : { t: 34, s: 36, b: 0 };
  const clip = useTransform(p, (v) => {
    const k = reduced ? 1 : Math.min(1, v / 0.62);
    const e = 1 - Math.pow(1 - k, 3);
    const t = start.t * (1 - e);
    const s = start.s * (1 - e);
    const b = start.b * (1 - e);
    const r = 999 * (1 - e);
    return `inset(${t}% ${s}% ${b}% ${s}% round ${r}px ${r}px ${mobile ? r * 0.02 : 0}px ${mobile ? r * 0.02 : 0}px)`;
  });
  const imgScale = useTransform(p, [0, 0.62], [1.35, 1]);
  const titleY = useTransform(p, [0, 0.5], ["0%", "-60%"]);
  const titleOpacity = useTransform(p, [0, 0.35], [1, 0]);
  const sideOpacity = useTransform(p, [0, 0.18], [1, 0]);
  const overlay = useTransform(p, [0.5, 0.75], [0, 1]);
  const captionY = useTransform(p, [0.6, 0.85], [60, 0]);

  return (
    <section ref={ref} className="relative h-[240vh] bg-paper" aria-label="Accueil">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Titre géant */}
        <motion.div
          style={{ y: titleY, opacity: titleOpacity }}
          className="container-x relative z-20 pt-[calc(var(--header-h)+env(safe-area-inset-top)+1.5rem)] md:pt-[calc(var(--header-h)+2.2rem)]"
        >
          <div className="flex items-center justify-between gap-4">
            <motion.p
              className="eyebrow"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: delay + 0.5 }}
            >
              Traiteur marocain halal · Lyon
            </motion.p>
            <motion.div
              className="hidden md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1, delay: delay + 0.6 }}
            >
              <GoogleRating />
            </motion.div>
          </div>
          <h1 className="mt-4 font-display font-normal leading-[0.86] tracking-[-0.045em] text-ink md:mt-6">
            <span className="sr-only">Maison Des Saveurs, traiteur marocain halal à Lyon</span>
            <Letters
              text="Maison"
              delay={delay}
              className="block text-[19vw] md:inline md:text-[min(9.4vw,10rem)]"
            />
            <span className="hidden md:inline md:text-[min(9.4vw,10rem)]">&nbsp;</span>
            <Letters
              text="Des Saveurs"
              delay={delay + 0.15}
              className="block text-right text-[17vw] italic text-gold md:inline md:text-[min(9.4vw,10rem)]"
            />
          </h1>
        </motion.div>

        {/* Photo : arc qui s'ouvre en plein écran */}
        <motion.div
          className="absolute inset-0 z-10"
          style={{ clipPath: clip }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, ease, delay: delay + 0.2 }}
        >
          <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
            <Image
              src="/images/menu/couscous-viande.jpg"
              alt="Couscous à la viande servi par Maison Des Saveurs"
              fill
              priority
              sizes="100vw"
              quality={80}
              className="object-cover"
              style={{ objectPosition: "center 45%" }}
            />
          </motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-ink/30 via-ink/35 to-ink/70"
            style={{ opacity: overlay }}
          />
        </motion.div>

        {/* Texte final sur la photo plein écran */}
        <motion.div
          className="on-dark pointer-events-none absolute inset-0 z-20 flex flex-col items-center justify-center px-6 text-center text-ivory"
          style={{ opacity: overlay, y: captionY }}
        >
          <p className="eyebrow eyebrow-center on-dark">Mariages · Hlels · Naissances · Entreprises</p>
          <p className="display-xl mt-6 max-w-5xl">
            La générosité de la table <em>marocaine</em>
          </p>
          <p className="mt-6 max-w-xl text-[1rem] leading-relaxed text-ivory/85 md:text-lg">
            Une cuisine faite maison, halal, préparée par une cheffe aux plus de 30 ans d&apos;expérience.
          </p>
        </motion.div>

        {/* Côtés : texte d'accroche et appel à l'action */}
        <motion.div
          style={{ opacity: sideOpacity }}
          className="container-x absolute inset-x-0 bottom-0 z-20 flex items-end justify-between gap-6 pb-6 md:pb-10"
        >
          <motion.div
            className="max-w-[17rem] md:max-w-[22vw]"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: delay + 0.7 }}
          >
            <p className="hidden text-[0.95rem] leading-relaxed text-ink-3 md:block">
              Couscous, pastillas, rfissa et salades royales pour vos mariages, vos fêtes de famille et vos
              événements d&apos;entreprise.
            </p>
            <span className="mt-5 hidden items-center gap-3 text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-ink-3 md:inline-flex">
              <FiArrowDown className="animate-bounce" aria-hidden /> Défiler
            </span>
          </motion.div>
          <motion.div
            className="hidden md:block"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease, delay: delay + 0.8 }}
          >
            <Link href="/menu" className="btn btn-gold">
              Composer ma réception <FiArrowRight aria-hidden />
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
