const words = [
  "Couscous",
  "Pastilla",
  "Salade royale",
  "Poulet aux olives",
  "Viande aux pruneaux",
  "Rfissa",
  "Briouates",
  "Plateau de fruits",
];

export default function DishMarquee() {
  const row = [...words, ...words];
  return (
    <div className="marquee-mask overflow-hidden border-b border-line bg-paper py-6" aria-hidden>
      <div className="marquee">
        {row.map((w, i) => (
          <span key={i} className="flex items-center whitespace-nowrap px-6 font-display text-3xl italic text-ink/80 md:text-5xl">
            {w}
            <span className="ml-12 text-lg not-italic text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
