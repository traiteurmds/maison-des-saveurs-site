export type ConfiguratorOptionIcon = "serveurs" | "pain-boissons";

export type ConfiguratorOption = {
  id: string;
  title: string;
  description: string;
  image?: string;
  icon?: ConfiguratorOptionIcon;
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
    id: "serveurs",
    title: "Serveurs",
    icon: "serveurs",
    description:
      "Nous disposons d'une équipe de serveurs pour accompagner votre événement. Vous pouvez personnaliser le nombre de serveurs souhaité ainsi que le profil de l'équipe selon vos besoins : hommes, femmes ou équipe mixte.",
  },
  {
    id: "pain-boissons",
    title: "Pain & Boissons",
    icon: "pain-boissons",
    description:
      "Pack comprenant 6 bouteilles d'eau plate, 2 bouteilles d'eau gazeuse, 4 boissons au choix ainsi que le pain en baguettes. Une option pratique pour compléter votre réception simplement.",
  },
];

/** Anciens libellés stockés en localStorage → nouveaux titres */
export const LEGACY_OPTION_TITLES: Record<string, string> = {
  "Service en salle": "Serveurs",
  "Boissons sur demande": "Pain & Boissons",
};

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

export function migrateOptionTitles(options: string[]): string[] {
  const mapped = options.map((item) => LEGACY_OPTION_TITLES[item] ?? item);
  return [...new Set(mapped)];
}
