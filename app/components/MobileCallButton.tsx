"use client";

import { FaPhone } from "react-icons/fa";
import { selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";

export default function MobileCallButton() {
  return (
    <a
      href="tel:+33758639734"
      aria-label="Appeler Maison Des Saveurs"
      className={cn(
        "mobile-call-button fixed z-[45] flex h-14 w-14 items-center justify-center rounded-full bg-[var(--black)] text-[var(--ivory)] shadow-[0_8px_28px_rgba(11,11,10,0.22)] transition-all duration-300 hover:bg-[var(--charcoal)] hover:shadow-[0_10px_32px_rgba(11,11,10,0.28)] lg:hidden",
        selectableFocusClass
      )}
    >
      <FaPhone className="text-lg" aria-hidden />
    </a>
  );
}
