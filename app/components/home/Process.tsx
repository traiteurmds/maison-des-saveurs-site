"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import Reveal from "../ui/Reveal";
import TitleReveal from "../ui/TitleReveal";

const steps = [
  { title: "Vous nous écrivez", text: "Par WhatsApp, téléphone ou formulaire : la date, le lieu, le nombre d'invités et vos envies." },
  { title: "Nous composons votre menu", text: "Entrées, plats, desserts, buffet : nous vous conseillons les bonnes quantités, par table de 8 ou de 10." },
  { title: "Vous recevez un devis clair", text: "Tout est détaillé. Un acompte de 30 % confirme votre date." },
  { title: "Vous ajustez si besoin", text: "Le nombre d'invités peut encore évoluer jusqu'à deux semaines avant l'événement." },
  { title: "Le jour J, on s'occupe de tout", text: "Livraison, réchauffage, dressage et service en salle, selon les options choisies." },
];

export default function Process() {
  const listRef = useRef<HTMLOListElement>(null);
  // Fil de progression qui se remplit au fil des étapes
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });

  return (
    <section className="section bg-linen">
      <div className="container-x grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="lg:sticky lg:top-[calc(var(--header-h)+3rem)] lg:self-start">
          <p className="eyebrow">Comment ça se passe</p>
          <TitleReveal className="display-xl mt-5">
            Du premier message <em className="text-gold-gradient">au jour J</em>
          </TitleReveal>
          <p className="lead mt-6 max-w-md">
            Une organisation simple et rassurante, pour que vous n&apos;ayez qu&apos;une chose à faire : profiter de vos
            invités.
          </p>
        </div>
        <ol ref={listRef} className="relative border-t border-line-dark">
          <span aria-hidden className="absolute bottom-0 left-[1.1rem] top-0 w-px bg-line-dark md:left-[1.6rem]" />
          <motion.span
            aria-hidden
            style={{ scaleY: progress }}
            className="absolute bottom-0 left-[1.1rem] top-0 w-px origin-top bg-terracotta md:left-[1.6rem]"
          />
          {steps.map((s, i) => (
            <Reveal key={s.title}>
              <li className="group/step relative grid grid-cols-[4.5rem_1fr] gap-4 border-b border-line-dark py-8 md:grid-cols-[7rem_1fr] md:py-10">
                <motion.span
                  className="relative z-10 self-start bg-linen py-1 font-display text-4xl leading-none md:text-6xl"
                  initial={{ color: "rgba(29,25,21,0.22)" }}
                  whileInView={{ color: "#a8492a" }}
                  viewport={{ once: true, margin: "0px 0px -45% 0px" }}
                  transition={{ duration: 0.8 }}
                >
                  {String(i + 1).padStart(2, "0")}
                </motion.span>
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
