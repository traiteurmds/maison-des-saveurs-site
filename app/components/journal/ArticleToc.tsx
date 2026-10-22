"use client";

import { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

type Item = { id: string; text: string };

/** Sommaire de l'article : section en cours mise en évidence pendant la lecture. */
export default function ArticleToc({ items }: { items: Item[] }) {
  const [active, setActive] = useState(items[0]?.id);

  useEffect(() => {
    const headings = items.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => !!el);
    const onScroll = () => {
      const line = window.innerHeight * 0.3;
      let current = headings[0]?.id;
      for (const h of headings) {
        if (h.getBoundingClientRect().top - line <= 0) current = h.id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [items]);

  return (
    <nav aria-label="Sommaire de l'article">
      <p className="eyebrow">Dans cet article</p>
      <ol className="mt-6 space-y-1 border-l border-line">
        {items.map((item, i) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              aria-current={active === item.id ? "location" : undefined}
              className={cn(
                "-ml-px flex gap-3 border-l py-2 pl-4 text-[0.86rem] leading-snug transition-colors duration-300",
                active === item.id ? "border-terracotta text-ink" : "border-transparent text-muted hover:text-ink"
              )}
            >
              <span className="font-display text-gold" aria-hidden>
                {String(i + 1).padStart(2, "0")}
              </span>
              <span>{item.text}</span>
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
