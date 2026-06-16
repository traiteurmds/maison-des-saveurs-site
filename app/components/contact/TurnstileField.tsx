"use client";

import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

const SITE_KEY = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;

export type TurnstileHandle = {
  execute: () => Promise<string | null>;
  reset: () => void;
};

declare global {
  interface Window {
    turnstile?: {
      render: (container: HTMLElement | string, params: Record<string, unknown>) => string;
      execute: (container?: HTMLElement | string) => void;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    onloadTurnstileCallback?: () => void;
  }
}

const TurnstileField = forwardRef<TurnstileHandle>(function TurnstileField(_, ref) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const resolveRef = useRef<((token: string | null) => void) | null>(null);
  const tokenRef = useRef<string | null>(null);

  const renderWidget = useCallback(() => {
    if (!SITE_KEY || !containerRef.current || !window.turnstile) return;

    widgetIdRef.current = window.turnstile.render(containerRef.current, {
      sitekey: SITE_KEY,
      size: "invisible",
      callback: (token: string) => {
        tokenRef.current = token;
        resolveRef.current?.(token);
        resolveRef.current = null;
      },
      "error-callback": () => {
        tokenRef.current = null;
        resolveRef.current?.(null);
        resolveRef.current = null;
      },
      "expired-callback": () => {
        tokenRef.current = null;
      },
    });
  }, []);

  useEffect(() => {
    if (!SITE_KEY) return;

    if (window.turnstile) {
      renderWidget();
      return () => {
        if (widgetIdRef.current && window.turnstile) {
          window.turnstile.remove(widgetIdRef.current);
        }
      };
    }

    const existing = document.querySelector('script[src*="challenges.cloudflare.com/turnstile"]');
    if (!existing) {
      window.onloadTurnstileCallback = () => renderWidget();
      const script = document.createElement("script");
      script.src =
        "https://challenges.cloudflare.com/turnstile/v0/api.js?onload=onloadTurnstileCallback";
      script.async = true;
      document.head.appendChild(script);
    }

    return () => {
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
    };
  }, [renderWidget]);

  useImperativeHandle(ref, () => ({
    execute: () =>
      new Promise((resolve) => {
        if (!SITE_KEY) {
          resolve(null);
          return;
        }
        if (tokenRef.current) {
          resolve(tokenRef.current);
          return;
        }
        resolveRef.current = resolve;
        if (widgetIdRef.current && window.turnstile && containerRef.current) {
          window.turnstile.reset(widgetIdRef.current);
          window.turnstile.execute(containerRef.current);
        } else {
          resolve(null);
        }
      }),
    reset: () => {
      tokenRef.current = null;
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.reset(widgetIdRef.current);
      }
    },
  }));

  if (!SITE_KEY) return null;

  return <div ref={containerRef} className="sr-only" aria-hidden="true" />;
});

export default TurnstileField;
