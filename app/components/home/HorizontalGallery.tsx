"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform, useVelocity } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import TitleReveal from "../ui/TitleReveal";

const PHOTOS = [
  { src: "/images/realisations/salades-composees-plateaux.jpg", label: "Salades composées", ratio: "aspect-[3/4]", pos: "center 60%" },
  { src: "/images/realisations/couscous-viande-legumes.jpg", label: "Couscous à la viande", ratio: "aspect-[4/5]", pos: "center 30%" },
  { src: "/images/realisations/viande-pruneaux-amandes.jpg", label: "Viande aux pruneaux", ratio: "aspect-[3/4]", pos: "center 55%" },
  { src: "/images/realisations/pastilla-fruits-de-mer.jpg", label: "Pastilla aux fruits de mer", ratio: "aspect-[4/5]", pos: "center 70%" },
  { src: "/images/realisations/plateaux-fruits-melon.jpg", label: "Plateaux de fruits", ratio: "aspect-[3/4]", pos: "center 40%" },
  { src: "/images/realisations/poulet-olives-amandes.jpg", label: "Poulet olives et amandes", ratio: "aspect-[4/5]", pos: "center 45%" },
  { src: "/images/realisations/service-baklawa.jpg", label: "Le service des pâtisseries", ratio: "aspect-[3/4]", pos: "center 45%" },
  { src: "/images/realisations/pastillas-individuelles.jpg", label: "Pastillas individuelles", ratio: "aspect-[4/5]", pos: "center 60%" },
];

/** Galerie : défilement horizontal piloté par le scroll vertical sur ordinateur, glissement natif sur mobile. */
export default function HorizontalGallery() {
  const ref = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  // Les cartes s'inclinent selon la vitesse de défilement, puis se redressent
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const velocity = useVelocity(scrollY);
  const skewX = useSpring(useTransform(velocity, [-2500, 0, 2500], reduced ? [0, 0, 0] : [7, 0, -7]), { stiffness: 220, damping: 40 });

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      setDistance(Math.max(0, track.scrollWidth - window.innerWidth));
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const cards = PHOTOS.map((p, i) => (
    <figure key={p.src} data-cursor="view" className={`group shrink-0 ${i % 2 ? "lg:mt-24" : ""}`}>
      <div className={`img-zoom relative ${p.ratio} w-[72vw] overflow-hidden bg-sand sm:w-[44vw] lg:w-[26vw]`}>
        <Image src={p.src} alt={p.label} fill sizes="(max-width: 1024px) 72vw, 26vw" quality={78} className="object-cover" style={{ objectPosition: p.pos }} />
      </div>
      <figcaption className="mt-4 flex items-baseline justify-between gap-4">
        <span className="font-display text-xl md:text-2xl">{p.label}</span>
        <span className="text-[0.7rem] tabular-nums text-muted">{String(i + 1).padStart(2, "0")}</span>
      </figcaption>
    </figure>
  ));

  return (
    <>
      {/* Ordinateur : section épinglée */}
      <section ref={ref} className="relative hidden bg-sand lg:block" style={{ height: `calc(100vh + ${distance}px)` }} aria-label="Réalisations">
        <div className="sticky top-0 flex h-screen flex-col justify-center overflow-hidden">
          <motion.div ref={trackRef} style={{ x, skewX }} className="flex items-start gap-10 pl-[clamp(1.25rem,4vw,3rem)] pr-[8vw]">
            <div className="flex w-[30vw] shrink-0 flex-col justify-between self-stretch py-4">
              <div>
                <p className="eyebrow">Réalisations</p>
                <TitleReveal className="display-xl mt-6">
                  Nos plats, <em className="text-gold-gradient">tels qu&apos;ils arrivent</em> sur vos tables
                </TitleReveal>
              </div>
              <Link href="/gallery" className="btn btn-outline self-start">
                Voir la galerie <FiArrowUpRight aria-hidden />
              </Link>
            </div>
            {cards}
          </motion.div>
        </div>
      </section>

      {/* Mobile et tablette */}
      <section className="section bg-sand lg:hidden" aria-label="Réalisations">
        <div className="container-x">
          <p className="eyebrow">Réalisations</p>
          <TitleReveal className="display-xl mt-5">
            Nos plats, <em className="text-gold-gradient">tels qu&apos;ils arrivent</em> sur vos tables
          </TitleReveal>
        </div>
        <div className="snap-row mt-10 gap-4 px-[clamp(1.25rem,4vw,3rem)] pb-2">{cards}</div>
        <div className="container-x mt-8">
          <Link href="/gallery" className="btn btn-outline">
            Voir la galerie <FiArrowUpRight aria-hidden />
          </Link>
        </div>
      </section>
    </>
  );
}
