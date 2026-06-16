"use client";

import Link from "next/link";
import { LEGAL_ROUTES } from "../../lib/legal";

type CookieBannerProps = {
  onAccept: () => void;
  onReject: () => void;
  onCustomize: () => void;
};

export default function CookieBanner({ onAccept, onReject, onCustomize }: CookieBannerProps) {
  return (
    <div
      role="dialog"
      aria-label="Bandeau cookies"
      className="fixed inset-x-0 bottom-0 z-[70] border-t border-mds-border bg-[rgba(255,253,248,0.98)] p-4 pb-[calc(1rem+env(safe-area-inset-bottom))] shadow-[0_-8px_32px_rgba(11,11,10,0.1)] backdrop-blur-md lg:bottom-4 lg:inset-x-auto lg:left-4 lg:max-w-md lg:rounded-2xl lg:border"
    >
      <p className="text-sm leading-relaxed text-mds-text">
        Nous utilisons des cookies pour mesurer l&apos;audience et améliorer votre expérience.{" "}
        <Link href={LEGAL_ROUTES.cookies} className="text-[var(--gold)] underline-offset-2 hover:underline">
          En savoir plus
        </Link>
      </p>
      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={onAccept}
          className="min-h-[44px] rounded-full bg-[var(--black)] px-5 py-2 text-xs font-medium tracking-wide text-[var(--ivory)] uppercase"
        >
          Accepter
        </button>
        <button
          type="button"
          onClick={onReject}
          className="min-h-[44px] rounded-full border border-mds-border bg-[var(--surface)] px-5 py-2 text-xs font-medium tracking-wide text-mds-text uppercase"
        >
          Refuser
        </button>
        <button
          type="button"
          onClick={onCustomize}
          className="min-h-[44px] rounded-full px-4 py-2 text-xs font-medium tracking-wide text-mds-muted underline-offset-2 hover:text-mds-text hover:underline"
        >
          Personnaliser
        </button>
      </div>
    </div>
  );
}
