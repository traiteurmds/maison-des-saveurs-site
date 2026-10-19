"use client";

/** Délai à attendre avant les animations d'entrée : l'écran d'ouverture dure ~1,7 s la première fois. */
export function getIntroDelay() {
  if (typeof document === "undefined") return 0;
  return document.documentElement.classList.contains("intro-seen") ? 0.1 : 1.75;
}
