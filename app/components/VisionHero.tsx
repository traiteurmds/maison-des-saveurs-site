"use client";

import Link from "next/link";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import MagneticButton from "./ui/MagneticButton";
import Reveal from "./ui/Reveal";
import { useSelection } from "./providers/SelectionProvider";
import { getWhatsappUrl, selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";

function scrollToMenu() {
  document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
}

const trustBadges = [
  "Mariages",
  "Événements privés",
  "Réceptions professionnelles",
  "Cuisine halal",
];

export default function VisionHero() {
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const blobY = useTransform(scrollY, [0, 500], [0, reduced ? 0 : 40]);
  const { selection, counts } = useSelection();

  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-mds-bg pt-28 pb-32 md:min-h-[92vh] md:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 20% 0%, var(--mds-hero-glow), transparent 55%), radial-gradient(ellipse 60% 50% at 90% 100%, rgba(21,40,31,0.06), transparent 50%), linear-gradient(180deg, var(--mds-bg) 0%, var(--mds-bg-elevated) 100%)",
        }}
      />
      <div className="mds-pattern pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />
      <motion.div
        style={{ y: blobY }}
        aria-hidden
        className="hero-blob pointer-events-none absolute -right-20 top-1/4 hidden h-96 w-96 bg-terracotta/10 lg:block"
      />

      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-12 px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:px-8">
        {/* Colonne gauche — titre royal */}
        <div className="text-center lg:text-left">
          <motion.span
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6 inline-flex items-center rounded-full border border-mds-border bg-mds-card px-5 py-2 text-[0.65rem] font-medium uppercase tracking-[0.22em] text-terracotta shadow-[0_4px_24px_var(--mds-shadow)]"
          >
            Traiteur marocain halal à Lyon
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="lux-heading font-serif text-[clamp(2.75rem,7vw,5.5rem)] font-semibold leading-[1.02] tracking-tight text-mds-text"
          >
            Maison Des Saveurs
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="hero-accent-line mx-auto mt-6 w-full max-w-[200px] lg:mx-0"
            aria-hidden
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-6 font-serif text-xl tracking-wide text-mds-muted sm:text-2xl lg:text-[1.65rem]"
          >
            Traiteur traditionnel halal
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-10 flex w-full max-w-[300px] flex-col items-center gap-4 lg:max-w-none lg:flex-row lg:flex-wrap lg:justify-start"
          >
            <MagneticButton className="w-full sm:w-auto">
              <button type="button" onClick={scrollToMenu} className="btn-hero btn-hero-outline w-full sm:w-auto">
                Découvrir le menu
              </button>
            </MagneticButton>
            <MagneticButton className="w-full sm:w-auto">
              <Link href="/contact" className="btn-hero btn-hero-primary w-full sm:w-auto">
                Demander un devis
              </Link>
            </MagneticButton>
            <MagneticButton className="w-full sm:w-auto">
              <Link href="/caftans" className="btn-hero btn-hero-accent w-full sm:w-auto">
                Découvrir les caftans
              </Link>
            </MagneticButton>
          </motion.div>

          <Reveal className="mt-10 lg:mt-12" delay={0.15}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:flex lg:flex-wrap">
              {trustBadges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-mds-border bg-mds-card/90 px-3 py-2.5 text-center text-[0.6rem] font-medium uppercase leading-snug tracking-[0.08em] text-mds-muted sm:text-[0.65rem] lg:px-4"
                >
                  {badge}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Colonne droite — carte premium */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative overflow-hidden rounded-3xl border border-mds-border bg-mds-card p-8 shadow-[0_24px_64px_var(--mds-shadow)] md:p-10">
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-terracotta/10 blur-2xl"
            />
            <p className="font-serif text-xs uppercase tracking-[0.28em] text-terracotta">
              Votre réception sur mesure
            </p>
            <h2 className="mt-3 font-serif text-2xl font-semibold text-mds-text md:text-3xl">
              Composez votre réception
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-mds-muted md:text-base">
              Sélectionnez vos plats, options vaisselle et caftans. Votre demande WhatsApp
              regroupe tout en un seul message clair et professionnel.
            </p>

            <ul className="mt-6 space-y-3 border-t border-mds-border pt-6 text-sm">
              <li className="flex items-center justify-between text-mds-muted">
                <span>Menu</span>
                <span className="font-medium text-mds-text">{counts.menu} sélectionné{counts.menu !== 1 ? "s" : ""}</span>
              </li>
              <li className="flex items-center justify-between text-mds-muted">
                <span>Options</span>
                <span className="font-medium text-mds-text">{counts.options} sélectionnée{counts.options !== 1 ? "s" : ""}</span>
              </li>
              <li className="flex items-center justify-between text-mds-muted">
                <span>Caftans</span>
                <span className="font-medium text-mds-text">{counts.caftans} sélectionné{counts.caftans !== 1 ? "s" : ""}</span>
              </li>
            </ul>

            <a
              href={getWhatsappUrl(selection)}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "mt-8 inline-flex min-h-[52px] w-full items-center justify-center rounded-full bg-mds-text px-6 py-3 text-sm font-medium tracking-wide text-[#f8f5f0] transition-all hover:bg-terracotta dark:text-[#f2eee7]",
                selectableFocusClass
              )}
            >
              {counts.total > 0 ? "Envoyer ma demande complète" : "Commencer ma sélection"}
            </a>
            <button
              type="button"
              onClick={scrollToMenu}
              className={cn(
                "mt-3 w-full py-2 text-center text-sm text-terracotta underline-offset-4 hover:underline",
                selectableFocusClass
              )}
            >
              Parcourir le menu
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
