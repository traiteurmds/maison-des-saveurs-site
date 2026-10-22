"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/** Fin filet terracotta en haut de l'écran : avancement de la lecture. */
export default function ReadingProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[86] h-[2px] origin-left bg-terracotta"
      style={{ scaleX }}
    />
  );
}
