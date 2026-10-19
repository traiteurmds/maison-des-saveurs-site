import Reveal from "../ui/Reveal";

const steps = [
  { title: "Vous nous écrivez", text: "Par WhatsApp, téléphone ou formulaire : la date, le lieu, le nombre d'invités et vos envies." },
  { title: "Nous composons votre menu", text: "Entrées, plats, desserts, buffet : nous vous conseillons les bonnes quantités, par table de 8 ou de 10." },
  { title: "Vous recevez un devis clair", text: "Tout est détaillé. Un acompte de 30 % confirme votre date." },
  { title: "Vous ajustez si besoin", text: "Le nombre d'invités peut encore évoluer jusqu'à deux semaines avant l'événement." },
  { title: "Le jour J, on s'occupe de tout", text: "Livraison, réchauffage, dressage et service en salle, selon les options choisies." },
];

export default function Process() {
  return (
    <section className="section bg-linen">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
          <p className="eyebrow">Comment ça se passe</p>
          <h2 className="display-xl mt-5">
            Du premier message <em className="text-gold-gradient">au jour J</em>
          </h2>
          <p className="lead mt-6 max-w-md">
            Une organisation simple et rassurante, pour que vous n&apos;ayez qu&apos;une chose à faire : profiter de vos
            invités.
          </p>
        </div>
        <ol className="border-t border-line-dark">
          {steps.map((s, i) => (
            <Reveal key={s.title}>
              <li className="grid grid-cols-[4.5rem_1fr] gap-4 border-b border-line-dark py-8 md:grid-cols-[7rem_1fr] md:py-10">
                <span className="font-display text-4xl leading-none text-gold md:text-6xl">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-[1.6rem] leading-tight md:text-[2rem]">{s.title}</h3>
                  <p className="mt-3 max-w-lg text-[0.97rem] leading-relaxed text-muted">{s.text}</p>
                </div>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
