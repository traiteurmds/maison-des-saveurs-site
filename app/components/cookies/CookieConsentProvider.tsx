"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  DEFAULT_ACCEPTED,
  DEFAULT_DENIED,
  readConsent,
  saveConsent,
  type CookiePreferences,
  type StoredConsent,
} from "../../lib/cookie-consent";
import CookieBanner from "./CookieBanner";
import CookiePreferencesModal from "./CookiePreferencesModal";
import ConsentAwareAnalytics from "./ConsentAwareAnalytics";

type CookieConsentContextValue = {
  consent: StoredConsent | null;
  bannerVisible: boolean;
  preferencesOpen: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  openPreferences: () => void;
  closePreferences: () => void;
  savePreferences: (prefs: CookiePreferences) => void;
  analyticsAllowed: boolean;
};

const CookieConsentContext = createContext<CookieConsentContextValue | null>(null);

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) {
    throw new Error("useCookieConsent must be used within CookieConsentProvider");
  }
  return ctx;
}

export function useCookieConsentOptional() {
  return useContext(CookieConsentContext);
}

export default function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<StoredConsent | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [preferencesOpen, setPreferencesOpen] = useState(false);

  useEffect(() => {
    setConsent(readConsent());
    setHydrated(true);
  }, []);

  const persist = useCallback((preferences: CookiePreferences) => {
    const stored = saveConsent(preferences);
    setConsent(stored);
    setPreferencesOpen(false);
  }, []);

  const acceptAll = useCallback(() => persist(DEFAULT_ACCEPTED), [persist]);
  const rejectAll = useCallback(() => persist(DEFAULT_DENIED), [persist]);
  const savePreferences = useCallback((prefs: CookiePreferences) => persist(prefs), [persist]);

  const value = useMemo<CookieConsentContextValue>(
    () => ({
      consent,
      bannerVisible: hydrated && consent === null,
      preferencesOpen,
      acceptAll,
      rejectAll,
      openPreferences: () => setPreferencesOpen(true),
      closePreferences: () => setPreferencesOpen(false),
      savePreferences,
      analyticsAllowed: Boolean(consent?.preferences.analytics),
    }),
    [
      consent,
      hydrated,
      preferencesOpen,
      acceptAll,
      rejectAll,
      savePreferences,
    ]
  );

  return (
    <CookieConsentContext.Provider value={value}>
      {children}
      <ConsentAwareAnalytics />
      {hydrated && (
        <>
          <CookieBanner />
          <CookiePreferencesModal />
        </>
      )}
    </CookieConsentContext.Provider>
  );
}
