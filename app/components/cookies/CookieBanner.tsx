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
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[var(--black)]/25 p-4 backdrop-blur-[6px]"
    >
      <motion.div
        initial={reducedMotion ? false : { opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reducedMotion ? 0.01 : 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="w-[92%] max-w-[520px] rounded-[28px] border border-mds-border bg-[var(--ivory)] p-6 shadow-[0_24px_64px_rgba(11,11,10,0.12)] sm:p-8"
      >
        <h2 className="font-serif text-xl font-semibold leading-snug text-mds-text sm:text-2xl">
          Votre expérience Maison Des Saveurs
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-mds-muted sm:text-base">
          Nous utilisons quelques cookies pour mesurer l&apos;audience et améliorer votre expérience.
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <button
            type="button"
            onClick={onAccept}
            className="min-h-[48px] w-full rounded-full bg-[var(--black)] px-6 py-3 text-sm font-medium tracking-wide text-[var(--ivory)] transition-colors hover:bg-[var(--charcoal)]"
          >
            Accepter et continuer
          </button>
          <button
            type="button"
            onClick={onReject}
            className="min-h-[48px] w-full rounded-full border border-mds-border bg-[var(--ivory)] px-6 py-3 text-sm font-medium tracking-wide text-mds-text transition-colors hover:border-[var(--gold)]/45"
          >
            Continuer sans accepter
          </button>
          <button
            type="button"
            onClick={onCustomize}
            className="min-h-[44px] py-2 text-sm font-medium text-[var(--gold)] underline-offset-4 transition-opacity hover:underline"
          >
            Personnaliser
          </button>
        </div>
      </motion.div>
    </div>
  );
}
