import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { focalPoint } from "../../lib/image-config";
import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const tiles = [
  { title: "Couscous", sub: "Viande ou poulet, légumes fondants", image: "/images/menu/couscous-viande.jpg", span: "col-span-2 row-span-2" },
  { title: "Salade royale", sub: "Dressée en étages", image: "/images/menu/salade-royale.jpg", span: "md:row-span-2" },
  { title: "Pastilla", sub: "Poulet ou fruits de mer", image: "/images/menu/pastilla.jpg", span: "" },
  { title: "Viande aux pruneaux", sub: "Le sucré-salé des mariages", image: "/images/menu/viande-pruneaux.jpg", span: "" },
  { title: "Plateau de fruits", sub: "Fruits frais de saison", image: "/images/menu/assiette-fruits.jpg", span: "md:col-span-2" },
  { title: "Gâteaux marocains", sub: "Avec le thé", image: "/images/menu/gateaux-marocains.jpg", span: "col-span-2" },
];

export default function SignatureDishes() {
  return (
    <section className="section relative overflow-hidden bg-ivory">
      <div className="zellige-light pointer-events-none absolute inset-0" aria-hidden />
      <div className="container-x relative">
        <SectionHeading
          align="center"
          eyebrow="La carte"
          title={
            <>
              Nos plats <em className="text-gold">signature</em>
            </>
          }
          intro="Des recettes transmises et maîtrisées, des épices sélectionnées et des portions généreuses. Tout est servi en grands plats à partager, comme à la maison."
        />

        <div className="mt-14 grid auto-rows-[220px] grid-cols-2 gap-3 md:auto-rows-[240px] md:grid-cols-4 md:gap-4">
          {tiles.map((t, i) => (
            <Reveal key={t.title} delay={i * 0.05} className={t.span}>
              <Link
                href="/menu"
                className="group relative block h-full overflow-hidden rounded-[18px] bg-sand"
              >
                <Image
                  src={t.image}
                  alt={`${t.title}, Maison Des Saveurs`}
                  fill
                  sizes={i === 0 ? "(max-width: 768px) 100vw, 50vw" : "(max-width: 768px) 50vw, 25vw"}
                  quality={78}
                  className="object-cover transition-transform duration-[1.4s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                  style={{ objectPosition: focalPoint(t.image) }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" aria-hidden />
                <div className="absolute inset-x-0 bottom-0 p-4 md:p-5">
                  <h3 className="font-display text-xl leading-tight text-ivory md:text-[1.7rem]">{t.title}</h3>
                  <p className="mt-0.5 text-[0.72rem] text-ivory/75 md:text-sm">{t.sub}</p>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-12 flex justify-center">
          <Link href="/menu" className="btn btn-ink">
            Voir toute la carte <FiArrowRight aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
