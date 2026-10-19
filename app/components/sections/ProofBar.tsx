import { FiAward, FiCheckCircle, FiStar, FiTruck } from "react-icons/fi";
import { GOOGLE_BUSINESS } from "../../lib/testimonials";

const items = [
  { Icon: FiStar, title: "5,0 sur Google", text: `${GOOGLE_BUSINESS.reviewCount} avis clients` },
  { Icon: FiAward, title: "30+ ans", text: "d'expérience de la cheffe" },
  { Icon: FiCheckCircle, title: "Cuisine halal", text: "marocaine et traditionnelle" },
  { Icon: FiTruck, title: "Clé en main", text: "livraison, dressage, service" },
];

export default function ProofBar() {
  return (
    <section aria-label="Nos engagements" className="border-y border-line-dark bg-ink text-ivory">
      <div className="container-x grid grid-cols-2 lg:grid-cols-4">
        {items.map(({ Icon, title, text }, i) => (
          <div
            key={title}
            className={`flex items-center gap-3 py-5 md:gap-4 md:py-7 ${i % 2 === 1 ? "pl-4 md:pl-8" : ""} ${
              i > 0 ? "lg:border-l lg:border-line-dark lg:pl-8" : ""
            } ${i < 2 ? "border-b border-line-dark lg:border-b-0" : ""}`}
          >
            <Icon className="shrink-0 text-xl text-gold-bright md:text-2xl" aria-hidden />
            <div>
              <p className="font-display text-lg leading-tight md:text-2xl">{title}</p>
              <p className="text-[0.72rem] text-muted-light md:text-sm">{text}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
