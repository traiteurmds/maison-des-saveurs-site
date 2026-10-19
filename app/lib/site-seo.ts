export const SITE_URL = "https://mds-traiteur.fr";

export const EMAIL = "contact.mds.traiteur@gmail.com";
export const EMAIL_MAILTO = `mailto:${EMAIL}`;

export const PHONE_E164 = "+33758639734";
export const PHONE_TEL = `tel:${PHONE_E164}`;
export const PHONE_DISPLAY = "07 58 63 97 34";

/** Communes desservies habituellement */
export const SERVICE_AREAS = [
  "Lyon",
  "Villeurbanne",
  "Bron",
  "Vénissieux",
  "Saint-Priest",
  "Décines",
  "Meyzieu",
  "Genas",
] as const;

/** Prestations plus éloignées : étudiées selon la date, le trajet et le volume */
export const EXTENDED_AREAS = ["Grenoble", "Annecy"] as const;

export const NAV_LINKS = [
  { href: "/menu", label: "La carte" },
  { href: "/traiteur-mariage-lyon", label: "Mariages" },
  { href: "/traiteur-entreprise-lyon", label: "Entreprises" },
  { href: "/services", label: "Prestations" },
  { href: "/gallery", label: "Réalisations" },
  { href: "/caftans", label: "Caftans" },
  { href: "/faq", label: "FAQ" },
] as const;

export const FOOTER_PRESTATIONS = [
  "Mariages et hlel",
  "Naissances et aqiqas",
  "Anniversaires",
  "Buffets entreprises",
  "Repas entreprises",
  "Associations",
  "Universités",
  "Événements professionnels",
  "Réceptions privées",
] as const;

export const FOOTER_SEO_TEXT =
  "Maison Des Saveurs, traiteur halal événementiel à Lyon, accompagne les mariages, hlel, réceptions privées, buffets d'entreprise, associations, universités et événements professionnels avec une cuisine orientale maison, généreuse et soignée.";

export const SEO_KEYWORDS = [
  "traiteur marocain lyon",
  "traiteur halal lyon",
  "traiteur oriental lyon",
  "traiteur mariage lyon",
  "mariage marocain lyon",
  "buffet oriental lyon",
  "couscous traiteur lyon",
  "traiteur événementiel lyon",
  "traiteur entreprise lyon",
  "buffet entreprise lyon",
  "repas entreprise lyon",
  "traiteur association lyon",
  "traiteur université lyon",
  "traiteur villeurbanne",
  "traiteur grenoble",
  "traiteur annecy",
] as const;

export const SOCIAL_LINKS = {
  instagram: "https://www.instagram.com/mds.traiteur69/",
  tiktok: "https://www.tiktok.com/@mds.traiteur",
  googleBusiness: "https://share.google/uiBTniokmuQrw7QzH",
} as const;
