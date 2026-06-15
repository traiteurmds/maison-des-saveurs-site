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

const STORAGE_KEY = "mds-selection";

type SelectionContextValue = {
  selection: SelectionState;
  toggleSelection: (category: keyof SelectionState, item: string) => void;
  removeSelectionItem: (category: keyof SelectionState, item: string) => void;
  clearSelection: () => void;
  isSelected: (category: keyof SelectionState, item: string) => boolean;
  whatsappUrl: string;
  counts: ReturnType<typeof getSelectionCounts>;
  totalSelected: number;
};

const SelectionContext = createContext<SelectionContextValue | null>(null);

export function SelectionProvider({ children }: { children: React.ReactNode }) {
  const [selection, setSelection] = useState<SelectionState>(() => {
    if (typeof window === "undefined") return EMPTY_SELECTION;
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        return { ...EMPTY_SELECTION, ...(JSON.parse(saved) as SelectionState) };
      }
    } catch {
      /* ignore */
    }
    return EMPTY_SELECTION;
  });
  const skipInitialPersist = useRef(true);

  useEffect(() => {
    if (skipInitialPersist.current) {
      skipInitialPersist.current = false;
      return;
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(selection));
  }, [selection]);

  const toggleSelection = useCallback((category: keyof SelectionState, item: string) => {
    setSelection((prev) => {
      const alreadySelected = prev[category].includes(item);
      return {
        ...prev,
        [category]: alreadySelected
          ? prev[category].filter((selectedItem) => selectedItem !== item)
          : [...prev[category], item],
      };
    });
  }, []);

  const removeSelectionItem = useCallback((category: keyof SelectionState, item: string) => {
    setSelection((prev) => ({
      ...prev,
      [category]: prev[category].filter((selected) => selected !== item),
    }));
  }, []);

  const clearSelection = useCallback(() => {
    setSelection(EMPTY_SELECTION);
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
