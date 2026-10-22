import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import { articleUrl, formatDate, getRubrique, readingMinutes, type Article } from "../../lib/journal";
import { cn } from "../../lib/utils";

type Props = {
  article: Article;
  size?: "default" | "compact";
  priority?: boolean;
  headingLevel?: "h2" | "h3";
  className?: string;
};

/** Carte d'article : photo, rubrique, titre, résumé. */
export default function ArticleCard({ article, size = "default", priority, headingLevel = "h3", className }: Props) {
  const rubrique = getRubrique(article.rubrique);
  const Heading = headingLevel;
  return (
    <article className={cn("group relative flex flex-col", className)}>
      <div className={cn("img-zoom relative overflow-hidden bg-sand", size === "compact" ? "aspect-[4/3]" : "aspect-[4/5]")}>
        <Image
          src={article.hero.src}
          alt={article.hero.alt}
          fill
          priority={priority}
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 440px"
          quality={78}
          className="object-cover"
          style={{ objectPosition: article.hero.position ?? "center" }}
        />
        <span className="absolute left-4 top-4 rounded-full bg-paper/90 px-3 py-1.5 text-[0.62rem] font-semibold uppercase tracking-[0.2em] text-ink backdrop-blur">
          {rubrique.short}
        </span>
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-muted">
          <time dateTime={article.publishedAt}>{formatDate(article.publishedAt)}</time>
          <span aria-hidden> · </span>
          {readingMinutes(article)} min de lecture
        </p>
        <Heading
          className={cn(
            "mt-3 font-display leading-[1.12] tracking-[-0.02em] text-ink text-balance transition-colors duration-300 group-hover:text-gold",
            size === "compact" ? "text-[1.45rem]" : "text-[clamp(1.5rem,2.1vw,1.85rem)]"
          )}
        >
          <Link href={articleUrl(article.slug)} className="after:absolute after:inset-0">
            {article.title}
          </Link>
        </Heading>
        <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">{article.excerpt}</p>
        <span className="mt-5 inline-flex items-center gap-2 text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-ink">
          Lire l&apos;article <FiArrowUpRight aria-hidden className="transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </span>
      </div>
    </article>
  );
}
