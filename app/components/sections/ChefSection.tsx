import Image from "next/image";
import Reveal from "../ui/Reveal";

const values = [
  { title: "Des recettes de tradition", text: "Celles des grandes fêtes marocaines, maîtrisées depuis plus de trente ans." },
  { title: "Des épices sélectionnées", text: "Choisies avec soin pour retrouver le vrai goût du Maroc." },
  { title: "Des portions généreuses", text: "Personne ne repart sans avoir été servi comme il se doit." },
  { title: "Une présentation soignée", text: "Des plats dressés avec élégance, qui font honneur à votre table." },
];

export default function ChefSection() {
  return (
    <section className="section bg-paper">
      <div className="container-x grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div className="arch relative aspect-[4/5] overflow-hidden bg-sand shadow-[var(--shadow-lg)]">
            <Image
              src="/images/menu/gateaux-marocains.jpg"
              alt="Gâteaux marocains et thé servis par Maison Des Saveurs"
              fill
              sizes="(max-width: 1024px) 90vw, 560px"
              quality={80}
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-2 rounded-[20px] border border-line bg-[#fffdf9] px-6 py-5 shadow-[var(--shadow-lg)] md:-right-8">
            <p className="font-display text-6xl leading-none text-gold">30+</p>
            <p className="mt-2 max-w-[10rem] text-sm leading-snug text-muted">ans de cuisine marocaine traditionnelle</p>
          </div>
        </Reveal>

        <div>
          <Reveal>
            <p className="eyebrow">La cheffe</p>
            <h2 className="display-lg mt-5 text-ink">
              Une main experte, <em className="text-gold">un goût de famille</em>
            </h2>
            <p className="lead mt-6">
              Derrière chaque plat de Maison Des Saveurs, il y a une cheffe qui cuisine la tradition
              marocaine depuis plus de trente ans. Les sauces mijotent le temps qu&apos;il faut, la semoule
              est travaillée avec patience, et chaque plat part en salle comme s&apos;il était servi à sa
              propre famille.
            </p>
          </Reveal>

          <dl className="mt-10 grid gap-x-8 gap-y-7 sm:grid-cols-2">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={0.06 * i}>
                <dt className="flex items-center gap-3 font-display text-[1.45rem] leading-tight text-ink">
                  <span className="text-sm text-gold" aria-hidden>
                    ✦
                  </span>
                  {v.title}
                </dt>
                <dd className="mt-2 pl-6 text-[0.95rem] leading-relaxed text-muted">{v.text}</dd>
              </Reveal>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
