/**
 * Remplacer ces avis par les vrais avis Google de Maison Des Saveurs.
 * Quand les avis Google seront connectés, passer source: "google" et conserver
 * name, rating, text et event tels quels depuis l'API / widget Google.
 */
export type TestimonialSource = "placeholder" | "google";

export type Testimonial = {
  id: string;
  name: string;
  event: string;
  rating: number;
  text: string;
  source: TestimonialSource;
};

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t1",
    name: "Sarah M.",
    event: "Mariage",
    rating: 5,
    text: "Une prestation magnifique, tout était soigné du début à la fin. Nos invités n'ont pas arrêté de complimenter la cuisine.",
    source: "placeholder",
  },
  {
    id: "t2",
    name: "Karim B.",
    event: "Hlel",
    rating: 5,
    text: "Service impeccable et plats généreux. L'équipe a su s'adapter à nos traditions avec beaucoup de délicatesse.",
    source: "placeholder",
  },
  {
    id: "t3",
    name: "Nadia L.",
    event: "Anniversaire",
    rating: 5,
    text: "Table élégante, saveurs authentiques et organisation fluide. Nous recommandons sans hésiter.",
    source: "placeholder",
  },
  {
    id: "t4",
    name: "Thomas R.",
    event: "Entreprise",
    rating: 5,
    text: "Réception professionnelle pour 150 collaborateurs. Ponctualité, qualité et présentation au rendez-vous.",
    source: "placeholder",
  },
  {
    id: "t5",
    name: "Amina K.",
    event: "Mariage",
    rating: 5,
    text: "Un vrai moment d'exception. Le couscous et les desserts ont fait l'unanimité auprès de nos familles.",
    source: "placeholder",
  },
  {
    id: "t6",
    name: "Julie P.",
    event: "Fête familiale",
    rating: 5,
    text: "Accueil chaleureux, buffet raffiné et équipe à l'écoute. Tout s'est déroulé exactement comme prévu.",
    source: "placeholder",
  },
];
