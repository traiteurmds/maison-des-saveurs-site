"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaInstagram, FaTiktok, FaWhatsapp } from "react-icons/fa";
import { FiArrowUpRight, FiPhone } from "react-icons/fi";
import { cn } from "../lib/utils";
import { PHONE_DISPLAY, PHONE_TEL, SOCIAL_LINKS } from "../lib/site-seo";
import { WHATSAPP_SIMPLE_URL } from "../lib/whatsapp";
import { useSelection } from "./providers/SelectionProvider";
import { Wordmark } from "./ui/Brand";

/** Cinq entrées seulement : le reste vit dans les pages et le pied de page. */
const MENU = [
  { href: "/menu", label: "La carte", image: "/images/plats/couscous-viande.webp", plate: true },
  { href: "/services", label: "Prestations", image: "/images/menu/viande-pruneaux.jpg" },
  { href: "/gallery", label: "Réalisations", image: "/images/menu/salade-royale.jpg" },
  { href: "/caftans", label: "Caftans", image: "/images/caftans/caftan-01.jpg" },
  { href: "/contact", label: "Contact", image: "/images/menu/gateaux-marocains.jpg" },
];

const SECONDARY = [
  { href: "/traiteur-mariage-lyon", label: "Mariages" },
  { href: "/traiteur-entreprise-lyon", label: "Entreprises" },
  { href: "/faq", label: "FAQ" },
];

const ease = [0.76, 0, 0.24, 1] as const;

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hovered, setHovered] = useState(0);
  const { counts } = useSelection();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Referme le menu à chaque changement de page (y compris bouton retour).
  const [lastPath, setLastPath] = useState(pathname);
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    if (open) window.__lenis?.stop();
    else window.__lenis?.start();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = "";
      window.__lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[85] transition-[background-color,border-color] duration-500",
          scrolled && !open ? "border-b border-line bg-paper/80 backdrop-blur-xl backdrop-saturate-150" : "border-b border-transparent"
        )}
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <nav className="container-x grid h-[var(--header-h)] grid-cols-[1fr_auto_1fr] items-center gap-4" aria-label="Navigation principale">
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            className="group flex items-center gap-3 justify-self-start text-ink"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
          >
            <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-line-dark transition-colors group-hover:border-ink">
              <span className={cn("absolute h-px w-[18px] bg-current transition-transform duration-500", open ? "rotate-45" : "-translate-y-[3px]")} />
              <span className={cn("absolute h-px w-[18px] bg-current transition-transform duration-500", open ? "-rotate-45" : "translate-y-[3px]")} />
            </span>
            <span className="hidden text-[0.7rem] font-semibold uppercase tracking-[0.22em] md:inline">
              {open ? "Fermer" : "Menu"}
            </span>
          </button>

          <Link href="/" aria-label="Maison Des Saveurs, accueil" className="justify-self-center">
            <Wordmark />
          </Link>

          <div className="flex items-center gap-2 justify-self-end">
            <a
              href={PHONE_TEL}
              aria-label={`Appeler le ${PHONE_DISPLAY}`}
              className="hidden h-11 w-11 items-center justify-center rounded-full border border-line-dark text-ink transition-colors hover:bg-ink hover:text-ivory md:flex"
            >
              <FiPhone aria-hidden />
            </a>
            <Link href="/contact" className="btn btn-gold btn-sm hidden sm:inline-flex">
              Devis
              {counts.total > 0 && (
                <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-ivory px-1.5 text-[0.66rem] tracking-normal text-ink">
                  {counts.total}
                </span>
              )}
            </Link>
          </div>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex flex-col bg-paper text-ink"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.9, ease }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            style={{ paddingTop: "env(safe-area-inset-top)", paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <div className="h-[var(--header-h)] shrink-0" />
            <div className="container-x grid flex-1 gap-10 overflow-y-auto py-6 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <nav aria-label="Pages">
                <ul>
                  {MENU.map((link, i) => (
                    <li key={link.href} className="overflow-hidden border-b border-line">
                      <motion.div
                        initial={{ y: "110%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "110%" }}
                        transition={{ duration: 0.9, ease, delay: 0.25 + i * 0.06 }}
                      >
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          onMouseEnter={() => setHovered(i)}
                          onFocus={() => setHovered(i)}
                          className="group flex items-baseline justify-between gap-6 py-3 md:py-4"
                        >
                          <span className="flex items-baseline gap-4 md:gap-6">
                            <span className="w-6 font-sans text-[0.66rem] tabular-nums tracking-widest text-muted">
                              {String(i + 1).padStart(2, "0")}
                            </span>
                            <span
                              className={cn(
                                "font-display text-[2.6rem] leading-[1.02] tracking-[-0.035em] transition-[color,transform] duration-500 md:text-[4.6rem] lg:group-hover:translate-x-4",
                                pathname === link.href ? "italic text-gold" : "group-hover:italic group-hover:text-gold"
                              )}
                            >
                              {link.label}
                            </span>
                          </span>
                          <FiArrowUpRight className="shrink-0 text-xl text-muted transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink" aria-hidden />
                        </Link>
                      </motion.div>
                    </li>
                  ))}
                </ul>
                <motion.div
                  className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  {SECONDARY.map((l) => (
                    <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="link-underline hover:text-ink">
                      {l.label}
                    </Link>
                  ))}
                </motion.div>
              </nav>

              {/* Aperçu visuel (ordinateur) */}
              <div className="relative hidden aspect-[4/5] max-h-[68vh] w-full justify-self-end overflow-hidden lg:block lg:max-w-[440px]">
                <AnimatePresence mode="popLayout">
                  <motion.div
                    key={MENU[hovered].image}
                    className={cn("absolute inset-0", MENU[hovered].plate && "bg-terracotta")}
                    initial={{ clipPath: "inset(100% 0 0 0)" }}
                    animate={{ clipPath: "inset(0% 0 0 0)" }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease }}
                  >
                    {MENU[hovered].plate ? (
                      <div className="absolute inset-[12%] animate-[spin_30s_linear_infinite]">
                        <Image src={MENU[hovered].image} alt="" fill sizes="440px" className="object-contain drop-shadow-[0_30px_40px_rgba(0,0,0,0.35)]" />
                      </div>
                    ) : (
                      <Image src={MENU[hovered].image} alt="" fill sizes="440px" className="object-cover" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <motion.div
              className="container-x flex flex-col gap-4 border-t border-line py-5 sm:flex-row sm:items-center sm:justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="grid grid-cols-2 gap-3 sm:flex">
                <a href={PHONE_TEL} className="btn btn-outline btn-sm">
                  <FiPhone aria-hidden /> {PHONE_DISPLAY}
                </a>
                <a href={WHATSAPP_SIMPLE_URL} target="_blank" rel="noopener noreferrer" className="btn btn-gold btn-sm">
                  <FaWhatsapp aria-hidden /> WhatsApp
                </a>
              </div>
              <div className="flex items-center gap-2 text-ink-3">
                <a href={SOCIAL_LINKS.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="p-2 hover:text-gold">
                  <FaInstagram className="text-xl" />
                </a>
                <a href={SOCIAL_LINKS.tiktok} target="_blank" rel="noopener noreferrer" aria-label="TikTok" className="p-2 hover:text-gold">
                  <FaTiktok className="text-xl" />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
