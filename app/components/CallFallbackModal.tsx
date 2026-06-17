"use client";

import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  copyPhoneNumber,
  PHONE_DISPLAY_FORMATTED,
  PHONE_TEL_HREF,
} from "../lib/phone-utils";

type CallFallbackModalProps = {
  onClose: () => void;
};

export default function CallFallbackModal({ onClose }: CallFallbackModalProps) {
  const reducedMotion = useReducedMotion();
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(async () => {
    const ok = await copyPhoneNumber();
    if (ok) {
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  }, []);

  return (
    <div
      className="fixed inset-0 z-[85] flex items-center justify-center bg-[var(--black)]/30 p-4 backdrop-blur-[6px]"
      role="presentation"
      onClick={onClose}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-label="Appeler Maison Des Saveurs"
        initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="w-[92%] max-w-sm rounded-[28px] border border-[rgba(198,164,106,0.35)] bg-[var(--ivory)] p-6 shadow-[0_24px_64px_rgba(11,11,10,0.14)] sm:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="font-serif text-lg font-semibold text-mds-text">
          Appuyez sur le numéro pour appeler
        </p>
        <a
          href={PHONE_TEL_HREF}
          className="mt-4 block text-center font-serif text-2xl font-semibold tracking-wide text-[var(--gold)] underline-offset-4 hover:underline"
        >
          {PHONE_DISPLAY_FORMATTED}
        </a>
        <div className="mt-6 flex flex-col gap-2">
          <button
            type="button"
            onClick={handleCopy}
            className="min-h-[44px] rounded-full border border-mds-border bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-mds-text transition-colors hover:border-[var(--gold)]/45"
          >
            {copied ? "Numéro copié" : "Copier le numéro"}
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] rounded-full px-5 py-2.5 text-sm font-medium text-mds-muted hover:text-mds-text"
          >
            Fermer
          </button>
        </div>
      </motion.div>
    </div>
  );
}
