/** Tailles responsive réutilisées — évite les chargements surdimensionnés */
export const IMAGE_SIZES = {
  menuCard: "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 360px",
  menuModal: "(max-width: 900px) 100vw, 900px",
  optionCard: "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 280px",
  caftanCard: "(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 300px",
  caftanThumb: "(max-width: 768px) 50vw, 180px",
  serviceHero: "(max-width: 768px) 100vw, 560px",
} as const;

export const IMAGE_QUALITY = {
  card: 78,
  hero: 82,
  modal: 85,
} as const;

/** Zoom hover discret — évite le recadrage agressif */
export const IMAGE_HOVER_SCALE = "group-hover:scale-[1.03]";

/** Points focaux par fichier — préserve le sujet principal au crop 4:3 */
export const IMAGE_FOCAL: Record<string, string> = {
  "/images/menu/salade-variee.jpg": "center 45%",
  "/images/menu/salade-royale.jpg": "center 65%",
  "/images/menu/mini-sales.jpg": "center 55%",
  "/images/menu/couscous-viande.jpg": "center 50%",
  "/images/menu/couscous-poulet.jpg": "center 50%",
  "/images/menu/poulet-olives.jpg": "center 50%",
  "/images/menu/viande-pruneaux.jpg": "center 50%",
  "/images/menu/rfissa.jpg": "center 50%",
  "/images/menu/pastilla.jpg": "center 50%",
  "/images/menu/fruits-saison.jpg": "center 50%",
  "/images/menu/gateaux-marocains.jpg": "center 55%",
  "/images/vaisselle/decoration.jpg": "center 55%",
  "/images/services/mariage.png": "center 40%",
  "/images/services/evenement.png": "center 45%",
  "/images/services/professionnel.jpg": "center 50%",
};

export function focalPoint(src: string): string {
  return IMAGE_FOCAL[src] ?? "center center";
}
