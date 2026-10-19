"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/** Anneau qui suit la souris (ordinateur uniquement) et grossit sur les liens et les photos. */
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState<"default" | "link" | "view">("default");
  const [visible, setVisible] = useState(false);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.6 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- capacité de l'appareil lue au montage
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      setVisible(true);
      const t = e.target as HTMLElement | null;
      if (t?.closest("[data-cursor='view']")) setMode("view");
      else if (t?.closest("a, button, [role='button'], label, summary")) setMode("link");
      else setMode("default");
    };
    const leave = () => setVisible(false);
    window.addEventListener("pointermove", move, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, [x, y]);

  if (!enabled) return null;

  const size = mode === "view" ? 88 : mode === "link" ? 54 : 30;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[95] flex items-center justify-center rounded-full border"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{
        width: size,
        height: size,
        opacity: visible ? 1 : 0,
        backgroundColor: mode === "view" ? "rgba(178,83,46,0.92)" : "rgba(178,83,46,0)",
        borderColor: mode === "view" ? "rgba(178,83,46,0)" : "rgba(29,25,21,0.45)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 26 }}
    >
      {mode === "view" && (
        <span className="text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ivory">Voir</span>
      )}
    </motion.div>
  );
}
