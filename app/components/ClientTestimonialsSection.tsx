"use client";

import { FaStar } from "react-icons/fa";
import Reveal from "./ui/Reveal";
import { TESTIMONIALS, type Testimonial } from "../lib/testimonials";
import { scrollToConfigurator } from "../lib/configurator-options";
import { selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} étoiles sur 5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <FaStar
          key={i}
          className={cn("text-sm", i < rating ? "text-[var(--gold)]" : "text-[var(--gold)]/25")}
          aria-hidden
        />
      ))}
    </div>
  );
}

function TestimonialCard({ item }: { item: Testimonial }) {
  const badgeLabel = item.source === "google" ? "Avis Google" : "Avis client";

  return (
    <article
      className="testimonial-card flex w-[min(88vw,340px)] shrink-0 flex-col rounded-2xl border border-mds-border bg-[var(--surface)] p-6 shadow-[0_12px_40px_var(--mds-shadow)] md:w-[360px] md:p-7"
      aria-label={`Avis de ${item.name}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-serif text-lg font-semibold text-mds-text">{item.name}</p>
          <p className="mt-0.5 text-xs uppercase tracking-[0.18em] text-[var(--gold)]">{item.event}</p>
        </div>
        <span className="shrink-0 rounded-full border border-[var(--gold)]/30 bg-[var(--soft-gold)]/25 px-2.5 py-1 text-[0.65rem] font-medium uppercase tracking-[0.12em] text-[var(--gold)]">
          {badgeLabel}
        </span>
      </div>
      <StarRating rating={item.rating} />
      <p className="mt-4 flex-1 text-sm leading-relaxed text-mds-muted md:text-[0.9375rem]">
        &ldquo;{item.text}&rdquo;
      </p>
    </article>
  );
}

export default function ClientTestimonialsSection() {
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
        </Reveal>

        <div className="testimonials-marquee mt-12 md:mt-14">
          <div className="testimonials-track">
            {trackItems.map((item, index) => (
              <TestimonialCard key={`${item.id}-${index}`} item={item} />
            ))}
          </div>
        </div>

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
    </section>
  );
}
