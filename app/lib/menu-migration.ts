/** Anciens titres de plats stockés en localStorage → nouveaux titres */
export const LEGACY_MENU_TITLES: Record<string, string> = {
  "Couscous royal": "Couscous Viande",
  "Assiette de fruits": "Fruits de saison",
};

export function migrateMenuTitles(items: string[]): string[] {
  const mapped = items.map((item) => LEGACY_MENU_TITLES[item] ?? item);
  return [...new Set(mapped)];
}

export function normalizeMenuSelection<T extends { starters: string[]; mains: string[]; desserts: string[] }>(
  selection: T
): T {
  return {
    ...selection,
    starters: migrateMenuTitles(selection.starters),
    mains: migrateMenuTitles(selection.mains),
    desserts: migrateMenuTitles(selection.desserts),
  };
}
