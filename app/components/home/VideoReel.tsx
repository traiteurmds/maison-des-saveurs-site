"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform, type MotionValue } from "framer-motion";

const CLIPS = [
  { src: "/videos/sauce-poulet.mp4", poster: "/videos/sauce-poulet.jpg", label: "La sauce", side: -1 },
  { src: "/videos/service-buffet.mp4", poster: "/videos/service-buffet.jpg", label: "Le service", side: 0 },
  { src: "/videos/dressage-couscous.mp4", poster: "/videos/dressage-couscous.jpg", label: "Le dressage", side: 1 },
] as const;

/** Taille d'une carte vidéo (format vertical 9/16) et échelle pour couvrir l'écran. */
function useCardMetrics() {
  const [m, setM] = useState({ w: 300, h: 533, cover: 4, gap: 24 });
  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth;
      const vh = window.innerHeight;
      const h = Math.min(vh * (vw < 768 ? 0.56 : 0.64), 620);
      const w = (h * 9) / 16;
      setM({ w, h, cover: Math.max(vw / w, vh / h) * 1.02, gap: vw < 768 ? 14 : 40 });
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);
  return m;
}

/**
 * « En cuisine » : le texte FAIT MAISON laisse voir la vidéo à travers ses lettres,
 * s'ouvre en plein écran, puis la vidéo se range en carte et deux autres arrivent en 3D.
 */
export default function VideoReel() {
  const ref = useRef<HTMLElement>(null);
  const videos = useRef<(HTMLVideoElement | null)[]>([]);
  const reduced = useReducedMotion();
  const { w, h, cover, gap } = useCardMetrics();
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  // Étape 1 : le masque de texte grossit et disparaît
  const maskScale = useTransform(p, [0, 0.3], [1, 2.6]);
  const maskOpacity = useTransform(p, [0.14, 0.3], [1, 0]);
  const introOpacity = useTransform(p, [0, 0.1], [1, 0]);
  // Étape 2 : plein écran puis carte
  const centerScale = useTransform(p, [0, 0.42, 0.66], [cover, cover, 1]);
  const radius = useTransform(p, [0.42, 0.66], [0, 18]);
  const midTextOpacity = useTransform(p, [0.28, 0.36, 0.46, 0.52], [0, 1, 1, 0]);
  const midTextY = useTransform(p, [0.28, 0.36], [40, 0]);
  // Étape 3 : cartes latérales et titre final
  const sideProgress = useTransform(p, [0.6, 0.86], [0, 1]);
  const finalOpacity = useTransform(p, [0.7, 0.84], [0, 1]);
  const finalY = useTransform(p, [0.7, 0.84], [30, 0]);

  // Lecture uniquement quand la section est visible
  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        videos.current.forEach((v) => {
          if (!v) return;
          if (entry.isIntersecting && !reduced) v.play().catch(() => {});
          else v.pause();
        });
      },
      { rootMargin: "120px" }
    );
    io.observe(section);
    return () => io.disconnect();
  }, [reduced]);

  const [labelsOn, setLabelsOn] = useState(false);
  useMotionValueEvent(p, "change", (v) => setLabelsOn(v > 0.72));

  return (
    <section ref={ref} className="relative bg-paper" style={{ height: "380vh" }} aria-label="En cuisine : nos vidéos">
      <div className="sticky top-0 h-[100svh] overflow-hidden [perspective:1600px]">
        {/* Titre final */}
        <motion.div
          style={{ opacity: finalOpacity, y: finalY }}
          className="container-x absolute inset-x-0 top-[calc(var(--header-h)+0.75rem)] z-20 text-center md:top-[calc(var(--header-h)+1.5rem)]"
        >
          <p className="eyebrow justify-center">En cuisine</p>
          <h2 className="display-md mt-3 md:mt-4">
            Préparé, dressé, servi <em className="text-gold-gradient">par notre équipe</em>
          </h2>
        </motion.div>

        {/* Cartes vidéo */}
        <div className="absolute inset-0 flex items-center justify-center pt-[8svh] [transform-style:preserve-3d]">
          {CLIPS.map((clip, i) => (
            <VideoCard
              key={clip.src}
              clip={clip}
              w={w}
              h={h}
              gap={gap}
              progress={sideProgress}
              scale={clip.side === 0 ? centerScale : undefined}
              radius={radius}
              showLabel={labelsOn}
              videoRef={(el) => {
                videos.current[i] = el;
              }}
            />
          ))}
        </div>

        {/* Texte au milieu, sur la vidéo plein écran */}
        <motion.div
          style={{ opacity: midTextOpacity, y: midTextY }}
          className="pointer-events-none absolute inset-0 z-20 flex items-end bg-gradient-to-t from-ink/70 via-ink/10 to-transparent"
        >
          <div className="container-x pb-[calc(var(--mobile-bar-h)+2.5rem)] text-ivory lg:pb-16">
            <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-ivory/80">En coulisses</p>
            <p className="mt-3 max-w-3xl font-display text-[clamp(2.2rem,6vw,5.6rem)] leading-[0.95] tracking-[-0.03em]">
              Des plats généreux, <em className="text-gold-bright">servis avec soin</em>
            </p>
          </div>
        </motion.div>

        {/* Masque : la vidéo se voit à travers les lettres */}
        <motion.svg style={{ opacity: maskOpacity }} className="pointer-events-none absolute inset-0 z-30 h-full w-full" aria-hidden>
          <defs>
            <mask id="reel-mask" maskUnits="userSpaceOnUse" x="0" y="0" width="100%" height="100%">
              <rect width="100%" height="100%" fill="white" />
              <motion.g style={{ scale: maskScale, transformOrigin: "50% 50%", transformBox: "view-box" }}>
                <text x="50%" y="50%" textAnchor="middle" dominantBaseline="central" className="reel-mask-text hidden md:block" fill="black">
                  Fait maison
                </text>
                <text x="50%" y="40%" textAnchor="middle" dominantBaseline="central" className="reel-mask-text md:hidden" fill="black">
                  Fait
                </text>
                <text x="50%" y="62%" textAnchor="middle" dominantBaseline="central" className="reel-mask-text md:hidden" fill="black">
                  maison
                </text>
              </motion.g>
            </mask>
          </defs>
          <rect width="100%" height="100%" fill="var(--paper)" mask="url(#reel-mask)" />
        </motion.svg>

        <motion.div
          style={{ opacity: introOpacity }}
          className="pointer-events-none absolute inset-x-0 top-[calc(var(--header-h)+1.25rem)] z-40 container-x flex justify-between"
        >
          <p className="eyebrow">En cuisine</p>
          <p className="text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-muted">Faites défiler</p>
        </motion.div>
      </div>
    </section>
  );
}

