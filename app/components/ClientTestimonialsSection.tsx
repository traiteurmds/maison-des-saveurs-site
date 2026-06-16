"use client";

import { useCallback, useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
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

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
  }
  return name.slice(0, 2).toUpperCase();
}

function StarRating({ rating, size = "sm" }: { rating: number; size?: "sm" | "md" | "lg" }) {
  const starClass =
    size === "lg" ? "text-lg" : size === "md" ? "text-base" : "text-sm";
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
      <div className="inline-flex items-center gap-2.5 rounded-full border border-[var(--gold)]/40 bg-[var(--surface)] px-5 py-2.5 shadow-[0_10px_32px_var(--mds-shadow)]">
        <span className="font-serif text-2xl font-semibold text-mds-text">
          {GOOGLE_BUSINESS.rating.toFixed(1)}
        </span>
        <StarRating rating={5} size="md" />
      </div>
      <div className="inline-flex items-center rounded-full border border-mds-border bg-[var(--surface)] px-5 py-2.5 text-sm font-medium text-mds-text shadow-[0_10px_32px_var(--mds-shadow)]">
        {GOOGLE_BUSINESS.reviewCount} avis Google
      </div>
      <div className="inline-flex items-center rounded-full border border-[var(--gold)]/35 bg-[var(--soft-gold)]/25 px-5 py-2.5 text-xs font-medium uppercase tracking-[0.14em] text-[var(--gold)]">
        Réels avis vérifiés Google
      </div>
    </div>
  );
}

function AvatarBadge({ name }: { name: string }) {
  return (
    <div
      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[var(--gold)]/45 bg-gradient-to-br from-[var(--surface)] to-[var(--soft-gold)]/40 font-serif text-sm font-semibold tracking-wide text-[var(--gold)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)] md:h-14 md:w-14 md:text-base"
      aria-hidden
    >
      {getInitials(name)}
    </div>
  );
}

function TestimonialCard({
  item,
  onOpen,
  variant = "default",
}: {
  item: Testimonial;
  onOpen: (item: Testimonial) => void;
  variant?: "default" | "compact" | "backdrop";
}) {
  const isLong = item.text.length > TESTIMONIAL_PREVIEW_LENGTH;
  const isCompact = variant === "compact";
  const isBackdrop = variant === "backdrop";

  const cardClass = cn(
    "testimonial-card flex shrink-0 flex-col rounded-2xl border text-left transition-all duration-500",
    isBackdrop
      ? "w-[320px] border-[var(--gold)]/15 bg-[var(--surface)]/70 p-5 opacity-80 shadow-[0_8px_32px_var(--mds-shadow)] md:w-[340px]"
      : isCompact
        ? "w-[min(85vw,320px)] border-[var(--gold)]/30 bg-[var(--surface)] p-5 shadow-[0_14px_40px_var(--mds-shadow)] snap-center md:w-[340px] md:p-6"
        : "w-[min(88vw,380px)] border-[var(--gold)]/30 bg-[var(--surface)] p-6 shadow-[0_16px_48px_var(--mds-shadow)] hover:-translate-y-0.5 hover:shadow-[0_22px_56px_rgba(11,11,10,0.12)] md:w-[400px] md:p-7"
  );

  const content = (
    <>
      <div className="flex items-start gap-3">
        <AvatarBadge name={item.name} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate font-serif text-lg font-semibold text-mds-text">{item.name}</p>
            <span className="shrink-0 rounded-full border border-[var(--gold)]/35 bg-[var(--soft-gold)]/20 px-2 py-0.5 text-[0.6rem] font-medium uppercase tracking-[0.1em] text-[var(--gold)]">
              Avis Google
            </span>
          </div>
          <div className="mt-2">
            <StarRating rating={item.rating} size={isCompact ? "sm" : "md"} />
          </div>
        </div>
      </div>
      <p
        className={cn(
          "mt-4 flex-1 leading-relaxed text-mds-muted",
          isCompact || isBackdrop ? "text-sm" : "text-[0.9375rem] md:text-base",
          isLong && "line-clamp-4"
        )}
      >
        &ldquo;{item.text}&rdquo;
      </p>
      {isLong && !isBackdrop && (
        <p className="mt-3 text-xs font-medium tracking-wide text-[var(--gold)]">
          Lire l&apos;avis complet
        </p>
      )}
    </>
  );

  if (isLong && !isBackdrop) {
    return (
      <button
        type="button"
        onClick={() => onOpen(item)}
        className={cn(cardClass, "cursor-pointer", selectableFocusClass)}
        aria-label={`Lire l'avis complet de ${item.name}`}
      >
        {content}
      </button>
    );
  }

  return (
    <article className={cardClass} aria-label={`Avis de ${item.name}`}>
      {content}
    </article>
  );
}

