"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiCheck, FiPlus } from "react-icons/fi";
import { CATEGORY_TO_SELECTION, type Dish } from "../../lib/menu-data";
import { focalPoint } from "../../lib/image-config";
import { cn } from "../../lib/utils";
import { useSelection } from "../providers/SelectionProvider";

export default function DishCard({ dish, priority = false }: { dish: Dish; priority?: boolean }) {
  const { isSelected, toggleSelection } = useSelection();
  const category = CATEGORY_TO_SELECTION[dish.category];
  const selected = isSelected(category, dish.title);

  return (
    <article
      className={cn(
        "group flex h-full flex-col overflow-hidden rounded-[var(--radius)] border bg-[#fffdf9] transition-[border-color,box-shadow] duration-500",
        selected ? "border-gold shadow-[0_0_0_1px_var(--gold),var(--shadow-lg)]" : "border-line shadow-[var(--shadow)]"
      )}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-sand">
        <Image
          src={dish.image}
          alt={dish.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 400px"
          quality={80}
          priority={priority}
          className="object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
          style={{ objectPosition: focalPoint(dish.image) }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-transparent" aria-hidden />
        {dish.signature && (
          <span className="absolute left-3 top-3 rounded-full bg-ink/80 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.18em] text-gold-bright backdrop-blur">
            Signature
          </span>
        )}
        {selected && (
          <motion.span
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-gold-bright text-ink shadow-lg"
            aria-hidden
          >
            <FiCheck />
          </motion.span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5 md:p-6">
        <h3 className="font-display text-[1.7rem] font-medium leading-tight text-ink">{dish.title}</h3>
        {dish.note && <p className="mt-1 text-[0.78rem] font-semibold uppercase tracking-[0.14em] text-gold">{dish.note}</p>}
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{dish.description}</p>
        {dish.pieces && (
          <ul className="mt-4 flex flex-wrap gap-2">
            {dish.pieces.map((piece) => (
              <li key={piece} className="rounded-full border border-line bg-ivory px-3 py-1 text-[0.8rem] text-ink-3">
                {piece}
              </li>
            ))}
          </ul>
        )}
        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={() => toggleSelection(category, dish.title)}
            aria-pressed={selected}
            className={cn("btn w-full", selected ? "btn-ink" : "btn-outline")}
          >
            {selected ? (
              <>
                <FiCheck aria-hidden /> Dans ma demande
              </>
            ) : (
              <>
                <FiPlus aria-hidden /> Ajouter à ma demande
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
}
