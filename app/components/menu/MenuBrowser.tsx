"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiArrowRight, FiCheck, FiPlus } from "react-icons/fi";
import { DISHES, MENU_CATEGORIES, SERVICE_OPTIONS, type MenuCategoryId } from "../../lib/menu-data";
import { cn } from "../../lib/utils";
import { useSelection } from "../providers/SelectionProvider";
import Reveal from "../ui/Reveal";
import DishCard from "./DishCard";

const NAV = [...MENU_CATEGORIES.map((c) => ({ id: c.id as string, label: c.label })), { id: "options", label: "Options" }];

export default function MenuBrowser() {
  const [active, setActive] = useState<string>(NAV[0].id);
  const { counts, isSelected, toggleSelection } = useSelection();

  useEffect(() => {
    const els = NAV.map((n) => document.getElementById(n.id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.getElementById(`tab-${active}`)?.scrollIntoView({ inline: "center", block: "nearest", behavior: "smooth" });
  }, [active]);

  return (
    <div className="bg-paper">
      <div className="sticky top-[calc(var(--header-h)+env(safe-area-inset-top))] z-30 border-b border-line bg-paper/90 backdrop-blur-xl">
        <div className="container-x flex items-center justify-between gap-4">
          <nav aria-label="Catégories de la carte" className="snap-row -mx-1 gap-1 py-3">
            {NAV.map((n) => (
              <a
                key={n.id}
                id={`tab-${n.id}`}
                href={`#${n.id}`}
                className={cn("chip min-h-10 whitespace-nowrap px-4 text-[0.85rem]", active === n.id && "is-active")}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <Link href="/contact" className="btn btn-ink btn-sm hidden shrink-0 md:inline-flex">
            Ma demande ({counts.total}) <FiArrowRight aria-hidden />
          </Link>
        </div>
      </div>

      {MENU_CATEGORIES.map((cat) => (
        <section key={cat.id} id={cat.id} className="section-tight scroll-mt-[calc(var(--header-h)+70px)]" aria-labelledby={`h-${cat.id}`}>
          <div className="container-x">
            <Reveal className="max-w-2xl">
              <p className="eyebrow">{String(MENU_CATEGORIES.indexOf(cat) + 1).padStart(2, "0")}</p>
              <h2 id={`h-${cat.id}`} className="display-md mt-4 text-ink">{cat.label}</h2>
              <p className="lead mt-3">{cat.intro}</p>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {DISHES.filter((d) => d.category === (cat.id as MenuCategoryId)).map((dish, i) => (
                <Reveal key={dish.id} delay={0.05 * (i % 3)} className="h-full">
                  <DishCard dish={dish} priority={cat.id === "entrees" && i < 2} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ))}

      <section id="options" className="section-tight scroll-mt-[calc(var(--header-h)+70px)] border-t border-line bg-ivory" aria-labelledby="h-options">
        <div className="container-x">
          <Reveal className="max-w-2xl">
            <p className="eyebrow">05</p>
            <h2 id="h-options" className="display-md mt-4 text-ink">Options et services</h2>
            <p className="lead mt-3">
              Pour une réception clé en main. Ajoutez ce dont vous avez besoin, tout est chiffré dans votre devis.
            </p>
          </Reveal>
          <ul className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICE_OPTIONS.map((opt) => {
              const selected = isSelected("options", opt.title);
              return (
                <li key={opt.id}>
                  <button
                    type="button"
                    onClick={() => toggleSelection("options", opt.title)}
                    aria-pressed={selected}
                    className={cn(
                      "flex h-full w-full items-start gap-4 rounded-[18px] border p-5 text-left transition-all duration-300",
                      selected ? "border-ink bg-ink text-ivory" : "border-line bg-ivory hover:border-gold"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full border",
                        selected ? "border-ivory bg-ivory text-ink" : "border-line text-gold"
                      )}
                      aria-hidden
                    >
                      {selected ? <FiCheck /> : <FiPlus />}
                    </span>
                    <span>
                      <span className="block font-display text-[1.35rem] leading-tight">{opt.title}</span>
                      <span className={cn("mt-1 block text-sm leading-relaxed", selected ? "text-ivory/70" : "text-muted")}>
                        {opt.description}
                      </span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>

          <Reveal className="mt-14">
            <div className="flex flex-col items-start justify-between gap-6 rounded-[var(--radius)] border border-line bg-ivory p-7 shadow-[var(--shadow)] md:flex-row md:items-center md:p-9">
              <div>
                <p className="font-display text-3xl text-ink">
                  {counts.total === 0
                    ? "Votre demande est vide pour l'instant"
                    : `${counts.total} élément${counts.total > 1 ? "s" : ""} dans votre demande`}
                </p>
                <p className="mt-2 text-muted">
                  Il ne reste qu&apos;à préciser la date, le lieu et le nombre d&apos;invités.
                </p>
              </div>
              <Link href="/contact" className="btn btn-gold w-full md:w-auto">
                Finaliser ma demande <FiArrowRight aria-hidden />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
