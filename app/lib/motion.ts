import { useReducedMotion } from "framer-motion";

export const EASE_LUX = [0.22, 1, 0.36, 1] as const;

export const revealVariants = {
  hidden: { opacity: 0, y: 32 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease: EASE_LUX },
  },
};

export function useMotionSafe() {
  const reduced = useReducedMotion();
  return { reduced: !!reduced };
}
