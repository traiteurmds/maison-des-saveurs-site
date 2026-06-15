export type Realisation = {
  id: string;
  label: string;
  title: string;
  description: string;
  image: string;
};

export const REALISATIONS: Realisation[] = [
  {
    id: "mariage-120",
    label: "Mariage",
    title: "Mariage 120 personnes",
    description:
      "Une réception élégante pensée pour accompagner chaque moment, du dressage à la dégustation.",
    image: "/realisations/mariage-120.jpg",
  },
  {
    id: "hlel-80",
    label: "Célébration familiale",
    title: "Hlel 80 personnes",
    description:
      "Une prestation chaleureuse et raffinée, adaptée aux traditions familiales et aux envies des invités.",
    image: "/realisations/hlel-80.jpg",
  },
  {
    id: "entreprise-200",
    label: "Entreprise",
    title: "Réception entreprise 200 personnes",
    description:
      "Un format professionnel, fluide et généreux, conçu pour recevoir vos équipes et partenaires avec soin.",
    image: "/realisations/entreprise-200.jpg",
  },
];
