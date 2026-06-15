"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import ThemeToggle from "./ui/ThemeToggle";
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

  return (
    <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4 md:px-6 md:pt-5">
      <motion.header
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={cn(
          "pointer-events-auto w-full max-w-6xl rounded-full border border-mds-border bg-mds-surface shadow-[0_8px_40px_var(--mds-shadow)] backdrop-blur-xl transition-all duration-500",
          scrolled && "shadow-[0_12px_48px_var(--mds-shadow)]"
        )}
      >
        <nav className="flex items-center justify-between gap-3 px-4 py-2.5 md:px-6 md:py-3">
          <Link
            href="/"
            scroll={true}
            onClick={(e) => {
              setIsOpen(false);
              if (pathname === "/") e.preventDefault();
              scrollToTop();
            }}
            className="nav-link shrink-0 font-serif text-sm font-semibold tracking-wide text-mds-text transition-colors hover:text-terracotta sm:text-base md:text-lg"
          >
            <span className="sm:hidden">MDS</span>
            <span className="hidden sm:inline">Maison Des Saveurs</span>
          </Link>

          <ul className="hidden items-center gap-1 lg:flex">
            {navLinks.map((link) => {
              const linkPath = link.href.split("#")[0] || "/";
              const isActive = pathname === linkPath;
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      setIsOpen(false);
                      if (link.label === "Menu") {
                        if (pathname === "/") {
                          e.preventDefault();
                          scrollToMenuSection();
                        }
                        return;
                      }
                      if (pathname === linkPath) e.preventDefault();
                      scrollToTop();
                    }}
                    className={cn(
                      "rounded-full px-3.5 py-2 text-[0.7rem] font-medium uppercase tracking-[0.14em] transition-all duration-300",
                      isActive
                        ? "bg-mds-text/8 text-terracotta"
                        : "text-mds-muted hover:bg-mds-text/5 hover:text-mds-text"
                    )}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="flex items-center gap-2 md:gap-3">
            <div className="hidden items-center gap-2 sm:flex">
              <a
                href="https://www.instagram.com/mds.traiteur69/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full text-mds-muted transition-colors hover:bg-mds-text/5 hover:text-terracotta"
                aria-label="Instagram Maison Des Saveurs"
              >
                <FaInstagram className="text-sm" />
              </a>
              <a
                href="https://www.tiktok.com/@mds.traiteur"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-full text-mds-muted transition-colors hover:bg-mds-text/5 hover:text-terracotta"
                aria-label="TikTok Maison Des Saveurs"
              >
                <FaTiktok className="text-sm" />
              </a>
            </div>
            <ThemeToggle className="h-9 w-9" />
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="flex h-9 w-9 flex-col items-center justify-center gap-1 rounded-full border border-mds-border bg-mds-card lg:hidden"
              aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
              aria-expanded={isOpen}
            >
              <motion.span
                animate={isOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
                className="h-0.5 w-4 bg-mds-text"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="h-0.5 w-4 bg-mds-text"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
                className="h-0.5 w-4 bg-mds-text"
              />
            </button>
          </div>
        </nav>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden border-t border-mds-border lg:hidden"
            >
              <ul className="flex flex-col gap-1 px-4 py-4">
                {navLinks.map((link) => {
                  const linkPath = link.href.split("#")[0] || "/";
                  const isActive = pathname === linkPath;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={(e) => {
                          setIsOpen(false);
                          if (link.label === "Menu") {
                            if (pathname === "/") {
                              e.preventDefault();
                              scrollToMenuSection();
                            }
                            return;
                          }
                          if (pathname === linkPath) e.preventDefault();
                          scrollToTop();
                        }}
                        className={cn(
                          "block rounded-xl px-4 py-3 font-serif text-lg transition-colors",
                          isActive ? "bg-mds-text/8 text-terracotta" : "text-mds-text hover:bg-mds-text/5"
                        )}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
              <div className="flex items-center gap-4 border-t border-mds-border px-6 py-4">
                <a
                  href="https://www.instagram.com/mds.traiteur69/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-mds-muted hover:text-terracotta"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.tiktok.com/@mds.traiteur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl text-mds-muted hover:text-terracotta"
                  aria-label="TikTok"
                >
                  <FaTiktok />
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </div>
  );
}