function VideoCard({
  clip,
  w,
  h,
  gap,
  progress,
  scale,
  radius,
  showLabel,
  videoRef,
}: {
  clip: (typeof CLIPS)[number];
  w: number;
  h: number;
  gap: number;
  progress: MotionValue<number>;
  scale?: MotionValue<number>;
  radius: MotionValue<number>;
  showLabel: boolean;
  videoRef: (el: HTMLVideoElement | null) => void;
}) {
  const side = clip.side;
  const x = useTransform(progress, [0, 1], [side * (w * 1.6), side * (w + gap)]);
  const rotateY = useTransform(progress, [0, 1], [side * -70, side * -16]);
  const z = useTransform(progress, [0, 1], [-400, side === 0 ? 0 : -90]);
  const opacity = useTransform(progress, [0, 0.4], side === 0 ? [1, 1] : [0, 1]);

  return (
    <motion.figure
      style={{
        width: w,
        height: h,
        x: side === 0 ? 0 : x,
        rotateY: side === 0 ? 0 : rotateY,
        z: side === 0 ? 0 : z,
        opacity,
        scale: scale ?? 1,
        zIndex: side === 0 ? 2 : 1,
      }}
      className="absolute"
    >
      <motion.div style={{ borderRadius: radius }} className="relative h-full w-full overflow-hidden bg-sand shadow-[0_30px_60px_-20px_rgba(29,25,21,0.45)]">
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          src={clip.src}
          poster={clip.poster}
          muted
          loop
          playsInline
          preload="metadata"
          aria-label={clip.label}
        />
      </motion.div>
      <figcaption
        className={`absolute inset-x-0 -bottom-9 text-center font-display text-lg italic transition-opacity duration-500 md:text-xl ${
          showLabel ? "opacity-100" : "opacity-0"
        }`}
      >
        {clip.label}
      </figcaption>
    </motion.figure>
  );
}
