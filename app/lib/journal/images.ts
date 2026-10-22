import type { JournalImage } from "./types";

/**
 * Photos authentiques de Maison Des Saveurs (prestations réelles), réutilisées par le Journal.
 * Aucune image de banque d'images : tant qu'un sujet n'a pas sa photo, on ne l'illustre pas.
 */
export const JOURNAL_IMAGES = {
  sauceService: {
    src: "/images/realisations/poulets-sauce-service.jpg",
    alt: "Une louche nappe de sauce un poulet aux olives, en cuisine, avant le service",
    width: 788,
    height: 1400,
    position: "center 55%",
  },
  couscous: {
    src: "/images/realisations/couscous-viande-legumes.jpg",
    alt: "Plats de couscous à la viande, légumes et pois chiches, dressés pour une réception",
    width: 1050,
    height: 1400,
    position: "center 30%",
  },
  pruneaux: {
    src: "/images/realisations/viande-pruneaux-amandes.jpg",
    alt: "Rangées de plats de viande aux pruneaux et aux amandes prêts à être servis",
    width: 788,
    height: 1400,
    position: "center 40%",
  },
  serviceBaklawa: {
    src: "/images/realisations/service-baklawa.jpg",
    alt: "Mains gantées servant des pâtisseries orientales à l'assiette lors d'une réception",
    width: 1280,
    height: 1400,
    position: "center 45%",
  },
  pouletAmandes: {
    src: "/images/realisations/poulet-olives-amandes.jpg",
    alt: "Poulet en sauce aux épices, olives, amandes et pommes de terre dorées",
    width: 1050,
    height: 1400,
    position: "center 50%",
  },
  pastilla: {
    src: "/images/realisations/pastilla-fruits-de-mer.jpg",
    alt: "Pastilla aux fruits de mer décorée de crevettes et de rondelles de citron",
    width: 1050,
    height: 1400,
    position: "center 62%",
  },
  saladesBuffet: {
    src: "/images/realisations/salades-composees-buffet.jpg",
    alt: "Grands plats de salades composées alignés sur une table de réception",
    width: 1050,
    height: 1400,
    position: "center 50%",
  },
  buffetSalades: {
    src: "/images/realisations/buffet-salades-composees.jpg",
    alt: "Longue table de salades composées colorées dressées pour un événement",
    width: 788,
    height: 1400,
    position: "center 55%",
  },
  saladesPlateaux: {
    src: "/images/realisations/salades-composees-plateaux.jpg",
    alt: "Plateaux de salades composées aux légumes, œufs et olives",
    width: 1056,
    height: 1400,
    position: "center 50%",
  },
  fruitsMelon: {
    src: "/images/realisations/plateaux-fruits-melon.jpg",
    alt: "Quatre plateaux de fruits frais découpés : melon, pastèque, ananas et raisin",
    width: 1050,
    height: 1400,
    position: "center 50%",
  },
  buffetSnacking: {
    src: "/images/realisations/buffet-snacking.jpg",
    alt: "Buffet de pièces salées : mini-pizzas et wraps présentés sur des plateaux",
    width: 1000,
    height: 1333,
    position: "center 40%",
  },
  pouletsPommes: {
    src: "/images/realisations/poulets-pommes-de-terre.jpg",
    alt: "Plats de poulet, pommes de terre et olives en cours de dressage",
    width: 788,
    height: 1400,
    position: "center 60%",
  },
  saladesSauces: {
    src: "/images/realisations/salades-et-sauces.jpg",
    alt: "Buffet de salades et de sauces alignées pour une réception",
    width: 788,
    height: 1400,
    position: "center 45%",
  },
} satisfies Record<string, JournalImage>;
