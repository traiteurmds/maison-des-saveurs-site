import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import type { Block, JournalImage } from "../../lib/journal/types";
import { cn } from "../../lib/utils";
import Reveal from "../ui/Reveal";
import RichText from "./RichText";
import SpicePalette from "./SpicePalette";

function Caption({ text, className }: { text?: string; className?: string }) {
  if (!text) return null;
  return (
    <figcaption className={cn("mt-3 flex gap-3 text-[0.82rem] leading-relaxed text-muted", className)}>
      <span aria-hidden className="mt-[0.7em] h-px w-6 shrink-0 bg-gold" />
      <span>{text}</span>
    </figcaption>
  );
}

function Photo({ image, sizes, className }: { image: JournalImage; sizes: string; className?: string }) {
  return (
    <div className={cn("img-zoom relative overflow-hidden bg-sand", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        fill
        sizes={sizes}
        quality={80}
        className="object-cover"
        style={{ objectPosition: image.position ?? "center" }}
      />
    </div>
  );
}

function renderBlock(block: Block, i: number) {
  switch (block.type) {
    case "p":
      return (
        <p key={i}>
          <RichText text={block.text} />
        </p>
      );
    case "h2":
      return (
        <h2 key={i} id={block.id}>
          {block.text}
        </h2>
      );
    case "h3":
      return <h3 key={i}>{block.text}</h3>;
    case "quote":
      return (
        <Reveal key={i} className="!my-16">
          <figure className="relative border-y border-line-dark py-10 text-center">
            <span aria-hidden className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 bg-paper px-4 font-display text-4xl leading-none text-gold">
              «
            </span>
            <blockquote className="mx-auto max-w-[34ch] font-display text-[clamp(1.55rem,2.6vw,2.15rem)] italic leading-[1.25] tracking-[-0.01em] text-ink">
              {block.text}
            </blockquote>
          </figure>
        </Reveal>
      );
    case "list": {
      const Tag = block.ordered ? "ol" : "ul";
      return (
        <Tag key={i}>
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </Tag>
      );
    }
    case "figure": {
      const { image, layout = "column" } = block;
      if (layout === "wide") {
        return (
          <Reveal key={i} className="bleed-lg !my-14">
            <figure>
              <Photo image={image} sizes="(max-width: 1024px) 100vw, 1000px" className="aspect-[4/3] md:aspect-[16/9]" />
              <Caption text={image.caption} />
            </figure>
          </Reveal>
        );
      }
      if (layout === "portrait") {
        return (
          <Reveal key={i} className="!my-14">
            <figure className="grid items-end gap-5 sm:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] sm:gap-8">
              <Photo image={image} sizes="(max-width: 640px) 100vw, 400px" className="arch aspect-[4/5]" />
              <Caption text={image.caption} className="sm:mb-4" />
            </figure>
          </Reveal>
        );
      }
      return (
        <Reveal key={i} className="!my-12">
          <figure>
            <Photo image={image} sizes="(max-width: 768px) 100vw, 680px" className="aspect-[4/3]" />
            <Caption text={image.caption} />
          </figure>
        </Reveal>
      );
    }
    case "pair":
      return (
        <Reveal key={i} className="bleed-sm !my-14">
          <figure>
            <div className="grid grid-cols-2 gap-3 md:gap-5">
              {block.images.map((image, k) => (
                <Photo
                  key={image.src}
                  image={image}
                  sizes="(max-width: 768px) 50vw, 420px"
                  className={cn("aspect-[4/5]", k === 1 && "mt-10 md:mt-16")}
                />
              ))}
            </div>
            <Caption text={block.caption} />
          </figure>
        </Reveal>
      );
    case "aside":
      return (
        <aside key={i} className="bg-linen relative !my-12 overflow-hidden rounded-[var(--radius)] px-6 py-8 md:px-10 md:py-10">
          <p className="eyebrow">{block.title}</p>
          {block.text && (
            <p className="mt-4 font-display text-[1.35rem] leading-[1.35] text-ink md:text-[1.5rem]">
              <RichText text={block.text} />
            </p>
          )}
          {block.items && (
            <ul className="mt-5 text-[0.98rem]">
              {block.items.map((item) => (
                <li key={item}>
                  <RichText text={item} />
                </li>
              ))}
            </ul>
          )}
        </aside>
      );
    case "spices":
      return <SpicePalette key={i} />;
    case "cta":
      return (
        <Reveal key={i} className="!mt-16">
          <div className="zellige relative overflow-hidden rounded-[var(--radius)] border border-line bg-ivory px-6 py-10 md:px-12 md:py-12">
            <p className="eyebrow">Maison Des Saveurs</p>
            <p className="mt-5 font-display text-[clamp(1.6rem,2.6vw,2.2rem)] leading-[1.12] tracking-[-0.02em] text-ink">
              {block.title}
            </p>
            <p className="mt-4 max-w-xl text-[1rem] leading-relaxed text-muted">{block.text}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              {block.links.map((link, k) => (
                <Link key={link.href} href={link.href} className={cn("btn btn-sm", k === 0 ? "btn-ink" : "btn-outline")}>
                  {link.label} <FiArrowRight aria-hidden />
                </Link>
              ))}
              {!block.links.some((l) => l.href === "/contact") && (
                <Link href="/contact" className="btn btn-sm btn-outline">
                  Demander un devis <FiArrowRight aria-hidden />
                </Link>
              )}
            </div>
          </div>
        </Reveal>
      );
  }
}

/** Corps d'article : colonne de lecture confortable, figures qui sortent de la colonne sur grand écran. */
export default function ArticleBody({ blocks }: { blocks: Block[] }) {
  return <div className="journal-prose mx-auto max-w-[680px]">{blocks.map(renderBlock)}</div>;
}
