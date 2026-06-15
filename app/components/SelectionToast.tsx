"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useSelection } from "./providers/SelectionProvider";

export default function SelectionToast() {
  const { toastMessage, totalSelected } = useSelection();
  const reduced = useReducedMotion();

  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 12, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
          transition={{ duration: reduced ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] }}
          role="status"
          aria-live="polite"
          className="pointer-events-none fixed left-1/2 z-[55] w-[calc(100vw-48px)] max-w-sm -translate-x-1/2 rounded-full border border-mds-border bg-[rgba(255,253,248,0.96)] px-5 py-3 text-center text-sm font-medium text-mds-text shadow-[0_12px_40px_var(--mds-shadow)] backdrop-blur-xl bottom-[calc(5.5rem+env(safe-area-inset-bottom))] lg:bottom-8"
        >
          {toastMessage}
          {totalSelected > 0 && (
            <span className="mt-0.5 block text-xs text-mds-muted">
              {totalSelected} élément{totalSelected > 1 ? "s" : ""} sélectionné
              {totalSelected > 1 ? "s" : ""}
            </span>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
