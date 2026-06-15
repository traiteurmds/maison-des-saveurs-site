"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

const cards = [
  {
    label: "Notre menu",
    sub: "Couscous · Pastilla · Desserts",
    href: "/#menu",
    image: "/images/menu/couscous.jpg",
    className: "left-[4%] top-[18%] md:left-[8%] md:top-[22%]",
    delay: 0.2,
    rotate: -4,
  },
  {
    label: "Caftans",
    sub: "MDS x Lamia Créations",
    href: "/caftans",
    image: "/images/caftans/caftan-01.jpg",
    className: "right-[4%] top-[20%] md:right-[8%] md:top-[24%]",
    delay: 0.35,
    rotate: 3,
  },
  {
    label: "Devis",
    sub: "Réponse sous 24h",
    href: "/contact",
    image: "/images/services/mariage.png",
    className: "bottom-[22%] left-[6%] md:bottom-[20%] md:left-[12%]",
    delay: 0.5,
    rotate: -2,
  },
  {
    label: "WhatsApp",
    sub: "07 58 63 97 34",
    href: "https://wa.me/33758639734",
    external: true,
    icon: true,
    className: "bottom-[20%] right-[6%] md:bottom-[18%] md:right-[12%]",
    delay: 0.65,
    rotate: 2,
  },
];

export default function HeroFloatingCards() {
  const reduced = useReducedMotion();

  return (
    <div className="pointer-events-none absolute inset-0 hidden lg:block" aria-hidden>
      {cards.map((card) => {
        const inner = (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.92, rotate: card.rotate }}
            animate={{ opacity: 1, y: 0, scale: 1, rotate: card.rotate }}
            whileHover={reduced ? undefined : { y: -6, rotate: card.rotate * 1.5, scale: 1.02 }}
            transition={{ duration: 0.8, delay: card.delay, ease: [0.22, 1, 0.36, 1] }}
            className={`pointer-events-auto absolute w-[200px] overflow-hidden rounded-2xl border border-mds-border bg-mds-card shadow-[0_20px_50px_var(--mds-shadow)] backdrop-blur-xl ${card.className}`}
            style={{ perspective: 1000 }}
          >
            {card.image && (
              <div className="relative h-24 w-full overflow-hidden">
                <Image src={card.image} alt="" fill className="object-cover" sizes="200px" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            )}
            <div className={`p-4 ${!card.image ? "pt-5" : ""}`}>
              <div className="flex items-center gap-2">
                {card.icon && <FaWhatsapp className="text-[#25D366]" />}
                <p className="font-serif text-sm font-semibold text-mds-text">{card.label}</p>
              </div>
              <p className="mt-1 text-xs text-mds-muted">{card.sub}</p>
            </div>
          </motion.div>
        );

        if (card.external) {
          return (
            <a key={card.label} href={card.href} target="_blank" rel="noopener noreferrer">
              {inner}
            </a>
          );
        }
        return (
          <Link key={card.label} href={card.href}>
            {inner}
          </Link>
        );
      })}
      {!reduced && (
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-terracotta/5 blur-3xl"
        />
      )}
    </div>
  );
}
