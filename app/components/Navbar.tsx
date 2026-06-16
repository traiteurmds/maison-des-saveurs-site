"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaTiktok, FaTimes } from "react-icons/fa";
import { cn } from "../lib/utils";

function useScrollToTop() {
  return useCallback(() => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, []);
}

function scrollToMenuSection() {
  if (typeof window === "undefined") return;
  const el = document.getElementById("menu");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/#menu", label: "Menu" },
  { href: "/caftans", label: "Caftans" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollToTop = useScrollToTop();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleLinkClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    link: (typeof navLinks)[0]
  ) => {
    setIsOpen(false);
    const linkPath = link.href.split("#")[0] || "/";
    if (link.label === "Menu") {
      if (pathname === "/") {
        e.preventDefault();
        scrollToMenuSection();
      }
      return;
    }
    if (pathname === linkPath) e.preventDefault();
    scrollToTop();
  };

  return (
    <>
      <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:px-6 md:pt-5">
        <motion.header
          initial={{ y: -24, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className={cn(
            "pointer-events-auto w-full max-w-6xl rounded-full border border-mds-border bg-[rgba(255,253,248,0.92)] shadow-[0_8px_40px_var(--mds-shadow)] backdrop-blur-xl transition-all duration-500",
            scrolled && "shadow-[0_12px_48px_var(--mds-shadow)]"
          )}
        >
          <nav className="flex items-center justify-between gap-3 px-4 py-2.5 md:px-5 md:py-3">
            <Link
              href="/"
              scroll={true}
              onClick={(e) => {
                setIsOpen(false);
                if (pathname === "/") e.preventDefault();
                scrollToTop();
              }}
              className="nav-link shrink-0 font-serif text-sm font-semibold tracking-wide text-mds-text transition-colors hover:text-[var(--gold)] sm:text-base"
            >
              <span className="md:hidden">MDS</span>
              <span className="hidden md:inline">Maison Des Saveurs</span>
            </Link>

            <ul className="hidden items-center gap-0.5 md:flex">
              {navLinks.map((link) => {
                const linkPath = link.href.split("#")[0] || "/";
                const isActive = pathname === linkPath;
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={(e) => handleLinkClick(e, link)}
                      className={cn(
                        "rounded-full px-2.5 py-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] transition-all duration-300 lg:px-3 lg:text-[0.7rem]",
                        isActive
                          ? "text-[var(--gold)]"
                          : "text-mds-muted hover:text-mds-text"
                      )}
                    >
                      {link.label}
                    </Link>
                  </li>
                );
              })}
              <li className="ml-1">
                <Link
                  href="/contact"
                  onClick={(e) => {
                    if (pathname === "/contact") e.preventDefault();
                    scrollToTop();
                  }}
                  className="inline-flex rounded-full bg-[var(--black)] px-4 py-2 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--ivory)] transition-all hover:bg-[var(--gold)] hover:text-[var(--black)] lg:px-5 lg:text-[0.7rem]"
                >
                  Devis
                </Link>
              </li>
            </ul>

            <div className="flex items-center gap-2">
              <div className="hidden items-center gap-1 sm:flex md:hidden">
                <a
                  href="https://www.instagram.com/mds.traiteur69/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-mds-muted hover:text-[var(--gold)]"
                  aria-label="Instagram"
                >
                  <FaInstagram className="text-sm" />
                </a>
                <a
                  href="https://www.tiktok.com/@mds.traiteur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-full text-mds-muted hover:text-[var(--gold)]"
                  aria-label="TikTok"
                >
                  <FaTiktok className="text-sm" />
                </a>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(true)}
                className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full border border-mds-border bg-[var(--surface)] md:hidden"
                aria-label="Ouvrir le menu"
              >
                <span className="h-0.5 w-4 bg-mds-text" />
                <span className="h-0.5 w-4 bg-mds-text" />
                <span className="h-0.5 w-4 bg-mds-text" />
              </button>
            </div>
          </nav>
        </motion.header>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[60] md:hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Menu de navigation"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-mds-text/20 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
              aria-hidden
            />

            <motion.div
              initial={{ y: "-100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-100%" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex h-full flex-col bg-[var(--background)]/97 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between border-b border-mds-border px-6 py-5">
                <span className="font-serif text-lg font-semibold text-mds-text">Menu</span>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-mds-border bg-[var(--surface)] text-mds-text transition-colors hover:border-[var(--gold)] hover:text-[var(--gold)]"
                  aria-label="Fermer le menu"
                >
                  <FaTimes className="text-base" />
                </button>
              </div>

              <nav className="flex flex-1 flex-col justify-center px-8 py-10">
                <ul className="space-y-1">
                  {navLinks.map((link, i) => {
                    const linkPath = link.href.split("#")[0] || "/";
                    const isActive = pathname === linkPath;
                    return (
                      <motion.li
                        key={link.href}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 * i, duration: 0.35 }}
                      >
                        <Link
                          href={link.href}
                          onClick={(e) => handleLinkClick(e, link)}
                          className={cn(
                            "block border-b border-mds-border/60 py-4 font-serif text-2xl tracking-wide transition-colors",
                            isActive ? "text-[var(--gold)]" : "text-mds-text hover:text-[var(--gold)]"
                          )}
                        >
                          {link.label}
                        </Link>
                      </motion.li>
                    );
                  })}
                </ul>
              </nav>

              <div className="flex items-center justify-center gap-6 border-t border-mds-border px-6 py-6">
                <a
                  href="https://www.instagram.com/mds.traiteur69/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-mds-muted transition-colors hover:text-[var(--gold)]"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.tiktok.com/@mds.traiteur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-mds-muted transition-colors hover:text-[var(--gold)]"
                  aria-label="TikTok"
                >
                  <FaTiktok />
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
