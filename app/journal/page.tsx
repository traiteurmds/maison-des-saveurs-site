import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiArrowUpRight } from "react-icons/fi";
import JournalMasthead from "../components/journal/JournalMasthead";
import RubriqueFeature from "../components/journal/RubriqueFeature";
import FinalCta from "../components/sections/FinalCta";
import Reveal from "../components/ui/Reveal";
import TitleReveal from "../components/ui/TitleReveal";
import {
  ARTICLES,
  FEATURED_SLUG,
  JOURNAL_INTRO,
  RUBRIQUES,
  articleUrl,
  articlesInRubrique,
  formatDate,
  getArticle,
  getRubrique,
  readingMinutes,
  splitTitle,
} from "../lib/journal";
import { JOURNAL_IMAGES } from "../lib/journal/images";
import { JsonLd, journalJsonLd } from "../lib/journal/seo";
import { withSocial } from "../lib/page-meta";
import { SITE_URL } from "../lib/site-seo";

export const metadata: Metadata = withSocial({
  title: "Le Journal : cuisine marocaine, traditions et réceptions",
  description:
    "Le Journal de Maison Des Saveurs, traiteur marocain à Lyon : l'histoire de notre cheffe, les secrets de la cuisine marocaine et des conseils pour vos réceptions.",
  alternates: { canonical: `${SITE_URL}/journal` },
});

const OCCASIONS = [
  { href: "/traiteur-mariage-lyon", label: "Mariages et hlel" },
  { href: "/services#familles", label: "Fêtes de famille" },
  { href: "/traiteur-entreprise-lyon", label: "Entreprises et associations" },
  { href: "/menu", label: "La carte" },
];

