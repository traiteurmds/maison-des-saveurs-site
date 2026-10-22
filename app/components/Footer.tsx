"use client";

import Link from "next/link";
import { FaInstagram, FaTiktok, FaWhatsapp, FaGoogle } from "react-icons/fa";
import { FiMail, FiPhone } from "react-icons/fi";
import {
  EMAIL,
  EMAIL_MAILTO,
  EXTENDED_AREAS,
  PHONE_DISPLAY,
  PHONE_TEL,
  SERVICE_AREAS,
  SOCIAL_LINKS,
} from "../lib/site-seo";
import { LEGAL, LEGAL_ROUTES } from "../lib/legal";
import { WHATSAPP_SIMPLE_URL } from "../lib/whatsapp";
import { useCookieConsent } from "./cookies/CookieConsentProvider";
import { Wordmark } from "./ui/Brand";

const columns = [
  {
    title: "Découvrir",
    links: [
      { href: "/menu", label: "La carte" },
      { href: "/gallery", label: "Réalisations" },
      { href: "/caftans", label: "Caftans" },
      { href: "/journal", label: "Le Journal" },
      { href: "/faq", label: "Questions fréquentes" },
    ],
  },
  {
    title: "Prestations",
    links: [
      { href: "/traiteur-mariage-lyon", label: "Mariages et hlel" },
      { href: "/services#familles", label: "Naissances, aqiqas, anniversaires" },
      { href: "/traiteur-entreprise-lyon", label: "Entreprises et associations" },
      { href: "/services", label: "Toutes les prestations" },
    ],
  },
];

const legalLinks = [
  { href: LEGAL_ROUTES.mentions, label: "Mentions légales" },
  { href: LEGAL_ROUTES.cgv, label: "CGV" },
  { href: LEGAL_ROUTES.privacy, label: "Confidentialité" },
  { href: LEGAL_ROUTES.cookies, label: "Cookies" },
];

export default function Footer() {
  const cookieConsent = useCookieConsent();

  return (
    <footer className="relative overflow-hidden bg-linen text-ink">
      <div className="container-x relative pt-20 pb-8 md:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.1fr]">
          <div className="max-w-sm">
            <Wordmark />
            <p className="mt-6 text-[0.95rem] leading-relaxed text-muted">
              Cuisine marocaine traditionnelle et halal, préparée avec soin et servie avec
              générosité pour vos mariages, fêtes de famille et événements professionnels.
            </p>
            <div className="mt-6 flex items-center gap-2">
              {[
                { href: SOCIAL_LINKS.instagram, label: "Instagram", Icon: FaInstagram },
                { href: SOCIAL_LINKS.tiktok, label: "TikTok", Icon: FaTiktok },
                { href: SOCIAL_LINKS.googleBusiness, label: "Avis Google", Icon: FaGoogle },
                { href: WHATSAPP_SIMPLE_URL, label: "WhatsApp", Icon: FaWhatsapp },
              ].map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-line-dark text-ink-3 transition-colors hover:border-ink hover:bg-ink hover:text-ivory"
                >
                  <Icon />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h3 className="eyebrow">{col.title}</h3>
              <ul className="mt-5 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="link-underline text-[0.95rem] text-ink-3 hover:text-ink">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <h3 className="eyebrow">Contact</h3>
            <ul className="mt-5 space-y-3 text-[0.95rem]">
              <li>
                <a href={PHONE_TEL} className="inline-flex items-center gap-2.5 text-ink hover:text-gold">
                  <FiPhone className="text-gold" aria-hidden /> {PHONE_DISPLAY}
                </a>
              </li>
              <li>
                <a href={EMAIL_MAILTO} className="inline-flex items-center gap-2.5 break-all text-ink hover:text-gold">
                  <FiMail className="shrink-0 text-gold" aria-hidden /> {EMAIL}
                </a>
              </li>
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-muted">
              <span className="text-ink">Lyon et métropole :</span> {SERVICE_AREAS.join(", ")}.
              <br />
              <span className="text-ink">Plus loin sur étude :</span> {EXTENDED_AREAS.join(", ")} et
              la région.
            </p>
          </div>
        </div>

        <p
          className="mt-20 select-none whitespace-nowrap text-center font-display text-[min(10.2vw,9.2rem)] leading-[0.8] tracking-[-0.05em] text-ink md:mt-28"
          aria-hidden
        >
          Maison <em className="text-gold">Des Saveurs</em>
        </p>

        <div className="gold-rule mt-10" />

        <div className="mt-8 flex flex-col gap-4 text-xs text-muted md:flex-row md:items-center md:justify-between">
          <p>
            © {new Date().getFullYear()} {LEGAL.tradeName} · MDS Traiteur · SIRET {LEGAL.siret}
          </p>
          <nav aria-label="Informations légales" className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="hover:text-ink">
                {link.label}
              </Link>
            ))}
            {cookieConsent && (
              <button type="button" onClick={cookieConsent.openPreferences} className="hover:text-ink">
                Gérer mes cookies
              </button>
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}
