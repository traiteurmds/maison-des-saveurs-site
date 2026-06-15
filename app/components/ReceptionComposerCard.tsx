"use client";

import { FaTimes } from "react-icons/fa";
import { useSelection } from "./providers/SelectionProvider";
import {
  MENU_CATEGORIES,
  SELECTION_LABELS,
  btnWhatsappClass,
  btnWhatsappSecondaryClass,
  selectableFocusClass,
  type SelectionState,
} from "../lib/whatsapp";
import { cn } from "../lib/utils";

type Props = {
  onBrowseMenu?: () => void;
  compact?: boolean;
  className?: string;
};

function SelectionItemRow({
  item,
  category,
  onRemove,
}: {
  item: string;
  category: keyof SelectionState;
  onRemove: () => void;
}) {
  return (
    <li className="flex items-center justify-between gap-2 rounded-lg border border-mds-border/60 bg-mds-bg/50 px-3 py-2 text-sm">
      <span className="min-w-0 truncate text-mds-text">{item}</span>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Retirer ${item}`}
        className={cn(
          "flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-mds-border text-mds-muted transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]",
          selectableFocusClass
        )}
      >
        <FaTimes className="text-[0.65rem]" aria-hidden />
      </button>
    </li>
  );
}

export default function ReceptionComposerCard({ onBrowseMenu, compact = false, className }: Props) {
  const {
    selection,
    counts,
    totalSelected,
    whatsappUrl,
    removeSelectionItem,
    clearSelection,
  } = useSelection();

  const menuItems = MENU_CATEGORIES.flatMap((cat) =>
    selection[cat].map((item) => ({ category: cat, item }))
  );

  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-3xl border border-mds-border bg-mds-card shadow-[0_24px_64px_var(--mds-shadow)]",
        compact ? "p-5" : "p-8 md:p-10",
        className
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[var(--gold)]/8 blur-2xl"
      />
      <p className="font-serif text-xs uppercase tracking-[0.28em] text-[var(--gold)]">
        Votre réception sur mesure
      </p>
      <h2 className="mt-3 font-serif text-2xl font-semibold text-mds-text md:text-3xl">
        Composez votre réception
      </h2>
      <p className="mt-4 text-sm leading-relaxed text-mds-muted md:text-base">
        Sélectionnez vos plats, vos options de vaisselle et vos caftans. Votre demande se
        prépare automatiquement dans un message WhatsApp clair, complet et prêt à envoyer.
      </p>

      <div className="mt-6 border-t border-mds-border pt-6">
        <p className="font-serif text-sm font-semibold text-mds-text">Votre sélection</p>

        {totalSelected === 0 ? (
          <p className="mt-3 text-sm text-mds-muted">Aucune sélection pour le moment.</p>
        ) : (
          <div className="mt-4 space-y-4">
            {menuItems.length > 0 && (
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.14em] text-mds-muted">Menu</p>
                <ul className="space-y-2">
                  {menuItems.map(({ category, item }) => (
                    <SelectionItemRow
                      key={`${category}-${item}`}
                      item={item}
                      category={category}
                      onRemove={() => removeSelectionItem(category, item)}
                    />
                  ))}
                </ul>
              </div>
            )}

            {selection.options.length > 0 && (
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.14em] text-mds-muted">Options</p>
                <ul className="space-y-2">
                  {selection.options.map((item) => (
                    <SelectionItemRow
                      key={`opt-${item}`}
                      item={item}
                      category="options"
                      onRemove={() => removeSelectionItem("options", item)}
                    />
                  ))}
                </ul>
              </div>
            )}

            {selection.caftans.length > 0 && (
              <div>
                <p className="mb-2 text-xs uppercase tracking-[0.14em] text-mds-muted">
                  {SELECTION_LABELS.caftans}
                </p>
                <ul className="space-y-2">
                  {selection.caftans.map((item) => (
                    <SelectionItemRow
                      key={`caftan-${item}`}
                      item={item}
                      category="caftans"
                      onRemove={() => removeSelectionItem("caftans", item)}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-8 space-y-3">
        {totalSelected > 0 ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(btnWhatsappClass, selectableFocusClass)}
          >
            Envoyer ma demande complète
          </a>
        ) : (
          <button
            type="button"
            onClick={onBrowseMenu}
            className={cn(btnWhatsappClass, selectableFocusClass)}
          >
            Commencer ma sélection
          </button>
        )}

        {totalSelected > 0 && (
          <button
            type="button"
            onClick={clearSelection}
            className={cn(btnWhatsappSecondaryClass, selectableFocusClass)}
          >
            Vider ma sélection
          </button>
        )}

        {onBrowseMenu && (
          <button
            type="button"
            onClick={onBrowseMenu}
            className={cn(
              "w-full py-2 text-center text-sm text-[var(--gold)] underline-offset-4 transition-colors hover:underline",
              selectableFocusClass
            )}
          >
            Parcourir le menu
          </button>
        )}
      </div>

      {!compact && totalSelected > 0 && (
        <p className="mt-4 text-center text-xs text-mds-muted">
          {counts.menu} plat{counts.menu !== 1 ? "s" : ""} · {counts.options} option
          {counts.options !== 1 ? "s" : ""} · {counts.caftans} caftan
          {counts.caftans !== 1 ? "s" : ""}
        </p>
      )}
    </div>
  );
}
