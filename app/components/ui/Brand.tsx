import { cn } from "../../lib/utils";

/** Monogramme MDS : étoile marocaine + initiales, dessiné en SVG pour rester net partout. */
export function Monogram({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={cn("h-9 w-9", className)}>
      <g fill="none" stroke="currentColor" strokeWidth="1.1">
        <path d="M24 2.5l5.6 13.9L43.5 22l-13.9 5.6L24 41.5l-5.6-13.9L4.5 22l13.9-5.6z" opacity="0.55" />
        <rect x="10.5" y="8.5" width="27" height="27" transform="rotate(45 24 22)" opacity="0.55" />
      </g>
      <text
        x="24"
        y="26.4"
        textAnchor="middle"
        fontSize="11.5"
        fontFamily="var(--font-display)"
        fontWeight="600"
        fill="currentColor"
        letterSpacing="0.5"
      >
        MDS
      </text>
    </svg>
  );
}

export function Wordmark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span className={cn("flex items-center gap-2.5", className)}>
      <Monogram className={tone === "light" ? "text-gold-bright" : "text-gold"} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-display text-[1.32rem] font-semibold tracking-[0.01em] md:text-[1.45rem]",
            tone === "light" ? "text-ivory" : "text-ink"
          )}
        >
          Maison Des Saveurs
        </span>
        <span
          className={cn(
            "mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.32em]",
            tone === "light" ? "text-gold-bright/90" : "text-gold"
          )}
        >
          Traiteur marocain · Lyon
        </span>
      </span>
    </span>
  );
}
