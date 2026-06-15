export const WHATSAPP_PHONE = "33758639734";

export type WhatsappMessageParams = {
  selectedStarters?: string[];
  selectedMains?: string[];
  selectedDesserts?: string[];
  selectedOptions?: string[];
  selectedCaftans?: string[];
  includeCaftanDemande?: boolean;
};

export function buildWhatsappMessage({
  selectedStarters = [],
  selectedMains = [],
  selectedDesserts = [],
  selectedOptions = [],
  selectedCaftans = [],
  includeCaftanDemande = false,
}: WhatsappMessageParams = {}) {
  const list = (items: string[]) =>
    items.length ? items.map((item) => `- ${item}`).join("\n") : "- ..........";

  let message = `Bonjour, je souhaite obtenir un devis Maison Des Saveurs.

Nom : ..........
Prénom : ..........
Téléphone : ..........
Date de l'événement : ..........
Lieu : ..........
Nombre de personnes : ..........
Type d'événement : ..........

Sélection menu :
Entrées :
${list(selectedStarters)}

Plats :
${list(selectedMains)}

Desserts :
${list(selectedDesserts)}

Options souhaitées :
${list(selectedOptions)}

Caftans sélectionnés :
${list(selectedCaftans)}`;

  if (includeCaftanDemande) {
    message += `

Demande :
Location ou vente : ..........
Taille souhaitée : ..........
Date de l'événement : ..........
Lieu : ..........`;
  }

  message += `

Message complémentaire :
..........

Merci.`;

  return message;
}

export function buildWhatsAppUrl(params?: WhatsappMessageParams) {
  const message = buildWhatsappMessage(params);
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

/** Classes partagées pour cartes sélectionnables */
export const selectableCardClass = (selected: boolean) =>
  selected
    ? "border-terracotta bg-[#faf6f0] shadow-[0_0_0_1px_rgba(184,132,84,0.4),0_16px_40px_rgba(184,132,84,0.12)]"
    : "border-mds-border bg-mds-card shadow-[0_12px_40px_var(--mds-shadow)] hover:border-terracotta/40";

export const selectableFocusClass =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-terracotta/50 focus-visible:ring-offset-2 focus-visible:ring-offset-mds-bg";
