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

export const SELECTION_LABELS: Record<keyof SelectionState, string> = {
  starters: "Entrées",
  mains: "Plats",
  desserts: "Desserts",
  options: "Options vaisselle & décoration",
  caftans: "Caftans",
};

export const MENU_CATEGORIES: (keyof SelectionState)[] = ["starters", "mains", "desserts"];

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
${formatItems(selection.caftans)}`);
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

export function getTotalSelected(selection: SelectionState) {
  return Object.values(selection).reduce((total, items) => total + items.length, 0);
}

/** Classes partagées pour cartes sélectionnables */
export const selectableCardClass = (selected: boolean) =>
  selected
    ? "border-[var(--gold)] bg-[var(--soft-gold)]/25 shadow-[0_0_0_1px_rgba(198,164,106,0.35),0_16px_40px_var(--mds-shadow)] dark:bg-[var(--gold)]/10"
    : "border-mds-border bg-mds-card shadow-[0_12px_40px_var(--mds-shadow)] hover:border-[var(--gold)]/35";

export const selectableFocusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--gold)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-mds-bg";

export const btnWhatsappClass =
  "inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-[var(--black)] px-6 py-3 text-sm font-medium tracking-wide text-[var(--ivory)] transition-all duration-300 hover:bg-[var(--charcoal)] dark:bg-[var(--ivory)] dark:text-[var(--black)] dark:hover:bg-[var(--soft-gold)]";

export const btnWhatsappSecondaryClass =
  "inline-flex min-h-[48px] w-full items-center justify-center rounded-full border border-mds-border bg-transparent px-6 py-3 text-sm font-medium tracking-wide text-mds-muted transition-all hover:border-[var(--gold)]/40 hover:text-mds-text";
