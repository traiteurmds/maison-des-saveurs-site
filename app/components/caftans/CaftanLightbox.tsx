"use client";

import { useEffect } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { CaftanItem } from "../../lib/caftans";

export default function CaftanLightbox({
  item,
  onClose,
}: {
  item: CaftanItem | null;
  onClose: () => void;
}) {
  useEffect(() => {
    if (!item) return;
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [item, onClose]);

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[70] flex items-center justify-center bg-[var(--black)]/30 p-4 backdrop-blur-sm"
          onClick={onClose}
          role="presentation"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 8 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="relative flex max-h-[min(90vh,820px)] w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-[var(--gold)]/30 bg-[var(--surface)] shadow-2xl"
            role="dialog"
            aria-modal="true"
            aria-labelledby="caftan-lightbox-title"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={onClose}
              className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-mds-border bg-[var(--surface)] text-lg text-mds-muted transition-colors hover:text-mds-text"
              aria-label="Fermer l'aperçu"
            >
              ×
            </button>
            <div className="border-b border-mds-border px-6 py-5 pr-14">
              <p className="font-serif text-xs uppercase tracking-[0.2em] text-[var(--gold)]">
                Collection caftans
              </p>
              <h2 id="caftan-lightbox-title" className="mt-1 font-serif text-2xl font-semibold text-mds-text">
                {item.title}
              </h2>
            </div>
            <div className="relative flex min-h-[280px] flex-1 items-center justify-center bg-[var(--surface-soft)] p-4 md:min-h-[420px] md:p-8">
              <Image
                src={item.image}
                alt={item.alt}
                width={900}
                height={1200}
                quality={90}
                decoding="async"
                className="max-h-[min(70vh,640px)] w-auto max-w-full object-contain"
                sizes="(max-width: 768px) 100vw, 768px"
                priority
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
