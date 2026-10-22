import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import { articleUrl, formatDate, readingMinutes, type Article, type Rubrique } from "../../lib/journal";
import { cn } from "../../lib/utils";
import Reveal from "../ui/Reveal";
import TitleReveal from "../ui/TitleReveal";

type Props = {
  rubrique: Rubrique;
  articles: Article[];
  reverse?: boolean;
  className?: string;
};

/** Une rubrique du Journal : son propos, son article phare et les sujets à paraître. */
export default function RubriqueFeature({ rubrique, articles, reverse, className }: Props) {
  const [lead] = articles;
  return (
    <section id={rubrique.id} className={cn("section scroll-mt-20", className)}>
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className={cn("lg:col-span-5", reverse && "lg:order-2")}>
          <Reveal>
            <p className="flex items-baseline gap-4">
              <span className="font-display text-[3.4rem] leading-none text-gold md:text-[4.4rem]">{rubrique.number}</span>
              <span className="eyebrow">Rubrique</span>
            </p>
          </Reveal>
          <TitleReveal className="display-lg mt-6 text-ink">{rubrique.label}</TitleReveal>
          <Reveal>
            <p className="lead mt-6 max-w-md">{rubrique.description}</p>
            {rubrique.upcoming.length > 0 && (
              <div className="mt-10">
                <p className="text-[0.66rem] font-semibold uppercase tracking-[0.24em] text-muted">À paraître</p>
                <ul className="mt-3 border-t border-line">
                  {rubrique.upcoming.map((t) => (
                    <li key={t} className="border-b border-line py-3 font-display text-[1.15rem] italic leading-snug text-ink-3">
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <Link href={rubrique.link.href} className="btn btn-outline btn-sm mt-10">
              {rubrique.link.label} <FiArrowRight aria-hidden />
            </Link>
          </Reveal>
        </div>

        {lead && (
          <Reveal className={cn("lg:col-span-7", reverse && "lg:order-1")} delay={0.08}>
            <article className="group relative grid gap-6 md:grid-cols-[minmax(0,0.95fr)_minmax(0,1fr)] md:items-end md:gap-8">
              <div className="img-zoom arch relative aspect-[4/5] overflow-hidden bg-sand shadow-[var(--shadow-lg)]">
                <Image
                  src={lead.hero.src}
                  alt={lead.hero.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 420px"
                  quality={80}
                  className="object-cover"
                  style={{ objectPosition: lead.hero.position ?? "center" }}
                />
              </div>
              <div className="md:pb-4">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
                  <time dateTime={lead.publishedAt}>{formatDate(lead.publishedAt)}</time> · {readingMinutes(lead)} min
                </p>
                <h3 className="mt-4 font-display text-[clamp(1.7rem,2.6vw,2.4rem)] leading-[1.08] tracking-[-0.02em] text-ink text-balance transition-colors duration-300 group-hover:text-gold">
                  <Link href={articleUrl(lead.slug)} className="after:absolute after:inset-0">
                    {lead.title}
                  </Link>
                </h3>
                <p className="mt-4 text-[0.98rem] leading-relaxed text-muted">{lead.excerpt}</p>
                <span className="mt-6 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink">
                  Lire l&apos;article
                  <FiArrowUpRight aria-hidden className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </span>
              </div>
            </article>
          </Reveal>
        )}
      </div>
    </section>
  );
}
