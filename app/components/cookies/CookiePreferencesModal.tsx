"use client";

import { useState } from "react";
import Link from "next/link";
import { LEGAL_ROUTES } from "../../lib/legal";

type CookiePreferencesModalProps = {
  initialAnalytics: boolean;
  onSave: (analytics: boolean) => void;
  onClose: () => void;
};

export default function CookiePreferencesModal({
  initialAnalytics,
  onSave,
  onClose,
}: CookiePreferencesModalProps) {
  const [analytics, setAnalytics] = useState(initialAnalytics);

  return (
    <div
      className="fixed inset-0 z-[80] flex items-end justify-center bg-[var(--black)]/40 p-4 backdrop-blur-sm sm:items-center"
      role="presentation"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Préférences cookies"
        className="w-full max-w-md rounded-2xl border border-mds-border bg-[var(--surface)] p-6 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="font-serif text-xl font-semibold text-mds-text">Gérer mes cookies</h2>
        <p className="mt-2 text-sm leading-relaxed text-mds-muted">
          Choisissez les cookies que vous acceptez. Les cookies essentiels sont nécessaires au
          fonctionnement du site.
        </p>

        <div className="mt-5 rounded-xl border border-mds-border bg-[var(--surface-soft)] p-4">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-mds-text">Mesure d&apos;audience</p>
              <p className="mt-1 text-xs leading-relaxed text-mds-muted">
                Vercel Analytics — statistiques anonymes de visite.
              </p>
            </div>
            <label className="flex shrink-0 items-center gap-2">
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="h-4 w-4 accent-[var(--gold)]"
              />
              <span className="sr-only">Activer la mesure d&apos;audience</span>
            </label>
          </div>
        </div>

        <p className="mt-4 text-xs text-mds-muted">
          <Link href={LEGAL_ROUTES.cookies} className="text-[var(--gold)] hover:underline">
            Politique cookies
          </Link>
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => onSave(analytics)}
            className="min-h-[44px] rounded-full bg-[var(--black)] px-5 py-2 text-xs font-medium tracking-wide text-[var(--ivory)] uppercase"
          >
            Enregistrer
          </button>
          <button
            type="button"
            onClick={onClose}
            className="min-h-[44px] rounded-full border border-mds-border px-5 py-2 text-xs font-medium tracking-wide text-mds-text uppercase"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
}
