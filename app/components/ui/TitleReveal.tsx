"use client";

import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";

const word: Variants = {
  hidden: { y: "112%" },
  show: { y: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } },
};

/** Découpe le texte (y compris dans <em>, <br>…) en mots masqués qui montent un par un. */
function split(node: ReactNode, key = "w"): ReactNode {
  if (typeof node === "string") {
    return node.split(/(\s+)/).map((part, i) =>
      /^\s+$/.test(part) || part === "" ? (
        part
      ) : (
        <span key={`${key}-${i}`} className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
          <motion.span variants={word} className="inline-block will-change-transform">
            {part}
          </motion.span>
        </span>
      )
    );
  }
  if (Array.isArray(node)) return node.map((n, i) => split(n, `${key}-${i}`));
  if (isValidElement(node)) {
    const el = node as ReactElement<{ children?: ReactNode }>;
    if (!el.props.children) return el;
    return cloneElement(el, { key }, split(Children.toArray(el.props.children), key));
  }
  return node;
}

type Props = {
  as?: "h1" | "h2" | "h3" | "p";
  className?: string;
  children: ReactNode;
  delay?: number;
};

/** Titre révélé ligne à ligne, mot par mot, à l'entrée dans l'écran (une seule fois). */
export default function TitleReveal({ as = "h2", className, children, delay = 0 }: Props) {
  const reduced = useReducedMotion();
  const Tag = motion[as];
  if (reduced) {
    const Plain = as;
    return <Plain className={className}>{children}</Plain>;
  }
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.35 }}
      transition={{ staggerChildren: 0.055, delayChildren: delay }}
      variants={{ hidden: {}, show: { transition: { staggerChildren: 0.055, delayChildren: delay } } }}
    >
      {split(children)}
    </Tag>
  );
}
