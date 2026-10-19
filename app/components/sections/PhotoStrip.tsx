import Image from "next/image";

const photos = [
  "/images/menu/salade-variee.jpg",
  "/images/menu/couscous-poulet.jpg",
  "/images/menu/fruits-saison.jpg",
  "/images/menu/viande-pruneaux.jpg",
  "/images/menu/mini-sales.jpg",
  "/images/menu/couscous.jpg",
  "/images/menu/gateaux-marocains.jpg",
  "/images/menu/rfissa.jpg",
];

/** Bandeau de photos réelles qui défile doucement. */
export default function PhotoStrip() {
  const row = [...photos, ...photos];
  return (
    <div className="overflow-hidden bg-paper py-4" aria-hidden>
      <div className="marquee gap-4" style={{ animationDuration: "70s" }}>
        {row.map((src, i) => (
          <div key={i} className="relative mr-4 h-56 w-44 shrink-0 overflow-hidden rounded-[18px] bg-sand md:h-80 md:w-64">
            <Image src={src} alt="" fill sizes="(max-width: 768px) 176px, 256px" quality={70} className="object-cover" />
          </div>
        ))}
      </div>
    </div>
  );
}
