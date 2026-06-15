"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import ReceptionComposerCard from "./ReceptionComposerCard";
import { useSelection } from "./providers/SelectionProvider";
import { selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";

export default function SelectionSummary() {
  const pathname = usePathname();
  const { totalSelected } = useSelection();
  const [expanded, setExpanded] = useState(false);

  if (pathname === "/" || totalSelected === 0) return null;

  return (
    <div className="fixed bottom-6 left-4 right-4 z-40 md:bottom-8 md:left-6 md:right-auto md:w-[320px]">
      <AnimatePresence mode="wait">
        {expanded ? (
          <motion.div
            key="expanded"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            className="relative"
          >
            <button
              type="button"
              onClick={() => setExpanded(false)}
              className="absolute -right-2 -top-2 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-mds-border bg-mds-card shadow-md"
              aria-label="Réduire le résumé"
            >
              <FaTimes className="text-xs" />
            </button>
            <ReceptionComposerCard compact />
          </motion.div>
        ) : (
          <motion.button
            key="pill"
            type="button"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            onClick={() => setExpanded(true)}
            className={cn(
              "mx-auto flex min-h-[48px] w-full items-center justify-center rounded-full border border-mds-border bg-mds-card/98 px-6 py-3 text-sm font-medium text-mds-text shadow-[0_12px_40px_var(--mds-shadow)] backdrop-blur-xl md:mx-0",
              selectableFocusClass
            )}
          >
            Ma sélection · {totalSelected}
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
