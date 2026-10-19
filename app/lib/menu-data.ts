import type { SelectionCategory } from "./whatsapp";

export type MenuCategoryId = "entrees" | "plats" | "desserts" | "buffet";

export type Dish = {
  id: string;
  /** Libellé utilisé dans la sélection et le message WhatsApp */
  title: string;
  description: string;
  image: string;
  alt: string;
  category: MenuCategoryId;
  /** Précision affichée sous le titre */
  note?: string;
  /** Pièces d'un buffet */
  pieces?: string[];
  signature?: boolean;
};

export const MENU_CATEGORIES: { id: MenuCategoryId; label: string; intro: string }[] = [
  {
    id: "entrees",
    label: "Entrées",
    intro: "Pour ouvrir le repas avec élégance : salades, pastillas et pièces feuilletées.",
  },
  {
    id: "plats",
    label: "Plats",
    intro: "Les grands plats de la tradition marocaine, servis à partager au centre de la table.",
  },
  {
    id: "buffet",
    label: "Buffets",
    intro: "Des pièces individuelles, salées, pour les cocktails, les buffets et les réceptions debout.",
  },
  {
    id: "desserts",
    label: "Desserts",
    intro: "Une fin de repas fraîche et généreuse.",
  },
];

export const CATEGORY_TO_SELECTION: Record<MenuCategoryId, SelectionCategory> = {
  entrees: "starters",
  plats: "mains",
  desserts: "desserts",
  buffet: "buffet",
};

export const DISHES: Dish[] = [
  {
    id: "salade-royale",
    title: "Salade royale",
    description:
      "Notre entrée d'apparat : une salade généreuse dressée en étages, couronnée de briouates ou de cigares. Elle fait toujours son effet à l'arrivée des invités.",
    image: "/images/menu/salade-royale.jpg",
    alt: "Salade royale dressée en étages, traiteur marocain Lyon",
    category: "entrees",
    note: "Briouates ou cigares au sommet",
    signature: true,
  },
  {
    id: "salade-variee",
    title: "Salade variée",
    description:
      "Salade fraîche et colorée, préparée avec des légumes de saison et une touche d'épices douces. Idéale pour ouvrir l'appétit en douceur.",
    image: "/images/menu/salade-variee.jpg",
    alt: "Salade variée colorée, traiteur marocain Lyon",
    category: "entrees",
  },
  {
    id: "pastilla",
    title: "Pastilla",
    description:
      "Feuilletage croustillant et farce parfumée. La pastilla au poulet, sucrée-salée, ou la pastilla aux fruits de mer : précisez votre préférence dans votre demande.",
    image: "/images/menu/pastilla.jpg",
    alt: "Pastilla aux fruits de mer, traiteur marocain Lyon",
    category: "entrees",
    note: "Au poulet ou aux fruits de mer",
    signature: true,
  },
  {
    id: "couscous-viande",
    title: "Couscous Viande",
    description:
      "Couscous marocain avec légumes fondants et viande mijotée longuement, signature de notre maison.",
    image: "/images/menu/couscous-viande.jpg",
    alt: "Couscous à la viande et aux légumes, traiteur marocain Lyon",
    category: "plats",
    note: "Agneau ou bœuf selon la formule",
    signature: true,
  },
  {
    id: "couscous-poulet",
    title: "Couscous Poulet",
    description:
      "Couscous traditionnel aux légumes fondants, pois chiches et poulet mijoté aux épices marocaines.",
    image: "/images/menu/couscous-poulet.jpg",
    alt: "Couscous au poulet et aux légumes, traiteur marocain Lyon",
    category: "plats",
  },
  {
    id: "poulet-olives",
    title: "Poulet olives",
    description:
      "Poulet marocain aux olives et citron confit, nappé de sa sauce dorée, servi sur plat traditionnel.",
    image: "/images/menu/poulet-olives.jpg",
    alt: "Poulet aux olives et citron confit, traiteur marocain Lyon",
    category: "plats",
    signature: true,
  },
  {
    id: "viande-pruneaux",
    title: "Viande aux pruneaux",
    description:
      "Viande fondante aux pruneaux et amandes, le sucré-salé emblématique des mariages marocains.",
    image: "/images/menu/viande-pruneaux.jpg",
    alt: "Viande aux pruneaux et amandes, traiteur marocain Lyon",
    category: "plats",
  },
  {
    id: "rfissa",
    title: "Rfissa",
    description:
      "Rfissa marocaine traditionnelle, plat généreux et réconfortant pour les grandes tablées et les fêtes de naissance.",
    image: "/images/menu/rfissa.jpg",
    alt: "Rfissa marocaine traditionnelle au poulet, traiteur Lyon",
    category: "plats",
  },
  {
    id: "buffet-snacking",
    title: "Buffet salé snacking",
    description:
      "Des bouchées gourmandes qui plaisent à tous les âges, parfaites pour un cocktail, un anniversaire ou un buffet d'entreprise.",
    image: "/images/menu/mini-sales.jpg",
    alt: "Buffet de mini salés, mini burgers et pièces individuelles",
    category: "buffet",
    pieces: ["Mini burgers", "Mini bagels", "Mini navettes au thon", "Mini pizzas", "Mini wraps"],
  },
  {
    id: "buffet-oriental",
    title: "Buffet salé oriental",
    description:
      "Les classiques feuilletés de la cuisine marocaine, en format individuel, pour un buffet aux saveurs de chez nous.",
    image: "/images/menu/mini-sales.jpg",
    alt: "Briouates, cigares et batbouts pour buffet oriental",
    category: "buffet",
    pieces: ["Mini briouates", "Mini cigares", "Mini batbouts"],
  },
  {
    id: "plateau-fruits",
    title: "Plateau de fruits frais",
    description:
      "Une sélection de fruits frais de saison, découpés et présentés avec soin. Une fin de repas légère qui illumine la table.",
    image: "/images/menu/fruits-saison.jpg",
    alt: "Plateau de fruits frais de saison, traiteur Lyon",
    category: "desserts",
  },
  {
    id: "gateaux-marocains",
    title: "Gâteaux marocains",
    description:
      "Douceurs et pâtisseries marocaines pour accompagner le thé et clôturer le repas en beauté.",
    image: "/images/menu/gateaux-marocains.jpg",
    alt: "Plateau de gâteaux marocains servis avec le thé",
    category: "desserts",
  },
];

