/** Anciens titres de plats stockés en localStorage → nouveaux titres */
export const LEGACY_MENU_TITLES: Record<string, string> = {
  "Couscous royal": "Couscous Viande",
  "Assiette de fruits": "Fruits de saison",
};

/** Plats retirés du menu — filtrés au chargement et dans le panier */
export const REMOVED_MENU_TITLES = new Set<string>(["Fruits exotiques"]);

export function migrateMenuTitles(items: string[]): string[] {
  const mapped = items.map((item) => LEGACY_MENU_TITLES[item] ?? item);
  return [...new Set(mapped)];
}

export function sanitizeMenuTitles(items: string[]): string[] {
  return migrateMenuTitles(items).filter((item) => !REMOVED_MENU_TITLES.has(item));
}

export function normalizeMenuSelection<T extends { starters: string[]; mains: string[]; desserts: string[] }>(
  selection: T
): T {
  return {
    ...selection,
    starters: sanitizeMenuTitles(selection.starters),
    mains: sanitizeMenuTitles(selection.mains),
    desserts: sanitizeMenuTitles(selection.desserts),
  };
}
