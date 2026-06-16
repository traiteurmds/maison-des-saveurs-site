"use client";

import Reveal from "./ui/Reveal";

const stats = [
  { value: "22+", label: "Avis Google 5\u2B50" },
  { value: "100%", label: "Clients satisfaits" },
  { value: "10 000+", label: "Convives servis" },
];

export default function TrustStatsSection() {
  return (
    <section
      className="relative border-b border-mds-border/40 bg-transparent py-7 md:py-9"
      aria-label="Chiffres de confiance"
    >
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="grid grid-cols-3 gap-3 md:gap-10">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={0.06 * i} className="text-center">
              <p className="font-serif text-xl font-semibold tracking-tight text-mds-text md:text-3xl">
                {stat.value}
              </p>
              <p className="mt-1 text-[0.65rem] leading-snug text-mds-muted md:mt-2 md:text-sm">
                {stat.label}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
