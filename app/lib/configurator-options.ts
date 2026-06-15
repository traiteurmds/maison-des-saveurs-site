export type ConfiguratorOption = {
  id: string;
  title: string;
  description: string;
  image?: string;
};

export const CONFIGURATOR_OPTIONS: ConfiguratorOption[] = [
  {
    id: "kit-vaisselle",
    title: "Kit vaisselle individuelle",
    description:
      "2 assiettes blanches, couverts dorés et 2 verres par personne. Une table élégante, harmonieuse et prête à recevoir vos invités.",
    image: "/images/vaisselle/kit-vaisselle.jpg",
  },
  {
    id: "decoration-table",
    title: "Décoration de table complète",
    description:
      "Mise en table complète avec vaisselle, nappage, serviettes et éléments décoratifs selon votre ambiance.",
    image: "/images/vaisselle/decoration-table.jpg",
  },
  {
    id: "service-salle",
    title: "Service en salle",
    description:
      "Équipe de service pour l'accueil, le dressage et le déroulement fluide de votre réception.",
  },
  {
    id: "boissons",
    title: "Boissons sur demande",
    description:
      "Prise en charge des boissons selon votre format : softs, jus, thé à la menthe, café et options sur mesure.",
  },
];

export const CONFIGURATOR_STEPS = [
  { id: 1, label: "Menu", targetId: "configurateur-etape-1" },
  { id: 2, label: "Options", targetId: "configurateur-etape-2" },
  { id: 3, label: "Caftans", targetId: "configurateur-etape-3" },
  { id: 4, label: "Envoi", targetId: "configurateur-etape-4" },
] as const;

export function scrollToConfiguratorStep(targetId: string) {
  document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToConfigurator() {
  scrollToConfiguratorStep("configurateur");
}
