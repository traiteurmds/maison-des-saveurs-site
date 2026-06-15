"use client";

import { useState } from "react";
import PremiumImage from "./ui/PremiumImage";
import { IMAGE_QUALITY, IMAGE_SIZES } from "../lib/image-config";
import Link from "next/link";
import { motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import { CAFTANS } from "../lib/caftans";
import { scrollToConfiguratorStep } from "../lib/configurator-options";
import { useSelection } from "./providers/SelectionProvider";
import { selectableCardClass, selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";

const HOME_CAFTANS = CAFTANS.slice(0, 6);

function CaftanSelectCard({
  title,
  image,
  alt,
  selected,
  onToggle,
}: {
  title: string;
  image: string;
  alt: string;
  selected: boolean;
  onToggle: () => void;
}) {
  const [imageError, setImageError] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      aria-label={`${selected ? "Désélectionner" : "Sélectionner"} ${title}`}
      layout
      animate={selected ? { scale: [1, 1.02, 1] } : { scale: 1 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "overflow-hidden rounded-2xl border text-left transition-all duration-300",
        selectableCardClass(selected),
        selectableFocusClass
      )}
    >
      <div className="relative aspect-[3/4] w-full overflow-hidden bg-[var(--surface-soft)]">
        {!imageError ? (
          <PremiumImage
            src={image}
            alt={alt}
            sizes={IMAGE_SIZES.caftanThumb}
            quality={IMAGE_QUALITY.card}
            objectPosition="center 20%"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="flex h-full items-center justify-center font-serif text-sm text-mds-muted">
            {title}
          </div>
        )}
        {selected && (
          <div className="absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full bg-[var(--gold)] text-xs font-bold text-[var(--black)]">
            ✓
          </div>
        )}
      </div>
      <p className="p-3 text-center font-serif text-sm font-medium text-mds-text">{title}</p>
    </motion.button>
  );
}

export default function ConfiguratorCaftansStep() {
  const { toggleSelection, isSelected } = useSelection();

  return (
    <div>
      <Reveal>
        <p className="font-serif text-xs uppercase tracking-[0.24em] text-[var(--gold)]">
          Étape 3 — Caftans
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-mds-text md:text-3xl">
          Sélectionnez les modèles qui vous intéressent
        </h3>
        <p className="mt-3 max-w-2xl text-mds-muted">
          Optionnel — ajoutez les caftans souhaités à votre demande de devis.
        </p>
      </Reveal>

      <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {HOME_CAFTANS.map((item) => (
          <CaftanSelectCard
            key={item.id}
            title={item.title}
            image={item.image}
            alt={item.alt}
            selected={isSelected("caftans", item.title)}
            onToggle={() => toggleSelection("caftans", item.title)}
          />
        ))}
      </div>

      <Reveal className="mt-8 text-center" delay={0.1}>
        <Link
          href="/caftans"
          className="text-sm text-[var(--gold)] underline-offset-4 hover:underline"
        >
          Voir toute la collection caftans →
        </Link>
        <div className="mt-6">
          <button
            type="button"
            onClick={() => scrollToConfiguratorStep("configurateur-etape-4")}
            className={cn(
              "inline-flex min-h-[44px] items-center justify-center rounded-full border border-mds-border px-6 text-sm font-medium text-mds-text transition-colors hover:border-[var(--gold)]/45",
              selectableFocusClass
            )}
          >
            Continuer vers l&apos;envoi →
          </button>
        </div>
      </Reveal>
    </div>
  );
}
