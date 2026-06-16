export const COOKIE_CONSENT_KEY = "mds-cookie-consent-v1";

export type CookiePreferences = {
  essential: true;
  analytics: boolean;
  marketing: boolean;
};

export type StoredConsent = {
  preferences: CookiePreferences;
  updatedAt: string;
};

export const DEFAULT_DENIED: CookiePreferences = {
  essential: true,
  analytics: false,
  marketing: false,
};

export const DEFAULT_ACCEPTED: CookiePreferences = {
  essential: true,
  analytics: true,
  marketing: false,
};

export function parseStoredConsent(raw: string | null): StoredConsent | null {
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw) as StoredConsent;
    if (!parsed?.preferences || typeof parsed.preferences.analytics !== "boolean") {
      return null;
    }
    return {
      preferences: {
        essential: true,
        analytics: parsed.preferences.analytics,
        marketing: Boolean(parsed.preferences.marketing),
      },
      updatedAt: parsed.updatedAt ?? new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function readConsent(): StoredConsent | null {
  if (typeof window === "undefined") return null;
  return parseStoredConsent(localStorage.getItem(COOKIE_CONSENT_KEY));
}

export function saveConsent(preferences: CookiePreferences): StoredConsent {
  const stored: StoredConsent = {
    preferences: { ...preferences, essential: true },
    updatedAt: new Date().toISOString(),
  };
  localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(stored));
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event("mds-consent-change"));
  }
  return stored;
}

export const CONSENT_CHANGE_EVENT = "mds-consent-change";
