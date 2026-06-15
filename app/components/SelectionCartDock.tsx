"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { FaTimes } from "react-icons/fa";
import SelectionDetailPanel from "./SelectionDetailPanel";
import { useSelection } from "./providers/SelectionProvider";
import { btnPrimaryClass, btnSecondaryClass, selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";

function scrollToMenu() {
  const home = window.location.pathname === "/";
  if (home) {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  } else {
    window.location.href = "/#menu";
  }
}

export default function SelectionCartDock() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const reducedMotion = useReducedMotion();
  const { totalSelected, whatsappUrl, clearSelection } = useSelection();
  const [heroComposerVisible, setHeroComposerVisible] = useState(true);
  const [drawerOpen, setDrawerOpen] = useState(false);

  useEffect(() => {
    if (!isHome) return;

    const el = document.getElementById("reception-composer");
    if (!el) {
      const frame = requestAnimationFrame(() => setHeroComposerVisible(false));
      return () => cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setHeroComposerVisible(entry.isIntersecting),
      { threshold: 0.12, rootMargin: "-80px 0px 0px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [isHome, pathname]);

  const showDock = !isHome || !heroComposerVisible;
  const isDrawerOpen = drawerOpen && showDock;

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isDrawerOpen]);

  if (!showDock) return null;

  const drawerTransition = reducedMotion
    ? { duration: 0.01 }
    : { type: "spring" as const, damping: 28, stiffness: 320 };

  return (
    <>
      {/* Desktop — panneau flottant */}
      <div className="pointer-events-none fixed bottom-8 right-6 z-40 hidden w-[300px] lg:block">
        <motion.div
          initial={reducedMotion ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="pointer-events-auto overflow-hidden rounded-2xl border border-mds-border bg-[rgba(255,253,248,0.92)] p-5 shadow-[0_20px_56px_var(--mds-shadow)] backdrop-blur-xl"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="font-serif text-sm font-semibold text-mds-text">
              Ma sélection · {totalSelected}
            </p>
            <button
              type="button"
              onClick={() => setDrawerOpen(true)}
              className={cn(
                "text-xs font-medium uppercase tracking-[0.12em] text-[var(--gold)] hover:underline",
                selectableFocusClass
              )}
            >
              Détail
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-2">
            {totalSelected > 0 ? (
              <>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(btnPrimaryClass, "min-h-[44px] text-xs", selectableFocusClass)}
                >
                  Envoyer ma demande
                </a>
                <button
                  type="button"
                  onClick={clearSelection}
                  className={cn(btnSecondaryClass, "min-h-[40px] text-xs", selectableFocusClass)}
                >
                  Vider
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={scrollToMenu}
                className={cn(btnPrimaryClass, "min-h-[44px] text-xs", selectableFocusClass)}
              >
                Commencer ma sélection
              </button>
            )}
          </div>
        </motion.div>
      </div>

      {/* Mobile — barre sticky compacte */}
      <div
        className="mobile-selection-dock rounded-2xl border border-mds-border bg-[rgba(255,253,248,0.96)] p-2.5 shadow-[0_8px_32px_var(--mds-shadow)] backdrop-blur-xl lg:hidden"
        role="region"
        aria-label="Panier de sélection"
      >
        <div className="flex min-w-0 items-center gap-2">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            className={cn(
              "flex min-h-[44px] min-w-0 flex-1 items-center justify-center rounded-full border border-mds-border bg-[var(--surface)] px-3 text-sm font-medium text-mds-text",
              selectableFocusClass
            )}
          >
            <span className="truncate">Ma sélection · {totalSelected}</span>
          </button>
          {totalSelected > 0 ? (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                btnPrimaryClass,
                "min-h-[44px] w-auto min-w-0 shrink-0 px-4 text-xs",
                selectableFocusClass
              )}
            >
              Envoyer
            </a>
          ) : (
            <button
              type="button"
              onClick={scrollToMenu}
              className={cn(
                btnPrimaryClass,
                "min-h-[44px] w-auto min-w-0 shrink-0 px-4 text-xs",
                selectableFocusClass
              )}
            >
              Choisir
            </button>
          )}
        </div>
      </div>

      {/* Drawer / modal détail */}
      <AnimatePresence>
        {isDrawerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reducedMotion ? 0.01 : 0.2 }}
            className="fixed inset-0 z-[60] flex items-end justify-center bg-[var(--black)]/40 p-0 backdrop-blur-sm lg:items-center lg:p-6"
            role="presentation"
            onClick={() => setDrawerOpen(false)}
          >
            <motion.div
              initial={reducedMotion ? false : { y: "100%" }}
              animate={{ y: 0 }}
              exit={reducedMotion ? { opacity: 0 } : { y: "100%" }}
              transition={drawerTransition}
              className="max-h-[min(88vh,calc(100dvh-env(safe-area-inset-bottom)-24px))] w-full max-w-[calc(100vw-24px)] overflow-y-auto rounded-t-3xl border border-mds-border bg-[var(--surface)] p-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] shadow-2xl lg:max-w-lg lg:rounded-3xl lg:pb-6"
              role="dialog"
              aria-modal="true"
              aria-label="Détail de votre sélection"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="mb-4 flex items-center justify-between">
                <p className="font-serif text-lg font-semibold text-mds-text">Panier de devis</p>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  aria-label="Fermer"
                  className={cn(
                    "flex h-9 w-9 items-center justify-center rounded-full border border-mds-border",
                    selectableFocusClass
                  )}
                >
                  <FaTimes className="text-sm" />
                </button>
              </div>
              <SelectionDetailPanel onBrowseMenu={scrollToMenu} onClose={() => setDrawerOpen(false)} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
