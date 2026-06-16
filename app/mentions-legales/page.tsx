import type { Metadata } from "next";
import LegalPageShell from "../components/legal/LegalPageShell";
import { LEGAL } from "../lib/legal";
import { SITE_URL } from "../lib/site-seo";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: "Mentions légales du site Maison Des Saveurs, traiteur halal événementiel à Lyon.",
  alternates: { canonical: `${SITE_URL}/mentions-legales` },
  robots: { index: true, follow: true },
};

export default function MentionsLegalesPage() {
  return (
    <LegalPageShell
      label="Informations légales"
      title="Mentions légales"
      intro="Informations relatives à l'éditeur du site et à l'hébergement."
    >
      <section>
        <h2>Éditeur du site</h2>
        <p>
          <strong>{LEGAL.tradeName}</strong>
          <br />
          {LEGAL.legalForm}
          <br />
          SIREN : {LEGAL.siren}
          <br />
          SIRET : {LEGAL.siret}
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
          Email :{" "}
          <a href={`mailto:${LEGAL.email}`} className="legal-link">
            {LEGAL.email}
          </a>
          <br />
          Téléphone :{" "}
          <a href={`tel:${LEGAL.phoneE164}`} className="legal-link">
            {LEGAL.phone}
          </a>
        </p>
      </section>

      <section>
        <h2>Directeur de publication</h2>
        <p>{LEGAL.director}</p>
      </section>

      <section>
        <h2>Hébergement</h2>
        <p>
          Le site est hébergé par <strong>{LEGAL.host.name}</strong>
          <br />
          {LEGAL.host.address}
          <br />
          <a href={LEGAL.host.website} className="legal-link" rel="noopener noreferrer" target="_blank">
            {LEGAL.host.website}
          </a>
        </p>
      </section>

      <section>
        <h2>Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus présents sur ce site (textes, visuels, logo, mise en page)
          est protégé par le droit de la propriété intellectuelle. Toute reproduction ou
          exploitation non autorisée est interdite.
        </p>
      </section>

      <section>
        <h2>Données personnelles</h2>
        <p>
          Pour toute information relative au traitement de vos données, consultez notre{" "}
          <a href="/politique-confidentialite" className="legal-link">
            politique de confidentialité
          </a>
          .
        </p>
      </section>
    </LegalPageShell>
  );
}
