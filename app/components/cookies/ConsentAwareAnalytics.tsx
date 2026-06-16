"use client";

import { Analytics } from "@vercel/analytics/react";
import { useCookieConsent } from "./CookieConsentProvider";

/** Charge Vercel Analytics uniquement après consentement explicite (CNIL). */
export default function ConsentAwareAnalytics() {
  const { analyticsAllowed } = useCookieConsent();

  if (!analyticsAllowed) return null;

  return <Analytics />;
}
