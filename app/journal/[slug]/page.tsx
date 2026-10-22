import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FiArrowLeft } from "react-icons/fi";
import ArticleHero from "../../components/journal/ArticleHero";
import ArticleBody from "../../components/journal/ArticleBody";
import ArticleToc from "../../components/journal/ArticleToc";
import ArticleCard from "../../components/journal/ArticleCard";
import ReadingProgress from "../../components/journal/ReadingProgress";
import FinalCta from "../../components/sections/FinalCta";
import SectionHeading from "../../components/ui/SectionHeading";
import {
  ARTICLES,
  formatDate,
  getArticle,
  getRubrique,
  readingMinutes,
  tableOfContents,
} from "../../lib/journal";
import { JsonLd, articleJsonLd, articleMetadata } from "../../lib/journal/seo";

type Params = { slug: string };

export const dynamicParams = false;

export function generateStaticParams(): Params[] {
  return ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const article = getArticle((await params).slug);
  return article ? articleMetadata(article) : {};
}

export default async function ArticlePage({ params }: { params: Promise<Params> }) {
  const article = getArticle((await params).slug);
  if (!article) notFound();

  const rubrique = getRubrique(article.rubrique);
  const toc = tableOfContents(article);
  const related = article.related.map((slug) => ARTICLES.find((a) => a.slug === slug)).filter((a) => !!a);

  return (
    <>
      <JsonLd data={articleJsonLd(article)} />
      <ReadingProgress />

      <ArticleHero
        title={article.title}
        dek={article.dek}
        rubrique={{ id: rubrique.id, label: rubrique.label }}
        date={{ iso: article.publishedAt, label: formatDate(article.publishedAt) }}
        minutes={readingMinutes(article)}
        image={article.hero}
      />

      <section className="bg-paper pb-[clamp(5rem,10vw,8rem)] pt-14 md:pt-20">
        <div className="container-x grid gap-10 xl:grid-cols-[220px_minmax(0,1fr)] xl:gap-14">
          <aside className="hidden xl:block">
            <div className="sticky top-[calc(var(--header-h)+2.5rem)]">
              <ArticleToc items={toc} />
              <Link
                href="/journal"
                className="mt-10 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink-3 hover:text-ink"
              >
                <FiArrowLeft aria-hidden /> Le Journal
              </Link>
            </div>
          </aside>

          <div className="journal-col min-w-0">
            <details className="group mx-auto mb-12 max-w-[680px] border-y border-line py-4 xl:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between text-[0.7rem] font-semibold uppercase tracking-[0.22em] text-ink-3 [&::-webkit-details-marker]:hidden">
                Sommaire de l&apos;article
                <span aria-hidden className="font-display text-xl leading-none text-gold transition-transform duration-300 group-open:rotate-45">
                  +
                </span>
              </summary>
              <ol className="mt-4 space-y-2.5">
                {toc.map((item, i) => (
                  <li key={item.id}>
                    <a href={`#${item.id}`} className="flex gap-3 text-[0.95rem] leading-snug text-ink-3 hover:text-ink">
                      <span className="font-display text-gold" aria-hidden>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {item.text}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            <ArticleBody blocks={article.body} />

            <footer className="mx-auto mt-16 max-w-[680px] border-t border-line pt-8">
              <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
                Publié le <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
                {article.updatedAt && (
                  <>
                    {" "}· Mis à jour le <time dateTime={article.updatedAt}>{formatDate(article.updatedAt)}</time>
                  </>
                )}
                {" "}· Rubrique{" "}
                <Link href={`/journal#${rubrique.id}`} className="link-underline text-ink">
                  {rubrique.label}
                </Link>
              </p>
              <p className="mt-5 text-[0.95rem] leading-relaxed text-muted">
                <span className="font-display text-[1.1rem] text-ink">Maison Des Saveurs</span> est un traiteur marocain
                halal installé dans la métropole de Lyon. Le Journal raconte notre cuisine, ses traditions et la manière
                dont nous préparons vos réceptions.
              </p>
            </footer>
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="section-tight border-t border-line bg-ivory">
          <div className="container-x">
            <SectionHeading eyebrow="Le Journal" title={<>Poursuivre <em className="text-gold">la lecture</em></>} />
            <div className="mt-12 grid gap-12 md:grid-cols-2 lg:gap-16">
              {related.map((a) => (
                <ArticleCard key={a.slug} article={a} size="compact" />
              ))}
            </div>
          </div>
        </section>
      )}

      <FinalCta
        title={article.closing.title.split("*").map((part, i) => (i % 2 ? <em key={i}>{part}</em> : part))}
        text={article.closing.text}
      />
    </>
  );
}
