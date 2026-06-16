"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { LEGAL_ROUTES } from "../../lib/legal";
import { selectableFocusClass } from "../../lib/whatsapp";
import { cn } from "../../lib/utils";
import { useCookieConsent } from "./CookieConsentProvider";

export default function CookieBanner() {
  const { bannerVisible, acceptAll, rejectAll, openPreferences } = useCookieConsent();

  return (
    <AnimatePresence>
      {bannerVisible && (
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="cookie-banner-title"
          aria-describedby="cookie-banner-desc"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 24 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-[80] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] lg:bottom-4 lg:left-auto lg:right-4 lg:max-w-md lg:p-0"
        >
          <div className="rounded-2xl border border-mds-border bg-[var(--surface)] p-5 shadow-[0_20px_48px_var(--mds-shadow)] backdrop-blur-md">
            <p
              id="cookie-banner-title"
              className="font-serif text-lg font-semibold text-mds-text"
            >
              Vos préférences cookies
            </p>
            <p id="cookie-banner-desc" className="mt-2 text-sm leading-relaxed text-mds-muted">
              Nous utilisons des cookies essentiels au fonctionnement du site et, avec votre accord,
              des cookies de mesure d&apos;audience (Vercel Analytics). Aucun cookie analytics ou
              marketing n&apos;est déposé sans votre consentement.{" "}
              <Link
                href={LEGAL_ROUTES.cookies}
                className="text-[var(--gold)] underline-offset-4 hover:underline"
              >
                En savoir plus
              </Link>
            </p>
            <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:flex-wrap">
              <button
                type="button"
                onClick={acceptAll}
                className={cn(
                  "inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full bg-[var(--black)] px-4 text-sm font-medium text-[var(--ivory)] transition-colors hover:bg-[var(--charcoal)]",
                  selectableFocusClass
                )}
              >
                Accepter
              </button>
              <button
                type="button"
                onClick={rejectAll}
                className={cn(
                  "inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full border border-mds-border bg-[var(--surface-soft)] px-4 text-sm font-medium text-mds-text transition-colors hover:border-[var(--gold)]/45",
                  selectableFocusClass
                )}
              >
                Refuser
              </button>
              <button
                type="button"
                onClick={openPreferences}
                className={cn(
                  "inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full px-4 text-sm font-medium text-[var(--gold)] underline-offset-4 transition-colors hover:underline sm:basis-full",
                  selectableFocusClass
                )}
              >
                Personnaliser
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
