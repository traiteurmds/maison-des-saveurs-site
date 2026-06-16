import type { Metadata } from "next";
import LegalPageShell from "../components/legal/LegalPageShell";
import { LEGAL } from "../lib/legal";
import { SITE_URL } from "../lib/site-seo";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description:
    "Politique de confidentialité et protection des données personnelles — Maison Des Saveurs, traiteur Lyon.",
  alternates: { canonical: `${SITE_URL}/politique-confidentialite` },
  robots: { index: true, follow: true },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <LegalPageShell
      label="RGPD"
      title="Politique de confidentialité"
      intro="Comment Maison Des Saveurs collecte, utilise et protège vos données personnelles."
    >
      <section>
        <h2>Responsable du traitement</h2>
        <p>
          {LEGAL.tradeName} — {LEGAL.director}
          <br />
          {LEGAL.adminAddress}
          <br />
          Email :{" "}
          <a href={`mailto:${LEGAL.email}`} className="legal-link">
            {LEGAL.email}
          </a>
        </p>
      </section>

      <section>
        <h2>Données collectées</h2>
        <p>Nous pouvons être amenés à collecter :</p>
        <ul>
          <li>Identité et coordonnées (nom, email, téléphone) via le formulaire de contact ;</li>
          <li>Informations relatives à votre événement (date, lieu, nombre d&apos;invités, message) ;</li>
          <li>Données techniques minimales (logs serveur, sécurité) ;</li>
          <li>Données de navigation agrégées via Vercel Analytics, uniquement avec votre consentement.</li>
        </ul>
      </section>

      <section>
        <h2>Finalités</h2>
        <ul>
          <li>Répondre à vos demandes de devis et organiser votre prestation ;</li>
          <li>Assurer le suivi commercial et la relation client ;</li>
          <li>Améliorer le site et mesurer l&apos;audience (avec consentement) ;</li>
          <li>Respecter nos obligations légales.</li>
        </ul>
      </section>

      <section>
        <h2>Base légale</h2>
        <p>
          Le traitement repose sur l&apos;exécution de mesures précontractuelles (demande de devis),
          notre intérêt légitime (sécurité, amélioration du service) et, le cas échéant, votre
          consentement pour les cookies analytics.
        </p>
      </section>

      <section>
        <h2>Durée de conservation</h2>
        <p>
          Les données de contact sont conservées le temps nécessaire au traitement de votre demande
          et au suivi commercial, puis archivées ou supprimées conformément aux obligations légales
          applicables.
        </p>
      </section>

      <section>
        <h2>Destinataires</h2>
        <p>
          Vos données sont destinées à {LEGAL.tradeName} et à ses prestataires techniques strictement
          nécessaires (hébergement Vercel, envoi d&apos;emails, vérification anti-spam hCaptcha le cas
          échéant). Elles ne sont ni vendues ni cédées à des tiers à des fins commerciales.
        </p>
      </section>

      <section>
        <h2>Vos droits</h2>
        <p>
          Conformément au RGPD, vous disposez d&apos;un droit d&apos;accès, de rectification,
          d&apos;effacement, de limitation, d&apos;opposition et de portabilité. Pour exercer vos
          droits :{" "}
          <a href={`mailto:${LEGAL.email}`} className="legal-link">
            {LEGAL.email}
          </a>
          . Vous pouvez également introduire une réclamation auprès de la CNIL.
        </p>
      </section>

      <section>
        <h2>Cookies</h2>
        <p>
          Consultez notre{" "}
          <a href="/politique-cookies" className="legal-link">
            politique cookies
          </a>{" "}
          et gérez vos préférences depuis le pied de page du site.
        </p>
      </section>

      <section>
        <h2>Sécurité</h2>
        <p>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées (HTTPS,
          validation des formulaires, limitation des accès) pour protéger vos données.
        </p>
      </section>
    </LegalPageShell>
  );
}
