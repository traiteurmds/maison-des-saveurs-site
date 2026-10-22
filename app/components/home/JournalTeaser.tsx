import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { ARTICLES } from "../../lib/journal";
import ArticleCard from "../journal/ArticleCard";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

/** Accueil : les derniers articles du Journal. */
export default function JournalTeaser() {
  const latest = [...ARTICLES].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt)).slice(0, 3);
  return (
    <section className="section border-t border-line bg-ivory">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Le Journal"
            title={
              <>
                Histoires de cuisine <em className="text-gold">et de partage</em>
              </>
            }
            intro="L'histoire de notre cheffe, les secrets de la cuisine marocaine et nos conseils pour préparer vos réceptions."
          />
          <Reveal className="shrink-0">
            <Link href="/journal" className="btn btn-outline">
              Lire le Journal <FiArrowRight aria-hidden />
            </Link>
          </Reveal>
        </div>
        <div className="mt-14 grid gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          {latest.map((article, i) => (
            <Reveal key={article.slug} delay={0.06 * i}>
              <ArticleCard article={article} size="compact" />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
