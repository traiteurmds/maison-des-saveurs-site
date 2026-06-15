"use client";

import { useState } from "react";
import Image from "next/image";
import { FaWhatsapp } from "react-icons/fa";
import Reveal from "./ui/Reveal";
import { buildWhatsAppUrlWithOptions } from "../lib/whatsapp";
import { cn } from "../lib/utils";

const options = [
  {
    id: "kit-vaisselle",
    title: "Kit vaisselle individuelle",
    description:
      "2 assiettes blanches, couverts dorés et 2 verres par personne. Une option idéale pour une table élégante, harmonieuse et prête à recevoir vos invités.",
    image: "/images/vaisselle/kit-vaisselle.jpg",
  },
  {
    id: "decoration-table",
    title: "Décoration de table complète",
    description:
      "Mise en table complète avec vaisselle individuelle, nappage, serviettes et éléments décoratifs selon votre ambiance. Une solution premium pour un rendu soigné et raffiné.",
    image: "/images/vaisselle/decoration-table.jpg",
  },
];

function OptionCard({
  option,
  selected,
  onToggle,
}: {
  option: (typeof options)[0];
  selected: boolean;
  onToggle: () => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      className={cn(
        "group w-full overflow-hidden rounded-2xl border bg-mds-card text-left transition-all duration-300",
        selected
          ? "border-terracotta shadow-[0_0_0_1px_rgba(184,132,84,0.4),0_20px_48px_rgba(184,132,84,0.15)]"
          : "border-mds-border shadow-[0_12px_40px_var(--mds-shadow)] hover:border-terracotta/40 hover:shadow-[0_20px_48px_var(--mds-shadow)]"
      )}
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-[#f0e8dc] to-[#e8ded0]">
        {!imageError ? (
          <Image
            src={option.image}
            alt={option.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center gap-2 px-6 text-center">
            <span className="font-serif text-sm uppercase tracking-[0.2em] text-terracotta/80">Photo à venir</span>
            <span className="text-xs text-mds-muted">Ajoutez votre image ici</span>
          </div>
        )}
        {selected && (
          <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-terracotta text-xs font-bold text-white">
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

export default function VaisselleOptionsSection() {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleOption = (title: string) => {
    setSelected((prev) => {
      if (prev.includes(title)) return prev.filter((t) => t !== title);
      return [...prev, title];
    });
  };

  const whatsappUrl = buildWhatsAppUrlWithOptions(selected);

  return (
    <section
      id="options-vaisselle"
      className="mds-section relative overflow-hidden border-t border-mds-border bg-mds-bg"
      aria-labelledby="vaisselle-heading"
    >
      <div className="mds-pattern pointer-events-none absolute inset-0 opacity-15" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-sm uppercase tracking-[0.28em] text-terracotta">Complétez votre réception</p>
          <h2 id="vaisselle-heading" className="lux-heading mt-4 font-serif text-4xl font-semibold text-mds-text md:text-5xl">
            Options vaisselle &amp; décoration
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-mds-muted">
            Complétez votre prestation avec une mise en table élégante, pensée pour sublimer votre événement.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-8 md:grid-cols-2">
          {options.map((option, i) => (
            <Reveal key={option.id} delay={0.08 * i}>
              <OptionCard
                option={option}
                selected={selected.includes(option.title)}
                onToggle={() => toggleOption(option.title)}
              />
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 text-center" delay={0.2}>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex min-h-[56px] w-full max-w-md items-center justify-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-sm font-medium tracking-wide text-white shadow-[0_8px_32px_rgba(37,211,102,0.3)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_40px_rgba(37,211,102,0.45)] sm:w-auto sm:min-w-[320px]"
          >
            <FaWhatsapp className="text-xl" />
            Envoyer ma demande avec ces options
          </a>
          {selected.length === 0 && (
            <p className="mt-4 text-sm text-mds-muted">
              Sélectionnez une ou plusieurs options pour les inclure dans votre message WhatsApp.
            </p>
          )}
        </Reveal>
      </div>
    </section>
  );
}
