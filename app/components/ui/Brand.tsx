import { cn } from "../../lib/utils";

/** Nom de la maison en toutes lettres : pas de logo inventé. */
export function Wordmark({ className, tone = "dark" }: { className?: string; tone?: "dark" | "light" }) {
  return (
    <span
      className={cn(
        "whitespace-nowrap font-display text-[1.35rem] font-normal tracking-[-0.02em] md:text-[1.6rem]",
        tone === "light" ? "text-ivory" : "text-ink",
        className
      )}
    >
      Maison <em className={tone === "light" ? "" : "text-gold"}>Des Saveurs</em>
    </span>
  );
}
