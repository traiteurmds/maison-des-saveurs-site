"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaInstagram, FaTiktok } from "react-icons/fa";

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

function scrollToFaqSection() {
  if (typeof window === "undefined") return;
  const el = document.getElementById("faq");
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

const navLinks = [
  { href: "/", label: "Accueil" },
  { href: "/#menu", label: "Menu" },
  { href: "/about", label: "Notre Maison" },
  { href: "/services", label: "Services" },
  { href: "/#faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const SCROLL_THRESHOLD = 80;
const NAV_BEIGE = "#E8E2D8";

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const scrollToTop = useScrollToTop();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const overDarkHero = pathname === "/" && !scrolled;
  const linkColor = overDarkHero ? NAV_BEIGE : undefined;

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 border-b transition-all duration-300 ease-out ${
        scrolled
          ? "nav-scrolled border-deep-green/10 bg-white/60 shadow-[0_4px_24px_rgba(0,0,0,0.06)] backdrop-blur-md"
          : "border-transparent bg-transparent"
      } ${overDarkHero ? "nav-over-hero" : ""}`}
    >
      <nav className={`mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8 transition-all duration-300 ${
        scrolled ? "py-3.5" : "py-5"
      }`}>
        <Link
          href="/"
          scroll={true}
          onClick={(e) => {
            setIsOpen(false);
            if (pathname === "/") {
              e.preventDefault();
            }
            scrollToTop();
          }}
          className="nav-link nav-logo nav-logo-brand nav-link-underline"
        >
          Maison Des Saveurs
        </Link>

        {/* Desktop nav + réseaux sociaux */}
        <div className="hidden items-center md:flex">
          <ul className="main-nav-list flex items-center gap-10">
            {navLinks.map((link, i) => {
              const linkPath = link.href.split("#")[0] || "/";
              const isActive = pathname === linkPath;
              return (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * i, duration: 0.5 }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      const linkPath = link.href.split("#")[0] || "/";
                      if (link.label === "Menu") {
                        if (pathname === "/") {
                          e.preventDefault();
                          scrollToMenuSection();
                        }
                        return;
                      }
                      if (link.label === "FAQ") {
                        if (pathname === "/") {
                          e.preventDefault();
                          scrollToFaqSection();
                        }
                        return;
                      }
                      if (pathname === linkPath) {
                        e.preventDefault();
                      }
                      scrollToTop();
                    }}
                    className={`main-nav-link nav-link-underline text-sm tracking-widest uppercase transition-colors duration-200 ${
                      isActive ? "font-semibold" : "font-medium"
                    } ${overDarkHero ? "" : "text-deep-green"}`}
                    style={linkColor ? { color: linkColor } : undefined}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              );
            })}
          </ul>
          <div className="ml-4 flex items-center gap-3">
            <a
              href="https://www.instagram.com/mds.traiteur69/"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xl transition-opacity hover:opacity-70 ${overDarkHero ? "" : "text-deep-green"}`}
              style={linkColor ? { color: linkColor } : undefined}
              aria-label="Instagram Maison Des Saveurs"
            >
              <FaInstagram />
            </a>
            <a
              href="https://www.tiktok.com/@mds.traiteur"
              target="_blank"
              rel="noopener noreferrer"
              className={`text-xl transition-opacity hover:opacity-70 ${overDarkHero ? "" : "text-deep-green"}`}
              style={linkColor ? { color: linkColor } : undefined}
              aria-label="TikTok Maison Des Saveurs"
            >
              <FaTiktok />
            </a>
          </div>
        </div>

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex flex-col gap-1.5 p-2 md:hidden"
          aria-label="Ouvrir le menu"
        >
          <motion.span
            animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-6"
            style={{ backgroundColor: overDarkHero ? NAV_BEIGE : "var(--color-deep-green)" }}
          />
          <motion.span
            animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
            className="h-0.5 w-6"
            style={{ backgroundColor: overDarkHero ? NAV_BEIGE : "var(--color-deep-green)" }}
          />
          <motion.span
            animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
            className="h-0.5 w-6"
            style={{ backgroundColor: overDarkHero ? NAV_BEIGE : "var(--color-deep-green)" }}
          />
        </button>
      </nav>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden border-t border-deep-green/10 bg-beige md:hidden"
          >
            <div className="flex flex-col gap-4 px-6 py-4">
              <ul className="flex flex-col gap-1">
                {navLinks.map((link) => {
                  const linkPath = link.href.split("#")[0] || "/";
                  const isActive = pathname === linkPath;
                  return (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        scroll={true}
                        onClick={(e) => {
                          setIsOpen(false);
                          const linkPath = link.href.split("#")[0] || "/";
                          if (link.label === "Menu") {
                            if (pathname === "/") {
                              e.preventDefault();
                              scrollToMenuSection();
                            }
                            return;
                          }
                          if (link.label === "FAQ") {
                            if (pathname === "/") {
                              e.preventDefault();
                              scrollToFaqSection();
                            }
                            return;
                          }
                          if (pathname === linkPath) {
                            e.preventDefault();
                          }
                          scrollToTop();
                        }}
                        className={`nav-link block py-3 font-serif text-lg text-deep-green hover-gold transition-colors duration-200 ${
                          isActive ? "font-semibold" : ""
                        }`}
                      >
                        {link.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>

              <div className="flex items-center gap-4 pt-1">
                <a
                  href="https://www.instagram.com/mds.traiteur69/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-deep-green transition-opacity hover:opacity-70"
                  aria-label="Instagram Maison Des Saveurs"
                >
                  <FaInstagram />
                </a>
                <a
                  href="https://www.tiktok.com/@mds.traiteur"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-2xl text-deep-green transition-opacity hover:opacity-70"
                  aria-label="TikTok Maison Des Saveurs"
                >
                  <FaTiktok />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
