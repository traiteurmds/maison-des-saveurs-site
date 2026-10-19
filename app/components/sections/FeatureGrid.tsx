import Reveal from "../ui/Reveal";

export type Feature = { title: string; text: string };

export default function FeatureGrid({ features, columns = 3 }: { features: Feature[]; columns?: 2 | 3 }) {
  return (
    <div className={`grid gap-px overflow-hidden rounded-[var(--radius)] border border-line bg-line sm:grid-cols-2 ${columns === 3 ? "lg:grid-cols-3" : ""}`}>
      {features.map((f, i) => (
        <Reveal key={f.title} delay={0.04 * i} className="h-full">
          <div className="h-full bg-[#fffdf9] p-7 md:p-8">
            <span className="text-gold" aria-hidden>✦</span>
            <h3 className="mt-4 font-display text-[1.55rem] leading-tight text-ink">{f.title}</h3>
            <p className="mt-2.5 text-[0.95rem] leading-relaxed text-muted">{f.text}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
