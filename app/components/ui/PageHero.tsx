import Image from "next/image";
import { cn } from "../../lib/utils";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  intro?: React.ReactNode;
  image?: string;
  imageAlt?: string;
  imagePosition?: string;
  children?: React.ReactNode;
  className?: string;
};

/** Bandeau sombre en tête de page : cohérent avec la navigation transparente. */
export default function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt = "",
  imagePosition = "center",
  children,
  className,
}: Props) {
  return (
    <section
      className={cn(
        "bg-ink-texture on-dark relative isolate overflow-hidden text-ivory",
        "pt-[calc(var(--header-h)+env(safe-area-inset-top)+3.5rem)] pb-16 md:pb-24 md:pt-[calc(var(--header-h)+6rem)]",
        className
      )}
    >
      {image && (
        <>
          <Image
            src={image}
            alt={imageAlt}
            fill
            priority
            sizes="100vw"
            quality={80}
            className="-z-20 object-cover opacity-45"
            style={{ objectPosition: imagePosition }}
          />
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-ink/80 via-ink/70 to-ink" aria-hidden />
        </>
      )}
      <div className="zellige pointer-events-none absolute inset-0 -z-10 opacity-50" aria-hidden />
      <div className="container-x">
        <div className="max-w-3xl">
          <p className="eyebrow">{eyebrow}</p>
          <h1 className="display-xl mt-6 text-ivory">{title}</h1>
          {intro && <p className="lead mt-6 max-w-2xl text-ivory/75">{intro}</p>}
          {children && <div className="mt-9">{children}</div>}
        </div>
      </div>
    </section>
  );
}
