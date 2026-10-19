import { FaStar } from "react-icons/fa";
import { GOOGLE_BUSINESS } from "../../lib/testimonials";
import { cn } from "../../lib/utils";

export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5 text-gold", className)} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} />
      ))}
    </span>
  );
}

/** Note Google réelle (lien vers la fiche). `light` : sur photo ou fond coloré. */
export default function GoogleRating({ tone = "ink", className }: { tone?: "ink" | "light"; className?: string }) {
  return (
    <a
      href={GOOGLE_BUSINESS.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-3 rounded-full border px-4 py-2 text-[0.82rem] transition-colors",
        tone === "light"
          ? "border-ivory/35 bg-ivory/10 text-ivory backdrop-blur hover:border-ivory"
          : "border-line-dark text-ink hover:border-ink",
        className
      )}
    >
      <Stars className={cn("text-[0.72rem]", tone === "light" && "text-ivory")} />
      <span>
        <strong className="font-semibold">5,0</strong> sur Google · {GOOGLE_BUSINESS.reviewCount} avis
      </span>
    </a>
  );
}
