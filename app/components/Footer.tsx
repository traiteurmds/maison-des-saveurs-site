"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaTiktok } from "react-icons/fa";
import {
  FOOTER_PRESTATIONS,
  FOOTER_SEO_TEXT,
  EMAIL,
  EMAIL_MAILTO,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICE_AREAS,
} from "../lib/site-seo";
import { LEGAL_ROUTES } from "../lib/legal";
import { useCookieConsent } from "./cookies/CookieConsentProvider";

function scrollToTop() {
  if (typeof window !== "undefined") {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
}

const footerLinks = [
  { href: "/", label: "Accueil" },
  { href: "/#menu", label: "Menu" },
  { href: "/caftans", label: "Caftans" },
  { href: "/services", label: "Services" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" },
];

const legalLinks = [
  { href: LEGAL_ROUTES.mentions, label: "Mentions légales" },
  { href: LEGAL_ROUTES.cgv, label: "CGV" },
  { href: LEGAL_ROUTES.privacy, label: "Confidentialité" },
  { href: LEGAL_ROUTES.cookies, label: "Cookies" },
];

export default function Footer() {
  const pathname = usePathname();
  const cookieConsent = useCookieConsent();

  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      const linkPath = href.split("#")[0] || "/";
      if (linkPath === "/#menu" || linkPath === "/") {
        if (href.includes("#menu") && pathname === "/") {
          e.preventDefault();
          document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      if (pathname === linkPath) {
        e.preventDefault();
      }
      scrollToTop();
    },
    [pathname]
  );

  return (
    <footer className="border-t border-mds-border bg-[var(--surface-soft)] text-mds-text">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 lg:col-span-2"
          >
            <Link
              href="/"
              scroll={true}
              onClick={(e) => {
                if (pathname === "/") e.preventDefault();
                scrollToTop();
              }}
              className="nav-link inline-block font-serif text-3xl font-semibold tracking-wide text-mds-text"
            >
              Maison Des Saveurs
            </Link>
            <p className="max-w-md text-sm leading-relaxed text-mds-muted">
              Traiteur halal événementiel à Lyon. Cuisine orientale raffinée pour mariages, hlel,
              réceptions privées et événements professionnels.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://www.instagram.com/mds.traiteur69/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Maison Des Saveurs"
                className="text-xl text-mds-muted transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--gold)]"
              >
                <FaInstagram />
              </a>
              <a
                href="https://www.tiktok.com/@mds.traiteur"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok Maison Des Saveurs"
                className="text-xl text-mds-muted transition-transform duration-200 hover:-translate-y-0.5 hover:text-[var(--gold)]"
              >
                <FaTiktok />
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="space-y-6 text-sm"
          >
            <div>
              <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                Navigation
              </h3>
              <ul className="mt-4 space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      scroll={true}
                      onClick={(e) => handleNavClick(e, link.href)}
                      className="nav-link text-sm text-mds-muted transition-colors duration-200 hover:text-mds-text"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                Contact
              </h3>
              <a
                href={EMAIL_MAILTO}
                className="mt-4 inline-block text-sm text-mds-muted transition-colors hover:text-mds-text"
              >
                {EMAIL}
              </a>
              <a
                href={PHONE_TEL}
                className="mt-1 inline-block text-sm text-mds-muted transition-colors hover:text-mds-text"
              >
                {PHONE_DISPLAY}
              </a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-6 text-sm"
          >
            <div>
              <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                Prestations
              </h3>
              <ul className="mt-4 space-y-2 text-mds-muted">
                {FOOTER_PRESTATIONS.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                Zones desservies
              </h3>
              <p className="mt-4 leading-relaxed text-mds-muted">
                {SERVICE_AREAS.join(" · ")}
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="seo-footer-text mt-12 max-w-4xl space-y-2 text-[11px] leading-relaxed text-mds-muted/80"
        >
          <p>{FOOTER_SEO_TEXT}</p>
          <p>
            <span className="text-mds-muted/90">Zones desservies : </span>
            {SERVICE_AREAS.join(" · ")}
          </p>
          <p>
            <span className="text-mds-muted/90">Prestations : </span>
            {FOOTER_PRESTATIONS.join(" · ")}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-col gap-4 border-t border-mds-border pt-8 text-xs text-mds-muted md:flex-row md:items-center md:justify-between"
        >
          <p>© {new Date().getFullYear()} Maison Des Saveurs. Tous droits réservés.</p>
          <nav
            aria-label="Informations légales"
            className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px]"
          >
            {legalLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-mds-text"
              >
                {link.label}
              </Link>
            ))}
            {cookieConsent && (
              <button
                type="button"
                onClick={cookieConsent.openPreferences}
                className="transition-colors hover:text-mds-text"
              >
                Gérer mes cookies
              </button>
            )}
          </nav>
        </motion.div>
      </div>
    </footer>
  );
}
