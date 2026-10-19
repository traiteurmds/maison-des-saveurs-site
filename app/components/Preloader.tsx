"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const KEY = "mds-intro";
const ease = [0.76, 0, 0.24, 1] as const;

/**
 * Écran d'ouverture (une fois par session). Un script inline masque l'écran
 * avant le premier rendu si la session l'a déjà vu ou si le mouvement est réduit.
 */
export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const root = document.documentElement;
    if (root.classList.contains("intro-seen")) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- état initial lu depuis le DOM
      setVisible(false);
      return;
    }
    try {
      sessionStorage.setItem(KEY, "1");
    } catch {}
    root.style.overflow = "hidden";
    const start = performance.now();
    const duration = 1500;
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      setCount(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) frame = requestAnimationFrame(tick);
      else
        setTimeout(() => {
          setVisible(false);
          root.style.overflow = "";
        }, 250);
    };
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      root.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="preloader fixed inset-0 z-[200] flex flex-col justify-between bg-paper px-6 py-8 text-ink md:px-12 md:py-10"
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          transition={{ duration: 1, ease }}
          aria-hidden
        >
          <div className="flex items-center justify-between text-[0.68rem] font-semibold uppercase tracking-[0.26em] text-ink-3">
            <span>Traiteur marocain</span>
            <span>Lyon</span>
          </div>
          <div className="overflow-hidden">
            <motion.p
              className="display-xl text-center"
              initial={{ y: "110%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, ease, delay: 0.1 }}
            >
              Maison <em className="text-gold">Des Saveurs</em>
            </motion.p>
          </div>
          <div className="flex items-end justify-between gap-6">
            <div className="h-px flex-1 bg-line-dark">
              <div className="h-px bg-ink transition-[width] duration-100" style={{ width: `${count}%` }} />
            </div>
            <span className="font-display text-5xl leading-none tabular-nums md:text-7xl">{count}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
