"use client";

import Image from "next/image";
import { useState } from "react";
import { FiCheck, FiMaximize2, FiPlus } from "react-icons/fi";
import { CAFTANS, type CaftanItem } from "../../lib/caftans";
import { cn } from "../../lib/utils";
import { useSelection } from "../providers/SelectionProvider";
import Reveal from "../ui/Reveal";
import CaftanLightbox from "./CaftanLightbox";

export default function CaftansGrid() {
  const { isSelected, toggleSelection } = useSelection();
  const [preview, setPreview] = useState<CaftanItem | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-5 xl:grid-cols-4">
        {CAFTANS.map((item, i) => {
          const selected = isSelected("caftans", item.title);
          return (
            <Reveal key={item.id} delay={0.03 * (i % 4)}>
              <div
                className={cn(
                  "group relative overflow-hidden rounded-[18px] border bg-sand transition-shadow duration-500",
                  selected ? "border-gold shadow-[0_0_0_1px_var(--gold),var(--shadow-lg)]" : "border-line"
                )}
              >
                <button
                  type="button"
                  onClick={() => toggleSelection("caftans", item.title)}
                  aria-pressed={selected}
                  aria-label={`${selected ? "Retirer" : "Ajouter"} ${item.title}`}
                  className="relative block aspect-[3/4] w-full"
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 300px"
                    quality={80}
                    priority={i < 2}
                    className="object-cover object-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
                  />
                  <span className="absolute inset-0 bg-gradient-to-t from-ink/75 via-transparent to-transparent" aria-hidden />
                  <span className="absolute inset-x-0 bottom-0 flex items-center justify-between p-3 md:p-4">
                    <span className="font-display text-lg text-ivory md:text-2xl">{item.title}</span>
                    <span
                      className={cn(
                        "flex h-9 w-9 items-center justify-center rounded-full",
                        selected ? "bg-gold-bright text-ink" : "border border-ivory/40 bg-ink/40 text-ivory backdrop-blur"
                      )}
                      aria-hidden
                    >
                      {selected ? <FiCheck /> : <FiPlus />}
                    </span>
                  </span>
                </button>
                <button
                  type="button"
                  onClick={() => setPreview(item)}
                  aria-label={`Agrandir ${item.title}`}
                  className="absolute right-2 top-2 flex h-9 w-9 items-center justify-center rounded-full border border-ivory/40 bg-ink/40 text-ivory backdrop-blur md:right-3 md:top-3"
                >
                  <FiMaximize2 className="text-sm" />
                </button>
              </div>
            </Reveal>
          );
        })}
      </div>
      <CaftanLightbox item={preview} onClose={() => setPreview(null)} />
    </>
  );
}
