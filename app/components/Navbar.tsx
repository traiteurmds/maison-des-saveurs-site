"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FiPhone, FiX } from "react-icons/fi";
import { cn } from "../lib/utils";
import { NAV_LINKS, PHONE_DISPLAY, PHONE_TEL, SOCIAL_LINKS } from "../lib/site-seo";
import { WHATSAPP_SIMPLE_URL } from "../lib/whatsapp";
import { useSelection } from "./providers/SelectionProvider";
import { Wordmark } from "./ui/Brand";

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { counts } = useSelection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Referme le menu mobile à chaque changement de page (y compris bouton retour).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    return () => {
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
    };
  }, [open]);

  // Toutes les pages s'ouvrent sur un bandeau sombre : texte clair tant qu'on n'a pas défilé.
  const solid = scrolled;
  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,border-color] duration-500",
          solid
            ? "border-b border-line bg-paper/80 backdrop-blur-xl backdrop-saturate-150"
            : "border-b border-transparent bg-transparent"
        )}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <nav className="container-x flex h-[var(--header-h)] items-center justify-between gap-6" aria-label="Navigation principale">
          <Link href="/" aria-label="Maison Des Saveurs, accueil" className="shrink-0">
            <Wordmark />
          </Link>

          <ul className="hidden items-center gap-6 xl:flex 2xl:gap-8">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "link-underline whitespace-nowrap px-1 py-1 text-[0.72rem] font-semibold uppercase tracking-[0.16em] text-ink-3 transition-colors hover:text-ink",
                    isActive(link.href) && "text-ink [background-size:100%_1px]"
                  )}
                  aria-current={isActive(link.href) ? "page" : undefined}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <a
              href={PHONE_TEL}
              className={cn(
                "hidden items-center gap-2 whitespace-nowrap px-3 py-2 text-[0.8rem] font-medium text-ink-3 transition-colors hover:text-ink 2xl:inline-flex"
              )}
            >
              <FiPhone aria-hidden />
              {PHONE_DISPLAY}
            </a>
            <Link href="/contact" className="btn btn-gold btn-sm hidden sm:inline-flex">
              Demander un devis
              {counts.total > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ivory px-1.5 text-[0.66rem] tracking-normal text-ink">
                  {counts.total}
                </span>
              )}
            </Link>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className={cn(
                "flex h-11 w-11 items-center justify-center rounded-full border border-line-dark text-ink transition-colors xl:hidden"
              )}
              aria-label="Ouvrir le menu"
              aria-expanded={open}
            >
              <span className="flex w-[18px] flex-col gap-[5px]" aria-hidden>
                <span className="h-px w-full bg-current" />
                <span className="h-px w-full bg-current" />
                <span className="h-px w-2/3 bg-current" />
              </span>
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-paper text-ink xl:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="container-x relative flex h-[var(--header-h)] items-center justify-between">
              <Link href="/" onClick={() => setOpen(false)} aria-label="Accueil">
                <Wordmark />
              </Link>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-line-dark"
                aria-label="Fermer le menu"
              >
                <FiX className="text-xl" />
              </button>
            </div>

            <nav className="container-x relative flex flex-1 flex-col justify-center overflow-y-auto py-6">
              <ul>
                {[{ href: "/", label: "Accueil" }, ...NAV_LINKS, { href: "/contact", label: "Devis & contact" }].map(
                  (link, i) => (
                    <motion.li
                      key={link.href}
                      initial={{ opacity: 0, x: -16 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.04 * i + 0.05, duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex items-baseline gap-4 border-b border-line py-3 font-display text-[2.1rem] leading-tight tracking-[-0.02em] transition-colors",
                          pathname === link.href ? "italic text-gold" : "text-ink hover:text-gold"
                        )}
                      >
                        <span className="w-6 font-sans text-[0.66rem] tracking-widest text-muted">
                          {String(i + 1).padStart(2, "0")}
                        </span>
                        {link.label}
                      </Link>
                    </motion.li>
                  )
                )}
              </ul>
            </nav>

            <div className="container-x relative grid grid-cols-2 gap-3 pb-6">
              <a href={PHONE_TEL} className="btn btn-outline">
                <FiPhone aria-hidden /> Appeler
              </a>
              <a href={WHATSAPP_SIMPLE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold">
                <FaWhatsapp aria-hidden /> WhatsApp
              </a>
              <div className="col-span-2 mt-2 flex items-center justify-center gap-6 text-ink-3">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 hover:text-gold">
                  <FaInstagram className="text-xl" />
                </a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-2 hover:text-gold">
                  <FaTiktok className="text-xl" />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
