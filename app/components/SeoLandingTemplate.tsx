"use client";

import Link from "next/link";
import { scrollToConfigurator } from "../lib/configurator-options";
import { PHONE_TEL } from "../lib/site-seo";
import { useSelection } from "./providers/SelectionProvider";
import { btnWhatsappClass, selectableFocusClass } from "../lib/whatsapp";
import { cn } from "../lib/utils";
import Reveal from "./ui/Reveal";

export type SeoLandingContent = {
  label: string;
  title: string;
  intro: string;
  paragraphs: string[];
  highlights: string[];
};

export default function SeoLandingTemplate({ content }: { content: SeoLandingContent }) {
  const { whatsappUrl } = useSelection();

  return (
    <div className="bg-mds-bg pt-28 pb-24">
      <section className="relative overflow-hidden border-b border-mds-border px-6 py-16 md:py-20">
        <div className="mds-pattern pointer-events-none absolute inset-0 opacity-10" aria-hidden />
        <Reveal className="relative mx-auto max-w-3xl text-center">
          <p className="font-serif text-sm uppercase tracking-[0.28em] text-[var(--gold)]">
            {content.label}
          </p>
          <h1 className="lux-heading mt-4 font-serif text-4xl font-semibold text-mds-text md:text-5xl">
            {content.title}
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-mds-muted">{content.intro}</p>
        </Reveal>
      </section>

      <section className="mx-auto max-w-3xl px-6 py-14 lg:px-8">
        <div className="space-y-5 text-base leading-relaxed text-mds-muted md:text-lg">
          {content.paragraphs.map((p) => (
            <p key={p.slice(0, 40)}>{p}</p>
          ))}
        </div>

        <ul className="mt-10 space-y-3">
          {content.highlights.map((item) => (
            <li key={item} className="flex items-start gap-3 text-mds-text">
              <span className="mt-1 text-[var(--gold)]" aria-hidden>
                ✓
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <Reveal className="mt-12 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          <button
            type="button"
            onClick={scrollToConfigurator}
            className={cn(
              "inline-flex min-h-[52px] min-w-[260px] items-center justify-center rounded-full bg-[var(--black)] px-8 font-medium tracking-wide text-[var(--ivory)] transition-colors hover:bg-[var(--charcoal)]",
              selectableFocusClass
            )}
          >
            Composer ma réception
          </button>
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(btnWhatsappClass, "min-w-[260px] sm:w-auto", selectableFocusClass)}
          >
            Demander un devis
          </a>
        </Reveal>

        <p className="mt-8 text-center text-sm text-mds-muted">
          <Link href="/contact" className="text-[var(--gold)] underline-offset-4 hover:underline">
            Formulaire de contact
          </Link>
          {" · "}
          <a href={PHONE_TEL} className="text-[var(--gold)] underline-offset-4 hover:underline">
            Appeler directement
          </a>
        </p>
      </section>
    </div>
  );
}
