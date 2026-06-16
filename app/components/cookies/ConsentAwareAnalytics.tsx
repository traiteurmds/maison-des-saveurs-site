"use client";

import dynamic from "next/dynamic";
import { useCookieConsentOptional } from "./CookieConsentProvider";

const Analytics = dynamic(
  () => import("@vercel/analytics/react").then((m) => m.Analytics),
  { ssr: false }
);

/** Vercel Analytics — optionnel, uniquement après consentement, jamais bloquant. */
export default function ConsentAwareAnalytics() {
  const consent = useCookieConsentOptional();
  const analyticsAllowed = Boolean(consent?.analyticsAllowed);

  if (!analyticsAllowed) return null;

  return <Analytics />;
}
