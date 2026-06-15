"use client";

import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import Reveal from "./ui/Reveal";
import {
  GOOGLE_BUSINESS,
  TESTIMONIAL_PREVIEW_LENGTH,
  TESTIMONIALS,
  type Testimonial,
} from "../lib/testimonials";
import { scrollToConfigurator } from "../lib/configurator-options";
import { selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" }) {
  const starClass = size === "md" ? "text-base" : "text-sm";
  return (
    <div className="flex gap-0.5" aria-label={`${rating} étoiles sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar
          key={i}
          className={cn(starClass, i < rating ? "text-[var(--gold)]" : "text-[var(--gold)]/25")}
          aria-hidden
        />
      ))}
    </div>
  );
}

function GoogleStatsBar() {
  return (
    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:gap-4">
      <div className="inline-flex items-center gap-2 rounded-full border border-[var(--gold)]/35 bg-[var(--surface)] px-4 py-2 shadow-[0_8px_24px_var(--mds-shadow)]">
        <span className="font-serif text-xl font-semibold text-mds-text">
          {GOOGLE_BUSINESS.rating.toFixed(1)}
        </span>
        <StarRating rating={5} size="md" />
      </div>
      <div className="inline-flex items-center rounded-full border border-mds-border bg-[var(--surface)] px-4 py-2 text-sm font-medium text-mds-text shadow-[0_8px_24px_var(--mds-shadow)]">
        {GOOGLE_BUSINESS.reviewCount} avis Google
      </div>
      <div className="inline-flex items-center rounded-full border border-[var(--gold)]/30 bg-[var(--soft-gold)]/20 px-4 py-2 text-xs font-medium uppercase tracking-[0.14em] text-[var(--gold)]">
        Réels avis vérifiés Google
      </div>
    </div>
  );
}

function TestimonialCard({
  item,
  onOpen,
}: {
  item: Testimonial;
  onOpen: (item: Testimonial) => void;
}) {
  const isLong = item.text.length > TESTIMONIAL_PREVIEW_LENGTH;
  const CardWrapper = isLong ? "button" : "article";

  return (
    <CardWrapper
      type={isLong ? "button" : undefined}
      onClick={isLong ? () => onOpen(item) : undefined}
      className={cn(
        "testimonial-card flex w-[min(88vw,380px)] shrink-0 flex-col rounded-2xl border border-[var(--gold)]/25 bg-[var(--surface)] p-6 text-left shadow-[0_16px_48px_var(--mds-shadow)] transition-shadow duration-300 hover:shadow-[0_20px_56px_rgba(11,11,10,0.12)] md:w-[400px] md:p-7",
        isLong && "cursor-pointer",
        isLong && selectableFocusClass
      )}
      aria-label={isLong ? `Lire l'avis complet de ${item.name}` : `Avis de ${item.name}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate font-serif text-lg font-semibold text-mds-text">{item.name}</p>
        </div>
        <span className="shrink-0 rounded-full border border-[var(--gold)]/35 bg-[var(--soft-gold)]/20 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--gold)]">
          Avis Google
        </span>
      </div>
      <StarRating rating={item.rating} />
      <p
        className={cn(
          "mt-4 flex-1 text-sm leading-relaxed text-mds-muted md:text-[0.9375rem]",
          isLong && "line-clamp-4"
        )}
      >
        &ldquo;{item.text}&rdquo;
      </p>
      {isLong && (
        <p className="mt-3 text-xs font-medium tracking-wide text-[var(--gold)]">Lire la suite</p>
      )}
    </CardWrapper>
  );
}

function TestimonialModal({ item, onClose }: { item: Testimonial; onClose: () => void }) {
  useEffect(() => {
    const onEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEscape);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/45 p-4 backdrop-blur-sm"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 8 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[min(85vh,640px)] w-full max-w-lg overflow-y-auto rounded-2xl border border-[var(--gold)]/30 bg-[var(--surface)] p-7 shadow-2xl md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="testimonial-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-mds-border text-lg text-mds-muted transition-colors hover:text-mds-text"
          aria-label="Fermer l'avis"
        >
          ×
        </button>
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--gold)]">Avis Google</p>
        <h3 id="testimonial-modal-title" className="mt-2 font-serif text-2xl font-semibold text-mds-text">
          {item.name}
        </h3>
        <div className="mt-3">
          <StarRating rating={item.rating} size="md" />
        </div>
        <p className="mt-5 text-base leading-relaxed text-mds-muted">&ldquo;{item.text}&rdquo;</p>
        <p className="mt-6 text-xs text-mds-muted">Avis client issu de notre fiche Google.</p>
      </motion.div>
    </motion.div>
  );
}

export default function ClientTestimonialsSection() {
  const [activeReview, setActiveReview] = useState<Testimonial | null>(null);
  const trackItems = [...TESTIMONIALS, ...TESTIMONIALS];

  return (
    <section
      id="avis-clients"
      className="mds-section relative overflow-hidden border-t border-mds-border bg-mds-bg"
      aria-labelledby="testimonials-heading"
    >
      <div className="mds-pattern pointer-events-none absolute inset-0 opacity-10" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-sm uppercase tracking-[0.28em] text-[var(--gold)]">
            Témoignages
          </p>
          <h2
            id="testimonials-heading"
            className="lux-heading mt-4 font-serif text-4xl font-semibold text-mds-text md:text-5xl"
          >
            Nos clients satisfaits
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-mds-muted">
            Ils nous ont fait confiance pour leurs événements à Lyon et aux alentours.
          </p>
          <GoogleStatsBar />
          <p className="mt-4 text-sm text-mds-muted">
            Avis clients issus de notre fiche Google
          </p>
        </Reveal>

        <div className="testimonials-marquee mt-10 md:mt-12">
          <div className="testimonials-track testimonials-track-slow">
            {trackItems.map((item, index) => (
              <TestimonialCard key={`${item.id}-${index}`} item={item} onOpen={setActiveReview} />
            ))}
          </div>
        </div>

        <Reveal className="mt-10 text-center md:mt-12" delay={0.08}>
          <a
            href={GOOGLE_BUSINESS.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "inline-flex min-h-[48px] items-center justify-center rounded-full border border-[var(--gold)]/40 bg-[var(--surface)] px-8 py-3 text-sm font-medium tracking-wide text-mds-text shadow-[0_10px_32px_var(--mds-shadow)] transition-all hover:border-[var(--gold)]/60 hover:shadow-[0_14px_40px_var(--mds-shadow)]",
              selectableFocusClass
            )}
          >
            Voir notre fiche Google
          </a>
        </Reveal>

        <Reveal className="mt-16 text-center md:mt-20" delay={0.1}>
          <h3 className="font-serif text-2xl font-semibold text-mds-text md:text-3xl">
            Vous préparez votre événement ?
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-mds-muted md:text-lg">
            Composez votre réception et envoyez-nous votre demande en quelques secondes.
          </p>
          <button
            type="button"
            onClick={scrollToConfigurator}
            className={cn(
              "mt-8 inline-flex min-h-[52px] min-w-[280px] items-center justify-center rounded-full border border-mds-border bg-[var(--surface)] px-10 py-4 font-medium tracking-wide text-mds-text shadow-[0_12px_40px_var(--mds-shadow)] transition-all hover:border-[var(--gold)]/45 md:min-h-[56px]",
              selectableFocusClass
            )}
          >
            Composer ma réception
          </button>
        </Reveal>
      </div>

      <AnimatePresence>
        {activeReview && (
          <TestimonialModal item={activeReview} onClose={() => setActiveReview(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
