import Image from "next/image";
import Link from "next/link";
import { FiArrowUpRight } from "react-icons/fi";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const items = [
  {
    href: "/traiteur-mariage-lyon",
    eyebrow: "Mariages · Hlel · Fiançailles",
    title: "Le repas de votre plus beau jour",
    text: "Grands plats à partager, salade royale, service en salle et tables dressées. Nous orchestrons le repas pour que vous profitiez de votre fête.",
    image: "/images/menu/viande-pruneaux.jpg",
    alt: "Viande aux pruneaux servie lors d'un mariage marocain",
  },
  {
    href: "/services#familles",
    eyebrow: "Naissances · Aqiqas · Anniversaires",
    title: "Les fêtes de famille, en toute sérénité",
    text: "Rfissa, couscous, pastillas et plateaux de fruits pour réunir vos proches autour d'une cuisine qui rappelle celle de la maison.",
    image: "/images/menu/rfissa.jpg",
    alt: "Rfissa marocaine pour une fête de naissance",
  },
  {
    href: "/traiteur-entreprise-lyon",
    eyebrow: "Entreprises · Associations · Universités",
    title: "Buffets et repas pour vos équipes",
    text: "Buffets salés, repas d'équipe, soirées associatives et événements étudiants. Une organisation sérieuse, des saveurs qui marquent.",
    image: "/images/menu/mini-sales.jpg",
    alt: "Buffet de mini salés pour un événement d'entreprise",
  },
];

export default function Prestations() {
  return (
    <section className="section bg-paper">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <SectionHeading
            eyebrow="Nos prestations"
            title={
              <>
                Une cuisine, <em className="text-gold">mille occasions</em>
              </>
            }
            intro="Chaque réception est différente. Nous adaptons le menu, les quantités et le service à votre événement, à votre lieu et à vos invités."
          />
          <Reveal>
            <Link href="/services" className="btn btn-outline shrink-0">
              Toutes les prestations <FiArrowUpRight aria-hidden />
            </Link>
          </Reveal>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {items.map((item, i) => (
            <Reveal key={item.href} delay={i * 0.08} className="h-full">
              <Link
                href={item.href}
                className="group relative flex h-full min-h-[460px] flex-col justify-end overflow-hidden rounded-[var(--radius)] bg-ink p-6 text-ivory md:min-h-[540px] md:p-7"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  quality={78}
                  className="object-cover opacity-80 transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/5" aria-hidden />
                <div className="relative">
                  <p className="text-[0.68rem] font-semibold uppercase tracking-[0.22em] text-gold-bright">{item.eyebrow}</p>
                  <h3 className="mt-3 font-display text-[2rem] leading-[1.05]">{item.title}</h3>
                  <p className="mt-3 text-[0.95rem] leading-relaxed text-ivory/75">{item.text}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-gold-bright">
                    Découvrir
                    <FiArrowUpRight className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
                  </span>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
