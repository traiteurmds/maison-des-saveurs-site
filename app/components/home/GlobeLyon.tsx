"use client";

import { useEffect, useRef, useState } from "react";
import createGlobe from "cobe";
import { motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { FiMapPin } from "react-icons/fi";
import { EXTENDED_AREAS, SERVICE_AREAS } from "../../lib/site-seo";

const LYON: [number, number] = [45.764, 4.8357];
// Angles qui placent Lyon au centre du globe
const LYON_PHI = Math.PI - ((LYON[1] * Math.PI) / 180 - Math.PI / 2);
const LYON_THETA = (LYON[0] * Math.PI) / 180;

/** Globe 3D (WebGL) qui tourne puis se pose sur Lyon au fil du défilement. */
export default function GlobeLyon() {
  const ref = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progress = useRef(0);
  const drag = useRef<{ start: number; offset: number } | null>(null);
  const dragOffset = useRef(0);
  const reduced = useReducedMotion();
  const [locked, setLocked] = useState(false);
  const { scrollYProgress: p } = useScroll({ target: ref, offset: ["start start", "end end"] });

  useMotionValueEvent(p, "change", (v) => {
    progress.current = v;
    setLocked(v > 0.55);
  });

  const globeScale = useTransform(p, [0, 0.6], [0.78, 1.08]);
  const textOpacity = useTransform(p, [0.5, 0.7], [0, 1]);
  const textY = useTransform(p, [0.5, 0.7], [30, 0]);
  const introOpacity = useTransform(p, [0, 0.35, 0.5], [1, 1, 0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let width = canvas.offsetWidth;
    let spin = 0;
    let phi = 0;
    let theta = 0.2;
    const onResize = () => {
      width = canvas.offsetWidth;
    };
    window.addEventListener("resize", onResize);

    const globe = createGlobe(canvas, {
      devicePixelRatio: 2,
      width: width * 2,
      height: width * 2,
      phi: 0,
      theta: 0.2,
      dark: 0,
      diffuse: 1.1,
      mapSamples: 22000,
      mapBrightness: 2.4,
      mapBaseBrightness: 0.02,
      baseColor: [0.98, 0.95, 0.9],
      markerColor: [0.66, 0.29, 0.16],
      glowColor: [0.95, 0.85, 0.72],
      markers: [
        { location: LYON, size: 0.09 },
        { location: [45.188, 5.724], size: 0.03 },
        { location: [45.899, 6.129], size: 0.03 },
      ],
      onRender: (state) => {
        // Avant le verrouillage : rotation libre ; ensuite : on se pose sur Lyon
        const t = Math.min(1, progress.current / 0.55);
        const ease = 1 - Math.pow(1 - t, 3);
        if (!reduced) spin += 0.006 * (1 - ease);
        const targetPhi = LYON_PHI + (1 - ease) * (spin + 2.4) + dragOffset.current * (1 - ease * 0.6);
        const targetTheta = 0.15 + (LYON_THETA - 0.15) * ease;
        phi += (targetPhi - phi) * 0.08;
        theta += (targetTheta - theta) * 0.08;
        state.phi = phi;
        state.theta = theta;
        state.width = width * 2;
        state.height = width * 2;
      },
    });

    requestAnimationFrame(() => {
      canvas.style.opacity = "1";
    });

    // Le rendu WebGL ne tourne que lorsque le globe est à l'écran
    const io = new IntersectionObserver(([entry]) => globe.toggle(entry.isIntersecting), { rootMargin: "100px" });
    io.observe(canvas);

    return () => {
      io.disconnect();
      globe.destroy();
      window.removeEventListener("resize", onResize);
    };
  }, [reduced]);

  return (
    <section ref={ref} className="relative bg-paper" style={{ height: "230vh" }} aria-label="Nos zones d'intervention">
      <div className="sticky top-0 flex h-[100svh] items-center overflow-hidden">
        {/* Grille de fond façon instrument */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-[0.5] [background-image:linear-gradient(var(--line)_1px,transparent_1px),linear-gradient(90deg,var(--line)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(circle_at_center,black,transparent_70%)]"
        />

        <div className="container-x relative grid w-full items-center gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* Texte */}
          <div className="relative z-10 order-2 min-h-[13rem] lg:order-1 lg:min-h-0">
            <motion.div style={{ opacity: introOpacity }} className="absolute inset-x-0 top-0 lg:static">
              <p className="eyebrow">Où nous intervenons</p>
              <p className="display-lg mt-3 md:mt-4">
                Une cuisine <em className="text-gold-gradient">qui voyage</em>
              </p>
            </motion.div>
            <motion.div style={{ opacity: textOpacity, y: textY }} className="absolute inset-x-0 top-0 lg:mt-[-6rem]">
              <p className="eyebrow">Basés à Lyon</p>
              <h2 className="display-lg mt-3 md:mt-4">
                Lyon et <em className="text-gold-gradient">toute la métropole</em>
              </h2>
              <p className="lead mt-5 hidden max-w-md sm:block">
                Nous livrons et servons dans toute la métropole lyonnaise. Pour un événement plus loin, parlez-nous de
                votre projet : nous étudions chaque demande.
              </p>
              <ul className="mt-5 flex flex-wrap gap-1.5 md:mt-6 md:gap-2 [&>li]:max-md:px-2.5 [&>li]:max-md:py-1 [&>li]:max-md:text-[0.72rem]">
                {SERVICE_AREAS.map((city) => (
                  <li key={city} className="chip bg-ivory/70 backdrop-blur">
                    <FiMapPin className="text-gold" aria-hidden />
                    {city}
                  </li>
                ))}
                {EXTENDED_AREAS.map((city) => (
                  <li key={city} className="chip border-dashed text-muted">
                    {city} <span className="text-xs">(sur étude)</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {/* Globe */}
          <div className="relative order-1 mx-auto aspect-square w-[min(88vw,46svh)] lg:order-2 lg:w-[min(46vw,80svh)]">
            <motion.div style={{ scale: globeScale }} className="absolute inset-0">
              <canvas
                ref={canvasRef}
                className="h-full w-full cursor-grab opacity-0 transition-opacity duration-1000 active:cursor-grabbing"
                style={{ contain: "layout paint size" }}
                onPointerDown={(e) => {
                  drag.current = { start: e.clientX, offset: dragOffset.current };
                  (e.target as HTMLElement).setPointerCapture(e.pointerId);
                }}
                onPointerMove={(e) => {
                  if (!drag.current) return;
                  dragOffset.current = drag.current.offset + (e.clientX - drag.current.start) / 160;
                }}
                onPointerUp={() => {
                  drag.current = null;
                }}
                aria-label="Globe terrestre centré sur Lyon"
                role="img"
              />
              {/* Viseur sur Lyon */}
              <div
                aria-hidden
                className={`pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-700 ${
                  locked ? "opacity-100" : "opacity-0"
                }`}
              >
                <span className="absolute left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full border border-terracotta/60 [animation-duration:2.4s]" />
                <span className="absolute left-1/2 top-1/2 h-14 w-14 -translate-x-1/2 -translate-y-1/2 rounded-full border border-terracotta" />
                <span className="absolute left-1/2 top-1/2 mt-10 -translate-x-1/2 whitespace-nowrap md:ml-12 md:mt-0 md:translate-x-0 md:-translate-y-1/2 rounded-full bg-ink px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-ivory">
                  Lyon · 45°45′ N 4°50′ E
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
