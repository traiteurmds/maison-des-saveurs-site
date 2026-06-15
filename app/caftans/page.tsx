"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FaTiktok } from "react-icons/fa";
import Reveal from "../components/ui/Reveal";
import TiltCard from "../components/ui/TiltCard";
import MagneticButton from "../components/ui/MagneticButton";
import { useSelection } from "../components/providers/SelectionProvider";
import { btnWhatsappClass, selectableCardClass, selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";

type Caftan = {
  id: string;
  title: string;
  image: string;
};

const caftans: Caftan[] = [
  { id: "caftan-01", title: "Caftan 1", image: "/images/caftans/caftan-01.jpg" },
  { id: "caftan-02", title: "Caftan 2", image: "/images/caftans/caftan-02.jpg" },
  { id: "caftan-03", title: "Caftan 3", image: "/images/caftans/caftan-03.jpg" },
  { id: "caftan-04", title: "Caftan 4", image: "/images/caftans/caftan-04.jpg" },
  { id: "caftan-05", title: "Caftan 5", image: "/images/caftans/caftan-05.jpg" },
  { id: "caftan-06", title: "Caftan 6", image: "/images/caftans/caftan-06.jpg" },
  { id: "caftan-07", title: "Caftan 7", image: "/images/caftans/caftan-07.jpg" },
  { id: "caftan-08", title: "Caftan 8", image: "/images/caftans/caftan-08.jpg" },
  { id: "caftan-09", title: "Caftan 9", image: "/images/caftans/caftan-09.jpg" },
  { id: "caftan-10", title: "Caftan 10", image: "/images/caftans/caftan-10.jpg" },
  { id: "caftan-11", title: "Caftan 11", image: "/images/caftans/caftan-11.jpg" },
  { id: "caftan-12", title: "Caftan 12", image: "/images/caftans/caftan-12.jpg" },
];

function CaftanCard({
  item,
  index,
  selected,
  onToggle,
}: {
  item: Caftan;
  index: number;
  selected: boolean;
  onToggle: () => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <Reveal delay={index * 0.03}>
      <TiltCard>
        <button
          type="button"
          onClick={onToggle}
          aria-pressed={selected}
          aria-label={`${selected ? "Désélectionner" : "Sélectionner"} ${item.title}`}
          className={cn(
            "group w-full overflow-hidden rounded-2xl border text-left transition-all duration-500",
            selectableCardClass(selected),
            selectableFocusClass
          )}
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden">
            {imageError ? (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[var(--surface-soft)] to-[var(--surface)] text-center text-mds-text">
                <div>
                  <p className="font-serif text-2xl font-semibold">Photo {index + 1}</p>
                  <p className="mt-2 text-sm text-mds-muted">Ajoute {item.image}</p>
                </div>
              </div>
            ) : (
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1280px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
                onError={() => setImageError(true)}
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" aria-hidden />
            {selected && (
              <div
                className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-[var(--gold)] text-xs font-bold text-[var(--black)] shadow-md"
                aria-hidden
              >
                ✓
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
              <h2 className="font-serif text-2xl font-semibold leading-tight">{item.title}</h2>
            </div>
          </div>
        </button>
      </TiltCard>
    </Reveal>
  );
}

export default function CaftansPage() {
  const { toggleSelection, isSelected, whatsappUrl, counts } = useSelection();

  return (
    <div className="bg-mds-bg pt-28 pb-24">
      <section className="relative overflow-hidden border-b border-mds-border px-6 py-16 text-center md:py-20">
        <div className="mds-pattern pointer-events-none absolute inset-0 opacity-15" aria-hidden />
        <Reveal className="relative z-10">
          <p className="font-serif text-sm uppercase tracking-[0.28em] text-[var(--gold)]">Collection élégance</p>
          <h1 className="lux-heading mt-3 font-serif text-5xl font-semibold text-mds-text md:text-6xl">Nos Caftans</h1>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-mds-muted md:text-base">
            Sélectionnez les modèles qui vous intéressent pour préparer votre demande.
          </p>
          <p className="mx-auto mt-4 max-w-3xl text-lg leading-relaxed text-mds-muted">
            Une sélection raffinée de caftans pour vos plus beaux événements. Location et vente,
            avec accompagnement personnalisé pour trouver la tenue parfaite.
          </p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
        <Reveal>
          <div className="mb-12 overflow-hidden rounded-3xl border border-mds-border bg-[var(--surface)] p-8 text-center shadow-[0_20px_48px_var(--mds-shadow)] md:p-10">
            <p className="font-serif text-xs uppercase tracking-[0.3em] text-[var(--gold)]">Partenariat exclusif</p>
            <p className="mt-3 font-serif text-3xl font-semibold text-mds-text md:text-4xl">MDS x Lamia Créations</p>
            <p className="mx-auto mt-4 max-w-2xl text-mds-muted">
              Découvrez nos inspirations, nouveautés et coulisses sur TikTok.
            </p>
            <a
              href="https://www.tiktok.com/@lamia.creations?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-7 inline-flex items-center justify-center gap-3 rounded-full border border-mds-border bg-[var(--surface-soft)] px-8 py-3 font-medium tracking-[0.14em] text-mds-text transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--gold)]/45"
              aria-label="TikTok Lamia Créations"
            >
              <FaTiktok className="text-lg" />
              Suivre sur TikTok
            </a>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {caftans.map((item, index) => (
            <CaftanCard
              key={item.id}
              item={item}
              index={index}
              selected={isSelected("caftans", item.title)}
              onToggle={() => toggleSelection("caftans", item.title)}
            />
          ))}
        </div>

        <Reveal className="mt-14 text-center">
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
            Envoyer ma sélection caftans
          </a>
          {counts.caftans === 0 ? (
            <p className="mt-4 text-sm text-mds-muted">
              Sélectionnez un ou plusieurs caftans pour les inclure dans votre message WhatsApp.
            </p>
          ) : (
            <p className="mt-4 text-sm text-mds-muted">
              {counts.caftans} caftan{counts.caftans > 1 ? "s" : ""} sélectionné{counts.caftans > 1 ? "s" : ""} · message global avec toutes vos sélections
            </p>
          )}
        </Reveal>

        <Reveal className="mt-16">
          <div className="glass-card rounded-3xl px-8 py-10 text-center md:px-12 md:py-14">
            <h3 className="font-serif text-3xl font-semibold text-mds-text">Un essayage sur mesure</h3>
            <p className="mx-auto mt-3 max-w-2xl text-mds-muted">
              Contactez-nous pour la disponibilité, les tailles et les conditions de location/vente.
            </p>
            <MagneticButton className="mt-7 inline-block">
              <Link
                href="/contact"
                className="inline-flex min-h-[52px] items-center justify-center rounded-full bg-[var(--black)] px-10 py-4 font-medium tracking-[0.16em] text-[var(--ivory)] transition-all duration-300 hover:bg-[var(--charcoal)] hover:shadow-lg"
              >
                Demander un devis
              </Link>
            </MagneticButton>
          </div>
        </Reveal>
      </section>
    </div>
  );
}
