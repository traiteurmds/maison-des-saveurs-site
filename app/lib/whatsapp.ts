export const WHATSAPP_PHONE = "33758639734";

export type SelectionState = {
  starters: string[];
  mains: string[];
  desserts: string[];
  options: string[];
  caftans: string[];
};

export const EMPTY_SELECTION: SelectionState = {
  starters: [],
  mains: [],
  desserts: [],
  options: [],
  caftans: [],
};

const formatItems = (items: string[]) => items.map((item) => `- ${item}`).join("\n");

export function buildWhatsappMessage(selection: SelectionState) {
  const sections: string[] = [];

  sections.push(`Bonjour, je souhaite obtenir un devis Maison Des Saveurs.

Nom :
Prénom :
Téléphone :
Date de l'événement :
Lieu :
Nombre de personnes :
Type d'événement :`);

  const menuSections: string[] = [];

  if (selection.starters.length > 0) {
    menuSections.push(`Entrées :
${formatItems(selection.starters)}`);
  }

  if (selection.mains.length > 0) {
    menuSections.push(`Plats :
${formatItems(selection.mains)}`);
  }

  if (selection.desserts.length > 0) {
    menuSections.push(`Desserts :
${formatItems(selection.desserts)}`);
  }

  if (menuSections.length > 0) {
    sections.push(`Sélection menu :
${menuSections.join("\n\n")}`);
  }

  if (selection.options.length > 0) {
    sections.push(`Options vaisselle & décoration :
${formatItems(selection.options)}`);
  }

  if (selection.caftans.length > 0) {
    sections.push(`Caftans sélectionnés :
${formatItems(selection.caftans)}

Demande caftans :
Location ou vente :
Taille souhaitée :`);
  }

  sections.push(`Message complémentaire :

Merci.`);

  return sections.join("\n\n");
}

export function getWhatsappUrl(selection: SelectionState) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(buildWhatsappMessage(selection))}`;
}

export function getSelectionCounts(selection: SelectionState) {
  const menu =
    selection.starters.length + selection.mains.length + selection.desserts.length;
  return {
    menu,
    options: selection.options.length,
    caftans: selection.caftans.length,
    total: menu + selection.options.length + selection.caftans.length,
  };
}

/** Classes partagées pour cartes sélectionnables */
export const selectableCardClass = (selected: boolean) =>
  selected
    ? "border-terracotta bg-[#faf6f0] shadow-[0_0_0_1px_rgba(184,132,84,0.4),0_16px_40px_rgba(184,132,84,0.12)] dark:bg-[#1a241c]"
    : "border-mds-border bg-mds-card shadow-[0_12px_40px_var(--mds-shadow)] hover:border-terracotta/40";

export const selectableFocusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-mds-bg";
