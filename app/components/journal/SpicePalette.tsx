import { SPICES } from "../../lib/journal/spices";

/** Nuancier : une pastille de couleur par épice, sans photo d'illustration. */
export default function SpicePalette() {
  return (
    <div className="bleed-sm my-12 grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {SPICES.map((spice, i) => (
        <div key={spice.name} className="flex flex-col gap-4 bg-ivory p-6">
          <div className="flex items-center gap-4">
            <span
              aria-hidden
              className="relative h-14 w-14 shrink-0 rounded-full shadow-[inset_0_-6px_14px_rgba(0,0,0,0.22),0_10px_18px_-10px_rgba(29,25,21,0.5)]"
              style={{
                backgroundColor: spice.tone,
                backgroundImage:
                  "radial-gradient(circle at 32% 28%, rgba(255,255,255,0.35), transparent 42%), url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cfilter id='g'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='1.4' numOctaves='2'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23g)' opacity='0.35'/%3E%3C/svg%3E\")",
              }}
            />
            <div className="min-w-0">
              <p className="font-sans text-[0.62rem] font-semibold uppercase tracking-[0.22em] text-muted">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-[1.45rem] leading-tight text-ink">{spice.name}</h3>
              <p className="font-display text-[0.98rem] italic text-gold">{spice.darija}</p>
            </div>
          </div>
          <p className="text-[0.92rem] font-medium leading-snug text-ink">{spice.aroma}</p>
          <p className="text-[0.9rem] leading-relaxed text-muted">{spice.uses}</p>
        </div>
      ))}
    </div>
  );
}
