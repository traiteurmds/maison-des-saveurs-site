"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { splitTitle } from "../../lib/journal";
import type { JournalImage } from "../../lib/journal/types";

type Props = {
  title: string;
  dek: string;
  rubrique: { id: string; label: string };
  date: { iso: string; label: string };
  minutes: number;
  image: JournalImage;
};

const ease = [0.22, 1, 0.36, 1] as const;

/** En-tête d'article : titre éditorial à gauche, photo en arche à droite. */
export default function ArticleHero({ title, dek, rubrique, date, minutes, image }: Props) {
  const reduced = useReducedMotion();
  const rise = (delay: number) =>
    reduced
      ? {}
      : {
          initial: { opacity: 0.01, y: 26 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 1, ease, delay },
        };

  // « Première partie : seconde partie » → la seconde partie passe en italique, comme sur le reste du site
  const [lead, tail] = splitTitle(title);

  return (
    <section className="relative bg-paper pt-[calc(var(--header-h)+env(safe-area-inset-top)+2rem)] md:pt-[calc(var(--header-h)+3.5rem)]">
      <div className="container-x">
        <motion.nav aria-label="Fil d'Ariane" {...rise(0)}>
          <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.68rem] font-semibold uppercase tracking-[0.2em] text-muted">
            <li>
              <Link href="/" className="link-underline hover:text-ink">
                Accueil
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href="/journal" className="link-underline hover:text-ink">
                Le Journal
              </Link>
            </li>
            <li aria-hidden>/</li>
            <li>
              <Link href={`/journal#${rubrique.id}`} className="link-underline hover:text-ink">
                {rubrique.label}
              </Link>
            </li>
          </ol>
        </motion.nav>

        <div className="mt-10 grid gap-10 md:mt-14 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] lg:items-end lg:gap-16">
          <div className="lg:pb-6">
            <motion.p className="eyebrow" {...rise(0.06)}>
              {rubrique.label}
            </motion.p>
            <motion.h1 className="journal-title mt-6 text-ink" {...rise(0.12)}>
              {tail ? (
                <>
                  {lead}{"\u00a0"}:{" "}
                  <em className="text-gold">{tail}</em>
                </>
              ) : (
                title
              )}
            </motion.h1>
            <motion.p className="lead mt-7 max-w-2xl" {...rise(0.22)}>
              {dek}
            </motion.p>
            <motion.p
              className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-3"
              {...rise(0.3)}
            >
              <span>Par Maison Des Saveurs</span>
              <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
              <time dateTime={date.iso}>{date.label}</time>
              <span aria-hidden className="h-1 w-1 rounded-full bg-gold" />
              <span>{minutes} min de lecture</span>
            </motion.p>
          </div>

          <motion.figure
            className="mx-auto w-full max-w-[460px] lg:mr-0"
            initial={reduced ? false : { opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, ease, delay: 0.15 }}
          >
            <div className="arch relative aspect-[4/5] overflow-hidden bg-sand shadow-[var(--shadow-lg)]">
              <motion.div
                className="absolute inset-0"
                initial={reduced ? false : { scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.8, ease, delay: 0.15 }}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  priority
                  sizes="(max-width: 1024px) 92vw, 460px"
                  quality={82}
                  className="object-cover"
                  style={{ objectPosition: image.position ?? "center" }}
                />
              </motion.div>
            </div>
            {image.caption && (
              <figcaption className="mt-4 flex gap-3 text-[0.8rem] leading-relaxed text-muted">
                <span aria-hidden className="mt-[0.7em] h-px w-6 shrink-0 bg-gold" />
                <span>{image.caption}</span>
              </figcaption>
            )}
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
