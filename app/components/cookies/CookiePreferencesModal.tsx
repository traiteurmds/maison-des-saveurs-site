"use client";

import Link from "next/link";
import { LEGAL_ROUTES } from "../../lib/legal";

type CookiePreferencesModalProps = {
  onSave: () => void;
  onClose: () => void;
};

export default function CookiePreferencesModal({ onSave, onClose }: CookiePreferencesModalProps) {
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
          Les cookies essentiels sont nécessaires au fonctionnement du site (sélection menu, préférences
          d&apos;affichage).
        </p>

        <div className="mt-5 rounded-xl border border-mds-border bg-[var(--surface-soft)] p-4">
          <p className="text-sm font-medium text-mds-text">Mesure d&apos;audience</p>
          <p className="mt-1 text-xs leading-relaxed text-mds-muted">
            Vercel Web Analytics collecte des statistiques anonymes de visite pour améliorer le site.
            Ce service est intégré de façon standard et ne stocke pas de données personnelles
            identifiables.
          </p>
        </div>

        <p className="mt-4 text-xs text-mds-muted">
          <Link href={LEGAL_ROUTES.cookies} className="text-[var(--gold)] hover:underline">
            Politique cookies
          </Link>
        </p>

        <div className="mt-6 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={onSave}
            className="min-h-[44px] rounded-full bg-[var(--black)] px-5 py-2 text-xs font-medium tracking-wide text-[var(--ivory)] uppercase"
          >
            J&apos;ai compris
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
