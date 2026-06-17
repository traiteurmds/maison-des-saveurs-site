"use client";

import { motion, useReducedMotion } from "framer-motion";

type CookieBannerProps = {
  onAccept: () => void;
  onReject: () => void;
  onCustomize: () => void;
};

export default function CookieBanner({ onAccept, onReject, onCustomize }: CookieBannerProps) {
  const reducedMotion = useReducedMotion();

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Préférences cookies"
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[var(--black)]/20 p-4 backdrop-blur-[8px]"
    >
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-[92%] max-w-[520px] rounded-[28px] border border-[rgba(198,164,106,0.38)] bg-[var(--ivory)] p-6 shadow-[0_28px_72px_rgba(11,11,10,0.14)] sm:p-8"
      >
        <h2 className="font-serif text-xl font-semibold leading-snug text-mds-text sm:text-2xl">
          Maison Des Saveurs respecte votre vie privée.
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-mds-muted sm:text-base">
          Nous utilisons uniquement des cookies nécessaires et des outils statistiques afin
          d&apos;améliorer votre expérience.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onAccept}
            className="min-h-[48px] w-full rounded-full bg-[var(--black)] px-6 py-3 text-sm font-semibold tracking-[0.12em] text-[var(--ivory)] uppercase transition-colors hover:bg-[var(--charcoal)]"
          >
            Accepter
          </button>
          <div className="flex flex-col gap-2 sm:flex-row">
            <button
              type="button"
              onClick={onCustomize}
              className="min-h-[44px] flex-1 rounded-full border border-[rgba(198,164,106,0.35)] bg-[var(--ivory)] px-5 py-2.5 text-sm font-medium tracking-wide text-mds-text transition-colors hover:border-[var(--gold)]/55"
            >
              Personnaliser
            </button>
            <button
              type="button"
              onClick={onReject}
              className="min-h-[44px] flex-1 rounded-full border border-mds-border bg-[var(--surface-soft)] px-5 py-2.5 text-sm font-medium tracking-wide text-mds-muted transition-colors hover:text-mds-text"
            >
              Refuser
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
