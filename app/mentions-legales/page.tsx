import type { Metadata } from "next";
import LegalPageShell from "../components/legal/LegalPageShell";
import { LEGAL } from "../lib/legal";
import { SITE_URL } from "../lib/site-seo";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales — Maison Des Saveurs, traiteur halal Lyon.",
  alternates: { canonical: `${SITE_URL}/mentions-legales` },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPageShell label="Informations légales" title="Mentions légales">
      <section>
        <h2>Éditeur du site</h2>
        <p>
          <strong>{LEGAL.tradeName}</strong>
          <br />
          {LEGAL.legalForm}
          <br />
          SIREN : {LEGAL.siren} · SIRET : {LEGAL.siret}
          <br />
          Code APE : {LEGAL.ape}
          <br />
          {LEGAL.vatNotice}
        </p>
        <p>
          Adresse publique : {LEGAL.publicAddress}
          <br />
          Adresse administrative : {LEGAL.adminAddress}
        </p>
        <p>
          Email : <a href={`mailto:${LEGAL.email}`} className="legal-link">{LEGAL.email}</a>
          <br />
          Téléphone : <a href={`tel:${LEGAL.phoneE164}`} className="legal-link">{LEGAL.phone}</a>
        </p>
      </section>
      <section>
        <h2>Directeur de publication</h2>
        <p>{LEGAL.director}</p>
      </section>
      <section>
        <h2>Hébergement</h2>
        <p>
          {LEGAL.host.name} — {LEGAL.host.address}
          <br />
          <a href={LEGAL.host.website} className="legal-link" rel="noopener noreferrer" target="_blank">
            {LEGAL.host.website}
          </a>
        </p>
      </section>
    </LegalPageShell>
  );
}
