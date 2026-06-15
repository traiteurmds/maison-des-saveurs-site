"use client";

import Link from "next/link";
import MagneticButton from "./ui/MagneticButton";
import Reveal from "./ui/Reveal";

export default function ContactCTA() {
  return (
    <section className="relative overflow-hidden border-t border-deep-green/10 bg-gradient-to-br from-[#0f1d17] via-[#15281f] to-[#21392d] py-28 md:py-32">
      <div className="mds-pattern pointer-events-none absolute inset-0 opacity-20" aria-hidden />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 18% 22%, rgba(184,132,84,0.22), transparent 36%), radial-gradient(circle at 82% 8%, rgba(255,255,255,0.08), transparent 28%)",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center lg:px-8">
        <Reveal>
          <h2 className="lux-heading font-serif text-4xl font-semibold text-beige md:text-5xl">
            Prêt à sublimer votre événement ?
          </h2>
          <p className="mt-6 text-lg text-beige/90 md:text-xl">
            Demandez votre devis personnalisé et laissez-nous créer un moment d&apos;exception.
          </p>
        </Reveal>
        <Reveal className="mt-12" delay={0.15}>
          <MagneticButton className="inline-block">
            <Link
              href="/contact"
              className="inline-flex min-h-[52px] min-w-[280px] items-center justify-center rounded-full bg-gradient-to-r from-[#b88454] to-[#c99a67] px-10 py-5 font-medium tracking-widest text-white shadow-lg transition-all duration-300 ease-out hover:shadow-xl hover:shadow-[#b88454]/30 md:min-h-[56px] md:min-w-[320px]"
            >
              Demander un devis
            </Link>
          </MagneticButton>
        </Reveal>
      </div>
    </section>
  );
}
