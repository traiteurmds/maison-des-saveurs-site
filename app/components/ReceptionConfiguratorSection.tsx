"use client";

import { useEffect, useState } from "react";
import Reveal from "./ui/Reveal";
import ConfiguratorProgress from "./ConfiguratorProgress";
import Menu3DExperience from "./Menu3DExperience";
import VaisselleOptionsSection from "./VaisselleOptionsSection";
import ConfiguratorCaftansStep from "./ConfiguratorCaftansStep";
import ConfiguratorSummaryStep from "./ConfiguratorSummaryStep";
import { CONFIGURATOR_STEPS } from "../lib/configurator-options";
import { useSelection } from "./providers/SelectionProvider";

export default function ReceptionConfiguratorSection() {
  const { totalSelected } = useSelection();
  const [activeStep, setActiveStep] = useState(1);

  useEffect(() => {
    const stepElements = CONFIGURATOR_STEPS.map((s) => document.getElementById(s.targetId)).filter(
      Boolean
    ) as HTMLElement[];

    if (stepElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible.length > 0) {
          const id = visible[0].target.id;
          const step = CONFIGURATOR_STEPS.find((s) => s.targetId === id);
          if (step) setActiveStep(step.id);
        }
      },
      { threshold: [0.2, 0.35, 0.5], rootMargin: "-20% 0px -35% 0px" }
    );

    stepElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="configurateur"
      className="relative border-t border-mds-border bg-mds-bg"
      aria-labelledby="configurateur-heading"
    >
      <div className="mds-pattern pointer-events-none absolute inset-0 opacity-10" aria-hidden />

      <div className="relative mx-auto max-w-7xl px-6 pb-8 pt-16 lg:px-8 lg:pt-20">
        <div
          id="reception-composer"
          className="mx-auto max-w-3xl text-center"
        >
          <Reveal>
            <p className="font-serif text-xs uppercase tracking-[0.28em] text-[var(--gold)]">
              Votre réception sur mesure
            </p>
            <h2
              id="configurateur-heading"
              className="lux-heading mt-4 font-serif text-4xl font-semibold text-mds-text md:text-5xl"
            >
              Composez votre réception
            </h2>
            <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-mds-muted">
              Sélectionnez vos plats, options et caftans en quelques étapes. Votre demande se
              prépare automatiquement dans un message WhatsApp clair et complet.
            </p>
            <p className="mt-4 text-sm font-medium text-mds-text">
              {totalSelected === 0
                ? "0 élément sélectionné"
                : `${totalSelected} élément${totalSelected > 1 ? "s" : ""} sélectionné${totalSelected > 1 ? "s" : ""}`}
            </p>
          </Reveal>
        </div>

        <div className="sticky top-[5.5rem] z-30 mx-auto mt-10 max-w-4xl">
          <ConfiguratorProgress activeStep={activeStep} />
        </div>
      </div>

      <div id="configurateur-etape-1" className="scroll-mt-28">
        <Menu3DExperience embedded stepLabel="Étape 1 — Choisissez votre menu" />
      </div>

      <div id="configurateur-etape-2" className="scroll-mt-28">
        <VaisselleOptionsSection embedded stepLabel="Étape 2 — Ajoutez vos options" />
      </div>

      <div
        id="configurateur-etape-3"
        className="scroll-mt-28 border-t border-mds-border bg-mds-bg px-6 py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-7xl">
          <ConfiguratorCaftansStep />
        </div>
      </div>

      <div
        id="configurateur-etape-4"
        className="scroll-mt-28 border-t border-mds-border bg-[var(--surface-soft)]/40 px-6 py-16 lg:px-8 lg:py-20"
      >
        <div className="mx-auto max-w-3xl">
          <ConfiguratorSummaryStep />
        </div>
      </div>
    </section>
  );
}
