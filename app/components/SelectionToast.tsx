"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheck } from "react-icons/fi";
import { useSelection } from "./providers/SelectionProvider";

export default function SelectionToast() {
  const { toastMessage, counts } = useSelection();

  return (
    <div
      className="pointer-events-none fixed inset-x-0 z-[45] flex justify-center px-4 bottom-[calc(var(--mobile-bar-h)+env(safe-area-inset-bottom)+12px)] lg:bottom-8"
      aria-live="polite"
    >
      <AnimatePresence>
        {toastMessage && (
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-auto flex max-w-md items-center gap-3 rounded-full border border-line-dark bg-ink py-2 pl-3 pr-2 text-sm text-ivory shadow-[0_20px_40px_-12px_rgba(0,0,0,0.5)]"
          >
            <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gold-bright text-ink">
              <FiCheck aria-hidden />
            </span>
            <span className="truncate">{toastMessage}</span>
            {counts.total > 0 && (
              <Link href="/contact" className="btn btn-gold btn-sm min-h-9 shrink-0 px-4 text-xs">
                Voir ({counts.total})
              </Link>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
