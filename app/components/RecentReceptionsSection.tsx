"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import { REALISATIONS } from "../lib/realisations";
import { scrollToConfigurator, scrollToConfiguratorStep } from "../lib/configurator-options";
import { selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";

function RealisationCard({
  item,
  index,
}: {
  item: (typeof REALISATIONS)[0];
  index: number;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <Reveal delay={index * 0.08}>
      <article className="realisation-card group relative min-h-[420px] overflow-hidden rounded-3xl border border-mds-border shadow-[0_24px_64px_var(--mds-shadow)] md:min-h-[480px]">
        {!imageError ? (
          <Image
            src={item.image}
            alt={item.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 768px) 100vw, 1200px"
            onError={() => setImageError(true)}
            priority={index === 0}
          />
        ) : (
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(135deg, #f8f5ef 0%, #e7d7b8 45%, #f1eae0 100%)",
            }}
          />
        )}

        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-[rgba(255,253,248,0.96)] via-[rgba(255,253,248,0.72)] to-[rgba(255,253,248,0.35)]"
        />

        <div className="relative flex h-full min-h-[420px] flex-col justify-end p-8 md:min-h-[480px] md:p-12">
          <p className="font-serif text-xs uppercase tracking-[0.28em] text-[var(--gold)]">
            {item.label}
          </p>
          <h3 className="lux-heading mt-3 font-serif text-3xl font-semibold text-mds-text md:text-4xl lg:text-[2.75rem]">
            {item.title}
          </h3>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-mds-muted md:text-lg">
            {item.description}
          </p>
          <button
            type="button"
            onClick={() => scrollToConfiguratorStep("configurateur-etape-4")}
            className={cn(
              "mt-8 inline-flex min-h-[48px] w-fit items-center justify-center rounded-full bg-[var(--black)] px-8 py-3 text-sm font-medium tracking-wide text-[var(--ivory)] transition-all hover:bg-[var(--charcoal)]",
              selectableFocusClass
            )}
          >
            Demander un devis similaire
          </button>
        </div>
      </article>
    </Reveal>
  );
}

export default function RecentReceptionsSection() {
  return (
    <section
      id="realisations"
      className="mds-section relative overflow-hidden border-t border-mds-border bg-mds-bg"
      aria-labelledby="realisations-heading"
    >
      <div className="mds-pattern pointer-events-none absolute inset-0 opacity-10" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-sm uppercase tracking-[0.28em] text-[var(--gold)]">
            Ils nous ont fait confiance
          </p>
          <h2
            id="realisations-heading"
            className="lux-heading mt-4 font-serif text-4xl font-semibold text-mds-text md:text-5xl"
          >
            Nos dernières réceptions
          </h2>
        </Reveal>

        <div className="mt-14 space-y-8">
          {REALISATIONS.map((item, index) => (
            <RealisationCard key={item.id} item={item} index={index} />
          ))}
        </div>

        <Reveal className="mt-16 text-center" delay={0.15}>
          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-mds-muted">
            Vous préparez un événement similaire ? Sélectionnez vos envies et envoyez-nous votre
            demande en quelques secondes.
          </p>
          <button
            type="button"
            onClick={scrollToConfigurator}
            className={cn(
              "mt-8 inline-flex min-h-[52px] min-w-[280px] items-center justify-center rounded-full border border-mds-border bg-[var(--surface)] px-10 py-4 font-medium tracking-wide text-mds-text shadow-[0_12px_40px_var(--mds-shadow)] transition-all hover:border-[var(--gold)]/45 md:min-h-[56px]",
              selectableFocusClass
            )}
          >
            Composer ma réception
          </button>
        </Reveal>
      </div>
    </section>
  );
}
