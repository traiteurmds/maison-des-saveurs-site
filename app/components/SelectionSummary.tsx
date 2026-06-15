"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaWhatsapp, FaTimes } from "react-icons/fa";
import { useSelection } from "./providers/SelectionProvider";
import { selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";

export default function SelectionSummary() {
  const { counts, whatsappUrl } = useSelection();
  const [expanded, setExpanded] = useState(false);

  if (counts.total === 0) return null;

  return (
    <>
      {/* Desktop — bloc résumé */}
      <div className="pointer-events-none fixed bottom-8 left-6 z-40 hidden md:block">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto w-[280px] rounded-2xl border border-mds-border bg-mds-card/95 p-5 shadow-[0_16px_48px_var(--mds-shadow)] backdrop-blur-xl"
        >
          <p className="font-serif text-sm uppercase tracking-[0.2em] text-terracotta">Votre sélection</p>
          <ul className="mt-3 space-y-1.5 text-sm text-mds-muted">
            <li>Menu : {counts.menu} élément{counts.menu > 1 ? "s" : ""}</li>
            <li>Options : {counts.options} élément{counts.options > 1 ? "s" : ""}</li>
            <li>Caftans : {counts.caftans} élément{counts.caftans > 1 ? "s" : ""}</li>
          </ul>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "mt-4 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white shadow-[0_8px_24px_rgba(37,211,102,0.3)] transition-all hover:-translate-y-0.5",
              selectableFocusClass
            )}
          >
            <FaWhatsapp aria-hidden />
            Envoyer ma demande complète
          </a>
        </motion.div>
      </div>

      {/* Mobile — pill flottante */}
      <div className="fixed bottom-6 left-4 right-4 z-40 md:hidden">
        <AnimatePresence mode="wait">
          {expanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 12 }}
              className="rounded-2xl border border-mds-border bg-mds-card/98 p-4 shadow-[0_16px_48px_var(--mds-shadow)] backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-serif text-sm font-semibold text-mds-text">Votre sélection</p>
                  <ul className="mt-2 space-y-1 text-xs text-mds-muted">
                    <li>Menu : {counts.menu}</li>
                    <li>Options : {counts.options}</li>
                    <li>Caftans : {counts.caftans}</li>
                  </ul>
                </div>
                <button
                  type="button"
                  onClick={() => setExpanded(false)}
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-mds-border"
                  aria-label="Fermer le résumé"
                >
                  <FaTimes className="text-xs" />
                </button>
              </div>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "mt-3 inline-flex min-h-[48px] w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-4 py-3 text-sm font-medium text-white",
                  selectableFocusClass
                )}
              >
                <FaWhatsapp aria-hidden />
                Envoyer ma demande complète
              </a>
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
                "mx-auto flex min-h-[48px] items-center justify-center gap-2 rounded-full border border-mds-border bg-mds-card/98 px-6 py-3 text-sm font-medium text-mds-text shadow-[0_12px_40px_var(--mds-shadow)] backdrop-blur-xl",
                selectableFocusClass
              )}
            >
              Ma sélection · {counts.total}
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}
