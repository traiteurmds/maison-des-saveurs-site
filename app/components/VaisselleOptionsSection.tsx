"use client";

import { useState } from "react";
import Image from "next/image";
import Reveal from "./ui/Reveal";
import { useSelection } from "./providers/SelectionProvider";
import { CONFIGURATOR_OPTIONS, scrollToConfiguratorStep } from "../lib/configurator-options";
import { btnWhatsappClass, selectableCardClass, selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";

function OptionCard({
  option,
  selected,
  onToggle,
}: {
  option: (typeof CONFIGURATOR_OPTIONS)[0];
  selected: boolean;
  onToggle: () => void;
}) {
  const [imageError, setImageError] = useState(false);
  const hasImage = Boolean(option.image);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      aria-label={`${selected ? "Désélectionner" : "Sélectionner"} ${option.title}`}
      className={cn(
        "group w-full overflow-hidden rounded-2xl border text-left transition-all duration-300",
        selectableCardClass(selected),
        selectableFocusClass
      )}
    >
      <div
        className={cn(
          "relative w-full overflow-hidden bg-gradient-to-br from-[var(--surface-soft)] to-[var(--surface)]",
          hasImage ? "aspect-[16/10]" : "min-h-[120px] flex items-center px-6 py-8"
        )}
      >
        {hasImage && !imageError ? (
          <Image
            src={option.image!}
            alt={option.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : hasImage && imageError ? (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-serif text-sm uppercase tracking-[0.2em] text-[var(--gold)]/80">
              Photo à venir
            </span>
          </div>
        ) : null}
        {selected && (
          <div
            className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--gold)] text-xs font-bold text-[var(--black)]"
            aria-hidden
          >
            ✓
          </div>
        )}
      </div>
      <div className="p-6 md:p-7">
        <h3 className="font-serif text-xl font-semibold text-mds-text md:text-2xl">{option.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-mds-muted md:text-base">{option.description}</p>
      </div>
    </button>
  );
}

export default function VaisselleOptionsSection({
  embedded = false,
  stepLabel,
}: {
  embedded?: boolean;
  stepLabel?: string;
}) {
  const { toggleSelection, isSelected, whatsappUrl, counts } = useSelection();

  return (
    <section
      id="options-vaisselle"
      className={cn(
        "relative overflow-hidden bg-mds-bg",
        embedded ? "py-14 md:py-16" : "mds-section border-t border-mds-border"
      )}
      aria-labelledby="vaisselle-heading"
    >
      <div className="mds-pattern pointer-events-none absolute inset-0 opacity-15" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className={embedded ? "max-w-3xl" : "mx-auto max-w-3xl text-center"}>
          {embedded ? (
            <>
              <p className="font-serif text-xs uppercase tracking-[0.24em] text-[var(--gold)]">
                {stepLabel ?? "Étape 2 — Ajoutez vos options"}
              </p>
              <h2 id="vaisselle-heading" className="mt-2 font-serif text-2xl font-semibold text-mds-text md:text-3xl">
                Vaisselle, décoration &amp; services
              </h2>
              <p className="mt-3 text-mds-muted">
                Complétez votre prestation avec les options qui subliment votre table et votre
                réception.
              </p>
            </>
          ) : (
            <>
              <p className="font-serif text-sm uppercase tracking-[0.28em] text-[var(--gold)]">
                Complétez votre réception
              </p>
              <h2 id="vaisselle-heading" className="lux-heading mt-4 font-serif text-4xl font-semibold text-mds-text md:text-5xl">
                Options vaisselle &amp; décoration
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-mds-muted">
                Complétez votre prestation avec une mise en table élégante, pensée pour sublimer
                votre événement.
              </p>
            </>
          )}
        </Reveal>

        <div className="mt-10 grid gap-6 sm:grid-cols-2">
          {CONFIGURATOR_OPTIONS.map((option, i) => (
            <Reveal key={option.id} delay={0.06 * i}>
              <OptionCard
                option={option}
                selected={isSelected("options", option.title)}
                onToggle={() => toggleSelection("options", option.title)}
              />
            </Reveal>
          ))}
        </div>

        {embedded ? (
          <Reveal className="mt-8" delay={0.15}>
            <button
              type="button"
              onClick={() => scrollToConfiguratorStep("configurateur-etape-3")}
              className={cn(
                "inline-flex min-h-[44px] items-center justify-center rounded-full border border-mds-border px-6 text-sm font-medium text-mds-text transition-colors hover:border-[var(--gold)]/45",
                selectableFocusClass
              )}
            >
              Continuer vers les caftans →
            </button>
          </Reveal>
        ) : (
          <Reveal className="mt-12 text-center" delay={0.2}>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                btnWhatsappClass,
                "max-w-md sm:w-auto sm:min-w-[320px]",
                selectableFocusClass
              )}
            >
              Envoyer ma demande avec ces options
            </a>
            {counts.options === 0 && (
              <p className="mt-4 text-sm text-mds-muted">
                Sélectionnez une ou plusieurs options pour les inclure dans votre message WhatsApp.
              </p>
            )}
          </Reveal>
        )}
      </div>
    </section>
  );
}
