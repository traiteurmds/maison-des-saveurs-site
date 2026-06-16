export const COOKIE_CONSENT_KEY = "mds-cookie-consent-v1";

export type CookieConsent = {
  analytics: boolean;
  decidedAt: string;
};

export function readCookieConsent(): CookieConsent | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as Partial<CookieConsent>;
    if (typeof parsed.analytics !== "boolean") return null;
    return {
      analytics: parsed.analytics,
      decidedAt: typeof parsed.decidedAt === "string" ? parsed.decidedAt : new Date().toISOString(),
    };
  } catch {
    return null;
  }
}

export function writeCookieConsent(consent: CookieConsent): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    return true;
  } catch {
    return false;
  }
}

export function createConsent(analytics: boolean): CookieConsent {
  return { analytics, decidedAt: new Date().toISOString() };
}
