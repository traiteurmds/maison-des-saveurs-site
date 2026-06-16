"use client";

import { FaPhone } from "react-icons/fa";
import { PHONE_TEL } from "../lib/site-seo";
import { selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";

export default function MobileCallButton() {
  return (
    <a
      href={PHONE_TEL}
      aria-label="Appeler Maison Des Saveurs"
      className={cn(
        "mobile-call-button fixed z-40 flex h-11 w-11 items-center justify-center rounded-full bg-[var(--black)] text-[var(--ivory)] shadow-[0_8px_28px_rgba(11,11,10,0.22)] transition-all duration-300 hover:bg-[var(--charcoal)] hover:shadow-[0_10px_32px_rgba(11,11,10,0.28)] lg:hidden",
        selectableFocusClass
      )}
    >
      <FaPhone className="text-sm" aria-hidden />
    </a>
  );
}
