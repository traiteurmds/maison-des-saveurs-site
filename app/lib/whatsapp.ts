export const WHATSAPP_PHONE = "33758639734";

export const whatsappDevisMessage = `Bonjour, je souhaite obtenir un devis pour un événement.

Nom :
Prénom :
Date :
Lieu :
Nombre de personnes :
Type d'événement :
Menu souhaité :
Options souhaitées :
Message :

Merci.`;

export function buildWhatsAppUrl(message: string = whatsappDevisMessage) {
  return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(message)}`;
}

export function buildWhatsAppUrlWithOptions(selectedOptions: string[]) {
  const optionsLine = selectedOptions.length > 0 ? selectedOptions.join(", ") : "";
  const message = whatsappDevisMessage.replace(
    "Options souhaitées :",
    `Options souhaitées : ${optionsLine}`
  );
  return buildWhatsAppUrl(message);
}
