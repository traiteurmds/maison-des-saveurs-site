"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { LEGAL_ROUTES } from "../../lib/legal";

type CookieBannerProps = {
  onAccept: () => void;
  onReject: () => void;
  onCustomize: () => void;
};

/** Bandeau discret en bas de page : ne bloque pas la lecture du site. */
export default function CookieBanner({ onAccept, onReject, onCustomize }: CookieBannerProps) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      role="region"
      aria-label="Préférences cookies"
      initial={reducedMotion ? false : { opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-3 z-[70] mx-auto max-w-xl rounded-[6px] border border-line bg-ivory/95 p-4 text-ink backdrop-blur shadow-[0_30px_60px_-24px_rgba(29,25,21,0.35)] bottom-[calc(var(--mobile-bar-h)+env(safe-area-inset-bottom)+12px)] sm:p-6 lg:bottom-6 lg:left-6 lg:right-auto lg:mx-0"
    >
      <p className="text-[0.78rem] leading-snug text-ink-3 sm:text-sm sm:leading-relaxed">
        Cookies nécessaires et mesure d&apos;audience anonyme pour améliorer le site.{" "}
        <Link href={LEGAL_ROUTES.cookies} className="text-gold underline underline-offset-2">
          En savoir plus
        </Link>
      </p>
      <div className="mt-3 flex flex-nowrap items-center gap-2">
        <button type="button" onClick={onAccept} className="btn btn-gold btn-sm">
          Accepter
        </button>
        <button type="button" onClick={onReject} className="btn btn-outline btn-sm">
          Refuser
        </button>
        <button type="button" onClick={onCustomize} className="btn btn-sm px-3 text-muted hover:text-ink">
          Personnaliser
        </button>
      </div>
    </motion.div>
  );
}
