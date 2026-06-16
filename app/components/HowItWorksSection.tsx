"use client";

import Reveal from "./ui/Reveal";

const steps = [
  { number: "01", title: "Choisissez vos plats", description: "Composez votre menu entrées, plats et desserts." },
  { number: "02", title: "Ajoutez vos options", description: "Vaisselle, décoration, services et caftans." },
  { number: "03", title: "Recevez votre devis", description: "Envoyez votre sélection par WhatsApp en un clic." },
  { number: "04", title: "Nous nous occupons du reste", description: "Une prestation soignée, du dressage au service." },
];

export default function HowItWorksSection() {
  return (
    <section
      className="relative border-t border-mds-border bg-[var(--surface-soft)]/40 py-16 md:py-20"
      aria-labelledby="how-it-works-heading"
    >
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="font-serif text-sm uppercase tracking-[0.28em] text-[var(--gold)]">
            Simple &amp; fluide
          </p>
          <h2
            id="how-it-works-heading"
            className="lux-heading mt-4 font-serif text-3xl font-semibold text-mds-text md:text-4xl"
          >
            Comment ça fonctionne ?
          </h2>
        </Reveal>

        {/* Desktop — timeline horizontale */}
        <div className="relative mt-14 hidden md:block">
          <div
            aria-hidden
            className="absolute left-[12.5%] right-[12.5%] top-8 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/40 to-transparent"
          />
          <div className="grid grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <Reveal key={step.number} delay={0.08 * i}>
                <div className="relative text-center">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-[var(--gold)]/40 bg-[var(--surface)] font-serif text-lg font-semibold text-[var(--gold)] shadow-[0_8px_24px_var(--mds-shadow)]">
                    {step.number}
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-semibold text-mds-text">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-mds-muted">{step.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        {/* Mobile — timeline verticale */}
        <ol className="relative mt-10 space-y-0 md:hidden">
          <div
            aria-hidden
            className="absolute bottom-4 left-[1.65rem] top-4 w-px bg-[var(--gold)]/30"
          />
          {steps.map((step, i) => (
            <Reveal key={step.number} delay={0.06 * i}>
              <li className="relative flex gap-5 pb-8 last:pb-0">
                <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/40 bg-[var(--surface)] font-serif text-sm font-semibold text-[var(--gold)] shadow-[0_6px_20px_var(--mds-shadow)]">
                  {step.number}
                </div>
                <div className="pt-1">
                  <h3 className="font-serif text-lg font-semibold text-mds-text">{step.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-mds-muted">{step.description}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