function FeaturedTestimonial({
  item,
  onOpen,
}: {
  item: Testimonial;
  onOpen: (item: Testimonial) => void;
}) {
  const isLong = item.text.length > TESTIMONIAL_PREVIEW_LENGTH;

  return (
    <motion.article
      key={item.id}
      initial={{ opacity: 0, y: 24, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -16, scale: 0.98 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl border border-[var(--gold)]/40 bg-[var(--surface)] p-8 shadow-[0_28px_80px_rgba(11,11,10,0.1)] md:p-10"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[var(--gold)]/8 blur-3xl"
      />
      <div className="relative flex items-start gap-4 md:gap-5">
        <AvatarBadge name={item.name} />
        <div className="min-w-0 flex-1">
          <p className="font-serif text-2xl font-semibold text-mds-text md:text-[1.65rem]">
            {item.name}
          </p>
          <div className="mt-2 flex flex-wrap items-center gap-3">
            <StarRating rating={item.rating} size="lg" />
            <span className="rounded-full border border-[var(--gold)]/35 bg-[var(--soft-gold)]/20 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--gold)]">
              Avis Google
            </span>
          </div>
        </div>
      </div>
      <p className="relative mt-6 text-base leading-relaxed text-mds-muted md:text-lg md:leading-relaxed">
        &ldquo;{isLong ? `${item.text.slice(0, TESTIMONIAL_PREVIEW_LENGTH).trim()}…` : item.text}&rdquo;
      </p>
      {isLong && (
        <button
          type="button"
          onClick={() => onOpen(item)}
          className={cn(
            "relative mt-5 text-sm font-medium tracking-wide text-[var(--gold)] underline-offset-4 hover:underline",
            selectableFocusClass
          )}
        >
          Lire l&apos;avis complet
        </button>
      )}
    </motion.article>
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
      className="fixed inset-0 z-50 flex items-center justify-center bg-[var(--black)]/25 p-4 backdrop-blur-[6px]"
      onClick={onClose}
      role="presentation"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.98, y: 10 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[min(85vh,640px)] w-full max-w-lg overflow-y-auto rounded-3xl border border-[var(--gold)]/35 bg-[var(--surface)] p-7 shadow-[0_32px_80px_rgba(11,11,10,0.14)] md:p-9"
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
        <div className="flex items-start gap-4">
          <AvatarBadge name={item.name} />
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-[var(--gold)]">
              Avis Google
            </p>
            <h3 id="testimonial-modal-title" className="mt-1 font-serif text-2xl font-semibold text-mds-text">
              {item.name}
            </h3>
            <div className="mt-2">
              <StarRating rating={item.rating} size="md" />
            </div>
          </div>
        </div>
        <p className="mt-6 text-base leading-relaxed text-mds-muted md:text-[1.05rem]">
          &ldquo;{item.text}&rdquo;
        </p>
        <p className="mt-6 text-xs text-mds-muted">Avis client issu de notre fiche Google.</p>
      </motion.div>
    </motion.div>
  );
}

export default function ClientTestimonialsSection() {
  const reducedMotion = useReducedMotion();
  const [activeReview, setActiveReview] = useState<Testimonial | null>(null);
  const [featuredIndex, setFeaturedIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const trackItems = [...TESTIMONIALS, ...TESTIMONIALS];
  const backdropItems = [...TESTIMONIALS.slice().reverse(), ...TESTIMONIALS.slice().reverse()];
  const featuredItem = TESTIMONIALS[featuredIndex] ?? TESTIMONIALS[0];

  const advanceFeatured = useCallback(() => {
    setFeaturedIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  }, []);

  useEffect(() => {
    if (reducedMotion || isPaused) return;
    const timer = setInterval(advanceFeatured, 7000);
    return () => clearInterval(timer);
  }, [advanceFeatured, isPaused, reducedMotion]);

  return (
    <section
      id="avis-clients"
      className="mds-section relative overflow-hidden border-t border-mds-border bg-mds-bg"
      aria-labelledby="testimonials-heading"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 60% 45% at 50% 0%, rgba(198,164,106,0.07), transparent 60%), radial-gradient(ellipse 40% 30% at 90% 80%, rgba(11,11,10,0.03), transparent 50%)",
        }}
      />
      <div className="mds-pattern pointer-events-none absolute inset-0 opacity-[0.07]" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="font-serif text-sm uppercase tracking-[0.28em] text-[var(--gold)]">
            Témoignages
          </p>
          <h2
            id="testimonials-heading"
            className="lux-heading mt-4 font-serif text-4xl font-semibold text-mds-text md:text-5xl lg:text-[3.25rem]"
          >
            Nos clients satisfaits
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-mds-muted md:text-xl">
            Ils nous ont fait confiance pour leurs événements à Lyon et aux alentours.
          </p>
          <GoogleStatsBar />
        </Reveal>

        {/* Desktop — spotlight + carousels */}
        <div
          className="relative mt-12 hidden md:block md:mt-16"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="testimonials-marquee testimonials-marquee-back pointer-events-none absolute inset-x-0 top-1/2 -translate-y-1/2 opacity-50">
            <div className="testimonials-track testimonials-track-slow testimonials-track-reverse">
              {backdropItems.map((item, index) => (
                <TestimonialCard
                  key={`back-${item.id}-${index}`}
                  item={item}
                  onOpen={setActiveReview}
                  variant="backdrop"
                />
              ))}
            </div>
          </div>

          <div className="relative z-10 px-4 py-10 lg:py-14">
            <AnimatePresence mode="wait">
              <FeaturedTestimonial
                key={featuredItem.id}
                item={featuredItem}
                onOpen={setActiveReview}
              />
            </AnimatePresence>
          </div>

          <div className="testimonials-marquee mt-2">
            <div
              className={cn(
                "testimonials-track testimonials-track-slow",
                isPaused && "testimonials-track-paused"
              )}
            >
              {trackItems.map((item, index) => (
                <TestimonialCard
                  key={`front-${item.id}-${index}`}
                  item={item}
                  onOpen={setActiveReview}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile — swipe horizontal fluide */}
        <div className="mt-10 md:hidden">
          <div className="mb-6 px-1">
            <AnimatePresence mode="wait">
              <FeaturedTestimonial
                key={featuredItem.id}
                item={featuredItem}
                onOpen={setActiveReview}
              />
            </AnimatePresence>
          </div>
          <div className="testimonials-scroll -mx-1 flex gap-4 overflow-x-auto px-1 pb-2 pt-1">
            {TESTIMONIALS.map((item) => (
              <TestimonialCard
                key={item.id}
                item={item}
                onOpen={setActiveReview}
                variant="compact"
              />
            ))}
          </div>
        </div>

        <Reveal className="mt-12 text-center md:mt-14" delay={0.08}>
          <a
            href={GOOGLE_BUSINESS.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Voir notre fiche Google Maison Des Saveurs"
            className={cn(
              "inline-flex min-h-[50px] items-center justify-center rounded-full border border-[var(--gold)]/45 bg-[var(--surface)] px-9 py-3 text-sm font-medium tracking-wide text-mds-text shadow-[0_12px_40px_var(--mds-shadow)] transition-all hover:border-[var(--gold)]/65 hover:shadow-[0_16px_48px_var(--mds-shadow)]",
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
