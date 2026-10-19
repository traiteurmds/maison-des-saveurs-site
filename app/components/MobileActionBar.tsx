"use client";

import Link from "next/link";
import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { FiPhone, FiFileText } from "react-icons/fi";
import { isRestrictiveInAppBrowser, PHONE_TEL_HREF } from "../lib/phone-utils";
import { getWhatsappUrl } from "../lib/whatsapp";
import { useSelection } from "./providers/SelectionProvider";
import CallFallbackModal from "./CallFallbackModal";

/** Barre d'actions fixe sur mobile : appeler, WhatsApp, devis. Toujours sous le pouce. */
export default function MobileActionBar() {
  const { selection, counts } = useSelection();
  const [showFallback, setShowFallback] = useState(false);

  const itemClass =
    "flex flex-1 flex-col items-center justify-center gap-1 text-[0.68rem] font-semibold tracking-wide";

  return (
    <>
      <div
        className="fixed inset-x-0 bottom-0 z-40 border-t border-line-dark bg-ink/95 text-ivory backdrop-blur-xl lg:hidden"
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
      >
        <div className="mx-auto flex h-[var(--mobile-bar-h)] max-w-lg items-stretch px-2">
          <a
            href={PHONE_TEL_HREF}
            className={itemClass}
            onClick={(e) => {
              // Instagram / Facebook bloquent souvent les liens tel: : on affiche le numéro à la place.
              if (isRestrictiveInAppBrowser()) {
                e.preventDefault();
                setShowFallback(true);
              }
            }}
          >
            <FiPhone className="text-lg text-gold-bright" aria-hidden />
            Appeler
          </a>
          <a
            href={getWhatsappUrl(selection)}
            target="_blank"
            rel="noopener noreferrer"
            className={itemClass}
          >
            <FaWhatsapp className="text-lg text-gold-bright" aria-hidden />
            WhatsApp
          </a>
          <div className="flex flex-[1.4] items-center py-2.5 pl-1">
            <Link href="/contact" className="btn btn-gold h-full min-h-0 w-full gap-2 px-3 text-[0.8rem]">
              <FiFileText aria-hidden />
              Mon devis
              {counts.total > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ink px-1.5 text-[0.66rem] text-ivory">
                  {counts.total}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
      {showFallback && <CallFallbackModal onClose={() => setShowFallback(false)} />}
    </>
  );
}
