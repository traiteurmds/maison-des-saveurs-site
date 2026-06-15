/** Avis clients issus de la fiche Google Maison Des Saveurs (captures vérifiées). */
export type Testimonial = {
  id: string;
  name: string;
  rating: number;
  text: string;
  source: "google";
};

/** Mettre à jour l’URL directe de la fiche Google (g.page ou lien Maps) dès qu’elle est disponible. */
export const GOOGLE_BUSINESS = {
  rating: 5.0,
  reviewCount: 22,
  profileUrl:
    "https://www.google.com/maps/search/?api=1&query=Maison+des+Saveurs+traiteur+marocain+Lyon",
} as const;

export const TESTIMONIAL_PREVIEW_LENGTH = 160;

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "ghizlane-amine",
    name: "ghizlane amine",
    rating: 5,
    text: "Les bastillas étaient magnifiques ! J'ai commandé une bastilla au poulet pour 4 personnes et une aux fruits de mer, les deux étaient vraiment délicieuses et très bien préparées. L'équipe est aussi très gentille et accueillante. Je recommande vivement, et je repasserai commande sans hésiter !",
    source: "google",
  },
  {
    id: "fatiha-seghir-ouali",
    name: "Fatiha Seghir-ouali",
    rating: 5,
    text: "Service impeccable tout était parfait et délicieux. Merci pour votre gentillesse et votre professionnalisme Maison des Saveur !!!",
    source: "google",
  },
  {
    id: "yassine-mokdad",
    name: "Yassine Mokdad",
    rating: 5,
    text: "Excellent traiteur, tout était parfait. Je recommande 👍",
    source: "google",
  },
  {
    id: "jamal-mokhtari",
    name: "Jamal Mokhtari",
    rating: 5,
    text: "Bon courage vous avez bon service les clients semblent satisfaits de votre service les menus et les gâteaux sont délicieux et variés bonne continuation",
    source: "google",
  },
  {
    id: "imane-beriane",
    name: "Imane Beriane",
    rating: 5,
    text: "Excellent traiteur. Les plats sont délicieux et variés.",
    source: "google",
  },
  {
    id: "sheyma-hrb",
    name: "Sheyma Hrb",
    rating: 5,
    text: "Je recommande !! 😋😋",
    source: "google",
  },
  {
    id: "irene-abdellaoui",
    name: "irene abdellaoui",
    rating: 5,
    text: "Couscous vraiment excellent, allez y les yeux fermés vous ne serez pas déçus. Qualité, quantité, accueil tout y est ! 10/10",
    source: "google",
  },
  {
    id: "lamia-cheklat",
    name: "lamia cheklat",
    rating: 5,
    text: "Je recommande à 1000%. Ils se sont occupés de la fête de naissance de ma fille. Un grand merci à toute l'équipe pour leur sérieux et leur professionnalisme.",
    source: "google",
  },
  {
    id: "adil-bour",
    name: "Adil BOUR",
    rating: 5,
    text: "Très bon traiteur à recommander",
    source: "google",
  },
  {
    id: "mohamed-zakouni",
    name: "MOHAMED ZAKOUNI",
    rating: 5,
    text: "Je tiens à remercier cette famille pour leurs délicieux plats marocains et leur service rapide. Je leur souhaite beaucoup de réussite dans leur activité.",
    source: "google",
  },
  {
    id: "ahfir-e",
    name: "Ahfir E",
    rating: 5,
    text: "Les plats sont magnifiques et délicieux, et le service est absolument impeccable. Je vous souhaite une réussite continue 👏👏",
    source: "google",
  },
  {
    id: "amal-chahab",
    name: "Amal Chahab",
    rating: 5,
    text: "Je recommande vraiment ce traiteur top 🤩",
    source: "google",
  },
  {
    id: "youssef-harbal",
    name: "Youssef Harbal",
    rating: 5,
    text: "Une super adresse. Traiteur très sympa. Les plats sont délicieux et les pâtisseries sont un véritable délice.",
    source: "google",
  },
  {
    id: "alae-alae",
    name: "Alae Alae",
    rating: 5,
    text: "Un bon service magnifique ❤️",
    source: "google",
  },
  {
    id: "yakoub-belateche",
    name: "Yakoub Belateche",
    rating: 5,
    text: "Excellent",
    source: "google",
  },
  {
    id: "sali-ouchani",
    name: "Sali Ouchani",
    rating: 5,
    text: "Que Dieu vous bénisse, le repas a l'air délicieux ! Que Dieu vous accorde une bonne santé. Une autre occasion se présentera, si Dieu le veut.",
    source: "google",
  },
  {
    id: "sami-harbal",
    name: "Sami Harbal",
    rating: 5,
    text: "Haut haut",
    source: "google",
  },
];
