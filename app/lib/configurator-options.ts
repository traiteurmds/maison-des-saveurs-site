/** Anciens libellés d'options stockés dans le navigateur → nouveaux titres */
export const LEGACY_OPTION_TITLES: Record<string, string> = {
  "Service en salle": "Serveurs",
  "Boissons sur demande": "Pain & Boissons",
};

export function migrateOptionTitles(options: string[]): string[] {
  const mapped = options.map((item) => LEGACY_OPTION_TITLES[item] ?? item);
  return [...new Set(mapped)];
}