export default function JournalPage() {
  const featured = getArticle(FEATURED_SLUG)!;
  const featuredRubrique = getRubrique(featured.rubrique);
  const [lead, tail] = splitTitle(featured.title);
  const latest = [...ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
  const upcomingOnly = RUBRIQUES.filter((r) => articlesInRubrique(r.id).length === 0);

  return (
    <>
      <JsonLd data={journalJsonLd()} />
      <JournalMasthead intro={JOURNAL_INTRO} rubriques={RUBRIQUES} />

      {/* À la une + sommaire */}
      <section id={featuredRubrique.id} className="section scroll-mt-20 bg-paper">
        <div className="container-x grid gap-16 lg:grid-cols-12 lg:gap-12">
          <Reveal className="lg:col-span-8">
            <article className="group relative grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] md:items-end md:gap-10">
              <div className="img-zoom relative aspect-[4/5] overflow-hidden bg-sand shadow-[var(--shadow-lg)]">
                <Image
                  src={featured.hero.src}
                  alt={featured.hero.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 440px"
                  quality={82}
                  className="object-cover"
                  style={{ objectPosition: featured.hero.position ?? "center" }}
                />
                <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink backdrop-blur">
                  À la une
                </span>
              </div>
              <div className="md:pb-2">
                <p className="eyebrow">
                  {featuredRubrique.number} · {featuredRubrique.label}
                </p>
                <h2 className="mt-5 font-display text-[clamp(2rem,3.4vw,3.2rem)] leading-[1.04] tracking-[-0.03em] text-ink text-balance">
                  <Link href={articleUrl(featured.slug)} className="after:absolute after:inset-0">
                    {lead}
                    {tail && (
                      <>
                        {"\u00a0"}: <em className="text-gold">{tail}</em>
                      </>
                    )}
                  </Link>
                </h2>
                <p className="mt-6 text-[1rem] leading-relaxed text-muted">{featured.dek}</p>
                <p className="mt-6 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
                  <time dateTime={featured.publishedAt}>{formatDate(featured.publishedAt)}</time> · {readingMinutes(featured)} min de lecture
                </p>
                <span className="btn btn-ink mt-8">
                  Lire le récit <FiArrowRight aria-hidden />
                </span>
              </div>
            </article>
          </Reveal>

          <Reveal className="lg:col-span-4 lg:border-l lg:border-line lg:pl-12" delay={0.1}>
            <h2 className="eyebrow">Au sommaire</h2>
            <ol className="mt-6 border-t border-line">
              {latest.map((a, i) => (
                <li key={a.slug} className="border-b border-line">
                  <Link href={articleUrl(a.slug)} className="group flex gap-5 py-6">
                    <span className="font-display text-[1.6rem] leading-none text-gold">{String(i + 1).padStart(2, "0")}</span>
                    <span className="min-w-0">
                      <span className="block text-[0.64rem] font-semibold uppercase tracking-[0.22em] text-muted">
                        {getRubrique(a.rubrique).short} · {readingMinutes(a)} min
                      </span>
                      <span className="mt-2 block font-display text-[1.25rem] leading-[1.18] text-ink transition-colors duration-300 group-hover:text-gold">
                        {a.title}
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <p className="mt-6 text-[0.88rem] leading-relaxed text-muted">
              Le Journal s&apos;enrichit au fil des saisons : cuisine marocaine, réceptions et histoire de la maison.
            </p>
          </Reveal>
        </div>
      </section>

      <RubriqueFeature rubrique={getRubrique("cuisine-marocaine")} articles={articlesInRubrique("cuisine-marocaine")} className="bg-linen" />
      <RubriqueFeature rubrique={getRubrique("mariages")} articles={articlesInRubrique("mariages")} reverse className="bg-paper" />

      {/* Rubriques dont les premiers articles sont en préparation */}
      <section className="section border-t border-line bg-ivory">
        <div className="container-x">
          <div className="max-w-3xl">
            <Reveal>
              <p className="eyebrow">Les prochaines rubriques</p>
            </Reveal>
            <TitleReveal className="display-lg mt-5 text-ink">
              Recevoir, conseiller, <em className="text-gold">accompagner</em>
            </TitleReveal>
            <Reveal>
              <p className="lead mt-6">
                Des repères concrets pour organiser un buffet, préparer un repas pour vos proches ou un événement
                professionnel. Les premiers articles de ces rubriques sont en cours d&apos;écriture.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 grid gap-px overflow-hidden border border-line bg-line md:grid-cols-3">
            {upcomingOnly.map((r, i) => (
              <Reveal key={r.id} delay={0.06 * i} className="h-full bg-ivory">
                <div id={r.id} className="flex h-full scroll-mt-28 flex-col p-7 md:p-9">
                  <span className="font-display text-[2.6rem] leading-none text-gold">{r.number}</span>
                  <h3 className="mt-6 font-display text-[1.7rem] leading-[1.1] text-ink">{r.label}</h3>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-muted">{r.description}</p>
                  <ul className="mt-6 flex-1 space-y-2 border-t border-line pt-5">
                    {r.upcoming.map((t) => (
                      <li key={t} className="font-display text-[1.05rem] italic leading-snug text-ink-3">
                        <span className="mr-2 not-italic text-[0.6rem] font-sans font-semibold uppercase tracking-[0.2em] text-muted">
                          À paraître
                        </span>
                        {t}
                      </li>
                    ))}
                  </ul>
                  <Link href={r.link.href} className="link-underline mt-8 inline-flex items-center gap-2 self-start text-[0.72rem] font-semibold uppercase tracking-[0.2em] text-ink">
                    {r.link.label} <FiArrowUpRight aria-hidden />
                  </Link>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Du Journal à votre table */}
      <section className="section bg-paper">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <Reveal className="relative mx-auto w-full max-w-md lg:order-2">
            <div className="arch relative aspect-[4/5] overflow-hidden bg-sand shadow-[var(--shadow-lg)]">
              <Image
                src={JOURNAL_IMAGES.saladesSauces.src}
                alt={JOURNAL_IMAGES.saladesSauces.alt}
                fill
                sizes="(max-width: 1024px) 90vw, 440px"
                quality={80}
                className="object-cover"
                style={{ objectPosition: JOURNAL_IMAGES.saladesSauces.position }}
              />
            </div>
          </Reveal>
          <div>
            <Reveal>
              <p className="eyebrow">Maison Des Saveurs</p>
            </Reveal>
            <TitleReveal className="display-lg mt-5 text-ink">
              Du Journal <em className="text-gold">à votre table</em>
            </TitleReveal>
            <Reveal>
              <p className="lead mt-6 max-w-xl">
                Les plats dont nous parlons ici, nous les préparons pour vos mariages, vos fêtes de famille et vos
                événements professionnels, à Lyon et dans la région lyonnaise. Livraison, dressage, service en salle et
                vaisselle selon vos besoins.
              </p>
              <ul className="mt-10 border-t border-line">
                {OCCASIONS.map((o) => (
                  <li key={o.href} className="border-b border-line">
                    <Link href={o.href} className="group flex items-center justify-between gap-6 py-5">
                      <span className="font-display text-[1.6rem] leading-none text-ink transition-[color,transform] duration-500 group-hover:translate-x-2 group-hover:italic group-hover:text-gold md:text-[1.9rem]">
                        {o.label}
                      </span>
                      <FiArrowUpRight aria-hidden className="shrink-0 text-lg text-muted transition-transform duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink" />
                    </Link>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <FinalCta
        title={
          <>
            Une réception en vue ? <em>Parlons-en.</em>
          </>
        }
        text="Mariage, fête de famille ou événement professionnel : indiquez-nous la date, le lieu et le nombre d'invités. Nous revenons vers vous avec un menu et un devis sur mesure."
      />
    </>
  );
}
