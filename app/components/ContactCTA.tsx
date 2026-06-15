"use client";

import Link from "next/link";
import Reveal from "./ui/Reveal";

export default function ContactCTA() {
  return (
    <section className="mds-section relative overflow-hidden border-t border-mds-border bg-mds-bg">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <Reveal>
          <div className="premium-cta-card rounded-3xl border border-mds-border bg-[var(--surface)] px-8 py-14 text-center shadow-[0_24px_64px_var(--mds-shadow)] md:px-14 md:py-16">
            <p className="font-serif text-xs uppercase tracking-[0.28em] text-[var(--gold)]">
              Votre événement sur mesure
            </p>
            <h2 className="lux-heading mt-4 font-serif text-4xl font-semibold text-mds-text md:text-5xl">
              Prêt à sublimer votre événement ?
            </h2>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-mds-muted md:text-xl">
              Demandez votre devis personnalisé et laissez-nous créer un moment d&apos;exception.
            </p>
            <Link
              href="/contact"
              className="mt-10 inline-flex min-h-[52px] min-w-[280px] items-center justify-center rounded-full bg-[var(--black)] px-10 py-4 font-medium tracking-widest text-[var(--ivory)] transition-all duration-300 hover:bg-[var(--charcoal)] md:min-h-[56px] md:min-w-[320px]"
            >
              Demander un devis
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
