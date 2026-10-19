import { FaStar } from "react-icons/fa";
import { GOOGLE_BUSINESS } from "../../lib/testimonials";
import { cn } from "../../lib/utils";

export function Stars({ className }: { className?: string }) {
  return (
    <span className={cn("inline-flex gap-0.5 text-gold-bright", className)} aria-hidden>
      {Array.from({ length: 5 }).map((_, i) => (
        <FaStar key={i} />
      ))}
    </span>
  );
}

export default function GoogleRating({ tone = "dark", className }: { tone?: "dark" | "light"; className?: string }) {
  return (
    <a
      href={GOOGLE_BUSINESS.profileUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-3 rounded-full border px-4 py-2 text-sm transition-colors",
        tone === "dark"
          ? "border-line-dark bg-ivory/5 text-ivory hover:border-gold-bright"
          : "border-line bg-white/70 text-ink hover:border-gold",
        className
      )}
    >
      <Stars className="text-[0.8rem]" />
      <span>
        <strong className="font-semibold">5,0</strong> sur Google · {GOOGLE_BUSINESS.reviewCount} avis
      </span>
    </a>
  );
}
