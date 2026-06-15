"use client";

import Reveal from "./ui/Reveal";
import SelectionDetailPanel from "./SelectionDetailPanel";
import { scrollToConfiguratorStep } from "../lib/configurator-options";
import { useSelection } from "./providers/SelectionProvider";
import { selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";

export default function ConfiguratorSummaryStep() {
  const { totalSelected } = useSelection();

  return (
    <div className="rounded-3xl border border-mds-border bg-[rgba(255,255,255,0.78)] p-8 shadow-[0_24px_64px_var(--mds-shadow)] backdrop-blur-sm md:p-10">
      <Reveal>
        <p className="font-serif text-xs uppercase tracking-[0.24em] text-[var(--gold)]">
          Étape 4 — Envoi
        </p>
        <h3 className="mt-2 font-serif text-2xl font-semibold text-mds-text md:text-3xl">
          Votre demande est prête
        </h3>
        <p className="mt-3 text-mds-muted">
          Vérifiez votre sélection puis envoyez votre message WhatsApp complet en un clic.
        </p>
        <p className="mt-2 text-sm font-medium text-mds-text">
          {totalSelected === 0
            ? "0 élément sélectionné"
            : `${totalSelected} élément${totalSelected > 1 ? "s" : ""} sélectionné${totalSelected > 1 ? "s" : ""}`}
        </p>
      </Reveal>

      <div className="mt-8">
        <SelectionDetailPanel
          onBrowseMenu={() => scrollToConfiguratorStep("configurateur-etape-1")}
          showHeader={false}
        />
      </div>

      {totalSelected > 0 && (
        <button
          type="button"
          onClick={() => scrollToConfiguratorStep("configurateur-etape-1")}
          className={cn(
            "mt-4 w-full py-2 text-center text-sm text-[var(--gold)] underline-offset-4 hover:underline",
            selectableFocusClass
          )}
        >
          Continuer ma sélection
        </button>
      )}
    </div>
  );
}
