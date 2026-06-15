"use client";

import { useState } from "react";
import Image from "next/image";
import { FaUserTie, FaWineGlass } from "react-icons/fa";
import { GiBread } from "react-icons/gi";
import Reveal from "./ui/Reveal";
import { useSelection } from "./providers/SelectionProvider";
import {
  CONFIGURATOR_OPTIONS,
  scrollToConfiguratorStep,
  type ConfiguratorOptionIcon,
} from "../lib/configurator-options";
import { btnWhatsappClass, selectableCardClass, selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";

const OPTION_MEDIA_HEIGHT = "h-[128px]";

function OptionIcon({ icon }: { icon: ConfiguratorOptionIcon }) {
  if (icon === "serveurs") {
    return <FaUserTie className="text-xl" aria-hidden />;
  }
  return (
    <span className="flex items-center gap-1.5" aria-hidden>
      <GiBread className="text-lg" />
      <FaWineGlass className="text-base opacity-90" />
    </span>
  );
}

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
  const hasIcon = Boolean(option.icon);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      aria-label={`${selected ? "Désélectionner" : "Sélectionner"} ${option.title}`}
      className={cn(
        "group flex h-full min-h-[280px] w-full flex-col overflow-hidden rounded-2xl border text-left transition-all duration-300",
        selectableCardClass(selected),
        selectableFocusClass
      )}
    >
      <div
        className={cn(
          "relative w-full shrink-0 overflow-hidden bg-gradient-to-br from-[var(--surface-soft)] to-[var(--surface)]",
          OPTION_MEDIA_HEIGHT
        )}
      >
        {hasImage && !imageError ? (
          <Image
            src={option.image!}
            alt={option.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : hasIcon ? (
          <div className="flex h-full items-center justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-mds-border bg-[var(--surface)] text-[var(--gold)] shadow-[0_6px_20px_var(--mds-shadow)]">
              <OptionIcon icon={option.icon!} />
            </div>
          </div>
        ) : null}
        {hasImage && imageError && (
          <div className="flex h-full w-full items-center justify-center">
            <span className="font-serif text-xs uppercase tracking-[0.2em] text-[var(--gold)]/80">
              Photo à venir
            </span>
          </div>
        )}
        {selected && (
          <div
            className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--gold)] text-[0.65rem] font-bold text-[var(--black)]"
            aria-hidden
          >
            ✓
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <h3 className="min-h-[3.25rem] font-serif text-lg font-semibold leading-snug text-mds-text">
          {option.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-mds-muted">{option.description}</p>
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

        <div className="options-grid mx-auto mt-10 grid w-full grid-cols-1 items-stretch gap-5 md:grid-cols-2 xl:grid-cols-4">
          {CONFIGURATOR_OPTIONS.map((option, i) => (
            <Reveal key={option.id} delay={0.06 * i} className="h-full">
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
