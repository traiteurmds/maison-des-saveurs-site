export const WHATSAPP_PHONE = "33758639734";

export type SelectionState = {
  starters: string[];
  mains: string[];
  desserts: string[];
  buffet: string[];
  options: string[];
  caftans: string[];
};

export type SelectionCategory = keyof SelectionState;

export const EMPTY_SELECTION: SelectionState = {
  starters: [],
  mains: [],
  desserts: [],
  buffet: [],
  options: [],
  caftans: [],
};

export const SELECTION_LABELS: Record<SelectionCategory, string> = {
  starters: "Entrées",
  mains: "Plats",
  desserts: "Desserts",
  buffet: "Buffet",
  options: "Options",
  caftans: "Caftans",
};

export const SELECTION_ORDER: SelectionCategory[] = [
  "starters",
  "mains",
  "buffet",
  "desserts",
  "options",
  "caftans",
];

export type EventDetails = {
  name?: string;
  phone?: string;
  email?: string;
  eventType?: string;
  date?: string;
  city?: string;
  guests?: string;
  tables?: string;
  message?: string;
};

const list = (items: string[]) => items.map((item) => `- ${item}`).join("\n");

function formatDate(value?: string) {
  if (!value) return "";
  const d = new Date(`${value}T12:00:00`);
  if (Number.isNaN(d.getTime())) return value;
  return d.toLocaleDateString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/** Message de demande de devis, lisible tel quel sur WhatsApp ou par e-mail. */
export function buildRequestMessage(selection: SelectionState, details: EventDetails = {}) {
  const blocks: string[] = ["Bonjour Maison Des Saveurs, je souhaite recevoir un devis."];

  const event = [
    ["Événement", details.eventType],
    ["Date", formatDate(details.date)],
    ["Ville / lieu", details.city],
    ["Nombre d'invités", details.guests],
    ["Nombre de tables", details.tables],
  ]
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => `${k} : ${v}`);

  if (event.length > 0) blocks.push(event.join("\n"));

  const chosen = SELECTION_ORDER.filter((key) => selection[key].length > 0).map(
    (key) => `${SELECTION_LABELS[key]} :\n${list(selection[key])}`
  );
  if (chosen.length > 0) blocks.push(`Ma sélection\n\n${chosen.join("\n\n")}`);

  if (details.message?.trim()) blocks.push(`Précisions :\n${details.message.trim()}`);

  const contact = [
    ["Nom", details.name],
    ["Téléphone", details.phone],
    ["E-mail", details.email],
  ]
    .filter(([, v]) => v && String(v).trim())
    .map(([k, v]) => `${k} : ${v}`);
  if (contact.length > 0) blocks.push(contact.join("\n"));

  blocks.push("Merci !");
  return blocks.join("\n\n");
}

export function getWhatsappUrl(selection: SelectionState, details: EventDetails = {}) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
    buildRequestMessage(selection, details)
  )}`;
}

export const WHATSAPP_SIMPLE_URL = `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
  "Bonjour Maison Des Saveurs, je souhaite des informations pour un événement."
)}`;

export function getSelectionCounts(selection: SelectionState) {
  const menu =
    selection.starters.length +
    selection.mains.length +
    selection.desserts.length +
    selection.buffet.length;
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
