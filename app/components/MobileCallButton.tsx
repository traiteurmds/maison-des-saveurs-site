"use client";

import { selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";

export default function MobileCallButton() {
  return (
    <a
      href="tel:+33758639734"
      aria-label="Appeler Maison Des Saveurs"
      className={cn(
        "mobile-call-button fixed z-[45] flex min-h-[44px] items-center gap-2 rounded-full bg-[var(--black)] px-4 py-2.5 text-sm font-medium text-[var(--ivory)] shadow-[0_8px_28px_rgba(11,11,10,0.22)] transition-all duration-300 hover:bg-[var(--charcoal)] hover:shadow-[0_10px_32px_rgba(11,11,10,0.28)] lg:hidden",
        selectableFocusClass
      )}
    >
      <span aria-hidden className="text-base leading-none">
        📞
      </span>
      <span>Appeler</span>
    </a>
  );
}
