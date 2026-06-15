"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { motion } from "framer-motion";
import { FaInstagram, FaTiktok } from "react-icons/fa";

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

export default function Footer() {
  const pathname = usePathname();

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
        <div className="grid gap-12 md:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4 md:col-span-2"
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
              Traiteur marocain Lyon et traiteur oriental Lyon. Couscous lyon événement,
              mariages et réceptions. Cuisine d&apos;exception dans toute la métropole.
            </p>
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

            <div className="space-y-3">
              <h3 className="font-serif text-sm font-semibold uppercase tracking-widest text-[var(--gold)]">
                Contact & réseaux
              </h3>
              <p className="text-sm text-mds-muted">contact.mds.traiteur@gmail.com</p>
              <p className="text-sm text-mds-muted">07.58.63.97.34</p>
              <div className="flex items-center gap-4">
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
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col gap-4 border-t border-mds-border pt-8 text-xs text-mds-muted md:flex-row md:items-center md:justify-between"
        >
          <p>© {new Date().getFullYear()} Maison Des Saveurs. Tous droits réservés.</p>
          <p className="text-[11px]">
            Traiteur marocain lyon · Traiteur oriental lyon · Couscous lyon événement – Expériences
            culinaires sur mesure.
          </p>
        </motion.div>
      </div>
    </footer>
  );
}