export const SIGNATURE_DISHES = DISHES.filter((d) => d.signature);

export type ServiceOption = {
  id: string;
  title: string;
  description: string;
};

/** Options et services réellement proposés (sans prix : chiffrés sur devis). */
export const SERVICE_OPTIONS: ServiceOption[] = [
  {
    id: "kit-vaisselle",
    title: "Kit vaisselle individuelle",
    description: "2 assiettes blanches, couverts dorés et 2 verres par personne.",
  },
  {
    id: "decoration-table",
    title: "Décoration de table complète",
    description: "Nappage, serviettes et éléments décoratifs selon votre ambiance.",
  },
  {
    id: "serveurs",
    title: "Serveurs",
    description: "Le nombre et le profil de votre choix : hommes, femmes ou équipe mixte.",
  },
  {
    id: "pain-boissons",
    title: "Pain & Boissons",
    description: "Pain en baguettes, eaux plates, eaux gazeuses et boissons au choix.",
  },
  {
    id: "recuperation-vaisselle",
    title: "Nettoyage et récupération de la vaisselle",
    description: "Nous récupérons et nettoyons notre vaisselle, vous n'avez rien à gérer.",
  },
];

export const EVENT_TYPES = [
  "Mariage",
  "Hlel",
  "Fiançailles",
  "Naissance / Aqiqa",
  "Baptême",
  "Anniversaire",
  "Fête familiale",
  "Entreprise",
  "Association / Université",
  "Autre",
] as const;
