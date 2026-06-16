"use client";

import { FaInfo } from "react-icons/fa";
import { selectableFocusClass } from "../../lib/whatsapp";
import { cn } from "../../lib/utils";

export default function CaftanViewButton({
  title,
  onView,
  compact = false,
}: {
  title: string;
  onView: () => void;
  compact?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onView();
      }}
      className={cn(
        "absolute left-2 top-2 z-10 flex items-center justify-center rounded-full border border-white/40 bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60",
        compact ? "h-8 w-8 text-xs" : "h-9 w-9 text-sm",
        selectableFocusClass
      )}
      aria-label={`Voir l'image complète de ${title}`}
    >
      <FaInfo aria-hidden />
    </button>
  );
}
