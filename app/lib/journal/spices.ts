/**
 * Nuancier des épices de l'article « Les épices marocaines ».
 * Les noms en darija sont donnés en transcription courante : l'orthographe varie selon les régions.
 * Les teintes évoquent la couleur de l'épice moulue (aucune photo d'épice n'est encore disponible).
 */
export type Spice = {
  name: string;
  darija: string;
  tone: string;
  aroma: string;
  uses: string;
};

export const SPICES: Spice[] = [
  {
    name: "Gingembre",
    darija: "skinjbir",
    tone: "#c9a46a",
    aroma: "Chaleur douce, légèrement citronnée.",
    uses: "La base de nombreux tajines et sauces dorées, souvent associé au curcuma et au poivre.",
  },
  {
    name: "Safran",
    darija: "zaafrane",
    tone: "#b8401c",
    aroma: "Floral, miellé, d'une grande puissance.",
    uses: "Quelques pistils suffisent pour parfumer et colorer une sauce, un bouillon ou une pastilla.",
  },
  {
    name: "Curcuma",
    darija: "kharkoum",
    tone: "#d39a1e",
    aroma: "Terreux, discret, très colorant.",
    uses: "Donne leur teinte dorée aux sauces jaunes, en duo avec le gingembre.",
  },
  {
    name: "Cumin",
    darija: "kamoun",
    tone: "#8a6738",
    aroma: "Chaud, profond, un peu boisé.",
    uses: "Grillades, kefta, salades cuites, marinades. Souvent posé sur la table, mêlé au sel.",
  },
  {
    name: "Paprika doux",
    darija: "felfla hlouwa",
    tone: "#a8361f",
    aroma: "Rond et fruité, sans piquant.",
    uses: "Colore et adoucit les sauces rouges, la chermoula et les poissons.",
  },
  {
    name: "Cannelle",
    darija: "qarfa",
    tone: "#8b4a2b",
    aroma: "Sucrée, chaleureuse, enveloppante.",
    uses: "Le sucré-salé : viande aux pruneaux, pastilla au poulet, desserts et pâtisseries.",
  },
  {
    name: "Poivre noir",
    darija: "lbzar",
    tone: "#3a322b",
    aroma: "Vif, piquant léger, résineux.",
    uses: "Présent presque partout, en petite touche, pour relever sans dominer.",
  },
  {
    name: "Ras el hanout",
    darija: "« tête de la boutique »",
    tone: "#7d4b26",
    aroma: "Complexe, différent d'une maison à l'autre.",
    uses: "Un mélange de composition variable, utilisé dans certains tajines, la rfissa ou les marinades.",
  },
  {
    name: "Fenugrec",
    darija: "helba",
    tone: "#b38d4a",
    aroma: "Puissant, légèrement amer, notes de foin.",
    uses: "Indissociable de la rfissa dans beaucoup de familles. À doser avec précaution.",
  },
];
