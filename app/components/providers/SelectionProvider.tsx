"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  EMPTY_SELECTION,
  getSelectionCounts,
  getTotalSelected,
  type SelectionCategory,
  type SelectionState,
} from "../../lib/whatsapp";
import { migrateOptionTitles } from "../../lib/configurator-options";
import { sanitizeMenuTitles } from "../../lib/menu-migration";
import { CATEGORY_TO_SELECTION, DISHES } from "../../lib/menu-data";

const STORAGE_KEY = "mds-selection";
const TOAST_DURATION_MS = 2200;

const MENU_KEYS: SelectionCategory[] = ["starters", "mains", "desserts", "buffet"];

/** Range chaque plat dans sa catégorie actuelle (la carte a pu évoluer depuis la dernière visite). */
function normalizeSelection(raw: Partial<SelectionState>): SelectionState {
  const next: SelectionState = { ...EMPTY_SELECTION, starters: [], mains: [], desserts: [], buffet: [] };
  const menuTitles = sanitizeMenuTitles(MENU_KEYS.flatMap((key) => raw[key] ?? []));
  for (const title of menuTitles) {
    const dish = DISHES.find((d) => d.title === title);
    if (!dish) continue;
    const key = CATEGORY_TO_SELECTION[dish.category];
    if (!next[key].includes(title)) next[key] = [...next[key], title];
  }
  next.options = migrateOptionTitles(raw.options ?? []);
  next.caftans = [...new Set(raw.caftans ?? [])];
  return next;
}

type SelectionContextValue = {
  selection: SelectionState;
  toggleSelection: (category: SelectionCategory, item: string) => void;
  removeSelectionItem: (category: SelectionCategory, item: string) => void;
  clearSelection: () => void;
  isSelected: (category: SelectionCategory, item: string) => boolean;
  counts: ReturnType<typeof getSelectionCounts>;
  totalSelected: number;
  toastMessage: string | null;
  hydrated: boolean;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [selection, setSelection] = useState<SelectionState>(EMPTY_SELECTION);
  const [hydrated, setHydrated] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      // eslint-disable-next-line react-hooks/set-state-in-effect -- lecture unique du stockage navigateur
      if (saved) setSelection(normalizeSelection(JSON.parse(saved)));
    } catch {
      /* stockage indisponible : la sélection reste en mémoire */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
    } catch {
      /* ignore */
    }
  }, [selection, hydrated]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastMessage(null), TOAST_DURATION_MS);
  }, []);

  const toggleSelection = useCallback(
    (category: SelectionCategory, item: string) => {
      setSelection((prev) => {
        const already = prev[category].includes(item);
        queueMicrotask(() => showToast(already ? `${item} retiré` : `${item} ajouté à votre demande`));
        return {
          ...prev,
          [category]: already ? prev[category].filter((i) => i !== item) : [...prev[category], item],
        };
      });
    },
    [showToast]
  );

  const removeSelectionItem = useCallback((category: SelectionCategory, item: string) => {
    setSelection((prev) => ({ ...prev, [category]: prev[category].filter((i) => i !== item) }));
  }, []);

  const clearSelection = useCallback(() => {
    setSelection(EMPTY_SELECTION);
    setToastMessage(null);
  }, []);

  const isSelected = useCallback(
    (category: SelectionCategory, item: string) => selection[category].includes(item),
    [selection]
  );

  const counts = useMemo(() => getSelectionCounts(selection), [selection]);
  const totalSelected = useMemo(() => getTotalSelected(selection), [selection]);

  const value = useMemo(
    () => ({
      selection,
      toggleSelection,
      removeSelectionItem,
      clearSelection,
      isSelected,
      counts,
      totalSelected,
      toastMessage,
      hydrated,
    }),
    [selection, toggleSelection, removeSelectionItem, clearSelection, isSelected, counts, totalSelected, toastMessage, hydrated]
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection must be used within SelectionProvider");
  return ctx;
}
