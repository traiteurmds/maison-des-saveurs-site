import type { Metadata } from "next";
import LegalPageShell from "../components/legal/LegalPageShell";
import { LEGAL } from "../lib/legal";
import { SITE_URL } from "../lib/site-seo";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: "Politique de confidentialité — Maison Des Saveurs.",
  alternates: { canonical: `${SITE_URL}/politique-confidentialite` },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPageShell
      label="Données personnelles"
      title="Politique de confidentialité"
      intro="Comment nous traitons vos données lors d'une demande de contact ou de devis."
    >
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          {LEGAL.tradeName} — {LEGAL.director}, {LEGAL.adminAddress}. Contact :{" "}
          <a href={`mailto:${LEGAL.email}`} className="legal-link">{LEGAL.email}</a>
        </p>
      </section>
      <section>
        <h2>Données collectées</h2>
        <p>
          Nom, email, téléphone, message et informations relatives à votre événement via le
          formulaire de contact ou WhatsApp.
        </p>
      </section>
      <section>
        <h2>Finalités</h2>
        <p>Répondre à vos demandes, établir un devis et assurer le suivi de votre prestation.</p>
      </section>
      <section>
        <h2>Vos droits</h2>
        <p>
          Vous pouvez demander l&apos;accès, la rectification ou la suppression de vos données en
          écrivant à{" "}
          <a href={`mailto:${LEGAL.email}`} className="legal-link">{LEGAL.email}</a>.
        </p>
      </section>
    </LegalPageShell>
  );
}
