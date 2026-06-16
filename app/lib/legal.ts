export const LEGAL = {
  tradeName: "Maison Des Saveurs",
  director: "HARBAL OUCHANI Ayman",
  legalForm: "Entrepreneur individuel",
  siren: "101 817 450",
  siret: "101 817 450 00014",
  ape: "56.21Z — Services des traiteurs",
  publicAddress: "Villeurbanne, France",
  adminAddress: "5 Place de Croix-Luizet, 69100 Villeurbanne",
  email: "contact.mds.traiteur@gmail.com",
  phone: "07 58 63 97 34",
  phoneE164: "+33758639734",
  vatNotice: "TVA non applicable, article 293 B du CGI",
  host: {
    name: "Vercel Inc.",
    address: "340 S Lemon Ave #4133, Walnut, CA 91789, États-Unis",
    website: "https://vercel.com",
  },
  mediator: "À compléter — médiateur de la consommation non encore désigné.",
  allergens: [
    "gluten",
    "lait",
    "œufs",
    "fruits à coque",
    "sésame",
    "poisson",
    "crustacés",
    "soja",
    "moutarde",
  ],
} as const;

export const LEGAL_ROUTES = {
  mentions: "/mentions-legales",
  privacy: "/politique-confidentialite",
  cgv: "/conditions-generales-de-vente",
} as const;
