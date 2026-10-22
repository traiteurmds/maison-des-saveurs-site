import type { Article, Block, Rubrique, RubriqueId } from "./types";
import { histoireDeNotreCheffe } from "./articles/histoire-de-notre-cheffe";
import { epicesMarocaines } from "./articles/epices-marocaines";
import { repasDeMariage } from "./articles/repas-de-mariage";

export type { Article, Block, Rubrique, RubriqueId } from "./types";

/** Clés techniques à ne jamais retoucher (adresses, identifiants, dates). */
const RAW_KEYS = new Set(["slug", "src", "href", "id", "rubrique", "related", "publishedAt", "updatedAt", "position", "tone", "type", "layout", "number"]);

function withTypo<T>(value: T, key = ""): T {
  if (RAW_KEYS.has(key)) return value;
  if (typeof value === "string") return frTypo(value) as T;
  if (Array.isArray(value)) return value.map((v) => withTypo(v)) as T;
  if (value && typeof value === "object")
    return Object.fromEntries(Object.entries(value).map(([k, v]) => [k, withTypo(v, k)])) as T;
  return value;
}

export const JOURNAL_PATH = "/journal";

export const JOURNAL_INTRO = frTypo(
  "Il y a des saveurs qui nous ramènent à l'enfance, des parfums qui rappellent une maison, et des recettes qui traversent les générations sans jamais perdre leur âme. Bienvenue dans le Journal de Maison Des Saveurs : un espace consacré à la cuisine marocaine, aux gestes transmis, à l'histoire de notre cheffe et aux belles tables qui rassemblent les familles."
);

export const RUBRIQUES: Rubrique[] = withTypo([
  {
    id: "histoire",
    number: "01",
    label: "L'histoire de la maison",
    short: "La maison",
    description: "Le parcours de notre cheffe, la transmission et l'esprit de Maison Des Saveurs.",
    link: { href: "/services", label: "Nos prestations" },
    upcoming: [],
  },
  {
    id: "cuisine-marocaine",
    number: "02",
    label: "Les secrets de la cuisine marocaine",
    short: "Cuisine marocaine",
    description: "Épices, gestes, spécialités : comprendre ce qui donne son caractère à cette cuisine.",
    link: { href: "/menu", label: "La carte" },
    upcoming: [
      "Le couscous : les secrets d'un plat généreux",
      "La pastilla marocaine, entre textures et contrastes",
    ],
  },
  {
    id: "mariages",
    number: "03",
    label: "Mariages et grandes occasions",
    short: "Mariages",
    description: "Guides et repères pour préparer le repas d'un mariage, d'un hlel ou d'une grande fête de famille.",
    link: { href: "/traiteur-mariage-lyon", label: "Le traiteur mariage" },
    upcoming: ["Comment choisir son traiteur de mariage à Lyon"],
  },
  {
    id: "art-de-recevoir",
    number: "04",
    label: "Buffets et art de recevoir",
    short: "Art de recevoir",
    description: "Composer un buffet, estimer les quantités, organiser le déroulé d'une réception.",
    link: { href: "/services", label: "Nos prestations" },
    upcoming: ["Buffet ou repas servi à table : comment choisir ?"],
  },
  {
    id: "conseils",
    number: "05",
    label: "Conseils de cuisine et de conservation",
    short: "Conseils",
    description: "Des conseils utiles et prudents, appuyés sur les recommandations officielles.",
    link: { href: "/faq", label: "Questions fréquentes" },
    upcoming: ["Après une réception : conserver les restes en toute sécurité"],
  },
  {
    id: "entreprises",
    number: "06",
    label: "Entreprises et associations",
    short: "Entreprises",
    description: "Buffets professionnels, repas d'équipe, événements associatifs et universitaires.",
    link: { href: "/traiteur-entreprise-lyon", label: "Le traiteur entreprise" },
    upcoming: ["Organiser un buffet professionnel à Lyon"],
  },
]);

/** Ordre d'affichage : du plus récent au plus ancien, l'article fondateur en tête à date égale. */
export const ARTICLES: Article[] = withTypo([histoireDeNotreCheffe, epicesMarocaines, repasDeMariage]);

export const FEATURED_SLUG = histoireDeNotreCheffe.slug;

/** Sépare un titre « Première partie : seconde partie » pour mettre la seconde en italique. */
export function splitTitle(title: string): [string, string | undefined] {
  const i = title.indexOf("\u00a0: ");
  return i === -1 ? [title, undefined] : [title.slice(0, i), title.slice(i + 3)];
}

export function getArticle(slug: string) {
  return ARTICLES.find((a) => a.slug === slug);
}

export function getRubrique(id: RubriqueId) {
  return RUBRIQUES.find((r) => r.id === id)!;
}

export function articlesInRubrique(id: RubriqueId) {
  return ARTICLES.filter((a) => a.rubrique === id);
}

export function articleUrl(slug: string) {
  return `${JOURNAL_PATH}/${slug}`;
}

/** Texte brut (sans balisage) d'un bloc, pour le temps de lecture. */
function blockText(block: Block): string {
  switch (block.type) {
    case "p":
    case "h2":
    case "h3":
    case "quote":
      return block.text;
    case "list":
      return block.items.join(" ");
    case "aside":
      return [block.title, block.text ?? "", ...(block.items ?? [])].join(" ");
    case "cta":
      return `${block.title} ${block.text}`;
    default:
      return "";
  }
}

export function readingMinutes(article: Article) {
  const words = article.body.map(blockText).join(" ").split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

export function tableOfContents(article: Article) {
  return article.body.flatMap((b) => (b.type === "h2" ? [{ id: b.id, text: b.text }] : []));
}

export function formatDate(iso: string) {
  return new Intl.DateTimeFormat("fr-FR", { day: "numeric", month: "long", year: "numeric", timeZone: "Europe/Paris" }).format(
    new Date(`${iso}T12:00:00Z`)
  );
}

/** Espaces insécables de la typographie française avant : ; ? ! et à l'intérieur des guillemets. */
export function frTypo(text: string) {
  return text
    .replace(/ ([:;?!])/g, "\u00a0$1")
    .replace(/« /g, "«\u00a0")
    .replace(/ »/g, "\u00a0»");
}

/** Retire le balisage léger (*italique*, [lien](url)) pour les attributs et les données structurées. */
export function plain(text: string) {
  return text.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").replace(/\*\*?([^*]+)\*\*?/g, "$1");
}
