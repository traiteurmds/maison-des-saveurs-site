"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { FiArrowUpRight } from "react-icons/fi";
import { cn } from "../../lib/utils";
import Reveal from "../ui/Reveal";
import TitleReveal from "../ui/TitleReveal";

const OCCASIONS = [
  {
    href: "/traiteur-mariage-lyon",
    tag: "Mariages · Hlels · Fiançailles",
    title: "Le repas de votre plus beau jour",
    text: "Grands plats à partager, salade royale, pastillas et service à table pour une réception à la hauteur de l'événement.",
    image: "/images/realisations/poulets-citron-olives.jpg",
    position: "center 60%",
  },
  {
    href: "/services#familles",
    tag: "Naissances · Aqiqas · Anniversaires",
    title: "Les fêtes de famille, en toute sérénité",
    text: "Rfissa, couscous, plateaux de fruits et gâteaux marocains : vous recevez, nous nous occupons du reste.",
    image: "/images/menu/gateaux-marocains.jpg",
    position: "center 60%",
  },
  {
    href: "/traiteur-entreprise-lyon",
    tag: "Entreprises · Associations · Universités",
    title: "Des buffets qui rassemblent vos équipes",
    text: "Buffets salés snacking ou orientaux, repas d'équipe et soirées associatives, livrés et dressés.",
    image: "/images/realisations/buffet-pastillas-salades.jpg",
    position: "center 45%",
  },
];

export default function Occasions() {
  const [active, setActive] = useState(0);

  return (
    <section className="section bg-paper">
      <div className="container-x">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Nos prestations</p>
            <TitleReveal className="display-xl mt-5 max-w-4xl">
              Une cuisine, <em className="text-gold-gradient">mille occasions</em>
            </TitleReveal>
          </div>
          <p className="lead max-w-sm">
            Chaque réception est différente. Le menu, les quantités et le service s&apos;adaptent à votre événement.
          </p>
        </Reveal>

        <div className="mt-14 flex flex-col gap-4 lg:h-[78vh] lg:min-h-[560px] lg:flex-row">
          {OCCASIONS.map((o, i) => {
            const open = active === i;
            return (
              <Link
                key={o.href}
                href={o.href}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                data-cursor="view"
                className={cn(
                  "group relative isolate flex min-h-[460px] overflow-hidden text-ivory transition-[flex-grow] duration-[900ms] ease-[cubic-bezier(0.22,1,0.36,1)] lg:min-h-0",
                  open ? "lg:flex-[3.2]" : "lg:flex-1"
                )}
              >
                <Image
                  src={o.image}
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 60vw"
                  quality={80}
                  className="-z-10 object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  style={{ objectPosition: o.position }}
                />
                <div className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-ink/20 to-ink/10" />
                <div className="flex w-full flex-col justify-between p-6 md:p-9">
                  <div className="flex items-start justify-between gap-4">
                    <span className="font-display text-2xl">{String(i + 1).padStart(2, "0")}</span>
                    <span className="flex h-11 w-11 items-center justify-center rounded-full border border-ivory/40 transition-colors duration-500 group-hover:bg-ivory group-hover:text-ink">
                      <FiArrowUpRight aria-hidden />
                    </span>
                  </div>
                  <div className={cn("transition-opacity duration-700", open ? "lg:opacity-100" : "lg:opacity-0")}>
                    <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-ivory/80">{o.tag}</p>
                    <h3 className="mt-3 max-w-lg font-display text-[2rem] leading-[1.05] tracking-[-0.02em] md:text-[2.8rem]">
                      {o.title}
                    </h3>
                    <p className="mt-4 max-w-md text-[0.95rem] leading-relaxed text-ivory/85">{o.text}</p>
                  </div>
                </div>
                <p
                  className={cn(
                    "pointer-events-none absolute bottom-9 left-7 hidden rotate-180 whitespace-nowrap font-display text-3xl transition-opacity duration-500 [writing-mode:vertical-rl] lg:block",
                    open ? "opacity-0" : "opacity-100"
                  )}
                  aria-hidden
                >
                  {o.tag.split(" · ")[0]}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
