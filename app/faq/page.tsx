import PageHero from "../components/ui/PageHero";
import FaqAccordion from "../components/sections/FaqAccordion";
import FinalCta from "../components/sections/FinalCta";
import { FAQ_ITEMS } from "../lib/faq-data";

export default function FAQPage() {
  return (
    <>
      <PageHero
        eyebrow="Questions fréquentes"
        title={
          <>
            Tout ce qu&apos;il faut <em className="text-gold-gradient">savoir</em>
          </>
        }
        intro="Réservation, déroulement, service, allergies : les réponses aux questions que l'on nous pose le plus souvent."
      />
      <section className="section-tight bg-paper">
        <div className="container-x max-w-4xl">
          <FaqAccordion items={FAQ_ITEMS} />
        </div>
      </section>
      <FinalCta
        title={
          <>
            Une autre question ? <em className="text-gold-gradient">Écrivez-nous.</em>
          </>
        }
        text="Nous répondons volontiers à toutes vos questions par téléphone, WhatsApp ou e-mail."
      />
    </>
  );
}
