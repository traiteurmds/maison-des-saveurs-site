/** Anciens titres stockés dans le navigateur des visiteurs → nouveaux titres */
export const LEGACY_MENU_TITLES: Record<string, string> = {
  "Couscous royal": "Couscous Viande",
  "Assiette de fruits": "Plateau de fruits frais",
  "Fruits de saison": "Plateau de fruits frais",
  "Gateaux marocains": "Gâteaux marocains",
  "Mini salés": "Buffet salé oriental",
};

/** Plats retirés de la carte, filtrés au chargement */
export const REMOVED_MENU_TITLES = new Set<string>(["Fruits exotiques"]);

export function sanitizeMenuTitles(items: string[]): string[] {
  const mapped = items.map((item) => LEGACY_MENU_TITLES[item] ?? item);
  return [...new Set(mapped)].filter((item) => !REMOVED_MENU_TITLES.has(item));
}
