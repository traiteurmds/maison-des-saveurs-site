import Link from "next/link";
import { Fragment } from "react";
import { frTypo } from "../../lib/journal";

const TOKEN = /(\[[^\]]+\]\([^)]+\)|\*\*[^*]+\*\*|\*[^*]+\*)/g;

/** Rend le balisage léger du Journal : [lien](/adresse), **gras**, *italique*. */
export default function RichText({ text, emClassName }: { text: string; emClassName?: string }) {
  return (
    <>
      {frTypo(text).split(TOKEN).map((part, i) => {
        const link = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (link) {
          const [, label, href] = link;
          return href.startsWith("/") ? (
            <Link key={i} href={href}>
              {label}
            </Link>
          ) : (
            <a key={i} href={href} target="_blank" rel="noopener noreferrer">
              {label}
            </a>
          );
        }
        if (/^\*\*[^*]+\*\*$/.test(part)) return <strong key={i}>{part.slice(2, -2)}</strong>;
        if (/^\*[^*]+\*$/.test(part))
          return (
            <em key={i} className={emClassName}>
              {part.slice(1, -1)}
            </em>
          );
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </>
  );
}
