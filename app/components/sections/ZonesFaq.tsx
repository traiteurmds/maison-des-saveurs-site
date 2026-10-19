import Link from "next/link";
import { FiArrowRight, FiMapPin } from "react-icons/fi";
import { FAQ_ITEMS } from "../../lib/faq-data";
import { EXTENDED_AREAS, SERVICE_AREAS } from "../../lib/site-seo";
import Reveal from "../ui/Reveal";
import FaqAccordion from "./FaqAccordion";

const HOME_FAQ = ["zones", "halal", "service", "acompte", "reservation"];

export default function ZonesFaq() {
  return (
    <section className="section bg-paper">
      <div className="container-x grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Où nous intervenons</p>
          <h2 className="display-lg mt-5 text-ink">
            Lyon et <em className="text-gold">toute la métropole</em>
          </h2>
          <p className="lead mt-6">
            Nous livrons et servons dans toute la métropole lyonnaise. Pour un événement plus loin, parlez-nous
            de votre projet : nous étudions chaque demande.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {SERVICE_AREAS.map((city) => (
              <li key={city} className="chip">
                <FiMapPin className="text-gold" aria-hidden />
                {city}
              </li>
            ))}
            {EXTENDED_AREAS.map((city) => (
              <li key={city} className="chip border-dashed text-muted">
                {city} <span className="text-xs">(sur étude)</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="eyebrow">Questions fréquentes</p>
          <div className="mt-6">
            <FaqAccordion items={FAQ_ITEMS.filter((f) => HOME_FAQ.includes(f.id))} />
          </div>
          <Link href="/faq" className="link-underline mt-7 inline-flex items-center gap-2 font-semibold text-ink">
            Toutes les questions <FiArrowRight aria-hidden />
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
