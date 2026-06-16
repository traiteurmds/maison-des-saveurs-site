import type { Metadata } from "next";
import LegalPageShell from "../components/legal/LegalPageShell";
import { LEGAL } from "../lib/legal";
import { SITE_URL } from "../lib/site-seo";

export const metadata: Metadata = {
  title: "Conditions générales de vente",
  description: "CGV — Maison Des Saveurs, traiteur halal Lyon.",
  alternates: { canonical: `${SITE_URL}/conditions-generales-de-vente` },
};

export default function CgvPage() {
  return (
    <LegalPageShell label="Prestations traiteur" title="Conditions générales de vente">
      <section>
        <h2>Prestataire</h2>
        <p>
          {LEGAL.tradeName} — {LEGAL.legalForm}, SIRET {LEGAL.siret}. {LEGAL.vatNotice}.
        </p>
      </section>
      <section>
        <h2>Acompte et paiement</h2>
        <ul>
          <li>Acompte de <strong>30 %</strong> pour confirmer la commande.</li>
          <li>Solde à régler le jour J ou avant l&apos;événement.</li>
          <li>Acompte non remboursable en cas d&apos;annulation par le client.</li>
        </ul>
      </section>
      <section>
        <h2>Modification et annulation</h2>
        <p>
          Modification du nombre d&apos;invités possible jusqu&apos;à{" "}
          <strong>2 semaines avant</strong> l&apos;événement, sous réserve d&apos;ajustement du
          devis.
        </p>
      </section>
      <section>
        <h2>Allergies et allergènes</h2>
        <p>
          Le client doit signaler toutes les allergies et restrictions alimentaires avant validation.
          Préparations pouvant contenir : {LEGAL.allergens.join(", ")}.
        </p>
      </section>
      <section>
        <h2>Médiation</h2>
        <p>{LEGAL.mediator}</p>
      </section>
    </LegalPageShell>
  );
}
