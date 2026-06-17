"use client";

import { useEffect, useState } from "react";
import { FaPhone } from "react-icons/fa";
import { isRestrictiveInAppBrowser, PHONE_TEL_HREF } from "../lib/phone-utils";
import { selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";
import CallFallbackModal from "./CallFallbackModal";

const buttonClassName = cn(
  "mobile-call-button fixed z-[60] flex h-14 w-14 items-center justify-center rounded-full bg-[var(--black)] text-[var(--ivory)] shadow-[0_8px_28px_rgba(11,11,10,0.22)] transition-[transform,background-color,box-shadow] duration-300 hover:bg-[var(--charcoal)] hover:shadow-[0_10px_32px_rgba(11,11,10,0.28)] lg:hidden touch-manipulation",
  selectableFocusClass
);

export default function MobileCallButton() {
  const [inAppBrowser, setInAppBrowser] = useState(false);
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    setInAppBrowser(isRestrictiveInAppBrowser());
  }, []);

  if (inAppBrowser) {
    return (
      <>
        <button
          type="button"
          onClick={() => setShowFallback(true)}
          aria-label="Appeler Maison Des Saveurs"
          className={buttonClassName}
        >
          <FaPhone className="text-lg" aria-hidden />
        </button>
        {showFallback && <CallFallbackModal onClose={() => setShowFallback(false)} />}
      </>
    );
  }

  return (
    <a href={PHONE_TEL_HREF} aria-label="Appeler Maison Des Saveurs" className={buttonClassName}>
      <FaPhone className="text-lg" aria-hidden />
    </a>
  );
}
