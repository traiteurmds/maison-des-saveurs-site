"use client";

import { useCallback, useState } from "react";
import { FaPhone } from "react-icons/fa";
import { isRestrictiveInAppBrowser, PHONE_TEL_HREF } from "../lib/phone-utils";
import { selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";
import CallFallbackModal from "./CallFallbackModal";

export default function MobileCallButton() {
  const [showFallback, setShowFallback] = useState(false);

  const handleClick = useCallback((event: React.MouseEvent<HTMLAnchorElement>) => {
    if (isRestrictiveInAppBrowser()) {
      event.preventDefault();
      setShowFallback(true);
    }
  }, []);

  return (
    <>
      <a
        href={PHONE_TEL_HREF}
        onClick={handleClick}
        aria-label="Appeler Maison Des Saveurs"
        className={cn(
          "mobile-call-button fixed z-[45] flex h-14 w-14 items-center justify-center rounded-full bg-[var(--black)] text-[var(--ivory)] shadow-[0_8px_28px_rgba(11,11,10,0.22)] transition-[transform,background-color,box-shadow] duration-300 hover:bg-[var(--charcoal)] hover:shadow-[0_10px_32px_rgba(11,11,10,0.28)] lg:hidden",
          selectableFocusClass
        )}
      >
        <FaPhone className="text-lg" aria-hidden />
      </a>
      {showFallback && <CallFallbackModal onClose={() => setShowFallback(false)} />}
    </>
  );
}
