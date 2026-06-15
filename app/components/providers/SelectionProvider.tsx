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
  getWhatsappUrl,
  type SelectionState,
} from "../../lib/whatsapp";
import { LEGACY_OPTION_TITLES, migrateOptionTitles } from "../../lib/configurator-options";

const STORAGE_KEY = "mds-selection";

function normalizeSelection(raw: SelectionState): SelectionState {
  return {
    ...raw,
    options: migrateOptionTitles(raw.options),
    starters: [...new Set(raw.starters)],
    mains: [...new Set(raw.mains)],
    desserts: [...new Set(raw.desserts)],
    caftans: [...new Set(raw.caftans)],
  };
}

function parseStoredSelection(saved: string): SelectionState {
  try {
    const parsed = JSON.parse(saved) as SelectionState;
    const merged = { ...EMPTY_SELECTION, ...parsed };
    if (merged.options.some((item) => item in LEGACY_OPTION_TITLES)) {
      return normalizeSelection(merged);
    }
    return merged;
  } catch {
    return EMPTY_SELECTION;
  }
}
const TOAST_DURATION_MS = 2400;

type SelectionContextValue = {
  selection: SelectionState;
  toggleSelection: (category: keyof SelectionState, item: string) => void;
  removeSelectionItem: (category: keyof SelectionState, item: string) => void;
  clearSelection: () => void;
  isSelected: (category: keyof SelectionState, item: string) => boolean;
  whatsappUrl: string;
  counts: ReturnType<typeof getSelectionCounts>;
  totalSelected: number;
  toastMessage: string | null;
  lastAddedKey: string | null;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [selection, setSelection] = useState<SelectionState>(() => {
    if (typeof window === "undefined") return EMPTY_SELECTION;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return parseStoredSelection(saved);
      }
    } catch {
      /* ignore */
    }
    return EMPTY_SELECTION;
  });
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [lastAddedKey, setLastAddedKey] = useState<string | null>(null);
  const skipInitialPersist = useRef(true);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (skipInitialPersist.current) {
      skipInitialPersist.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
  }, [selection]);

  useEffect(() => {
    return () => {
      if (toastTimer.current) clearTimeout(toastTimer.current);
    };
  }, []);

  const showAddedToast = useCallback((category: keyof SelectionState, item: string) => {
    setToastMessage("Ajouté à votre sélection");
    setLastAddedKey(`${category}:${item}`);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setToastMessage(null);
      setLastAddedKey(null);
    }, TOAST_DURATION_MS);
  }, []);

  const toggleSelection = useCallback(
    (category: keyof SelectionState, item: string) => {
      setSelection((prev) => {
        const alreadySelected = prev[category].includes(item);
        if (!alreadySelected) {
          queueMicrotask(() => showAddedToast(category, item));
        }
        return {
          ...prev,
          [category]: alreadySelected
            ? prev[category].filter((selectedItem) => selectedItem !== item)
            : [...prev[category], item],
        };
      });
    },
    [showAddedToast]
  );

  const removeSelectionItem = useCallback((category: keyof SelectionState, item: string) => {
    setSelection((prev) => ({
      ...prev,
      [category]: prev[category].filter((selected) => selected !== item),
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setSelection(EMPTY_SELECTION);
    setToastMessage(null);
    setLastAddedKey(null);
  }, []);

  const isSelected = useCallback(
    (category: keyof SelectionState, item: string) => selection[category].includes(item),
    [selection]
  );

  const whatsappUrl = useMemo(() => getWhatsappUrl(selection), [selection]);
  const counts = useMemo(() => getSelectionCounts(selection), [selection]);
  const totalSelected = useMemo(() => getTotalSelected(selection), [selection]);

  const value = useMemo(
    () => ({
      selection,
      toggleSelection,
      removeSelectionItem,
      clearSelection,
      isSelected,
      whatsappUrl,
      counts,
      totalSelected,
      toastMessage,
      lastAddedKey,
    }),
    [
      selection,
      toggleSelection,
      removeSelectionItem,
      clearSelection,
      isSelected,
      whatsappUrl,
      counts,
      totalSelected,
      toastMessage,
      lastAddedKey,
    ]
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection() {
  const ctx = useContext(SelectionContext);
  if (!ctx) {
    throw new Error("useSelection must be used within SelectionProvider");
  }
  return ctx;
}
