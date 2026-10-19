import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import { FAQ_ITEMS } from "../../lib/faq-data";
import Reveal from "../ui/Reveal";
import FaqAccordion from "./FaqAccordion";

const HOME_FAQ = ["zones", "halal", "service", "acompte", "reservation"];

export default function ZonesFaq() {
  return (
    <section className="section bg-paper">
      <div className="container-x grid gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <Reveal>
          <p className="eyebrow">Questions fréquentes</p>
          <h2 className="display-lg mt-5 text-ink">
            Tout ce qu&apos;il faut <em className="text-gold">savoir avant de réserver</em>
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <div>
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
