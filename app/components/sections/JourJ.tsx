import Reveal from "../ui/Reveal";
import SectionHeading from "../ui/SectionHeading";

const steps = [
  {
    title: "Vous nous écrivez",
    text: "Par WhatsApp, téléphone ou formulaire : la date, le lieu, le nombre d'invités et vos envies.",
  },
  {
    title: "Nous composons votre menu",
    text: "Entrées, plats, desserts, buffet : nous vous conseillons les bonnes quantités, par table de 8 ou de 10.",
  },
  {
    title: "Vous recevez un devis clair",
    text: "Tout est détaillé. Un acompte de 30 % confirme votre date.",
  },
  {
    title: "Vous ajustez si besoin",
    text: "Le nombre d'invités peut encore évoluer jusqu'à deux semaines avant l'événement.",
  },
  {
    title: "Le jour J, on s'occupe de tout",
    text: "Livraison, réchauffage, dressage et service en salle, selon les options choisies.",
  },
  {
    title: "Vous profitez",
    text: "Avec l'option dédiée, nous récupérons et nettoyons notre vaisselle. Vous n'avez rien à gérer.",
  },
];

export default function JourJ() {
  return (
    <section className="section bg-ink-texture on-dark relative overflow-hidden text-ivory">
      <div className="zellige pointer-events-none absolute inset-0 opacity-50" aria-hidden />
      <div className="container-x relative">
        <SectionHeading
          tone="dark"
          eyebrow="Comment ça se passe"
          title={
            <>
              De votre premier message <em className="text-gold-gradient">au jour J</em>
            </>
          }
          intro="Une organisation simple et rassurante, pour que vous n'ayez qu'une chose à faire : profiter de vos invités."
        />

        <ol className="mt-16 grid gap-px overflow-hidden rounded-[var(--radius)] border border-line-dark bg-line-dark sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, i) => (
            <Reveal key={step.title} delay={0.05 * i} className="h-full">
              <li className="flex h-full flex-col bg-ink p-7 md:p-9">
                <span className="font-display text-5xl leading-none text-gold-bright/90">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-[1.65rem] leading-tight">{step.title}</h3>
                <p className="mt-3 text-[0.95rem] leading-relaxed text-muted-light">{step.text}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
