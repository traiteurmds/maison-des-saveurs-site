"use client";

import { FaTimes } from "react-icons/fa";
import { useSelection } from "./providers/SelectionProvider";
import {
  MENU_CATEGORIES,
  SELECTION_LABELS,
  btnPrimaryClass,
  btnSecondaryClass,
  btnGhostClass,
  selectableFocusClass,
  type SelectionState,
} from "../lib/whatsapp";
import { cn } from "../lib/utils";

function SelectionItemRow({
  item,
  onRemove,
}: {
  item: string;
  onRemove: () => void;
}) {
  return (
    <li className="flex items-center justify-between gap-2 rounded-xl border border-mds-border bg-[var(--surface)] px-3 py-2.5 text-sm">
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

type Props = {
  onBrowseMenu?: () => void;
  onClose?: () => void;
  showIntro?: boolean;
  showHeader?: boolean;
};

export default function SelectionDetailPanel({
  onBrowseMenu,
  onClose,
  showIntro = false,
  showHeader = true,
}: Props) {
  const {
    selection,
    totalSelected,
    whatsappUrl,
    removeSelectionItem,
    clearSelection,
  } = useSelection();

  const menuItems = MENU_CATEGORIES.flatMap((cat) =>
    selection[cat].map((item) => ({ category: cat, item }))
  );

  return (
    <div>
      {showHeader && (
        <>
          {showIntro && (
            <>
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
            </>
          )}
          <div className={cn(showIntro && "mt-6 border-t border-mds-border pt-6")}>
            <p className="font-serif text-sm font-semibold text-mds-text">
              Votre sélection · {totalSelected}
            </p>
          </div>
        </>
      )}

      {!showHeader && (
        <p className="font-serif text-lg font-semibold text-mds-text">Votre sélection</p>
      )}

      <div className={cn(showHeader ? "mt-4" : "mt-3")}>
        {totalSelected === 0 ? (
          <div className="space-y-2 text-sm text-mds-muted">
            <p>Aucune sélection pour le moment.</p>
            <p>
              Sélectionnez vos plats, options ou caftans pour préparer votre demande WhatsApp.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {menuItems.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-mds-muted">
                  Menu
                </p>
                <ul className="space-y-2">
                  {menuItems.map(({ category, item }) => (
                    <SelectionItemRow
                      key={`${category}-${item}`}
                      item={item}
                      onRemove={() => removeSelectionItem(category, item)}
                    />
                  ))}
                </ul>
              </div>
            )}

            {selection.options.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-mds-muted">
                  Options
                </p>
                <ul className="space-y-2">
                  {selection.options.map((item) => (
                    <SelectionItemRow
                      key={`opt-${item}`}
                      item={item}
                      onRemove={() => removeSelectionItem("options", item)}
                    />
                  ))}
                </ul>
              </div>
            )}

            {selection.caftans.length > 0 && (
              <div>
                <p className="mb-2 text-xs font-medium uppercase tracking-[0.14em] text-mds-muted">
                  {SELECTION_LABELS.caftans}
                </p>
                <ul className="space-y-2">
                  {selection.caftans.map((item) => (
                    <SelectionItemRow
                      key={`caftan-${item}`}
                      item={item}
                      onRemove={() => removeSelectionItem("caftans", item)}
                    />
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="mt-6 space-y-3">
        {totalSelected > 0 ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className={cn(btnPrimaryClass, selectableFocusClass)}
          >
            Envoyer ma demande complète
          </a>
        ) : (
          <button
            type="button"
            onClick={() => {
              onBrowseMenu?.();
              onClose?.();
            }}
            className={cn(btnPrimaryClass, selectableFocusClass)}
          >
            Commencer ma sélection
          </button>
        )}

        {totalSelected > 0 && (
          <>
            <button
              type="button"
              onClick={clearSelection}
              className={cn(btnSecondaryClass, selectableFocusClass)}
            >
              Vider ma sélection
            </button>
            {onBrowseMenu && (
              <button
                type="button"
                onClick={() => {
                  onBrowseMenu();
                  onClose?.();
                }}
                className={cn(btnGhostClass, selectableFocusClass)}
              >
                Continuer à choisir
              </button>
            )}
          </>
        )}

        {onBrowseMenu && totalSelected === 0 && (
          <button
            type="button"
            onClick={() => {
              onBrowseMenu();
              onClose?.();
            }}
            className={cn(btnGhostClass, selectableFocusClass)}
          >
            Parcourir le menu
          </button>
        )}
      </div>
    </div>
  );
}
