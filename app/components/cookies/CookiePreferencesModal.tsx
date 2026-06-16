"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  DEFAULT_DENIED,
  type CookiePreferences,
  type StoredConsent,
} from "../../lib/cookie-consent";
import { LEGAL_ROUTES } from "../../lib/legal";
import { selectableFocusClass } from "../../lib/whatsapp";
import { cn } from "../../lib/utils";
import { useCookieConsent } from "./CookieConsentProvider";

export default function CookiePreferencesModal() {
  const { preferencesOpen, closePreferences, savePreferences, consent } = useCookieConsent();

  return (
    <AnimatePresence>
      {preferencesOpen && (
        <CookiePreferencesDialog
          key={consent?.updatedAt ?? "new"}
          consent={consent}
          onClose={closePreferences}
          onSave={savePreferences}
        />
      )}
    </AnimatePresence>
  );
}

function CookiePreferencesDialog({
  consent,
  onClose,
  onSave,
}: {
  consent: StoredConsent | null;
  onClose: () => void;
  onSave: (prefs: CookiePreferences) => void;
}) {
  const [draft, setDraft] = useState<CookiePreferences>(
    consent?.preferences ?? DEFAULT_DENIED
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[85] flex items-end justify-center bg-[var(--black)]/30 p-4 backdrop-blur-sm sm:items-center"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 16 }}
        transition={{ duration: 0.3 }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="cookie-prefs-title"
        className="max-h-[min(90vh,640px)] w-full max-w-lg overflow-y-auto rounded-2xl border border-mds-border bg-[var(--surface)] shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b border-mds-border px-6 py-5">
          <h2 id="cookie-prefs-title" className="font-serif text-xl font-semibold text-mds-text">
            Personnaliser les cookies
          </h2>
          <p className="mt-2 text-sm text-mds-muted">
            Choisissez les catégories que vous autorisez. Les cookies essentiels sont
            indispensables au site.
          </p>
        </div>

        <div className="space-y-4 px-6 py-5">
          <PreferenceRow
            title="Essentiels"
            description="Mémorisation de vos choix cookies et fonctionnement du site."
            checked
            disabled
          />
          <PreferenceRow
            title="Mesure d'audience"
            description="Vercel Analytics — pages vues et trafic agrégé, sans profilage publicitaire."
            checked={draft.analytics}
            onChange={(v) => setDraft((d) => ({ ...d, analytics: v }))}
          />
          <PreferenceRow
            title="Marketing"
            description="Aucun cookie marketing n'est actuellement utilisé sur ce site."
            checked={draft.marketing}
            onChange={(v) => setDraft((d) => ({ ...d, marketing: v }))}
          />
        </div>

        <div className="flex flex-col gap-2 border-t border-mds-border px-6 py-5 sm:flex-row">
          <button
            type="button"
            onClick={() => onSave(draft)}
            className={cn(
              "inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full bg-[var(--black)] px-4 text-sm font-medium text-[var(--ivory)] hover:bg-[var(--charcoal)]",
              selectableFocusClass
            )}
          >
            Enregistrer
          </button>
          <button
            type="button"
            onClick={onClose}
            className={cn(
              "inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full border border-mds-border px-4 text-sm font-medium text-mds-text hover:border-[var(--gold)]/45",
              selectableFocusClass
            )}
          >
            Annuler
          </button>
        </div>

        <p className="px-6 pb-5 text-center text-xs text-mds-muted">
          <Link href={LEGAL_ROUTES.cookies} className="text-[var(--gold)] hover:underline">
            Politique cookies
          </Link>
        </p>
      </motion.div>
    </motion.div>
  );
}

function PreferenceRow({
  title,
  description,
  checked,
  disabled = false,
  onChange,
}: {
  title: string;
  description: string;
  checked: boolean;
  disabled?: boolean;
  onChange?: (value: boolean) => void;
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-xl border border-mds-border bg-[var(--surface-soft)] p-4">
      <div>
        <p className="font-medium text-mds-text">{title}</p>
        <p className="mt-1 text-sm text-mds-muted">{description}</p>
      </div>
      <label className="relative inline-flex shrink-0 cursor-pointer items-center">
        <input
          type="checkbox"
          className="peer sr-only"
          checked={checked}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.checked)}
        />
        <span
          className={cn(
            "relative h-6 w-11 rounded-full transition-colors after:absolute after:left-0.5 after:top-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-transform",
            disabled
              ? "cursor-not-allowed bg-[var(--gold)]/40 after:translate-x-5"
              : "bg-mds-border peer-checked:bg-[var(--gold)] peer-checked:after:translate-x-5"
          )}
          aria-hidden
        />
        <span className="sr-only">{title}</span>
      </label>
    </div>
  );
}
