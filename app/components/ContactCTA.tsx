"use client";

import Link from "next/link";
import Reveal from "./ui/Reveal";

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden border-t border-mds-border bg-[var(--black)] py-28 md:py-32">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(circle at 50% 0%, rgba(198,164,106,0.12), transparent 55%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <Reveal>
          <h2 className="lux-heading font-serif text-4xl font-semibold text-[var(--ivory)] md:text-5xl">
            Prêt à sublimer votre événement ?
          </h2>
          <p className="mt-6 text-lg text-[var(--ivory)]/75 md:text-xl">
            Demandez votre devis personnalisé et laissez-nous créer un moment d&apos;exception.
          </p>
        </Reveal>
        <Reveal className="mt-12" delay={0.15}>
          <Link
            href="/contact"
            className="inline-flex min-h-[52px] min-w-[280px] items-center justify-center rounded-full border border-[var(--gold)]/40 bg-[var(--gold)] px-10 py-4 font-medium tracking-widest text-[var(--black)] transition-all duration-300 hover:bg-[var(--soft-gold)] md:min-h-[56px] md:min-w-[320px]"
          >
            Demander un devis
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
