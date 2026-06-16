"use client";

import { useCallback, useEffect, useRef, useState } from "react";

type TurnstileFieldProps = {
  onTokenChange: (token: string | null) => void;
  onUnavailable?: () => void;
};

type TurnstileApi = {
  render: (
    container: HTMLElement,
    options: {
      sitekey: string;
      callback: (token: string) => void;
      "expired-callback"?: () => void;
      "error-callback"?: () => void;
      theme?: "light" | "dark" | "auto";
      size?: "normal" | "compact";
    }
  ) => string;
  reset: (widgetId?: string) => void;
  remove: (widgetId?: string) => void;
};

const UNAVAILABLE_MSG =
  "Protection anti-spam indisponible, vous pouvez tout de même envoyer votre demande.";

export default function TurnstileField({ onTokenChange, onUnavailable }: TurnstileFieldProps) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [unavailable, setUnavailable] = useState(false);
  const [loadFailed, setLoadFailed] = useState(false);

  const markUnavailable = useCallback(() => {
    setUnavailable(true);
    setLoadFailed(true);
    onTokenChange(null);
    onUnavailable?.();
  }, [onTokenChange, onUnavailable]);

  useEffect(() => {
    if (!siteKey) {
      onTokenChange(null);
      return;
    }

    if (typeof window === "undefined") return;

    let cancelled = false;
    const container = containerRef.current;
    if (!container) return;

    const renderWidget = () => {
      if (cancelled || !containerRef.current) return;
      const turnstile = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
      if (!turnstile?.render) {
        markUnavailable();
        return;
      }

      try {
        widgetIdRef.current = turnstile.render(containerRef.current, {
          sitekey: siteKey,
          theme: "light",
          size: "compact",
          callback: (token) => onTokenChange(token),
          "expired-callback": () => onTokenChange(null),
          "error-callback": markUnavailable,
        });
      } catch {
        markUnavailable();
      }
    };

    const existing = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]');
    if (existing) {
      renderWidget();
      return () => {
        cancelled = true;
        try {
          const turnstile = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
          if (widgetIdRef.current) turnstile?.remove?.(widgetIdRef.current);
        } catch {
          /* ignore */
        }
      };
    }

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";
    script.async = true;
    script.onload = () => {
      if (!cancelled) renderWidget();
    };
    script.onerror = () => {
      if (!cancelled) markUnavailable();
    };

    const timeoutId = window.setTimeout(() => {
      if (!cancelled && !widgetIdRef.current) markUnavailable();
    }, 12_000);

    document.head.appendChild(script);

    return () => {
      cancelled = true;
      window.clearTimeout(timeoutId);
      try {
        const turnstile = (window as unknown as { turnstile?: TurnstileApi }).turnstile;
        if (widgetIdRef.current) turnstile?.remove?.(widgetIdRef.current);
      } catch {
        /* ignore */
      }
    };
  }, [siteKey, markUnavailable, onTokenChange]);

  if (!siteKey) return null;

  if (unavailable || loadFailed) {
    return (
      <p className="text-sm text-mds-muted" role="status">
        {UNAVAILABLE_MSG}
      </p>
    );
  }

  return (
    <div ref={containerRef} className="flex min-h-[56px] justify-start" aria-label="Vérification anti-spam" />
  );
}

export function isTurnstileRequired(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY);
}
