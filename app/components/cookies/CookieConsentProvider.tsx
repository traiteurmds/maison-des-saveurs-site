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
  createConsent,
  readCookieConsent,
  writeCookieConsent,
  type CookieConsent,
} from "../../lib/cookie-consent";
import CookieBanner from "./CookieBanner";
import CookiePreferencesModal from "./CookiePreferencesModal";

type CookieContextValue = {
  consent: CookieConsent | null;
  openPreferences: () => void;
};

const CookieContext = createContext<CookieContextValue | null>(null);

export function useCookieConsent(): CookieContextValue | null {
  return useContext(CookieContext);
}

export default function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    try {
      const stored = readCookieConsent();
      setConsent(stored);
      setShowBanner(!stored);
    } catch {
      setDisabled(true);
    } finally {
      setReady(true);
    }
  }, []);

  const persist = useCallback((next: CookieConsent) => {
    setConsent(next);
    setShowBanner(false);
    setShowModal(false);
    writeCookieConsent(next);
  }, []);

  const acceptAll = useCallback(() => {
    persist(createConsent(true));
  }, [persist]);

  const rejectAll = useCallback(() => {
    persist(createConsent(false));
  }, [persist]);

  const savePreferences = useCallback(() => {
    persist(createConsent(true));
  }, [persist]);

  const openPreferences = useCallback(() => {
    setShowModal(true);
    setShowBanner(false);
  }, []);

  const contextValue = useMemo(
    () => ({ consent, openPreferences }),
    [consent, openPreferences]
  );

  if (disabled) {
    return <>{children}</>;
  }

  return (
    <CookieContext.Provider value={contextValue}>
      {children}
      {ready && showBanner && !showModal && (
        <CookieBanner
          onAccept={acceptAll}
          onReject={rejectAll}
          onCustomize={() => setShowModal(true)}
        />
      )}
      {ready && showModal && (
        <CookiePreferencesModal
          onSave={savePreferences}
          onClose={() => {
            setShowModal(false);
            if (!consent) setShowBanner(true);
          }}
        />
      )}
    </CookieContext.Provider>
  );
}
