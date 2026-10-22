/**
 * Le Journal de Maison Des Saveurs : modèle de contenu.
 * Les textes acceptent un balisage minimal : [lien](/adresse), *italique*, **gras**.
 */

export type RubriqueId =
  | "histoire"
  | "cuisine-marocaine"
  | "mariages"
  | "conseils"
  | "art-de-recevoir"
  | "entreprises";

export type Rubrique = {
  id: RubriqueId;
  number: string;
  label: string;
  short: string;
  description: string;
  /** Page de prestation la plus proche du sujet de la rubrique */
  link: { href: string; label: string };
  /** Sujets en préparation, affichés « à paraître » tant qu'ils ne sont pas publiés */
  upcoming: string[];
};

export type JournalImage = {
  src: string;
  alt: string;
  width: number;
  height: number;
  caption?: string;
  position?: string;
};

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; id: string; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "list"; items: string[]; ordered?: boolean }
  | { type: "figure"; image: JournalImage; layout?: "column" | "wide" | "portrait" }
  | { type: "pair"; images: [JournalImage, JournalImage]; caption?: string }
  | { type: "aside"; title: string; text?: string; items?: string[] }
  | { type: "spices" }
  | { type: "cta"; title: string; text: string; links: { href: string; label: string }[] };

export type Article = {
  slug: string;
  rubrique: RubriqueId;
  title: string;
  /** Titre plus court pour Google et le partage (environ 60 caractères) */
  seoTitle: string;
  description: string;
  /** Chapô affiché sous le titre */
  dek: string;
  /** Résumé court pour les cartes */
  excerpt: string;
  publishedAt: string;
  updatedAt?: string;
  hero: JournalImage;
  keywords: string[];
  body: Block[];
  related: string[];
  closing: { title: string; text: string };
};
